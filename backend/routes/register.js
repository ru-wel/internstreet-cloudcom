import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user_role = 'user';

  console.log({
    name: name,
    email: email,
    password: password,
    user_role: user_role,
  }); // ----- FOR DEBUGGING PURPOSES ------

  try {
    await User.create({
      name: name,
      email: email,
      password: await hashPassword(password),
      user_role: user_role,
    });
    res.status(201).json({message:'User has been registered successfully!'});
  } catch (error) {
    console.error('Error registering user: ', error);

    if (error.name === 'SequelizeUniqueConstraintError'){
      res.status(400).json({message:'Email already exists! Try logging in.'});
    } else if (error.name === 'SequelizeValidationError'){
      res.status(400).json({message:'Validatio error: Check your inputs.'});
    } else {
      res.status(500).json({message:'Internal server error. Please try again later.'});
    }
  }
});

async function hashPassword(password){
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password: ', error);
  }
}

export default router;