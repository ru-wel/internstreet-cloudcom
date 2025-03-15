import express from 'express';
import { LogAction } from '../utils/logger.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { getEmail } from './login.js';
import multer from 'multer';

Application.belongsTo(Job, { foreignKey: 'job_id' });
Job.hasMany(Application, { foreignKey: 'job_id' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
  
const upload = multer({ storage });
const app = express();
app.use(express.json());

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const applications = await Application.findAll();
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
        const { email, c_name, c_location, c_position, job_id, name, } = req.body;
        console.log(req.body);
    
        const apply = await Application.create({ // TO BE ADDED - JOB ID
            email: email,
            c_name: c_name,
            c_location: c_location,
            c_position: c_position,
            resume: resume.originalname,
            cover_letter: cover.originalname,
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


export default router;