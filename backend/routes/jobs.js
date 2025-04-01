import express from 'express';
import Job from '../models/Job.js';
import jwt from 'jsonwebtoken';
import { LogAction } from '../utils/logger.js';

const app = express();
app.use(express.json());

const router = express.Router();

// FETCH JOBS
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll();
    jobs.sort((a, b) => b.id - a.id); // sort by id
    res.status(200).send(jobs);
  } catch (error) {
    console.error('Error fetching jobs: ', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// FETCH JOB
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).send(job);
  } catch (error) {
    console.error('Error fetching job: ', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// EDIT JOB
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, company, location, details, logo } = req.body;
  const updates = {};
  
  try {
    const job = await Job.findOne({ where: { 'id' : id } });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // check kung anong edits yung ginawa sa job tapos ipasok sa updates = {}
    if (title && title !== job.title) updates.title = title;
    if (company && company !== job.company) updates.company = company;
    if (location && location !== job.location) updates.location = location;
    if (details && JSON.stringify(details) !== JSON.stringify(job.details)) updates.details = details;
    if (logo && logo !== job.logo) updates.logo = logo;

    // check if may laman yung updates = {}
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No changes detected' });
    }

    await Job.update(updates, { where: { id } });

    // kunin lahat yung fields na inedit. e.g. [title, company, location]
    const changedFields = Object.keys(updates).join(', ');
    const message = `Updated fields: ${changedFields} for Job "${job.title}"`;
    res.status(200).json({ message: message });
    await LogAction(message);
  } catch (error) {
    console.error('Error updating job:', error);
    next(error);
  }
});

// DELETE JOB
router.delete('/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const job = await Job.findOne({ where: { "id" : id } });

      if (!job) return res.status(404).json({ message: 'Job not found!'});

      await Job.destroy({ where: { "id" : id } });
      const message = `Successfully deleted Job: "${job.title}" from "${job.company}"`;
      res.status(200).json({ message: message });
      await LogAction(message);
  } catch (error) {
      console.error(error);
      return next(error);
  }
});

// ADD JOB
router.post('/add', async (req, res, next) => {
  const { title, company, location, details, logo } = req.body;

  try {
    const newJob = await Job.create({
      title: title, 
      company: company, 
      location: location,
      details: details,
      logo: logo
    });
    const message = `Successfully added Job: "${newJob.title}" from "${newJob.company}"`;
    res.status(201).json({ message: message, newJob });
    await LogAction(message);
    } catch (error) {
      console.error("Error registering job:", error);
      res.status(500).json({message: 'Internal Server Error'});
    }

})

export default router;