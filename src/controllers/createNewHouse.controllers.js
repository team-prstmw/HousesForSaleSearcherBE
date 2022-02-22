import House from '../models/createNewHouse'

const createHouseController = (router) => {
  router.post('/create-new-house', async (req, res) => {

    const house = new House(req.body)
    try {
        const newHouse = await house.save()
        res.status(201).json(newHouse)
        console.log('new house created')
    } catch (err){
        res.status(400).json({ message: err.message})
    }
  })
}

export default createHouseController;
