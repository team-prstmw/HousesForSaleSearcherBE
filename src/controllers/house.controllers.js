import House from '../models/house';
import { getByIdAbstract } from '../services/dbMethods';
import { findAddress } from '../services/findAddress';

export const createNewHouseController = async (houseData) => {
  const house = new House(houseData);
  try {
    await findAddress(house);
    const newHouse = await house.save();
    return { status: 'success', newHouse };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const getById = async (id) => getByIdAbstract(id, House);

// eslint-disable-next-line consistent-return
export const getHouseDetails = async (id) => {
  const details = await getByIdAbstract(id, House);
  switch (details.data.houseStatus) {
    case 0:
      return details;
    case 1:
      // eslint-disable-next-line no-throw-literal
      throw 'house was sold ';
    case 2:
      // eslint-disable-next-line no-throw-literal
      throw 'house does not exist';
    default:
  }
};

export const changeOwner = async (id, userId) => {
  return House.findByIdAndUpdate(id, { owner: userId }).exec();
};
