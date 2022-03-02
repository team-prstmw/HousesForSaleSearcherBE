const { StatusCodes }= require( 'http-status-codes');
const transactionController =require( '../controllers/transaction.controllers');

const transactionRoutes = (router) => {
  const create = router.post('/transactions', async (req, res) => {
    const body = req.body; // {userId: 'buyer', houseId: '', price: 10000}

    const response = await transactionController.buyHouse(body);

    if (!response || !response.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  const getOne = router.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;

    const response = await transactionController.getById(id);
    if (!response || !response.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  const getAll = router.get('/transactions/', async (req, res) => {
    const response = await transactionController.getAll();
    if (!response || !response.status || response.status === 'error') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    console.log('res',res)

    return res.status(StatusCodes.CREATED).json(response);
  });

  return {
    create,
    getOne,
    getAll,
  };
};

module.exports= transactionRoutes;
