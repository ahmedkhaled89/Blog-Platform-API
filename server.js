import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('mongoDB connected successfully');
    app.listen(4000, () => {
      console.log('express app');
    });
  })
  .catch((err) => console.log(err));
