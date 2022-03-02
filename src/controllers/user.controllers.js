import User from '../models/user';
import { registerValidation, loginValidation } from '../routes/user/validation';
import bcrypt from 'bcryptjs';

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

  return `Witam ${user.name}!`;
};
