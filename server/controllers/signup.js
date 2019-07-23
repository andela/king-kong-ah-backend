import model from '<serverModels>';
import { cookieGenerator, displayError, handleSuccessResponse } from '<helpers>/utils';
import generateEmail from '<emails>/verification';
import sendMail from '<helpers>/emails';

const { User } = model;

const signUp = async (req, res) => {
  const {
    formattedValues: {
      email, firstName, lastName
    }
  } = req;

  const userData = {
    email,
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

    return handleSuccessResponse(userInfo, 'User created successfully', res, 201);
  } catch (error) {
    const err = new Error('Server error');
    return displayError(err, res, 500);
  }
};

export default signUp;
