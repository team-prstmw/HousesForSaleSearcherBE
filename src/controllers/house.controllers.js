import House from '../models/house';
import { getByIdAbstract } from '../services/dbMethods';
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

export const deleteHouse = async (_id) => {
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

export const changeOwner = async (id, userId) => {
  return House.findByIdAndUpdate(id, { owner: userId }).exec();
};

export default createNewHouseController;
