import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
  fullName: {
    type: String,
    required: true
  },
  role: {
    enum: ['admin', 'developer', 'tester', 'user'],
    default: 'user',
  },
  avatar: {
    type: String
  }
});

const User = models.User || model('User', userSchema);

export default User;