import express from 'express';
import User from '../models/User.js';
import { LogAction } from '../utils/logger.js';

const app = express();
app.use(express.json());

const router = express.Router();

// FETCH USERS
router.get('/', async (req, res) => { 
    try {
        const users = await User.findAll();
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
        // ADD MORE FIELDS LATER
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
    const { name } = req.body; // ADD MORE FIELDS LATER
    
    try {
        const user = await User.findOne({ where: { 'id' : id } });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        await User.update(
          { name }, { where: { 'id' : id } } // ADD MORE FIELDS LATER
        );
    
        const updateUser = await User.findOne({ where: { 'id' : id } });
        res.status(200).json({ message: 'Profile updated successfully!', updateUser });
      } catch (error) {
        console.error('Error updating user:', error);
        next(error);
      }
});

// FOR TESTING PURPOSE - APPLY JOB
router.put('/applyjob/:id', async (req, res, next) => {
  const { id } = req.params;
  const { location, number } = req.body; // ADD MORE FIELDS LATER
  console.log('BODY: ',req.body)
  
  try {
      const user = await User.findOne({ where: { 'id' : id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await User.update(
        { location, number }, { where: { 'id' : id } } // ADD MORE FIELDS LATER
      );
      console.log(location, number);
  
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
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { "id" : id } });

        if (!user) return res.status(404).json({ message: 'User not found!'});

        await User.destroy({ where: { "id" : id } });
        const message = `Successfully deleted User: "${user.email}"`;
        res.status(200).json({ message: message });
        await LogAction(message);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// ADD USER
router.post('/add', async (req, res, next) => {
  const { name, email, password } = req.body;
  const user_role = "user";

  try {
    const newUser = await User.create({
        name: name, 
        email: email,
        password: password, 
        user_role: user_role 
    });
    const message = `Successfully added User: "${email}"`;
    res.status(201).json({ message: message, newUser });
    await LogAction(message);
    } catch (error) {
      console.error("Error registering user:", error);

      if (error.email === 'SequelizeUniqueConstraintError') {
          res.status(400).json({ message: 'Email already exists!' });
      } 
      else if (error.newUser === 'SequelizeValidationError') {
          res.status(400).json({ message: 'Validation error: Check your inputs.' });
      } 
      else {
          res.status(500).json({ message: 'Internal server error. Please try again later.' });
      }
    }

})

export default router;