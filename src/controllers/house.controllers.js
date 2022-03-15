import { HOUSE_INACTIVE } from '../constants/houseConst';
import House from '../models/house';
import { getByIdAbstract } from '../services/dbMethods';
import { findAddress } from '../services/findAddress';

export const createNewHouse = async (houseData) => {
  const house = new House(houseData);
  try {
    await findAddress(house);
    const newHouse = await house.save();
    return { status: 'success', newHouse };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const deleteHouse = async (_id, userId) => {
  const house = await House.findOne({
    _id,
    houseStatus: { $not: { $eq: HOUSE_INACTIVE } },
  });

  if (!house || !house._id) {
    return { status: 'error', message: 'House was not found.' };
  }

  if (house.owner.toString() !== userId) {
    return { status: 'invalid', message: 'Logged User is not an owner.' };
  }

  house.houseStatus = HOUSE_INACTIVE;
  await house.save();

  return { status: 'success', message: 'House was deleted.' };
};

export const getAll = async () => {
  const data = await House.find({}).exec();

  if (!data || !data.length) {
    return { status: 'error', message: 'Error while fetching houses.' };
  }

  return { status: 'success', data };
};

export const getHouseList = async () => {
  const getAllResponse = await getAll();

  if (getAllResponse.status === 'error') {
    return { status: getAllResponse.status, message: getAllResponse.message };
  }

  const { data: houses } = getAllResponse;

  const data = houses.map((house) => {
    const { address, price, meta } = house;
    const { street, houseNr, city } = address;
    const { location } = meta;

    return { price, street, houseNr, city, ...location };
  });

  return { status: 'success', data };
};

export const getById = async (id) => getByIdAbstract(id, House);

export const getHouseDetails = async (id) => {
  const details = await getByIdAbstract(id, House);
  if (details.status === 'success')
    switch (details.data.houseStatus) {
      case 1:
        return details;
      case 2:
        return { status: 'invalid', message: 'house was sold' };
      default:
        return { status: 'invalid', message: 'house does not exist' };
    }
  return { status: 'invalid', message: 'house does not exist' };
};

export const changeOwner = async (id, userId) => {
  return House.findByIdAndUpdate(id, { owner: userId }).exec();
};
