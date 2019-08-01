import models from '<serverModels>';

const { Rating, sequelize } = models;


const getArticleRating = async (articleId) => {
  const { dataValues } = await Rating.findOne({
    where: { articleId },
    attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
  });
  const { averageRating } = dataValues;
  return Math.round(averageRating);
};
export default getArticleRating;
