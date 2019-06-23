import models from '<serverModels>';
import { displayError, handleSuccessResponse, } from '<helpers>/utils';

const { Rating, Article } = models;

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
export const createRating = async (req, res) => {
  const { userId } = req;
  const { articleId, rating } = req.body;
  const newRating = { userId, articleId, rating };

  try {
    const article = await Article.findOne({ where: { id: articleId } });

    if (article.userId === userId) {
      const err = new Error('Cannot rate own article');
      return displayError(err, res, 403);
    }

    const articleRating = await Rating.create(newRating);
    handleSuccessResponse(articleRating, 'Successfully created rating', res, 201);
  } catch (e) {
    const error = new Error('Article not found');
    displayError(error, res, 404);
  }
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
export const updateRating = async (req, res) => {
  const { userId } = req;
  const { rating } = req.body;
  const { id } = req.params;

  try {
    let articleRating = await Rating.findOne({ where: { id, userId } });
    if (!articleRating) {
      throw new Error('Rating not found');
    }
    articleRating = await articleRating.update({ rating });
    handleSuccessResponse(articleRating, 'Successfully updated rating', res, 200);
  } catch (error) {
    displayError(error, res, 404);
  }
};
