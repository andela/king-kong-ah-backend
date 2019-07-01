import models from '<serverModels>';
import { displayError, handleResponse } from '../helpers/utils';

const { Article } = models;

export const createArticle = async (req, res) => {
  const { title, body, categoryId } = req.body;

  const { userId } = req;

  try {
    const newArticle = await Article.create({
      title,
      body,
      userId,
      categoryId
    });

    return handleResponse(
      newArticle,
      'Article created successfully',
      res,
      'success',
      201
    );
  } catch (error) {
    return displayError(error, res, 500);
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { isPublished: true }
    });

    if (!articles.length) {
      handleResponse(
        null,
        'No article published at the moment',
        res,
        'failed',
        404
      );
    } else {
      handleResponse(
        articles,
        'Article retrieved successfully',
        res,
        'success',
        200
      );
    }
  } catch (error) {
    displayError(error, res, 500);
  }
};

export const getArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findOne({
      where: { id }
    });

    if (!article) {
      handleResponse(null, 'No article with this id found', res, 'failed', 404);
    } else {
      handleResponse(
        article,
        'Article retrieved successfully',
        res,
        'success',
        200
      );
    }
  } catch (error) {
    displayError(error, res, 500);
  }
};

export const updateArticle = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  const { title, body } = req.body;
  try {
    const article = await Article.findOne({
      where: { id, userId }
    });
    if (!article) {
      handleResponse(null, 'No article with this id found', res, 'failed', 404);
    } else {
      const updatedArticle = await article.update({
        title,
        body
      });
      handleResponse(
        updatedArticle,
        'Article updated successfully',
        res,
        'success',
        200
      );
    }
  } catch (error) {
    displayError(error, res, 500);
  }
};

export const deleteArticle = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    const article = await Article.findOne({
      where: { id, userId }
    });

    if (!article) {
      handleResponse(null, 'No article with this id found', res, 'failed', 404);
    } else {
      await Article.destroy({
        where: { id, userId }
      });
      handleResponse(null, 'Article deleted successfully', res, 'success', 200);
    }
  } catch (error) {
    displayError(error, res, 500);
  }
};
