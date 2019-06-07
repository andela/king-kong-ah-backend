import validate from './validate';
/** User authentication validation */

/**
   * validate user sign up endpoint
   * @param {Object} req - request body
   * @param {Object} res - response body
   * @param {Object} next - call next function
   * @returns {Function} validate - call validate function
   */

export const validateUserSignUp = (req, res, next) => {
  const data = req.body;
  const signUpRules = {
    email: 'required|email',
    username: 'required|string|alpha',
    firstName: 'required|string|alpha',
    lastName: 'required|string|alpha',
    password: 'required|string|min:6',
  };
  validate(data, signUpRules, res, next);
};

export default { validateUserSignUp };
