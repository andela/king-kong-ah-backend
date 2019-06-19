import model from '<serverModels>';
import { displayError, handleSuccessResponse } from '<helpers>/utils';

const { User } = model;

const verifyAccount = async (req, res) => {
  try {
    const id = req.verifyUserId;
    const user = await User.findByPk(id);
    const updatedUser = await user.update({ isVerified: true });
    const { isVerified } = updatedUser.dataValues;
    return handleSuccessResponse({ isVerified }, 'User email verified successfully', res);
  } catch (err) {
    displayError(err, res, 403);
  }
};

export default verifyAccount;
