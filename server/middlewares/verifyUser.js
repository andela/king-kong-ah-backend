import jwt from 'jsonwebtoken';
import { decodeToken, displayError } from '<helpers>/utils';

export const verifyUser = (req, res, next) => {
  const { token } = req.cookies['access-token'];

  const decoded = jwt.verify(token, process.env.SECRET);
  req.userId = decoded.id;
  next();
};

export const verifyUserToken = (req, res, next) => {
  try {
    const { token } = req.query;
    const { id } = decodeToken(token);
    req.verifyUserId = id;
    next();
  } catch (e) {
    const err = new Error('Invalid token');
    return displayError(err, res, 403);
  }
};
