import express from 'express';
import { LogAction } from '../utils/logger.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { requireUser, requireAdmin } from '../middleware/auth.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3, BUCKET, deleteFiles } from '../config/storage.js';

Application.belongsTo(Job, { foreignKey: 'job_id' });
Job.hasMany(Application, { foreignKey: 'job_id' });

const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

// Files stay in memory and go straight to the Neon bucket (Vercel's disk is read-only)
const upload = multer({
    storage: multer.memoryStorage(),
    // One resume + one cover letter and a few short text fields; caps memory use per request.
    // The 4 MB combined limit (Vercel rejects bodies over 4.5 MB) is checked in the route.
    limits: { fileSize: MAX_TOTAL_BYTES, files: 2, fields: 10, fieldSize: 4 * 1024 },
    // Skips anything that isn't PDF/DOC/DOCX; the route then reports it as missing
    fileFilter: (req, file, cb) => cb(null, /\.(pdf|docx?)$/i.test(file.originalname)),
});
const uploadFiles = upload.fields([{ name: "resume", maxCount: 1 }, { name: "cover", maxCount: 1 }]);

// Saves the file to the bucket and returns its key, which is what the database stores.
// The key has no slashes so it fits the /utils/download/:id/:filename route.
const saveFile = async (file) => {
    const key = `${Date.now()}-${uuidv4()}${file.originalname.replace(/[^\w.-]/g, '_')}`;
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: file.buffer, ContentType: file.mimetype }));
    return key;
};

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/all', requireAdmin, async (req, res) => {
  try {
    const applications = await Application.findAll();
    applications.sort((a, b) => b.id - a.id); // sort by id
    res.status(200).send(applications);
  } catch (error) {
    console.error('Error fetching applications: ', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// APPLY JOB FOR APPLICATION PAGE

router.post('/', requireUser, (req, res, next) => {
    uploadFiles(req, res, (err) => {
        if (err?.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ message: 'Keep both files under 4 MB combined.' });
        if (err?.code === 'LIMIT_FIELD_VALUE') return res.status(400).json({ message: 'A form field is too long.' });
        if (err instanceof multer.MulterError) return res.status(400).json({ message: 'Send one resume and one cover letter.' });
        if (err) return next(err);
        next();
    });
}, async (req, res) => {

    let keys = [];
    try{
        const resume = req.files?.["resume"] ? req.files["resume"][0] : null;
        const cover = req.files?.["cover"] ? req.files["cover"][0] : null;
        if (!resume || !cover) {
            return res.status(400).json({ message: 'Attach a resume and a cover letter as PDF, DOC or DOCX files.' });
        }
        if (resume.size + cover.size > MAX_TOTAL_BYTES) {
            return res.status(400).json({ message: 'Keep both files under 4 MB combined.' });
        }
    
        // Job details come from the job record and the name/email from the account, never the form
        const job = Number.isInteger(Number(req.body.job_id)) ? await Job.findByPk(req.body.job_id) : null;
        if (!job) {
            return res.status(400).json({ message: 'This job no longer exists.' });
        }
        if (await Application.findOne({ where: { user_id: req.user.id, job_id: job.id } })) {
            return res.status(409).json({ message: "You've already applied to this job." });
        }
        const { name, email } = await User.findByPk(req.user.id);

        // Record each key as soon as it's uploaded so a later failure can clean it up
        keys.push(await saveFile(resume));
        keys.push(await saveFile(cover));
    
        const apply = await Application.create({
            email: email,
            user_id: req.user.id,
            c_name: job.company,
            c_location: job.location,
            c_position: job.title,
            c_logo: job.logo,
            resume: keys[0],
            cover_letter: keys[1],
            status: "pending",
            job_id: job.id,
            name: name,
        })
        keys = []; // saved, so the files belong to the application now
        const message = `Has successfully applied to "${job.company}" as a "${job.title}"`;

        res.status(201).json({ message: message, apply});
        // The response is already sent; a failed log entry (e.g. IP lookup) must not crash the server
        await LogAction(req, message);
    } catch(error){
        console.error("Error applying job:", error);
        // Don't leave files behind for an application that wasn't saved
        if (keys.length) await deleteFiles(keys).catch((err) => console.error('Error removing files:', err));
        // Two submissions at once both pass the check above; the database constraint stops the second
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "You've already applied to this job." });
        }
        res.status(500).json({ message: 'Error while applying'});
    }
});

// CHECK IF CLIENT HAS ALREADY APPLIED FOR THAT JOB
router.get('/job/:jobId', requireUser, async (req, res) => {
    try {
        const application = await Application.findOne({
            where: {
                user_id: req.user.id,
                job_id: req.params.jobId,
            }
        });
        if(application){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
    } catch(error){
        console.error('Error fetching application: ', error);
        res.status(500).json({message: 'Internal Server Error'})
    }
});

// FETCH APPLICATIONS OF A USER
router.get('/', requireUser, async (req, res) => {

  try {

    const application = await Application.findAll({
      where: {
        user_id: req.user.id,
      },
      // The profile page doesn't use the file keys, and they hold the original file names
      attributes: { exclude: ['resume', 'cover_letter'] },
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
router.put('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  const status = req.body.status;
  if (!['pending', 'approved', 'denied'].includes(status)) {
    return res.status(400).json({ message: 'Status must be "pending", "approved" or "denied".' });
  }

  try {
   const app = await Application.findOne({ where: { 'id' : id } });

   if (!app) { return res.status(404).json({message:'Application not found'}); }

   await Application.update({ status }, { where: { 'id' : id } });
   const message = `Successfully changed application status of app_id: "${id}" to: "${status}"`;
   res.status(200).json({ message: message});
   await LogAction(req, message);
  } catch (error) {
    console.error('Error updating application:', error);
    next(error);
  }
});

// DELETE APPLICATION
router.delete('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const app = await Application.findOne({ where: { "id" : id } });

    if(!app){ return res.status(404).json({message:'Application not found!'}); }

    // Files first: if storage fails, the row stays so the delete can be retried
    await deleteFiles([app.resume, app.cover_letter]);
    await Application.destroy({ where: { id } });
    const message = `Successfully deleted application with app_id: "${id}"`
    res.status(200).json({ message: message });
    await LogAction(req, message);
  } catch (error) {
    console.error('Error deleting application:', error);
    next(error);
  }
});

export default router;