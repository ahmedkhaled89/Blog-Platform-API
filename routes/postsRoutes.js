import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from '../controllers/postsController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

//  Get All Posts Route
router.get('/', getAllPosts);

//  Create New Post Route
router.post('/', auth, createPost);

//  Delete Post Route
router.delete('/:id', auth, deletePost);

//  Update Post Route
router.put('/:id', auth, updatePost);

export { router as postsRoutes };
