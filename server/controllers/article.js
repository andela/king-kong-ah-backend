import models from '<serverModels>';
import { displayError, handleSuccessResponse } from '../helpers/utils';

const { Article } = models;

export const createArticle = async (req, res) => {
  const { title, body } = req.body;

  const { categoryId } = req.body;

  const { userId } = req;

  try {
    const newArticle = await Article.create({
      title,
      body,
      userId,
      categoryId
    });

    return handleSuccessResponse(newArticle, 'Article created successfully', res, 201);
  } catch (error) {
    const err = new Error('Server error');
    return displayError(err, res, 500);
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { isPublished: true }
    });

    if (!articles.length) {
      handleSuccessResponse(null, 'No article published at the moment', res, 200);
    } else {
      handleSuccessResponse(articles, 'Article retrieved successfully', res, 200);
    }
  } catch (error) {
    const err = new Error('Server error');
    displayError(err, res, 500);
  }
};
