import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Checks the login token ("Authorization: Bearer <token>") and puts the user on
// req.user as { id, email, role, demo }. The role is read from the database, not the token,
// so deleting or demoting a user takes effect on their next request.
export async function requireUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Please log in.' });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
  }

  try {
    const user = await User.findByPk(payload.id, { attributes: ['id', 'email', 'user_role', 'is_demo'] });
    if (!user) return res.status(401).json({ message: 'This account no longer exists.' });
    req.user = { id: user.id, email: user.email, role: user.user_role, demo: user.is_demo };
    next();
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export function requireAdmin(req, res, next) {
  requireUser(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admins can do that.' });
    next();
  });
}
