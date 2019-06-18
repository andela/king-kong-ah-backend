import { validate } from '<helpers>/utils';

/**
 * validate create article endpoint
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @param {Object} next - call next function
 * @returns {Function} validate - call validate function
 */
const validateProfile = (req, res, next) => {
  const {
    username, bio, profileImage, lastName, firstName
  } = req.body;

  const data = {
    username, bio, profileImage, lastName, firstName
  };

  const updateProfileRules = {
    username: 'string|alpha|min:6',
    firstName: 'string|alpha|min:2',
    lastName: 'string|alpha|min:2',
    profileImage: 'url',
    bio: 'string',
  };
  validate(data, updateProfileRules, res, next);
};

export default validateProfile;
