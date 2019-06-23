/* eslint-disable no-console */
import chai from 'chai';
import models from '<serverModels>';
import { getModelObjectId } from '<test>/helpers/utils';
import { getUserData } from '<fixtures>/user';


const { expect } = chai;

const {
  Rating,
  Article,
  sequelize,
  User,
  Category,
} = models;

let userId;
let articleId;
let rating;
let newRating;
let nullRating;
let categoryId;

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
      categoryId = await getModelObjectId(Category, { name: 'technology' });
      userId = await getModelObjectId(User, getUserData({ email: 'rRacheback@gmail.com', username: 'Racheback345' }));
      articleId = await getModelObjectId(Article, {
        title: 'Sample Title',
        body: 'This is a sample article body',
        userId,
        categoryId
      });

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
      userId = await getModelObjectId(User, getUserData({ email: 'batccdwhs@gmail.com', username: 'batccdwhs432' }));
      articleId = await getModelObjectId(Article, {
        title: 'Article to delete Title',
        body: 'This is the body of an article to be deleted',
        userId,
        categoryId
      });

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
      userId = await getModelObjectId(User, getUserData({ email: 'Spiderfo@gmail.com', username: 'Spiderforet' }));
      articleId = await getModelObjectId(Article, {
        title: 'Article Title for error rating',
        body: 'This is the body of an Article for an error rating',
        userId,
        categoryId
      });

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
      userId = await getModelObjectId(User, getUserData({ email: 'RAvefater@gmail.com', username: 'RAvefater432' }));
      articleId = await getModelObjectId(Article, {
        title: 'Article Title for error rating',
        body: 'This is the body of an Article for an error rating',
        userId,
        categoryId
      });

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
