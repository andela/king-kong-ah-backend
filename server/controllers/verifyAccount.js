import model from '<serverModels>';
import { displayError } from '<helpers>/utils';

const { User } = model;

const verifyAccount = async (req, res) => {
  try {
    const id = req.verifyUserId;
    const user = await User.findByPk(id);
    const updatedUser = await user.update({ isVerified: true });
    const { isVerified } = updatedUser.dataValues;
    return res.status(200).send({
      status: 'success',
      message: 'User email verified successfully',
      data: { isVerified }
    });
  } catch (err) {
    displayError(err, res, 403);
  }
};

export default verifyAccount;
