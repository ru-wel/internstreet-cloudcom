import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { LogAction } from '../utils/logger.js';

const app = express();
app.use(express.json());

let userToken = null;
let userId = null;
let userEmail = null;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) { return res.status(400).json({message: 'All fields are required!'}); }

    const user = await User.findOne({ where: { email: email } });

    if (!user) { return res.status(401).json({message:'Incorrect password or email!'}); }

    if (!await bcrypt.compare(password, user.password) ){ return res.status(401).json({message:'Incorrect password or email!'}); }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.user_role,
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.header('Authorization', `Bearer ${token}`)
    res.json({ token });

    userToken = token;
    userEmail = user.email;
    userId = user.id;

    console.log('Logged In Successfully!');
    LogAction("Has logged in");

  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error'});
  }
});

export const getToken = () => userToken;
export const getEmail = () => userEmail;
export const getUserId = () => userId;
export default router;