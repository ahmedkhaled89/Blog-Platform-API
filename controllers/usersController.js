import { User } from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

// ******************* Creating Token *******************
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

// ******************* Register User *******************
export const registerUser = async (req, res) => {
  // Grab Data from req body
  const { email, password } = req.body;

  // Check the field are not empty
  if (!email.trim() || !password.trim()) {
    return res
      .status(400)
      .json({ status: 'FAIL', msg: 'All fields are required' });
  }

  // Check if email already exist
  const exist = await User.findOne({ email });
  if (exist) {
    return res
      .status(400)
      .json({ status: 'FAIL', msg: 'user with the same email already exist' });
  }
  // Hash the password
  const salt = await bcryptjs.genSalt();
  const hashed = await bcryptjs.hash(password, salt);
  try {
    // Register the user
    const user = await User.create({ email, password: hashed });
    // Generate the JWT
    const token = createToken(user._id, process.env.SECRET);
    // sending the response
    res.status(201).json({ status: 'SUCCESS', data: { email, token } });
  } catch (error) {
    res.status(500).json({ status: 'FAIL', error: error.message });
  }
};

// ******************* Login *******************
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check the field are not empty
  if (!email.trim() || !password.trim()) {
    return res
      .status(400)
      .json({ status: 'FAIL', msg: 'All fields are required' });
  }

  // Check if email already exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ status: 'FAIL', msg: 'Incorrect Email' });
  }

  //Check password
  const match = await bcryptjs.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ status: 'FAIL', msg: 'Incorrect password' });
  }

  try {
    // Generate the JWT
    const token = createToken(user._id, process.env.SECRET);
    // sending the response
    res.status(201).json({ status: 'SUCCESS', data: { email, token } });
  } catch (error) {
    res.status(500).json({ status: 'FAIL', error: error.message });
  }
};
