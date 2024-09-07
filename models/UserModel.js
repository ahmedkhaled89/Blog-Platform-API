import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
