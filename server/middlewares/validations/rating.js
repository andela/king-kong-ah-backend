import { validate, uuidFormat } from '<helpers>/utils';

/**
 * @param {string} id
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function} validate
 */
const validateRating = (id, req, res, next) => {
  const { rating } = req.body;
  const data = { id, rating };
  const ratingRules = {
    rating: 'required|integer|min:1|max:5',
    id: ['required', uuidFormat],
  };
  validate(data, ratingRules, res, next);
};

/**
 * validate create article endpoint
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @param {Object} next - call next function
 * @returns {Function} validateRating
 */
export const validateCreateRating = (req, res, next) => {
  const { articleId } = req.body;
  validateRating(articleId, req, res, next);
};

/**
 * validate create article endpoint
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @param {Object} next - call next function
 * @returns {Function} validateRating
 */
export const validateUpdateRating = (req, res, next) => {
  const ratingId = req.params.id;
  validateRating(ratingId, req, res, next);
};
