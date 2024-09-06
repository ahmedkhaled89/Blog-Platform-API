import express from 'express';
import { createPost, getAllPosts } from '../controllers/postsController.js';

const router = express.Router();

// ******************* Get All Posts *******************
router.get('/', getAllPosts);

// ******************* Create New Post *******************
router.post('/', createPost);

export { router as postsRoutes };
