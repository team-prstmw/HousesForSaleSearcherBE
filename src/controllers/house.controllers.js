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

export const houseDeletion = async (request, response) => {
  const houseExists = await House.findOne({ _id: request.params.id });

  if (!houseExists || houseExists.houseStatus == 0)
    return response.status(StatusCodes.BAD_REQUEST).send({ message: 'House not found' });

  await House.findOneAndUpdate(
    {
      _id: request.params.id,
    },
    { houseStatus: 0 }
  );

  response.send('House was deleted');
};

export const getById = async (id) => getByIdAbstract(id, House);

export const changeOwner = async (id, userId) => {
  return House.findByIdAndUpdate(id, { owner: userId }).exec();
};

export default createNewHouseController;
