import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ROUTES IMPORT
import jobsRoute from './routes/jobs.js';
import usersRoute from './routes/users.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ------ TO BE ADDED WITH FRONTEND INIT ------ //

// app.use(cors({
//   origin: '',
//   methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
//   exposedHeaders: ['Content-Disposition'],
// }));

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/jobs', jobsRoute);
app.use('/users', usersRoute);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("It's not you, it's us!");
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});