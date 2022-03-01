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

<<<<<<< HEAD
export const userEdit = async (request, response) => {
  const { error } = editValidation(request.body);
  if (error) return response.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await User.findOneAndUpdate(
    {
      _id: request.params.id,
    },
    request.body,
    { new: true }
  );
  if (!user) return response.status(StatusCodes.BAD_REQUEST).send({ message: 'User not found' });
  response.send(user);
};

export const userLogin = async (data, response) => {
=======
export const userLogin = async (data) => {
>>>>>>> a7d69d8d871d85ae70fdb02096b4870ed1b07e7f
  const { error } = loginValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const user = await User.findOne({ email: data.email });
  if (!user) return { status: 'invalid', message: 'Email or password is wrong' };

  const validPass = await bcrypt.compare(data.password, user.password);
  if (!validPass) return { status: 'invalid', message: 'Email or password is wrong' };

  return `Witam ${user.name}!`;
};
