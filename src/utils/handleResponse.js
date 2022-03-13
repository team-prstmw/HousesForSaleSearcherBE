import { StatusCodes } from 'http-status-codes';

const handleResponse = (handledResponse, res, handledStatus) => {
  if (!handledResponse || !handledStatus) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
  }
  if (handledStatus === 'invalid') {
    return res.status(StatusCodes.BAD_REQUEST).json(handledResponse);
  }
  return res.status(StatusCodes.CREATED).json(handledResponse);
};

export default handleResponse;
