import createNewHouseController from '../controllers/createNewHouse.controllers';

const createNewHouseRoute = (router) => {
    router.post('/create-new-house', async (req, res) => {
      const newHouse = await createNewHouseController(req.body)
      try {
          res.status(201).json(newHouse)
      } catch (err){
          res.status(400).json({ message: err.message})
      }
    })
  }

  export default createNewHouseRoute