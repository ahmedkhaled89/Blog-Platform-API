import express from 'express';
import Post from '../models/PostsModel.js';

const router = express.Router();

// ******************* Get All Posts *******************
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json({ status: 'FAIL', msg: 'No Posts' });
    }
    res.status(200).json({ status: 'SUCCESS', data: { posts } });
  } catch (error) {
    return res.status(500).json({ status: 'FAIL', error: error.message });
  }
});

// ******************* Create New Post *******************
router.post('/', async (req, res) => {
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
});

export { router as postsRoutes };
