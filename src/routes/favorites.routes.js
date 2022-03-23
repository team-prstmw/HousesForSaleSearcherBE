import { addToFavorite, deleteFavorite } from '../controllers/favorites.controllers';
import auth from '../middlewares/verifyToken';
import handleResponse from '../utils/handleResponse';

const favoritesRoutes = (router) => {
  router.post('/favorites', auth, async (req, res) => {
    const { _id: userId } = req.user;
    const { houseId } = req.body;
    const response = await addToFavorite(userId, houseId); // {userId: '123', houseId: '321'}
    handleResponse(response, res, response.status, 'POST');
  });

  router.delete('/favorites/:id', auth, async (req, res) => {
    const { id } = req.params;
    const response = await deleteFavorite(id);
    handleResponse(response, res, response.status);
  });
};

export default favoritesRoutes;
