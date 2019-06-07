import Validator from 'validatorjs';

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
  const status = err.status || 500;
  res.status(status).json({
    status,
    error: err.message,
  });
};

export default {
  displayError,
  checkValidation
};
