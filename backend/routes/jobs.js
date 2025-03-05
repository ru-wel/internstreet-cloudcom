import express from 'express';
import Job from '../models/Job.js';
import jwt from 'jsonwebtoken';

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

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).send(jobs);
  } catch (error) {
    console.error('Error fetching jobs: ', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

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

export default router;