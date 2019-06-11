import model from '<serverModels>';
import { cookieGenerator } from '<helpers>/utils';
import generateEmail from '<emails>/verification';
import sendMail from '<helpers>/emails';

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
    const verificationEmail = generateEmail(newUser, req);

    await sendMail(
      process.env.SENDGRID_API_KEY,
      newUser.email,
      process.env.SENDGRID_FROM,
      'Email Verification',
      verificationEmail
    );

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
