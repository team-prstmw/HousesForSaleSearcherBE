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
  try {
    const favorite = await favoriteModel.findById(id);
    return { status: 'success', favorite };
  } catch (err) {
    return { status: 'invalid', message: 'There is no favorite with this ID' };
  }
};
export default createNewHouseController;
