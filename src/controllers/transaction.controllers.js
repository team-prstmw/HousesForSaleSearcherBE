import transactionModel from '../models/transaction';
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

  return transaction.lean(); // to get plain JS object
};

export const buyHouse = async (data) => {
  const { buyerId, houseId, price } = data;

  const buyer = await userControllers.getById(buyerId);
  const house = await houseControllers.getById(houseId);
  const seller = await userControllers.getById(house.owner);

  if (!buyer || !buyer.id || !house || !house.id || !seller || !seller.id) {
    return { status: 'invalid', message: 'Transaction failed.' };
  }

  if (buyer.cash < price) {
    return { status: 'invalid', message: 'Not enough cash.' };
  }

  await userControllers.getPayment(buyer.id, price);
  await userControllers.addCash(seller.id, price);
  await houseControllers.changeOwner(houseId, buyer.id);

  const transaction = await addTransaction(buyerId, seller.id, houseId, new Date(), price);

  if (!transaction || !transaction.id) {
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
