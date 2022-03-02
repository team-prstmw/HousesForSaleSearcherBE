import User from '../models/user';
import { registerValidation, loginValidation, editValidation, passwdEditValidation } from '../routes/user/validation';
import bcrypt from 'bcryptjs';
import updateUser from '../utils/updateUser';
import jsonwebtoken from 'jsonwebtoken';

export const createUser = async (data) => {
  const { error } = registerValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const salt = await bcrypt.genSalt(10);
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

export const userEdit = async (req) => {
  const { error } = editValidation(req.body);
  if (error) return { status: 'invalid', message: error.details[0].message };

  updateUser(req);

  return { message: 'User updated' };
};

export const passwdEdit = async (req) => {
  const { error } = passwdEditValidation(req.body);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const user = await User.findOne({ _id: req.params.id });
  if (!user) return { status: 'invalid', message: 'User not found.' };

  const validOldPass = await bcrypt.compare(req.body.password, user.password);
  if (!validOldPass) return { status: 'invalid', message: 'Old password is wrong.' };
  
  if (!(req.body.newPassword == req.body.newPasswordRepeat)) return { status: 'invalid', message: 'The passwords do not match.' };

  const difOldNewPass = await bcrypt.compare(req.body.newPasswordRepeat, user.password);
  if (difOldNewPass) return { status: 'invalid', message: 'The old password and the new password must be different.' };

  req.body.password = req.body.newPasswordRepeat;
  
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  updateUser(req);

  return { message: 'Password updated' };
};
