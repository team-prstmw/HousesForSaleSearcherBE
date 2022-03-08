import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import User from '../models/user';
import { editValidation, loginValidation, passwdEditValidation, registerValidation } from '../routes/user/validation';
import { getByIdAbstract } from '../services/dbMethods';
import userUpdated from '../services/userUpdated';

export const createUser = async (data) => {
  const { error } = registerValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const users = await User.find({ email: data.email });

  const userExist = users.filter((user) => {
    if (user.statusUser === 1) return user;
  });

  if (userExist[0] && userExist[0].statusUser === 1) return { status: 'invalid', message: 'Email already exists' };

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

  // const users = await User.find({ email: data.email });
  const users = await User.find({ email: 'Patryk123@gmail.com' }); // Dodano na czas testowania
  const activeUser = users.filter((user) => {
    if (user.statusUser === 1) return user;
  });

  if (!activeUser[0] || activeUser[0].statusUser === 0)
    return { status: 'invalid', message: 'Email or password is wrong' };

  // const validPass = await bcrypt.compare(data.password, activeUser[0].password);
  const validPass = await bcrypt.compare('test123', activeUser[0].password); // Dodano na czas testowania
  if (!validPass) return { status: 'invalid', message: 'Email or password is wrong' };

  const token = jsonwebtoken.sign({ _id: activeUser[0]._id }, process.env.TOKEN_SECRET);

  // Zapytać o to

  return { message: { token, message: `Witam ${activeUser[0].name}!` } };
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

  if (!(data.newPassword === data.newPasswordRepeat))
    return { status: 'invalid', message: 'The passwords do not match.' };

  const difOldNewPass = await bcrypt.compare(data.newPasswordRepeat, user.password);
  if (difOldNewPass) return { status: 'invalid', message: 'The old password and the new password must be different.' };

  data.password = data.newPasswordRepeat;

  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);

  return userUpdated(data, id);
};

export const userDeletion = async (id) => {
  const userExist = await User.findOne({ _id: id.id });

  if (!userExist || userExist.statusUser === 0) return { status: 'invalid', message: 'User not found' };

  await User.findOneAndUpdate(
    {
      _id: id.id,
    },
    { statusUser: 0 },
    { new: true }
  );

  return 'The account has been deleted';
};

export const getById = async (id) => getByIdAbstract(id, User);

export const collectPayment = async (id, price) => {
  const user = await User.findById(id).exec();

  return user.update({ cash: user.cash - price }).exec();
};

export const addCash = async (id, price) => {
  const user = await User.findById(id).exec();

  return user.update({ cash: user.cash + price }).exec();
};

export default { getById, collectPayment, addCash };
