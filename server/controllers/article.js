import models from '<serverModels>';
import { displayError, handleSuccessResponse } from '../helpers/utils';

const { Article } = models;

const createArticle = async (req, res) => {
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

export default createArticle;
