import { StatusCodes } from 'http-status-codes';

const handleResponse = (handledResponse, res, status, typeOfResponse = '') => {
  if (!handledResponse || !status) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
  }
  if (status === 'invalid') {
    return res.status(StatusCodes.BAD_REQUEST).json({ status, ...handledResponse });
  }
  if (typeOfResponse.toUpperCase() === 'GET') return res.status(StatusCodes.OK).json({ status, ...handledResponse });

  return res.status(StatusCodes.CREATED).json({ status, ...handledResponse });
};
export default handleResponse;
