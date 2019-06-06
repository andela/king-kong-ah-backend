import jwt from 'jsonwebtoken';

const verifyUser = (req, res, next) => {
  const { token } = req.cookies['access-token'];

  const decoded = jwt.verify(token, process.env.SECRET);
  req.userId = decoded.id;
  next();
};

export default verifyUser;
