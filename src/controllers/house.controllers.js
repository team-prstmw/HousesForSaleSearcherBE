import House from '../models/house';
import { findAddress } from '../services/findAddress';

const createNewHouseController = async (houseData) => {
  const house = new House(houseData);
  try {
    await findAddress(house.address);
    const newHouse = await house.save();
    return { status: 'success', newHouse };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const getById = async (id) => {
  const house = await House.findById(id).exec();

  if (!house || !house._id) {
    return { status: 'invalid', message: 'There is no house with this id.' };
  }

  return { status: 'success', house };
};

export const changeOwner = async (id, userId) => {
  return House.findByIdAndUpdate(id, { owner: userId }).exec();
};

export default createNewHouseController;
