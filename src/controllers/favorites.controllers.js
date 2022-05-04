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
    const favorites = await Favorite.find({ user: userId }).populate('house').exec();

    const parsedData = favorites.map((favorite) => {
      const { _id, price, street, houseNr, city, descriptionField, images, location } = favorite.house;

      return { _id, price, street, houseNr, city, descriptionField, images, ...location, favoriteId: favorite._id };
    });
    return { status: 'success', favorites: parsedData };
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

export const deleteFavorite = async (_id) => {
  const favorite = await Favorite.findOneAndDelete({
    _id,
  });

  if (!favorite || !favorite._id) {
    return { status: 'invalid', message: 'Favorite was not found.' };
  }

  return { status: 'success', message: 'Favorite was deleted.' };
};
