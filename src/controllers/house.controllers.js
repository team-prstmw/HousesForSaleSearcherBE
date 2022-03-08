import House from '../models/house';
import { findAddress } from '../services/findAddress';
import { getByIdAbstract } from '../services/dbMethods';

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

export const houseDeletion = async (_id) => {
  const house = await House.findOneAndUpdate(
    {
      _id,
      houseStatus: { $not: { $eq: 0 } },
    },
    { houseStatus: 0 }
  );

  if (!house || !house._id) {
    return { status: 'error', message: 'House was not found.' };
  }

  return { status: 'success', message: 'House was deleted.' };
};

export const getById = async (id) => getByIdAbstract(id, House);

export const changeOwner = async (id, userId) => {
  return House.findByIdAndUpdate(id, { owner: userId }).exec();
};

export default createNewHouseController;
