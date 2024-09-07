import express from 'express';
import { loginUser, registerUser } from '../controllers/usersController.js';
const router = express.Router();
// register user route
router.post('/', registerUser);

// login user route
router.post('/login', loginUser);

export { router as usersRouter };
