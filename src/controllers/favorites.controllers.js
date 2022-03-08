import Favorite from '../models/favorite';
import House from '../models/house';
import User from '../models/user';

export const addToFavorite = async (data) => {
  const { userId, houseId } = data;

  const user = await User.getById(userId);
  const house = await House.getById(houseId);

  if (!user.id || !house.id) {
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
export const findAllFavorites = async () => {
  try {
    const favorites = await Favorite.find().skip(0).limit(10);
    return { status: 'success', favorites };
  } catch (err) {
    return { status: 'invalid', message: err.message };
  }
};
export const getById = async (id) => {
  try {
    const favorite = await Favorite.findById(id);
    return { status: 'success', favorite };
  } catch (err) {
    return { status: 'invalid', message: 'There is no favorite with this ID' };
  }
};

export const favoriteDeletion = async (_id) => {
  const favorite = await Favorite.findOneAndDelete({
    _id,
  });

  if (!favorite || !favorite._id) {
    return { status: 'error', message: 'Favorite was not found.' };
  }

  return { status: 'success', message: 'Favorite was deleted.' };
};
