import { USER_ACTIVE } from '../constants/userStatus';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    phone: {
      type: Number,
      required: true,
    },
    cash: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: USER_ACTIVE,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
