import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
} from '../controllers/postsController.js';

const router = express.Router();

//  Get All Posts Route
router.get('/', getAllPosts);

//  Create New Post Route
router.post('/', createPost);

//  Create New Post Route
router.delete('/:postID', deletePost);

export { router as postsRoutes };
