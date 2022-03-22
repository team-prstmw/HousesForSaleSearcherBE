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

export const findMany = async (query = {}, sort = {}) => {
  const data = await House.find(query).sort(sort).exec();

  if (!data || !Array.isArray(data)) {
    return { status: 'error', message: 'Error while fetching houses.' };
  }

  return { status: 'success', data };
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

export const getHouseList = async (query = {}, sort = {}) => {
  const getAllResponse = await findMany(query, sort);

  if (getAllResponse.status === 'error') {
    return { status: getAllResponse.status, message: getAllResponse.message };
  }

  const { data: houses } = getAllResponse;

  const data = houses.map((house) => {
    const { price, street, houseNr, city, descriptionField, location } = house;

    return { price, street, houseNr, city, descriptionField, ...location };
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

export const editHouse = async (data, id, userId) => {
  try {
    const house = await House.findOneAndUpdate(
      {
        _id: id,
      },
      data
    );

    if (house.owner.toString() !== userId) {
      return { status: 'invalid', message: 'Logged User is not an owner.' };
    }

    if (!house) return { status: 'invalid', message: 'House not found' };
    return { status: 'success', message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};
