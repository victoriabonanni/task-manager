import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/user.model';

// Register input validation with Zod
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Same register input validation for login
const loginSchema = registerSchema;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Register new User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.format() });
    }

    const { email, password } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists, try another one' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return res.status(201).json({ message:'User registered successfully', userId: newUser._id });
  } catch (err) {
    return res.status(500).json({ error: 'Error during registration: Internal Server Error' });
  }
};

// Login existing User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.format() });
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials: User does not exist' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ message: 'User logged in successfully', token });
  } catch (err) {
    return res.status(500).json({ error: 'Error during login: Internal Server Error' });
  }
};