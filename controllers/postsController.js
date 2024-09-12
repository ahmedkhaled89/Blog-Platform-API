import mongoose from 'mongoose';
import Post from '../models/PostsModel.js';
import { User } from '../models/UserModel.js';

// ******************* Get All Posts *******************
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: 'desc' });
    if (!posts) {
      return res.status(404).json({ status: 'FAIL', msg: 'No Posts' });
    }
    res.status(200).json({ status: 'SUCCESS', data: { posts } });
  } catch (error) {
    return res.status(500).json({ status: 'FAIL', error: error.message });
  }
};

// ******************* Get User Posts *******************
export const getUserPosts = async (req, res) => {
  // Grab authenticated user form req body
  const user = await User.findById(req.user._id);

  try {
    const userPosts = await Post.find({ user: user._id }).sort({
      createdAt: 'desc',
    });
    if (!userPosts) {
      return res.status(404).json({ status: 'FAIL', msg: 'No Posts' });
    }
    res
      .status(200)
      .json({ status: 'SUCCESS', data: { userPosts, email: user.email } });
  } catch (error) {
    return res.status(500).json({ status: 'FAIL', error: error.message });
  }
};
// ******************* Create New Post *******************
export const createPost = async (req, res) => {
  // Grab Data
  const { title, body } = req.body;

  // Validate Date
  if (!title.trim() || !body.trim()) {
    return res
      .status(400)
      .json({ status: 'FAIL', error: 'All Fields are Required' });
  }
  // Grab user id
  const user = await User.findById(req.user._id);

  try {
    const post = await Post.create({ user: user._id, title, body });
    res.status(201).json({ status: 'SUCCESSES', data: { post } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ******************* Delete Post *******************
export const deletePost = async (req, res) => {
  const id = req.params.id;

  // Check Id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 'FAIL', msg: 'INVALID ID' });
  }

  // Check the post exist
  const post = await Post.findById(id);
  if (!post) {
    return res.status(400).json({ status: 'FAIL', msg: 'post does not exist' });
  }
  // Check if user owns the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ status: 'FAIL', msg: 'Not authorized' });
  }
  try {
    await post.deleteOne();
    res.status(200).json({ status: 'SUCCESS', msg: 'Post was deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ******************* Update Post *******************
export const updatePost = async (req, res) => {
  const id = req.params.id;
  // Check Id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 'FAIL', msg: 'INVALID ID' });
  }

  // Check the post exist
  const post = await Post.findById(id);
  if (!post) {
    return res.status(400).json({ status: 'FAIL', msg: 'post does not exist' });
  }

  // Grab Data
  const { title, body } = req.body;

  // Validate Date
  if (!title.trim() || !body.trim()) {
    return res
      .status(400)
      .json({ status: 'FAIL', error: 'All Fields are Required' });
  }

  // Check if user owns the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ status: 'FAIL', msg: 'Not authorized' });
  }

  try {
    await post.updateOne({ title, body });
    res.status(200).json({ status: 'SUCCESS', msg: 'Post was Updated', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
