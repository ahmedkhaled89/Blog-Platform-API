import express from 'express';
import Post from '../models/PostsModel.js';

const router = express.Router();

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
  console.log(newPost);
});

export { router as postsRoutes };
