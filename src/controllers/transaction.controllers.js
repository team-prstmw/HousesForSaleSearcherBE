import transactionModel from '../models/transaction';

const addTransaction = async (userId, ownerId, houseId, timestamp, price) => {
  if (!userId || !ownerId || !houseId || !timestamp || !price) {
    return;
  }

  const transaction = await transactionModel.create({
    user: userId,
    owner: ownerId,
    house: houseId,
    timestamp,
    price,
  });

  return transaction.lean(); // to get plain JS object
};

export const buyHouse = async (data) => {
  const { userId, houseId, price } = data;

  const buyer = await userController.getById(userId);
  const house = await houseController.getById(houseId);
  const owner = await userController.getById(house.owner);

  if (!buyer || !buyer.id || !house || !house.id || !owner || !owner.id) {
    return { status: 'invalid', message: 'Transaction failed.' };
  }

  if (buyer.cash < price) {
    return { status: 'invalid', message: 'Not enough cash.' };
  }

  await userController.getPayment(buyer.id, price);
  await userController.addCash(owner.id, price);
  await houseController.changeOwner(houseId, buyer.id);

  const transaction = await addTransaction(userId, owner.id, houseId, new Date(), price);

  if (!transaction || !transaction.id) {
    return;
  }

  return { status: 'success', transaction };
};

export default { buyHouse };
