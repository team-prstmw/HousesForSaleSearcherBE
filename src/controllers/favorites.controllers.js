import Favorite from '../models/favorite';
import User from '../models/user';
import House from '../models/house';

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
