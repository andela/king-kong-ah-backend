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

  try {
    const newUser = await User.create(userData);

    cookieGenerator(newUser.id, newUser.isVerified, process.env.COOKIE_EXPIRY_DATE, res);

    const { password, ...userInfo } = newUser.dataValues;

    return res.status(201).send({
      status: 'success',
      message: 'User created successfully',
      data: userInfo
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Server error'
    });
  }
};

export default signUp;
