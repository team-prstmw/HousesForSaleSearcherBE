import { addToFavorite } from '../controllers/favorites.controllers';
import { findAllFavorites } from '../controllers/favorites.controllers';
import handleResponse from '../utils/handleResponse';
import { deleteFavorite } from '../controllers/favorites.controllers';

const favoritesControllers = (router) => {
  router.post('/favorites', async (req, res) => {
    const response = await addToFavorite(req.body); // {userId: '123', houseId: '321'}
    handleResponse(response, res, response.status);
  });
  router.get('/favorites', async (req, res) => {
    const response = await findAllFavorites();
    handleResponse(response, res, response.status);
  });
  router.delete('/favorites', async (req, res) => {
    const response = await deleteFavorite(req.body);
    handleResponse(response, res, response.status);
  });
};

export default favoritesControllers;
