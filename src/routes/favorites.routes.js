import { addToFavorite, favoriteDeletion, findAllFavorites } from '../controllers/favorites.controllers';
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
    favoriteDeletion(id);
  });
};

export default favoritesRoutes;
