import createNewHouse from '../models/house'

export const findAddress = async (addressData) => {
    const {country, city, street, houseNr, flatNr} = {...addressData}
    const address = await createNewHouse.findOne({
      'address.country': country,
      'address.city': city,
      'address.street': street,
      'address.houseNr': houseNr,
      'address.flatNr': flatNr
    })
    if (address) throw 'House with a given address already exists'};

