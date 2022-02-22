import transactionModel from '../models/transaction';

const addTransaction = async (buyerId, sellerId, houseId, timestamp, price) => {
  if (!buyerId || !sellerId || !houseId || !timestamp || !price) {
    return;
  }

  const transaction = await transactionModel.create({
    buyer: buyerId,
    seller: sellerId,
    house: houseId,
    timestamp,
    price,
  });

  return transaction.lean(); // to get plain JS object
};

export const buyHouse = async (data) => {
  const { buyerId, houseId, price } = data;

  const buyer = await userController.getById(buyerId);
  const house = await houseController.getById(houseId);
  const seller = await userController.getById(house.owner);

  if (!buyer || !buyer.id || !house || !house.id || !seller || !seller.id) {
    return { status: 'invalid', message: 'Transaction failed.' };
  }

  if (buyer.cash < price) {
    return { status: 'invalid', message: 'Not enough cash.' };
  }

  await userController.getPayment(buyer.id, price);
  await userController.addCash(seller.id, price);
  await houseController.changeOwner(houseId, buyer.id);

  const transaction = await addTransaction(buyerId, seller.id, houseId, new Date(), price);

  if (!transaction || !transaction.id) {
    return;
  }

  return { status: 'success', transaction };
};

export default { buyHouse };
