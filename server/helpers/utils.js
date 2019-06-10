import slug from 'slug';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

/**
 * @param {string} password
 * @return {string} hash
 */
export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * @param {string} title
 * @return {string} unique_slug
 */
export const createUniqueSlug = title => `${slug(title, { lower: true })}-${Date.now()}`;

/**
 * @param {object} inputObject
 * @return {object} formattedObject
 */
export const toLowerCaseAndTrim = (inputObject) => {
  const formattedObject = {};
  Object.entries(inputObject).forEach((element) => {
    const key = element[0];
    const value = element[1];
    formattedObject[key] = value.replace(/\s/g, '').toLowerCase();
  });
  return formattedObject;
};

/**
 * @param {string} id
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @return {string} token
 */
export const tokenGenerator = (id, tokenExpiryDate = 600, secret = 'secret') => {
  const payload = { id };
  const token = jwt.sign(payload, secret, { expiresIn: tokenExpiryDate });
  return token;
};

/**
 * @param {string} id
 * @param {string} cookieExpiryDate
 * @param {object} res
 * @return {string} cookie
 */
export const cookieGenerator = (id, cookieExpiryDate, res) => res.cookie(
  'access_token',
  { token: tokenGenerator(id, process.env.TOKEN_EXPIRY_DATE, process.env.SECRET) },
  {
    maxAge: cookieExpiryDate,
    httpOnly: true,
    secure: true
  }
);

/**
 * @param {string} text
 * @param {integer} length
 * @return {string} text
 */
export const createEllipsis = (text, length = 200) => {
  if (length > text.length) {
    return text;
  }
  return `${text.slice(0, length - 3).trim()}...`;
};

/**
   * check Validation function
   * @param {Object} data - data to be validated
   * @param {Object} rules - rules for validation
   * @returns {Boolean} true - if validation passes
   * @returns {Object} error Object - if validation falis
   */
export const checkValidation = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.passes()) {
    return true;
  }
  return {
    error: {
      status: 400,
      message: validation.errors.all()
    }
  };
};

/**
     * Display error
     * @param {Object} err
     * @param {Object} res
     * @returns {Object} response body - statusCode and errorMessage
     */
export const displayError = (err, res) => {
  const status = 400;
  res.status(status).json({
    status,
    error: err.message,
  });
};

/**
   * validate endpoint
   * @param {Object} data - data to be validated
   * @param {Object} rules - rules for validation
   * @param {Object} response - response body
   * @param {Object} nextFunction - call next function middleware
   * @returns {Boolean} true - if validation passes
   * @returns {Object} error Object - if validation fails
   */
export const validate = (data, rules, response, nextFunction) => {
  const check = checkValidation(data, rules);
  return check === true ? nextFunction() : displayError(check.error, response);
};
