const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const body = req.body; // {userId: 'buyer', houseId: '', price: 10000}

  const response = await transactionService.buyHouse(body);

  if (!response?.status) {
    return res.status(500).json({ status: 'server error' });
  }

  if (response.status === 'invalid') {
    return res.status(400).json(response);
  }

  return res.json(response);
});
