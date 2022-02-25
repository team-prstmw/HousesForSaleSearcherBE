import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.cookies.auth;
  if (!token) return res.status(StatusCodes.BAD_REQUEST).send('Acces denied');

  try {
    const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send('Invalid Token');
  }
}

export default auth;