import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export default async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) { return res.status(401).json({ message: 'Invalid token' }); }
}