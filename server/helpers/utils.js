import slug from 'slug';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

export const uuidFormat = 'regex:/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[34][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/';

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
 * @param {string} isVerified
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @param {string} email
 * @return {string} token
 */
export const tokenGenerator = (id, isVerified, tokenExpiryDate = '1h', secret = 'secret', email) => {
  const payload = { id, isVerified };
  if (email) {
    payload.email = email;
  }
  const token = jwt.sign(payload, secret, { expiresIn: tokenExpiryDate });
  return token;
};

/**
 * @param {string} id
 * @param {string} isVerified
 * @param {string} cookieExpiryDate
 * @param {object} res
 * @return {string} cookie
 */
export const cookieGenerator = (id, isVerified, cookieExpiryDate = 3.6e6, res) => res.cookie(
  'access-token',
  { token: tokenGenerator(id, isVerified, process.env.TOKEN_EXPIRY_DATE, process.env.SECRET) },
  {
    httpOnly: true,
    secure: false,
    maxAge: cookieExpiryDate
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
 * @param {number} status
 * @returns {Object} response body - statusCode and errorMessage
 */
export const displayError = (err, res, status = 400) => {
  res.status(status).json({
    status,
    message: err.message
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
/**
 * @param {string} hashPwd
 * @param {string} password
 * @return {string} hash
 */
export const comparePassword = (hashPwd, password) => bcrypt.compareSync(password, hashPwd);

/**
 * @param {string} token
 * @return {object} decodeToken
 */
export const decodeToken = token => jwt.verify(token, process.env.SECRET);

/**
 * @param {object} data
 * @param {string} message
 * @param {object} res
 * @param {number} status
 * @return {object} response
 */
export const handleSuccessResponse = (data, message, res, status = 200) => (
  res.status(status).json({
    status: 'success',
    message,
    data
  })
);

/**
 * @param {object} data
 * @param {string} message
 * @param {object} res
 * @param {string} status
 * @param {number} statusCode
 * @return {object} response
 */
export const handleResponse = (data, message, res, status, statusCode) => (
  res.status(statusCode).json({
    status,
    message,
    data
  })
);
