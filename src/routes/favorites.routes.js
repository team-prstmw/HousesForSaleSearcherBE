import { addToFavorite } from '../controllers/favorites.controllers';
import { findAllFavorites } from '../controllers/favorites.controllers';
import handleResponse from '../utils/handleResponse';

const favoritesControllers = (router) => {
  router.post('/favorites', async (req, res) => {
    const response = await addToFavorite(req.body); // {userId: '123', houseId: '321'}
    handleResponse(response, res);
  });
  router.get('/favorites', async (req, res) => {
    const response = await findAllFavorites();
    handleResponse(response, res);
  });
};

export default favoritesControllers;
