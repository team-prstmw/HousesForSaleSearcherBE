import Favorite from '../models/favorite';
import { getById as getHouseById } from './house.controllers';
import { getById as getUserById } from './user.controllers';

export const addToFavorite = async (userId, houseId) => {
  const userResponse = await getUserById(userId);
  const houseResponse = await getHouseById(houseId);

  const user = userResponse.data;
  const house = houseResponse.data;
  if (!user._id || !house._id) {
    return { status: 'invalid', message: 'User or house does not exists.' };
  }
  const favorite = new Favorite({
    user: userId,
    house: houseId,
  });
  try {
    const newFavorite = await favorite.save();
    return { status: 'success', newFavorite };
  } catch (err) {
    return { status: 'invalid', message: err.message };
  }
};
export const findAllUserFavorites = async (userId) => {
  try {
    const favorites = await Favorite.find({ user: userId }).exec();
    return { status: 'success', favorites };
  } catch (err) {
    return { status: 'invalid', message: err.message };
  }
};
