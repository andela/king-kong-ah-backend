import models from '<serverModels>';

const { Rating, sequelize } = models;


export const getArticleRating = async (articleId) => {
  const { dataValues } = await Rating.findOne({
    where: { articleId },
    attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
  });
  const { averageRating } = dataValues;
  return Math.round(averageRating);
};

export const appendRating = async (articleData) => {
  const result = await Promise.all(
    articleData.map(async (article) => {
      const averageRating = await getArticleRating(article.id);
      article.dataValues.rating = averageRating;
      return article.dataValues;
    })
  );
  return result;
};
