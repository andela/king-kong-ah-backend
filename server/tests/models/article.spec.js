/* eslint-disable no-console */
import models from '<serverModels>';
import { newArticle, getArticleData } from '<fixtures>/article';
import { createEllipsis } from '<helpers>/utils';
import { getUserId, getCategoryId } from '<test>/helpers/utils';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromise from 'chai-as-promised';

chai.use(chaiAsPromise);

const { expect } = chai;

chai.use(chaiHttp);

const { Article, sequelize } = models;

let article;
let articleData;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('Article Model', async () => {
  before(async () => {
    const newUserId = await getUserId('johnndoeh1@email.com', 'johnndoeeh2');
    const newCategoryId = await getCategoryId('technology');
    articleData = getArticleData(newArticle, { userId: newUserId, categoryId: newCategoryId });
  });

  it('should create an artcle', async () => {
    try {
      article = await Article.create(articleData);
    } catch (error) {
      console.log(error);
    }
    const {
      title, body, description, userId, isBlacklisted, categoryId, isPublished
    } = article;

    expect(articleData.title).to.be.equal(title);
    expect(articleData.body).to.be.equal(body);
    expect(articleData.userId).to.be.equal(userId);
    expect(articleData.isBlacklisted).to.be.equal(isBlacklisted);
    expect(articleData.categoryId).to.be.equal(categoryId);
    expect(articleData.isPublished).to.be.equal(isPublished);
    expect(description).to.be.equal(createEllipsis(body));
  });

  it('should delete an article', async () => {
    let found;
    try {
      await Article.destroy({ where: { id: article.id } });
      found = await Article.findOne({ where: { id: article.id } });
    } catch (error) {
      console.log(error);
    }
    expect(found).to.be.equal(null);
  });
});
