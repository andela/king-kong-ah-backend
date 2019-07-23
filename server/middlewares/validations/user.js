import {
  validate,
  toLowerCaseAndTrim,
  decodeToken,
  displayError,
  checkValidation,
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
    email, firstName, lastName
  } = formattedValues;

  const { password } = req.body;
  const data = {
    firstName,
    lastName,
    email,
    password
  };

  const signUpRules = {
    email: 'required|email',
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

  const data = { email };

  const rules = { email: 'required|email' };

  const check = checkValidation(data, rules);

  if (check !== true) {
    return displayError({ message: check.error.message.email[0] }, res);
  }

  const userEmail = await User.findOne({ where: { email } });

  if (!userEmail) {
    const err = new Error('This email does not exist');
    return displayError(err, res, 404);
  }

  next();
};

export const validatePasswordReset = async (req, res, next) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;

  if (!token) {
    const err = new Error('Link seems broken, make sure you clicked the right link');
    return displayError(err, res, 400);
  }

  if (password !== confirmPassword) {
    const err = new Error('password and confirm password are not the same');
    return displayError(err, res, 400);
  }

  const { email } = decodeToken(token);
  const data = {
    password,
    confirmPassword
  };

  const rules = {
    password: ['required', 'min:8', passwordFormat],
    confirmPassword: ['required', 'min:8', passwordFormat]
  };

  req.email = email;

  return validate(data, rules, res, next);
};
