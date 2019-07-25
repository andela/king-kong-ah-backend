import model from '<serverModels>';
import { hashPassword } from '<helpers>/utils';

const { User } = model;

/**
 * @param {object} req - request body
 * @param {Object} res - response body
 * @return {object} res
 */
const resetPassword = async (req, res) => {
  const { email } = req;
  const { password } = req.body;
  const { FRONT_END_HOST } = process.env;

  const newPassword = hashPassword(password);
  const user = await User.findOne({ where: { email } });

  await user.update({ password: newPassword });

  res.redirect(301, `${FRONT_END_HOST}/dashboard`);
};

export default resetPassword;
