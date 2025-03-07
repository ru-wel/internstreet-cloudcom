import express from 'express';
import Job from '../models/Job.js';
import jwt from 'jsonwebtoken';
import { LogAction } from '../utils/logger.js';

const app = express();
app.use(express.json());

const router = express.Router();

// DUMMY LOGIN ROUTE
router.post('/login', async (req, res) => {
  const username = req.body.username;
  // const user = { name: username, role: 'admin' };
  const user = { name: username, role: 'user' };
  const accessToken = jwt.sign(user, 'internstreetcloudcomputing', { expiresIn: '1h' } );
  res.json({ accessToken: accessToken });
});

// DUMMY PROTECTED ROUTE ?
router.put('/:id', checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, 'internstreetcloudcomputing', (err, authorizedData) => {
      // if (authorizedData.role != 'admin'){
      //   console.log('Unauthorized user ', err);
      //   res.sendStatus(403);
      // }
      if (err || authorizedData.role != 'admin'){
        console.log('Could not connect to the protected route: ', err);
        res.sendStatus(403);
      } else {
        res.status(200).send('Accessed Succesfully');
      }
    });
  } catch (err) {
    console.error('Error editing job: ', err);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// DUMMY CHECK TOKEN FUNCTION
function checkToken (req, res, next) {
  const header = req.headers['authorization'];
  if (typeof header !== 'undefined'){
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};

// =======================================================================

// FETCH JOBS
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll();
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
  const { title, description, company, location } = req.body;
  
  try {
      const job = await Job.findOne({ where: { 'id' : id } });
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      await Job.update(
        { title, description, company, location }, { where: { 'id' : id } }
      );
  
      const updateJob = await Job.findOne({ where: { 'id' : id } });
      const message = `Successfully edited Job: "${updateJob.title}" from "${updateJob.company}"`;
      res.status(200).json({ message: message, updateJob });
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
  const { title, description, company, location } = req.body;

  try {
    const newJob = await Job.create({
        title: title, 
        description: description,
        company: company, 
        location: location 
    });
    const message = `Successfully added Job: "${newJob.title}" from "${newJob.company}"`;
    res.status(201).json({ message: message, newJob });
    await LogAction(message);
    } catch (error) {
      console.error("Error registering job:", error);

      // if (error.title === 'SequelizeUniqueConstraintError') {
      //     res.status(400).json({ message: 'Job already exists!' });
      // } 
      // else if (error.title === 'SequelizeValidationError') {
      //     res.status(400).json({ message: 'Validation error: Check your inputs.' });
      // } 
      // else {
      //     res.status(500).json({ message: 'Internal server error. Please try again later.' });
      // }
    }

})

export default router;