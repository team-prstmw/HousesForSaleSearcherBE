import User from '../models/user';
import { registerValidation, loginValidation } from '../routes/user/validation';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

export const createUser = async (data, response) => {
  const { error } = registerValidation(data);
  if (error) return response.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const userExist = await User.findOne({ email: data.email });
  if (userExist && userExist.statusUser == 1)
    return response.status(StatusCodes.BAD_REQUEST).send('Email already exists');

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

  // const users = await User.find({ email: data.email });
  const users = await User.find({ email: 'HasloToTest123@gmail.com' }); // Dodano na czas testowania
  const activeUser = users.filter((user) => {
    if (user.statusUser == 1) {
      return user;
    }
  });

  if (!activeUser[0] || activeUser[0].statusUser == 0)
    return response.status(StatusCodes.BAD_REQUEST).send('Email or password is wrong');

  // const validPass = await bcrypt.compare(data.password, activeUser[0].password);
  const validPass = await bcrypt.compare('Test123', activeUser[0].password); // Dodano na czas testowania
  if (!validPass) return response.status(StatusCodes.BAD_REQUEST).send('Email or password is wrong');

  const token = jsonwebtoken.sign({ _id: activeUser[0]._id }, process.env.TOKEN_SECRET);

  response.cookie('auth', token, { maxAge: 900000, httpOnly: true });

  response.send(`Wiatm ${activeUser[0].name}!`);
};

export const userDeletion = async (request, response) => {
  const userExist = await User.findOne({ _id: request.params.id });

  if (!userExist || userExist.statusUser == 0) return response.status(StatusCodes.BAD_REQUEST).send({ message: 'User not found' });

  await User.findOneAndUpdate(
    {
      _id: request.params.id,
    },
    { statusUser: 0 },
    { new: true }
  );
  response.clearCookie('auth');
  response.send("Konto zostało usunięte");
};
