import mongoose from 'mongoose';
import Post from '../models/PostsModel.js';

// ******************* Get All Posts *******************
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json({ status: 'FAIL', msg: 'No Posts' });
    }
    res.status(200).json({ status: 'SUCCESS', data: { posts } });
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
  try {
    const post = await Post.create({ title, body });
    res.status(201).json({ status: 'SUCCESSES', data: { post } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ******************* Delete Post *******************
export const deletePost = async (req, res) => {
  const postID = req.params.postID;

  // Check Id is valid
  if (!mongoose.Types.ObjectId.isValid(postID)) {
    return res.status(400).json({ status: 'FAIL', msg: 'INVALID ID' });
  }

  // Check the post exist
  const post = await Post.findById(postID);
  if (!post) {
    return res.status(400).json({ status: 'FAIL', msg: 'post does not exist' });
  }

  try {
    await post.deleteOne();
    res.status(200).json({ status: 'SUCCESS', msg: 'Post was deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
