import express from 'express';
import User from '../models/User.js';
import { checkPassword, hashPassword } from '../utils/password.js';
import { LogAction } from '../utils/logger.js';
import { sequelize } from '../config/db_config.js';
import { requireUser, requireAdmin } from '../middleware/auth.js';

// Students may only read or edit their own profile; admins may access any
const isSelfOrAdmin = (req) => req.user.role === 'admin' || String(req.user.id) === String(req.params.id);

// Locks every admin row for the transaction and returns how many admins there are.
// The lock makes two admins removing each other at the same moment run one after
// the other, so the second sees the first's change and the last admin always stays.
const lockAdmins = async (transaction) =>
    (await User.findAll({ where: { user_role: 'admin' }, attributes: ['id'], lock: transaction.LOCK.UPDATE, transaction })).length;

const app = express();
app.use(express.json());

const router = express.Router();

// FETCH USERS
router.get('/', requireAdmin, async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        users.sort((a, b) => b.id - a.id); // sort by id
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// FETCH USER
router.get('/:id', requireUser, async (req, res) => {
    if (!isSelfOrAdmin(req)) return res.status(403).json({ message: "You can't view this profile." });
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
router.put('/profile/:id', requireUser, async (req, res, next) => {
    if (!isSelfOrAdmin(req)) return res.status(403).json({ message: "You can't edit this profile." });
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
        await LogAction(req, message);
    
        const updateUser = await User.findOne({ where: { 'id' : id }, attributes: { exclude: ['password'] } });
        res.status(200).json({ message: 'Profile updated successfully!', updateUser });
      } catch (error) {
        // Name/email rules live in the User model
        if (error.name === 'SequelizeValidationError') return res.status(400).json({ message: error.errors[0].message });
        if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'Email already exists!' });
        console.error('Error updating user:', error);
        next(error);
      }
});

// DELETE USER
router.delete('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  if (String(req.user.id) === String(id)) {
    return res.status(400).json({ message: "You can't delete your own account." });
  }
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const admins = await lockAdmins(transaction);
      const user = await User.findByPk(id, { transaction });
      if (!user) return { status: 404, message: 'User not found!' };
      if (user.user_role === 'admin' && admins <= 1) return { status: 409, message: "You can't remove the last admin." };

      await user.destroy({ transaction });
      return { status: 200, message: `Successfully deleted User: "${user.email}"` };
    });
    res.status(result.status).json({ message: result.message });
    if (result.status === 200) await LogAction(req, result.message);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// ADD ADMIN USER
router.post('/add', requireAdmin, async (req, res) => {
  const { name, email, password } = req.body;
  const user_role = "admin";
  const passwordError = checkPassword(password);
  if (passwordError) return res.status(400).json({ message: passwordError });

  try {
    const newUser = await User.create({
        name: name, 
        email: email,
        password: await hashPassword(password), 
        user_role: user_role 
    });
    const message = `Successfully added Admin User: "${email}"`;
    res.status(201).json({ message: message, newUser: { id: newUser.id, name: newUser.name, email: newUser.email, user_role: newUser.user_role } });
    await LogAction(req, message);
  } catch (error) {
    console.error("Error registering admin user:", error);

    if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Email already exists!' });
    } 
    else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.errors[0].message });
    } 
    else {
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  }
})

// EDIT USER ROLE
router.put('/role/:id', requireAdmin, async (req, res, next) => {
  const { id, } = req.params;
  const user_role = req.body.user_role;
  if (!['user', 'admin'].includes(user_role)) {
    return res.status(400).json({ message: 'Role must be "user" or "admin".' });
  }
  if (String(req.user.id) === String(id) && user_role !== 'admin') {
    return res.status(400).json({ message: "You can't remove your own admin role." });
  }

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const admins = await lockAdmins(transaction);
      const user = await User.findByPk(id, { transaction });
      if (!user) return { status: 404, message: 'User not found' };
      if (user.user_role === 'admin' && user_role !== 'admin' && admins <= 1) {
        return { status: 409, message: "You can't remove the last admin." };
      }

      await user.update({ user_role }, { transaction });
      return { status: 200, message: `Successfully changed user "${user.email}" to role: ${user_role}` };
    });
    if (result.status === 200) await LogAction(req, result.message);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error('Error updating user:', error);
    next(error);
  }
});

export default router;