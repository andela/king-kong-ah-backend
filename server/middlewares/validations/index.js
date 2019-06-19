import { validate, uuidFormat } from '<helpers>/utils';

/**
 * validate create article endpoint
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @param {Object} next - call next function
 * @returns {Function} validate - call validate function
 */
const validateUuidParams = (req, res, next) => {
  const { id } = req.params;
  const data = { id };
  const getUuidRules = {
    id: ['required', uuidFormat]
  };
  validate(data, getUuidRules, res, next);
};

export default validateUuidParams;
