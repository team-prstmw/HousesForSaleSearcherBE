import createNewHouse from '../models/createNewHouse'

export const findAddress = async (addressData) => {

    const address = await createNewHouse.findOne({address: addressData})
    if (address === null) return { status: 'success'};
    throw 'House with a given address already exists'}
  ;

