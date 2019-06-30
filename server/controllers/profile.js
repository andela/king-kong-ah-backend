import models from '<serverModels>';
import { displayError, handleSuccessResponse, } from '<helpers>/utils';
import { pickProfile, getProfile } from '<helpers>/profile';

const { User } = models;

export const updateProfile = async (req, res) => {
  const { userId } = req;
  const profileData = pickProfile(req.body);
  try {
    const user = await User.findByPk(userId);
    const updatedUser = await user.update(profileData);
    const updatedProfile = pickProfile(updatedUser);
    return handleSuccessResponse(updatedProfile, 'Profile updated successfully', res);
  } catch (e) {
    const err = new Error(`Internal server error. ${e}`);
    return displayError(err, res, 500);
  }
};

export const getUserProfile = (req, res) => {
  const id = req.params ? req.params.id : '';
  return getProfile(id, req, res);
};
