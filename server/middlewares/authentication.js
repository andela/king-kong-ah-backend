import model from '<serverModels>';
import { comparePassword, displayError } from '<helpers>/utils';

const { User } = model;

export const authentication = async (req, res, next) => {
  const { email, password } = req.body;

  const userData = await User.findOne({ where: { email } });

  if (!userData) {
    const err = new Error('User does not exist');
    return displayError(err, res, 404);
  }

  if (userData && !comparePassword(userData.password, password)) {
    const err = new Error('User credentials are invalid');
    return displayError(err, res);
  }
  req.user = {
    id: userData.id,
    isVerified: userData.isVerified,
  };
  next();
};

export default authentication;
