import User from '../models/user';
import { registerValidation, loginValidation, editValidation, passwdEditValidation } from '../routes/user/validation';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import userUpdated from '../services/userUpdated';

export const createUser = async (data) => {
  const { error } = registerValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(data.password, salt);
  try {
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
    });

    return user;
  } catch (err) {
    return { status: 'invalid', message: 'Email already exists', err };
  }
};

export const userLogin = async (data) => {
  const { error } = loginValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const user = await User.findOne({ email: data.email });
  if (!user) return { status: 'invalid', message: 'Email or password is wrong' };

  const validPass = await bcrypt.compare(data.password, user.password);
  if (!validPass) return { status: 'invalid', message: 'Email or password is wrong' };

  const token = jsonwebtoken.sign({_id: user._id}, process.env.TOKEN_SECRET)
  const header = ('auth-token', token);

  return `Witam ${user.name}!`;
};

export const userEdit = async (data, id) => {
  const { error } = editValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  return userUpdated(data, id);
};

export const passwdEdit = async (data, id) => {
  const { error } = passwdEditValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const user = await User.findOne({ _id: id.id });
  if (!user) return { status: 'invalid', message: 'User not found.' };

  const validOldPass = await bcrypt.compare(data.password, user.password);
  if (!validOldPass) return { status: 'invalid', message: 'Old password is wrong.' };
  
  if (!(data.newPassword == data.newPasswordRepeat)) return { status: 'invalid', message: 'The passwords do not match.' };

  const difOldNewPass = await bcrypt.compare(data.newPasswordRepeat, user.password);
  if (difOldNewPass) return { status: 'invalid', message: 'The old password and the new password must be different.' };

  data.password = data.newPasswordRepeat;
  
  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);

  return userUpdated(data, id);
};
