import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  updatePost,
} from '../controllers/postsController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

//  Get All Posts Route
router.get('/', getAllPosts);

//  Get User Posts Route
router.get('/user', auth, getUserPosts);

//  Create New Post Route
router.post('/', auth, createPost);

//  Delete Post Route
router.delete('/:id', auth, deletePost);

//  Update Post Route
router.put('/:id', auth, updatePost);

export { router as postsRoutes };
