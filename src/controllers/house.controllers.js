import House from '../models/house';
import { findAddress } from '../services/findAddress';
import { getByIdAbstract } from '../services/dbMethods';
import { exist } from 'joi';

export const createNewHouseController = async (houseData) => {
  const house = new House(houseData);
  try {
    await findAddress(house.address);
    const newHouse = await house.save();
    return { status: 'success', newHouse };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const getById = async (id) => getByIdAbstract(id, House);

export const getHouseDetails = async (id) => {
  const details = await getByIdAbstract(id, House);
  switch (details.data.houseStatus) {
    case 0:
      return details;
    case 1:
      throw 'house was sold ';
    case 2:
      throw 'house does not exist';
  }
};

export const changeOwner = async (id, userId) => {
  return House.findByIdAndUpdate(id, { owner: userId }).exec();
};
