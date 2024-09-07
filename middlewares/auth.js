import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import { User } from '../models/UserModel.js';

export const auth = async (req, res, next) => {
  // Check if the request headers contains authorization key
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ status: 'FAIL', msg: 'auth token not found' });
  }
  //  Grab the token
  const token = authorization.split(' ')[1];
  try {
    // Decode and extract user id
    const { _id } = jwt.verify(token, process.env.SECRET);
    // save user to request
    const user = await User.findById(_id).select('_id');
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message });
  }
};
