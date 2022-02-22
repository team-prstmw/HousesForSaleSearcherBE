import favoriteModel from '../models/favorite';

export const addToFavorite = async (data) => {
  const { userId, houseId } = data;

  const user = await userService.getById(userId);
  const house = await houseService.getById(houseId);

  if (!user.id || !house.id) {
    return { status: 'invalid', message: 'User or house does not exists.' };
  }
  const favorite = new favoriteModel({
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
    const favorites = await favoriteModel.find().skip(0).limit(10);
    return { status: 'success', favorites };
  } catch (err) {
    return { status: 'invalid', message: err.message };
  }
};
export const deleteFavorite = async (data) => {
  const { userId, houseId } = data;

  const user = await userService.getById(userId);
  const house = await houseService.getById(houseId);

  if (!user.id || !house.id) {
    return { status: 'invalid', message: 'User or house does not exists.' };
  }
  const favorite = new favoriteModel({
    user: userId,
    house: houseId,
  });
  try {
    const removedFavorite = await favorite.remove();
    return { status: 'success', removedFavorite };
  } catch (err) {
    return { status: 'invalid', message: err.message };
  }
};
