import { addToFavorite } from '../controllers/favorites.controllers';
import { findAllFavorites } from '../controllers/favorites.controllers';
import handleResponse from '../utils/handleResponse';

const favoritesRoutes = (router) => {
  router.post('/favorites', async (req, res) => {
    const response = await addToFavorite(req.body); // {userId: '123', houseId: '321'}
    handleResponse(response, res, response.status, 'POST');
  });
  router.get('/favorites', async (req, res) => {
    const response = await findAllFavorites();
    handleResponse(response, res, response.status, 'GET');
  });
};

export default favoritesRoutes;
