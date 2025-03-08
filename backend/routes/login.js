import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password); // ----- REMOVE ------

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
      process.env.JWT_SECRET || 'internstreetcloudcomputing',
      { expiresIn: '1h' }
    );

    res.header('Authorization', `Bearer ${token}`)
    res.json({ token });

    console.log('Logged In Successfully!');

  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error'});
  }
});

export default router;