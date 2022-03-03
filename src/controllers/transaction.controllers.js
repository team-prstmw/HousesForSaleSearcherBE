import transactionModel from '../models/transaction';
import userControllers from './user.controllers';
import { getById as getHouseById, changeOwner as changeHouseOwner } from './house.controllers';

const addTransaction = async (buyerId, sellerId, houseId, price) => {
  console.log({ buyerId, sellerId, houseId, price });
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

  let { user: buyer } = await userControllers.getById(buyerId);
  let { house } = await getHouseById(houseId);
  let { user: seller } = await userControllers.getById(house.owner);

  if (!buyer || !buyer._id || !house || !house._id || !seller || !seller._id) {
    return { status: 'invalid', message: 'Transaction failed.' };
  }

  if (buyer.cash < price) {
    return { status: 'invalid', message: 'Not enough cash.' };
  }

  await userControllers.getPayment(buyer._id, price);
  await userControllers.addCash(seller._id, price);
  await changeHouseOwner(houseId, buyer._id);

  const transaction = await addTransaction(buyerId, seller._id, houseId, price);

  if (!transaction || !transaction._id) {
    return;
  }

  return { status: 'success', transaction };
};

const getById = async (id) => {
  const transaction = await transactionModel.findById(id);

  if (!transaction || !transaction._id) {
    return { status: 'invalid', message: 'There is no transaction with this id.' };
  }

  return { status: 'success', transaction };
};

const getAll = async () => {
  const transactions = await transactionModel.find({});

  if (!transactions || !transactions.length) {
    return { status: 'error', message: 'Error while fetching transactions.' };
  }

  return { status: 'success', transactions };
};

export default { buyHouse, getById, getAll };
