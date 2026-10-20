import express from 'express';
import { requireUser } from '../middleware/auth.js';

const router = express.Router();

// Lets the frontend confirm a stored token is still good and get the user's current role
router.post('/', requireUser, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;
