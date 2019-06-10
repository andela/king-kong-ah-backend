import { validate } from '<helpers>/utils';

const uuidFormat = 'regex:/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[34][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/';

/**
   * validate create article endpoint
   * @param {Object} req - request body
   * @param {Object} res - response body
   * @param {Object} next - call next function
   * @returns {Function} validate - call validate function
   */
export const validateCreateArticle = (req, res, next) => {
  const {
    title, body, categoryId
  } = req.body;
  const data = {
    title,
    body,
    categoryId
  };
  const createArticleRules = {
    title: 'required|string|max:100',
    body: 'required|string',
    categoryId: ['required', uuidFormat]
  };
  validate(data, createArticleRules, res, next);
};
export default validateCreateArticle;
