import model from '<serverModels>';
import { comparePassword } from '<helpers>/utils';

const { User } = model;

export const authentication = async (req, res, next) => {
  const { email, password } = req.body;

  const userData = await User.findOne({ where: { email } });

  if (!userData) {
    return res.status(404).send({
      status: 'error',
      message: 'User does not exist'
    });
  }

  if (userData && !comparePassword(userData.password, password)) {
    return res.status(400).send({
      status: 'error',
      message: 'User credentials are invalid'
    });
  }
  req.user = {
    id: userData.id,
    isVerified: userData.isVerified
  };
  next();
};

export default authentication;
