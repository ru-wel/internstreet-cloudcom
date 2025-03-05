import express from 'express';
import Job from '../models/Job.js'

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).send(jobs);
  } catch (error) {
    console.error('Error fetching jobs: ', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

export default router;