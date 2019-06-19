import {
  validate,
  toLowerCaseAndTrim,
  decodeToken,
  displayError,
} from '<helpers>/utils';
import model from '<serverModels>';

const { User } = model;

const passwordFormat = 'regex:/S*(S*([a-zA-Z]S*[0-9])|([0-9]S*[a-zA-Z]))S*/'; /** Password must have Alphabet and a number i.e. alphanumeric */

/**
 * validate user sign up endpoint
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @param {Object} next - call next function
 * @returns {Function} validate - call validate function
 */
export const validateUserSignUp = (req, res, next) => {
  const formattedValues = toLowerCaseAndTrim(req.body);
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
    password: ['required', 'min:8', passwordFormat]
  };
  req.formattedValues = formattedValues;
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
  const { email } = formattedValues;

  const { password } = req.body;

  const data = {
    email,
    password
  };

  const loginRules = {
    email: 'required|email',
    password: ['required', 'min:8', passwordFormat]
  };
  validate(data, loginRules, res, next);
};

/**
 * validate user login endpoint
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @param {Object} next - call next function
 * @returns {Function} validate - call validate function
 */
export const validateRecoverEmail = async (req, res, next) => {
  const formattedValues = toLowerCaseAndTrim(req.body);
  const { email } = formattedValues;

  const userEmail = await User.findOne({ where: { email } });

  const data = {
    email
  };

  const rules = {
    email: 'required|email'
  };

  if (!userEmail) {
    const err = new Error('This email does not exist');
    return displayError(err, res, 404);
  }

  validate(data, rules, res, next);
};

export const validatePasswordReset = async (req, res, next) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;

  const { email } = decodeToken(token);

  if (password !== confirmPassword) {
    const err = new Error('password and confirm password are not the same');
    return displayError(err, res, 403);
  }

  const data = {
    password,
    confirmPassword
  };

  const rules = {
    password: ['required', 'min:8', passwordFormat],
    confirmPassword: ['required', 'min:8', passwordFormat]
  };

  req.email = email;

  validate(data, rules, res, next);
};
