import { addToFavorite, deleteFavorite, findAllFavorites } from '../controllers/favorites.controllers';
import auth from '../middlewares/verifyToken';
import handleResponse from '../utils/handleResponse';

const favoritesRoutes = (router) => {
  router.post('/favorites', async (req, res) => {
    const response = await addToFavorite(req.body); // {userId: '123', houseId: '321'}
    handleResponse(response, res, response.status);
  });
  router.get('/favorites', async (req, res) => {
    const response = await findAllFavorites();
    handleResponse(response, res, response.status);
  });

  router.delete('/favorites/:id', auth, async (req, res) => {
    const { id } = req.params;
    const response = await deleteFavorite(id);
    handleResponse(response, res, response.status);
  });
};

export default favoritesRoutes;
