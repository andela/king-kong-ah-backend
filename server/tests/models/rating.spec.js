/* eslint-disable no-console */
import chai from 'chai';
import models from '<serverModels>';
import { getUserId, getArticleId } from '<test>/helpers/utils';

const { expect } = chai;

const { Rating, Article, sequelize } = models;

let userId;
let articleId;
let rating;
let newRating;
let nullRating;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('Rating Model', () => {
  it('should rate an article', async () => {
    try {
      userId = await getUserId('Racheback@gmail.com', 'Racheback345');
      articleId = await getArticleId('Sample Title', 'This is a sample article body', userId);

      rating = 4;

      newRating = await Rating.create({
        rating,
        userId,
        articleId
      });
    } catch (error) {
      console.log(error);
    }

    expect(rating).to.be.equal(newRating.rating);
    expect(articleId).to.be.equal(newRating.articleId);
    expect(userId).to.be.equal(newRating.userId);
  });

  it('should delete a rating when an Article associated with it is deleted', async () => {
    try {
      userId = await getUserId('batccdwhs@gmail.com', 'batccdwhs432');
      articleId = await getArticleId(
        'Article to delete Title',
        'This is the body of an article to be deleted',
        userId
      );

      rating = 4;

      newRating = await Rating.create({
        rating,
        userId,
        articleId
      });

      await Article.destroy({ where: { id: articleId } });
      nullRating = await Rating.findByPk(newRating.id);
    } catch (error) {
      console.log(error);
    }
    expect(nullRating).to.be.a('null');
  });

  it('should return error if rating is less than one', async () => {
    try {
      userId = await getUserId('Spiderfo@gmail.com', 'Spiderforet');
      articleId = await getArticleId(
        'Article Title for error rating',
        'This is the body of an Article for an error rating',
        userId
      );

      rating = -2;

      await Rating.create({
        rating,
        userId,
        articleId
      });
    } catch (error) {
      expect(error.errors[0].type).to.be.equal('Validation error');
      expect(error.errors[0].message).to.be.equal('Rating cannot be less than one');
      expect(error.errors[0].validatorName).to.be.equal('min');
    }
  });

  it('should return error if rating is more than five', async () => {
    try {
      userId = await getUserId('RAvefater@gmail.com', 'RAvefater432');
      articleId = await getArticleId(
        'Article Title for error rating',
        'This is the body of an Article for an error rating',
        userId
      );

      rating = 6;

      await Rating.create({
        rating,
        userId,
        articleId
      });
    } catch (error) {
      expect(error.errors[0].type).to.be.equal('Validation error');
      expect(error.errors[0].message).to.be.equal('Rating cannot be more than five');
      expect(error.errors[0].validatorName).to.be.equal('max');
    }
  });
});
