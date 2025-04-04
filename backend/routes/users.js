import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { LogAction } from '../utils/logger.js';

const app = express();
app.use(express.json());

const router = express.Router();

// FETCH USERS
router.get('/', async (req, res) => { 
    try {
        const users = await User.findAll();
        users.sort((a, b) => b.id - a.id); // sort by id
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// FETCH USER
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const filteredUser = {
        email: user.email,
        name: user.name,
        location: user.location,
        number: user.number,
        bio: user.bio,
      }
      res.status(200).send(filteredUser);
    } catch (error) {
      console.error('Error fetching user: ', error);
      res.status(500).json({message: 'Internal Server Error'});
    }
});


// EDIT PROFILE
router.put('/profile/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, email, location, number, bio } = req.body;
    
    try {
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const editData = {
          name: name !== undefined && name !== "" ? name : user.name,
          email: email !== undefined && email !== "" ? email : user.email,
          location: location !== undefined && location !== "" ? location : user.location,
          number: number !== undefined && number !== "" ? number : user.number,
          bio: bio !== undefined && bio !== "" ? bio : user.bio
        }

        await User.update(editData, { where: { 'id' : id } });
        const message = `Successfully edited User: "${editData.email}"`;
        await LogAction(message);
    
        const updateUser = await User.findOne({ where: { 'id' : id } });
        res.status(200).json({ message: 'Profile updated successfully!', updateUser });
      } catch (error) {
        console.error('Error updating user:', error);
        next(error);
      }
});

// EDIT USER
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, user_role } = req.body;
    
    try {
        const user = await User.findOne({ where: { 'id' : id } });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        await User.update(
          { name, email, password, user_role }, { where: { 'id' : id } }
        );
    
        const updateUser = await User.findOne({ where: { 'id' : id } });
        const message = `Successfully edited User: "${updateUser.email}"`;
        res.status(200).json({ message: message, updateUser});
        await LogAction(message);
      } catch (error) {
        console.error('Error updating user:', error);
        next(error);
      }
});

// DELETE USER
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { "id" : id } });

    if (!user) return res.status(404).json({ message: 'User not found!'});

    await User.destroy({ where: { id } });
    const message = `Successfully deleted User: "${user.email}"`;
    res.status(200).json({ message: message });
    await LogAction(message);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// ADD ADMIN USER
router.post('/add', async (req, res) => {
  const { name, email, password } = req.body;
  const user_role = "admin";

  try {
    const newUser = await User.create({
        name: name, 
        email: email,
        password: await hashPassword(password), 
        user_role: user_role 
    });
    const message = `Successfully added Admin User: "${email}"`;
    res.status(201).json({ message: message, newUser: newUser });
    await LogAction(message);
  } catch (error) {
    console.error("Error registering admin user:", error);

    if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Email already exists!' });
    } 
    else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: 'Validation error: Check your inputs.' });
    } 
    else {
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  }
})

// EDIT USER ROLE
router.put('/role/:id', async (req, res, next) => {
  const { id, } = req.params;
  const user_role = req.body.user_role;

  try {
    const user = await User.findOne({ where: { 'id' : id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.update({ user_role }, { where: { 'id' : id } });
    const message = `Successfully changed user "${user.email}" to role: ${user_role}`;
    await LogAction(message);
    res.status(200).json({ message: message});
  } catch (error) {
    console.error('Error updating user:', error);
    next(error);
  }
});

// HASH PASSWORD FUNCTION
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