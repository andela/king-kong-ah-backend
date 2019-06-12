import { cookieGenerator } from '<helpers>/utils';
import model from '<serverModels>';

const { User } = model;

const signUp = async (req, res) => {
  const {
    formattedValues: {
      email, username, firstName, lastName
    }
  } = req;

  const userData = {
    email,
    username,
    lastName,
    firstName,
    isVerified: false,
    password: req.body.password
  };
  const newUser = await User.create(userData);

  cookieGenerator(newUser.id, newUser.isVerified, process.env.COOKIE_EXPIRY_DATE, res);

  const { password, ...userInfo } = newUser.dataValues;

  return res.status(201).send({
    status: 'success',
    message: 'User created successfully',
    data: userInfo
  });
};

export default signUp;
