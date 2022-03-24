import transactionModel from '../models/transaction';
import { getByIdAbstract } from '../services/dbMethods';
import { changeOwner as changeHouseOwner, getById as getHouseById } from './house.controllers';
import userControllers from './user.controllers';

const addTransaction = async (buyerId, sellerId, houseId, price) => {
  if (!buyerId || !sellerId || !houseId || !price) {
    return;
  }

  const transaction = await transactionModel.create({
    buyer: buyerId,
    seller: sellerId,
    house: houseId,
    price,
  });

  return transaction;
};

export const buyHouse = async (data) => {
  const { buyerId, houseId, price } = data;

  const buyerResponse = await userControllers.getById(buyerId);
  const houseResponse = await getHouseById(houseId);

  if (!buyerResponse.data || !houseResponse.data) {
    return { status: 'invalid', message: "Buyer and/or house doesn't exist." };
  }

  const { data: buyer } = buyerResponse;
  const { data: house } = houseResponse;

  const sellerResponse = await userControllers.getById(house.owner);

  if (!sellerResponse.data) {
    return { status: 'invalid', message: "Owner of this house doesn't exist." };
  }

  const { data: seller } = sellerResponse;

  if (buyer._id.toString() === seller._id.toString()) {
    return { status: 'invalid', message: "You can't buy your own house." };
  }

  if (buyer.cash < price) {
    return { status: 'invalid', message: 'Not enough cash.' };
  }

  await userControllers.collectPayment(buyer._id, price);
  await userControllers.addCash(seller._id, price);
  await changeHouseOwner(houseId, buyer._id);

  const transaction = await addTransaction(buyerId, seller._id, houseId, price);

  if (!transaction || !transaction._id) {
    return;
  }

  return { status: 'success', transaction };
};

const getById = async (id) => getByIdAbstract(id, transactionModel);

const getAll = async () => {
  const transactions = await transactionModel.find({});
  if (!transactions || !Array.isArray(transactions)) {
    return { status: 'error', message: 'Error while fetching transactions.' };
  }

  return { status: 'success', transactions };
};

export default { buyHouse, getById, getAll };
