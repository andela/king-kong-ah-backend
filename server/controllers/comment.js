import models from '<serverModels>';
import { handleSuccessResponse, displayError } from '<helpers>/utils';

const { Comment } = models;

const createComment = async (req, res) => {
  const { comment, type } = req.body;
  const { userId, articleId } = req;

  const reqObject = {
    comment,
    userId,
    articleId,
    type
  };
  try {
    const data = await Comment.create(reqObject);

    return handleSuccessResponse(data, 'Comment created successfully', res, 201);
  } catch (error) {
    const err = new Error(error);
    displayError(err, res, 500);
  }
};

export default createComment;
