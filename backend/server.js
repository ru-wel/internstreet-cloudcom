import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ROUTES IMPORT
import jobsRoute from './routes/jobs.js';
import applyRoute from './routes/apply.js';
import usersRoute from './routes/users.js';
import logsRoute from './routes/logs.js';
import loginRoute from './routes/login.js';
import registerRoute from './routes/register.js';
import authRoute from './routes/auth.js';
import utilsRoute from './routes/utils.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['https://internstreetph.site', 'https://www.internstreetph.site', 'http://localhost:3000', 'http://localhost:5173'],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  exposedHeaders: ['Content-Disposition'],
}));

// app.use(cors());
app.use(express.json());

// ROUTES (under /api: Vercel routes /api/* to this service with the prefix kept)
app.use('/api/jobs', jobsRoute);
app.use('/api/apply-job', applyRoute);
app.use('/api/users', usersRoute);
app.use('/api/logs', logsRoute);
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/validate-token', authRoute);
app.use('/api/utils', utilsRoute);
app.use('/api/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("It's not you, it's us!");
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});