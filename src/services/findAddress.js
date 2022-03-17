import createNewHouse from '../models/house';

export const findAddress = async (addressData) => {
  const { country, city, street, houseNr, flatNr } = addressData;
  const address = await createNewHouse.findOne({
    country,
    city,
    street,
    houseNr,
    flatNr,
  });
  // eslint-disable-next-line no-throw-literal
  if (address) throw 'House with a given address already exists';
};
