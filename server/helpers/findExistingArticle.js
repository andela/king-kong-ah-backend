import models from '<serverModels>';
import { displayError } from '<helpers>/utils';

const { Article } = models;

const findArticle = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    let article;
    if (userId) {
      article = await Article.findOne({
        where: { id, userId }
      });
    } else {
      article = await Article.findOne({
        where: { id }
      });
    }
    return article;
  } catch (error) {
    displayError(error, res, 500);
  }
};
export default findArticle;
