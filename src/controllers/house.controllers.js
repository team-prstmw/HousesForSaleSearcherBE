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

export const getAll = async () => {
  const data = await House.find({}).exec();

  if (!data || !data.length) {
    return { status: 'error', message: 'Error while fetching objects.' };
  }

  return { status: 'success', data };
};

export default createNewHouseController;
