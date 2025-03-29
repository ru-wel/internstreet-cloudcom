import express from 'express';
import { LogAction } from '../utils/logger.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { getEmail } from './login.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

Application.belongsTo(Job, { foreignKey: 'job_id' });
Job.hasMany(Application, { foreignKey: 'job_id' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${uuidv4()}${file.originalname}`;
      cb(null, uniqueName);
    },
});
  
const upload = multer({ storage });
const app = express();
app.use(express.json());

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const applications = await Application.findAll();
    applications.sort((a, b) => b.id - a.id); // sort by id
    res.status(200).send(applications);
  } catch (error) {
    console.error('Error fetching applications: ', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// TODO's
// - APPLY JOB - PUSH TO APPLICATIONS
// - DISABLE APPLY NOW BUTTON IF USER HAS APPLIED ALREADY


// router.post('/', async (req, res) => {
//     const { email, c_name, c_position, resume, cover_letter } = req.body;
//     try{
//         const apply = await Application.create({
//             email: email,
//             c_name: c_name,
//             c_position: c_position,
//             resume: resume,
//             cover_letter: cover_letter,
//             status: "pending"
//         })
//         const message = `Has successfully applied to "${c_name}" as a "${c_position}"`;
//         res.status(201).json({ message: message, apply});
//         await LogAction(message)
//     } catch(error){
//         console.error("Error applying job:", error);

//     }
// });


// APPLY JOB FOR APPLICATION PAGE

router.post('/', upload.fields([{ name: "resume" }, { name: "cover"}]), async (req, res) => {

    try{
        const resume = req.files["resume"] ? req.files["resume"][0] : null;
        const cover = req.files["cover"] ? req.files["cover"][0] : null;
    
    
        console.log('RESUME: ', resume);
        console.log('COVER: ', cover);
        const { email, c_name, c_location, c_position, job_id, name, c_logo } = req.body;
        console.log(req.body);
    
        const apply = await Application.create({ // TO BE ADDED - JOB ID
            email: email,
            c_name: c_name,
            c_location: c_location,
            c_position: c_position,
            c_logo: c_logo,
            resume: resume.filename,
            cover_letter: cover.filename,
            status: "pending",
            job_id: job_id,
            name: name,

        })
        const message = `Has successfully applied to "${c_name}" as a "${c_position}"`;
        console.log(message); // FOR TESTING PURPOSES

        res.status(201).json({ message: message, apply});
        await LogAction(message);
    } catch(error){
        console.error("Error applying job:", error);
        res.status(500).json({ message: 'Error while applying'});

    }
});

// CHECK IF CLIENT HAS ALREADY APPLIED FOR THAT JOB

router.get('/:company/:position', async (req, res) => {
    try {
        const application = await Application.findOne({
            where: {
                email: getEmail(),
                c_name: req.params.company,
                c_position: req.params.position,
            }
        });
        if(application){
            res.status(200).send(true);
            console.log('YOU DID THE RIGHT CHOICE!'); // FOR TESTING PURPOSES
        }else{
            res.status(200).send(false);
            console.log('APPLY NOW!'); // FOR TESTING PURPOSES
        }
    } catch(error){
        console.error('Error fetching application: ', error);
        res.status(500).json({message: 'Internal Server Error'})
    }
});

// FETCH APPLICATIONS OF A USER

router.get('/', async (req, res) => {

  try {

    const application = await Application.findAll({
      where: {
        email: getEmail(),
      },
      order: [['applied_at', 'DESC']]
    });

    if (!application){
      return res.status(404).json({ message: 'Application not found' })
    }
    res.status(200).send(application);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({message:'Internal Server Error'});
  }
});

// EDIT APPLICATION STATUS
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const status = req.body.status;

  try {
   const app = await Application.findOne({ where: { 'id' : id } });

   if (!app) { return res.status(404).json({message:'Application not found'}); }

   await Application.update({ status }, { where: { 'id' : id } });
   const message = `Successfully changed application status of app_id: "${id}" to: "${status}"`;
   res.status(200).json({ message: message});
   await LogAction(message);
  } catch (error) {
    console.error('Error updating application:', error);
    next(error);
  }
});

// DELETE APPLICATION
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const app = await Application.findOne({ where: { "id" : id } });

    if(!app){ return res.status(404).json({message:'Application not found!'}); }

    await Application.destroy({ where: { id } });
    const message = `Successfully deleted application with app_id: "${id}"`
    res.status(200).json({ message: message });
    await LogAction(message);
  } catch (error) {
    console.error('Error deleting application:', error);
    next(error);
  }
});

export default router;