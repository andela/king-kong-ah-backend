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
  const {
    username, firstName, lastName, email, password
  } = req.body;
  const data = {
    firstName: firstName && typeof firstName === 'string' ? firstName.trim() : firstName,
    lastName: lastName && typeof lastName === 'string' ? lastName.trim() : lastName,
    email,
    username: username && typeof username === 'string' ? username.trim() : username,
    password: password && password.trim()
  };

  const signUpRules = {
    email: 'required|email',
    username: 'required|string|alpha|min:6',
    firstName: 'required|string|alpha|min:2',
    lastName: 'required|string|alpha|min:2',
    password: 'required|min:6',
  };
  validate(data, signUpRules, res, next);
};

export default { validateUserSignUp };
