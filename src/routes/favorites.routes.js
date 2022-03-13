import { addToFavorite } from '../controllers/favorites.controllers';
import handleResponse from '../utils/handleResponse';
import auth from './user/verifyToken';

const favoritesRoutes = (router) => {
  router.post('/favorites', auth, async (req, res) => {
    const { _id: userId } = req.user;
    const { houseId } = req.body;
    const response = await addToFavorite(userId, houseId); // {userId: '123', houseId: '321'}
    handleResponse(response, res, response.status, 'POST');
  });
};

export default favoritesRoutes;
