import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'developer', 'tester', 'user'],
    default: 'user',
  },
  avatar: {
    type: String
  }
});

const User = models.User || model('User', UserSchema);

export default User;