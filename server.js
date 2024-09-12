import express from 'express';
import { postsRoutes } from './routes/postsRoutes.js';
import mongoose from 'mongoose';
import { usersRouter } from './routes/usersRouter.js';
import 'dotenv/config.js';

const app = express();

app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRouter);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;
mongoose
  .connect(MONGO_URL, { dbName: 'demo_db' })
  .then(() => {
    console.log('mongoDB connected successfully');
    app.listen(PORT, () => {
      console.log('express app');
    });
  })
  .catch((err) => console.log(err));
