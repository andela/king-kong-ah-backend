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

  const newPassword = hashPassword(password);
  const user = await User.findOne({ where: { email } });

  await user.update({ password: newPassword });

  res.status(200).send({
    status: 'success',
    message: 'Password successfully changed'
  });
};

export default resetPassword;
