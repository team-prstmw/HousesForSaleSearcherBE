import House from '../models/createNewHouse'

const createNewHouseController = async (houseData) => {
    const house = new House(houseData)
    try {
        const newHouse = await house.save()
        console.log('new house created')
        return { status: 'success', newHouse };
    } catch (err){
      return { status: 'invalid', message: err.message }
    }
  }
  
export default createNewHouseController;
