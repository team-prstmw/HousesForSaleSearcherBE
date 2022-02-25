import User from '../models/user';
import { registerValidation, loginValidation } from '../routes/user/validation';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import res from 'express/lib/response';

export const createUser = async (data, response) => {
  const { error } = registerValidation(data);
  if (error) return response.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const emailExist = await User.findOne({ email: data.email });
  if (emailExist) return response.status(StatusCodes.BAD_REQUEST).send('Email already exists');

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = new User({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phoneNr: data.phoneNr,
  });
  try {
    const savedUser = await user.save();
    response.send(savedUser);
  } catch (err) {
    response.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

export const userLogin = async (data, response) => {
  const { error } = loginValidation(data);
  if (error) return response.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await User.findOne({ email: data.email });
  if (!user) return response.status(StatusCodes.BAD_REQUEST).send('Email or password is wrong');

  const validPass = await bcrypt.compare(data.password, user.password);
  if (!validPass) return response.status(StatusCodes.BAD_REQUEST).send('Email or password is wrong');

  const token = jsonwebtoken.sign({_id:  user._id}, process.env.TOKEN_SECRET)
  response.header('auth-token', token);

  response.send(`Wiatm ${user.name}!`);
};
