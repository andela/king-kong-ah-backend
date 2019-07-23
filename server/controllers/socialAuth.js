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
  const { FRONT_END_HOST } = process.env;

  try {
    const [user] = await User.findOrCreate({
      where: { oauthId, type },
      defaults: req.user
    });

    const { id, isVerified } = user.dataValues;
    cookieGenerator(id, isVerified, process.env.COOKIE_EXPIRY_DATE, res);

    return res.redirect(200, `${FRONT_END_HOST}/api/v1/dashboard`);
  } catch (error) {
    displayError(error, res, 500);
  }
};
export default socialAuth;
