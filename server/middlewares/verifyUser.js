import { decodeToken, displayError } from '<helpers>/utils';

export const verifyUser = (req, res, next) => {
  const { token } = req.cookies['access-token'];

  const { id } = decodeToken(token);
  req.userId = id;
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

export const checkIsVerified = (req, res, next) => {
  const { token } = req.cookies['access-token'];

  const { isVerified } = decodeToken(token);

  if (isVerified === false) {
    return res.status(403).json({
      status: 'failed',
      message: 'Kindly go to your email to verify your account',
    });
  }
  next();
};
