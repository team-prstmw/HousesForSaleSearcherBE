import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json('Access denied');

  try {
    const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    return next();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json('Invalid Token');
  }
};

export default auth;
