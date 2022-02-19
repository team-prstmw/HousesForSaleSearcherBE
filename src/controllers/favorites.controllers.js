import { StatusCodes } from 'http-status-codes';
import { addToFavorite } from '../services/favoritesService';
import { findAllFavorites } from '../services/favoritesService';

const favoritesControllers = (router) => {
  router.post('/favorites', async (req, res) => {
    const response = await addToFavorite(req.body); // {userId: '123', houseId: '321'}
    if (!response.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    return res.status(StatusCodes.CREATED).json(response);
  });
  router.get('/favorites', async (req, res) => {
    const response = await findAllFavorites();
    if (!response.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    return res.status(StatusCodes.CREATED).json(response);
  });
};

export default favoritesControllers;
