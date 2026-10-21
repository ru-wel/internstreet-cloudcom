import express from 'express';
import User from '../models/User.js';
import Application from '../models/Application.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { deleteFiles } from '../config/storage.js';
import { LogAction } from '../utils/logger.js';

const app = express();
app.use(express.json());

const router = express.Router();

const DAY_MS = 24 * 60 * 60 * 1000;

const signToken = (user) => jwt.sign(
  { id: user.id, email: user.email, role: user.user_role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) { return res.status(400).json({message: 'All fields are required!'}); }

    const user = await User.findOne({ where: { email: email } });

    // Demo accounts have no real password; they use /login/demo
    if (!user || user.is_demo) { return res.status(401).json({message:'Incorrect password or email!'}); }

    if (!await bcrypt.compare(password, user.password) ){ return res.status(401).json({message:'Incorrect password or email!'}); }

    const token = signToken(user);
    res.header('Authorization', `Bearer ${token}`)
    res.json({ token });

    await LogAction(req, "Has logged in", user.email);

  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error'});
  }
});

// Every visitor shares the demo student, so earlier visitors' applications would mark
// jobs as "already applied" for good. Clear the ones older than a day.
const clearOldDemoApplications = async (userId) => {
  const old = await Application.findAll({ where: { user_id: userId, applied_at: { [Op.lt]: new Date(Date.now() - DAY_MS) } } });
  if (!old.length) return;
  // Files first: if storage fails, the rows stay and the next demo login retries
  await deleteFiles(old.flatMap((application) => [application.resume, application.cover_letter]));
  await Application.destroy({ where: { id: old.map((application) => application.id) } });
};

// One-click login for the "Try the demo" buttons on the login page
router.post('/demo', async (req, res) => {
  try {
    if (req.body.role !== 'student') { return res.status(400).json({ message: 'Pick a demo account.' }); }

    const user = await User.findOne({ where: { is_demo: true, user_role: 'user' } });
    if (!user) { return res.status(503).json({ message: "The demo account isn't available right now." }); }

    // A failed cleanup shouldn't keep the visitor out
    await clearOldDemoApplications(user.id).catch((err) => console.error('Error clearing demo applications:', err));

    res.json({ token: signToken(user) });
    await LogAction(req, "Has logged in (demo)", user.email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
