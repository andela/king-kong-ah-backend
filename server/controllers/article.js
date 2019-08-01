import models from '<serverModels>';
import { displayError, handleResponse, createEllipsis } from '<helpers>/utils';
import getReadingTime from '<helpers>/articleReadingTime';
import findArticle from '<helpers>/findExistingArticle';
import { getArticleRating, appendRating } from '<helpers>/getArticleRating';

const { Article, User } = models;

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
    return handleResponse(newArticle, 'Article created successfully', res, 'success', 201);
  } catch (error) {
    displayError(error, res, 500);
  }
};

export const getArticles = async (req, res) => {
  let articles;
  try {
    articles = await Article.findAll({
      where: { isPublished: true }
    });

    if (!articles.length) {
      handleResponse(null, 'No article published at the moment', res, 'failed', 404);
    } else {
      const newArticles = await appendRating(articles);
      handleResponse(newArticles, 'Article retrieved successfully', res, 'success', 200);
    }
  } catch (error) {
    displayError(error, res, 500);
  }
};

export const getArticlesByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName'],
        }
      ],
      where: { categoryId: id, isPublished: true }
    });

    if (!articles.length) {
      handleResponse(null, 'There are no articles in this category yet', res, 'failed', 404);
    } else {
      const newArticles = await appendRating(articles);
      handleResponse(newArticles, 'Article retrieved successfully', res, 'success', 200);
    }
  } catch (error) {
    displayError(error, res, 500);
  }
};

export const getArticle = async (req, res) => {
  try {
    const article = await findArticle(req);

    if (!article) {
      handleResponse(null, 'No article with this id found', res, 'failed', 404);
    } else {
      const averageRating = await getArticleRating(article.id, res);
      article.dataValues.rating = averageRating;

      handleResponse(article, 'Article retrieved successfully', res, 'success', 200);
    }
  } catch (error) {
    displayError(error, res, 500);
  }
};

export const updateArticle = async (req, res) => {
  const { title, body } = req.body;

  try {
    const article = await findArticle(req, res);
    if (!article) {
      handleResponse(null, 'No article with this id found', res, 'failed', 404);
    } else {
      const readingTime = getReadingTime(title.concat(' ', body));
      const description = createEllipsis(body);
      const updatedArticle = await article.update({
        title,
        body,
        readingTime,
        description
      });
      handleResponse(updatedArticle, 'Article updated successfully', res, 'success', 200);
    }
  } catch (error) {
    displayError(error, res, 500);
  }
};

export const deleteArticle = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    const article = await findArticle(req, res);
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
