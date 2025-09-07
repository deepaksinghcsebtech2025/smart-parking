import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

export async function register(req, res, next) {
  try {
    const { name, email, password, phone } = req.body;
    const user = await User.create({ name, email, password, phone });
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token });
  } catch (err) { next(err); }
}