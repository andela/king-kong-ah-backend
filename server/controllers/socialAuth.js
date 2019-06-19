import model from '<serverModels>/index';
import { cookieGenerator, displayError } from '<helpers>/utils';

/**
 * @description socialAuth
 * @param  {HttpRequest} req
 * @param  {HttResponse} res
 * @returns {HttResponse} res
 */
const socialAuth = async (req, res) => {
  const { User } = model;
  const { oauthId, type } = req.user;
  try {
    const [user, created] = await User.findOrCreate({
      where: { oauthId, type },
      defaults: req.user
    });
    const { id, isVerified, firstName } = user.dataValues;
    cookieGenerator(id, isVerified, process.env.COOKIE_EXPIRY_DATE, res);

    const status = created ? 201 : 200;
    return res.status(status).json({
      status: 'success',
      user: `Welcome ${firstName}`
    });
  } catch (error) {
    displayError(error, res, 500);
  }
};
export default socialAuth;
