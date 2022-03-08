import { addToFavorite } from '../controllers/favorites.controllers';
import { findAllFavorites } from '../controllers/favorites.controllers';
import handleResponse from '../utils/handleResponse';
import { deleteFavorite } from '../controllers/favorites.controllers';

const favoritesRoutes = (router) => {
  router.post('/favorites', async (req, res) => {
    const response = await addToFavorite(req.body); // {userId: '123', houseId: '321'}
    handleResponse(response, res, response.status);
  });
  router.get('/favorites', async (req, res) => {
    const response = await findAllFavorites();
    handleResponse(response, res, response.status);
  });
  router.delete('/favorites/:favoriteId', async (req, res) => {
    const { id } = req.params;
    const response = await getById(id);
    handleResponse(response, res, response.status);
  });
};

export default favoritesRoutes;
