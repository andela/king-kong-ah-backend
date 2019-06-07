import { displayError, checkValidation } from '<helpers>/utils';
/**
   * validate endpoint
   * @param {Object} data - data to be validated
   * @param {Object} rules - rules for validation
   * @param {Object} res - response body
   * @param {Object} next - call next function
   * @returns {Boolean} true - if validation passes
   * @returns {Object} error Object - if validation fails
   */

const validate = (data, rules, res, next) => {
  const check = checkValidation(data, rules);
  if (check === true) {
    next();
  } else {
    displayError(check.error, res);
  }
};


export default validate;
