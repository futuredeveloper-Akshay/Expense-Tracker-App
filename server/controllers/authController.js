import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({ name, email, password });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ result: { id: newUser._id, name, email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: existingUser._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      result: { 
        id: existingUser._id, 
        name: existingUser.name, 
        email: existingUser.email 
      }, 
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};
