import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from '../controllers/postsController.js';

const router = express.Router();

//  Get All Posts Route
router.get('/', getAllPosts);

//  Create New Post Route
router.post('/', createPost);

//  Delete Post Route
router.delete('/:id', deletePost);

//  Update Post Route
router.put('/:id', updatePost);

export { router as postsRoutes };
