import { validate, toLowerCaseAndTrim } from '<helpers>/utils';

const passwordFormat = 'regex:/S*(S*([a-zA-Z]S*[0-9])|([0-9]S*[a-zA-Z]))S*/';/** Password must have Alphabet and a number i.e. alphanumeric */

/**
   * validate user sign up endpoint
   * @param {Object} req - request body
   * @param {Object} res - response body
   * @param {Object} next - call next function
   * @returns {Function} validate - call validate function
   */
export const validateUserSignUp = (req, res, next) => {
  const formattedValues = toLowerCaseAndTrim(req.body);
  req.formattedValues = formattedValues;
  const {
    email, username, firstName, lastName
  } = formattedValues;

  const { password } = req.body;
  const data = {
    firstName,
    lastName,
    email,
    username,
    password
  };

  const signUpRules = {
    email: 'required|email',
    username: 'string|alpha|min:6',
    firstName: 'required|string|alpha|min:2',
    lastName: 'required|string|alpha|min:2',
    password: ['required', 'min:8', passwordFormat],
  };
  validate(data, signUpRules, res, next);
};

/**
   * validate user login endpoint
   * @param {Object} req - request body
   * @param {Object} res - response body
   * @param {Object} next - call next function
   * @returns {Function} validate - call validate function
   */
export const validateUserLogin = (req, res, next) => {
  const formattedValues = toLowerCaseAndTrim(req.body);
  req.formattedValues = formattedValues;
  const {
    email
  } = formattedValues;

  const { password } = req.body;

  const data = {
    email,
    password
  };

  const loginRules = {
    email: 'required|email',
    password: ['required', 'min:8', passwordFormat],
  };
  validate(data, loginRules, res, next);
};
