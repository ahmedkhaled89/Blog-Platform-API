import express from 'express';
import { postsRoutes } from './routes/PostsRoutes.js';
import mongoose from 'mongoose';
import { usersRouter } from './routes/usersRouter.js';

const app = express();

app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRouter);

mongoose
  .connect('mongodb://localhost:27017', { dbName: 'demo_db' })
  .then(() => {
    console.log('mongoDB connected successfully');
    app.listen(4000, () => {
      console.log('express app');
    });
  })
  .catch((err) => console.log(err));
