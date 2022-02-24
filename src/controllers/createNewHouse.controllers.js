import House from '../models/createNewHouse'
import { findAddress } from '../services/findAddress';

const createNewHouseController = async (houseData) => {
    const house = new House(houseData)
    try {
      await findAddress(house.address)
      const newHouse = await house.save()
      console.log('new house created')
      return { status: 'success', newHouse} ;
      }
     catch (err){
      console.error(err)
      return { status: 'invalid', message: err }
    }
  }
  
export default createNewHouseController;
