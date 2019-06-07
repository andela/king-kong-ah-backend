import Validator from 'validatorjs';
import slug from 'slug';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET, TOKENEXPIRYDATE, COOKIEEXPIRYDATE } = process.env;
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
 * @param {string} title
 * @return {string} unique_slug
 */
const createUniqueSlug = title => `${slug(title, { lower: true })}-${Date.now()}`;

/**
   * Generates new token
   * @param {Object} id - id
   * @returns {Object} token - returns token
   */
export const tokenGenerator = (id) => {
  const payload = { id };
  const token = jwt.sign(payload, SECRET, { expiresIn: TOKENEXPIRYDATE });
  return token;
};
/**
   * Generates new token
   * @param {Object} id - id
   * @param {Object} res - response body
   * @returns {Object} token - returns token
   */
export const cookieGenerator = (id, res) => res.cookie(
  'access_token',
  { token: tokenGenerator(id) },
  {
    maxAge: COOKIEEXPIRYDATE,
    httpOnly: true,
    secure: true
  }
);
export default {
  displayError,
  checkValidation,
  createUniqueSlug,
  tokenGenerator,
  cookieGenerator
};
