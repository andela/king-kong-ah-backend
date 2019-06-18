import models from '<serverModels>';
import { handleSuccessResponse, displayError } from '<helpers>/utils';

const { User } = models;

/**
 * @param {object} userObject
 * @return {object} userProfile
 */
export const pickProfile = (userObject) => {
  const {
    id, username, firstName, lastName, bio, profileImage,
  } = userObject;
  return {
    id, username, firstName, lastName, bio, profileImage,
  };
};

/**
 * @param {string} userId
 * @param {object} req
 * @param {object} res
 * @return {object} responseObject
 */
export const getProfile = async (userId, req, res) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      const err = new Error('Profile not found.');
      return displayError(err, res, 404);
    }
    const userProfile = pickProfile(user.dataValues);
    return handleSuccessResponse(userProfile, 'User profile', res);
  } catch (e) {
    const err = new Error(`Server error. ${e}`);
    return displayError(err, res, 500);
  }
};
