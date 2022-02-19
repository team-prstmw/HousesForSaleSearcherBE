import { StatusCodes } from 'http-status-codes';

const transactionControllers = (router) => {
  router.post('/transactions', async (req, res) => {
    const body = req.body; // {userId: 'buyer', houseId: '', price: 10000}

    const response = await transactionService.buyHouse(body);

    if (!response?.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });
};

export default transactionControllers;
