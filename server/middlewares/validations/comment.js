import { validate, displayError, decodeToken } from '<helpers>/utils';
import model from '<serverModels>';

const { Article } = model;

/**
 * validate create article endpoint
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @param {Object} next - call next function
 * @returns {Function} validate - call validate function
 */
const validateComment = async (req, res, next) => {
  const { token } = req.cookies['access-token'];


  const { comment, type } = req.body;

  try {
    const { id } = decodeToken(token);
    req.userId = id;
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      const err = new Error('This article does not exist');
      return displayError(err, res, 404);
    }

    req.articleId = article.dataValues.id;
  } catch (error) {
    const err = new Error(error);
    displayError(err, res, 500);
  }
  const data = {
    comment,
    type
  };

  const rules = {
    comment: 'required|string',
    type: 'required|string'
  };

  validate(data, rules, res, next);
};

export default validateComment;
