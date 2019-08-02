import models from '<serverModels>';
import { displayError } from '<helpers>/utils';

const { Article, User } = models;

const findArticle = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    let article;
    if (userId) {
      article = await Article.findOne({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'profileImage'],
          }
        ],
        where: { id, userId }
      });
    } else {
      article = await Article.findOne({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'profileImage'],
          }
        ],
        where: { id }
      });
    }
    return article;
  } catch (error) {
    displayError(error, res, 500);
  }
};
export default findArticle;
