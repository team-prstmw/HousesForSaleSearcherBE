import qs from 'qs';

import env from '../constants/env';
import {
  createNewHouse,
  deleteHouse,
  editHouse,
  getHouseDetails,
  getHouseList,
} from '../controllers/house.controllers';
import uploadFilesMiddleware from '../middlewares/upload';
import auth from '../middlewares/verifyToken';
import handleResponse from '../utils/handleResponse';

const { StatusCodes } = require('http-status-codes');

const housesRoutes = (router) => {
  router.post('/create-new-house', uploadFilesMiddleware, async (req, res) => {
    const serializedBody = {
      owner: req.body.owner,
      descriptionField: req.body.descriptionField,
      country: req.body.country,
      region: req.body.state,
      city: req.body.city,
      street: req.body.streetName,
      houseNr: req.body.streetNumber,
      propertyType: req.body.propertyType,
      roomsNumber: parseInt(req.body.roomsNumber || 0, 10),
      bathroomNumber: req.body.bathroomNumber,
      floorsInBuilding: req.body.floorsInBuilding,
      heating: req.body.heating,
      otherFeatures: [],
      yearBuilt: parseInt(req.body.yearBuilt, 10),
      area: parseInt(req.body.dimension || 0, 10),
      price: parseInt(req.body.price || 0, 10),
      location: {
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng),
      },
    };

    const response = await createNewHouse({
      ...serializedBody,
      images: req.files.map((image) => image.path.replace('src/', env.BASE_URL)),
    });

    handleResponse(response, res, response.status);
  });

  router.get('/houses/:id', async (req, res) => {
    const response = await getHouseDetails(req.params.id);
    handleResponse(response, res, response.status);
  });

  router.patch('/houses/:id', auth, async (req, res) => {
    const { id } = req.params;
    const response = await deleteHouse(id, req.user._id);
    handleResponse(response, res, response.status);
  });

  router.get('/houses', async (req, res) => {
    const { query } = req;

    try {
      const filter = qs.parse(query.filter);
      const sort = qs.parse(query.sort);

      const response = await getHouseList(filter, sort);

      if (!response || !response.status) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
      }

      if (response.status === 'invalid') {
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }
  });

  router.put('/houses/:id', auth, async (req, res) => {
    const response = await editHouse(req.body, req.params.id, req.user._id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
};

export default housesRoutes;
