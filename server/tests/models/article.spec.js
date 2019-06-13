/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromise from 'chai-as-promised';
import models from '<serverModels>';
import { newArticle, getArticleData } from '<fixtures>/article';
import { createEllipsis } from '<helpers>/utils';
import { getUserId, getCategoryId } from '<test>/helpers/utils';

chai.use(chaiAsPromise);

const { expect } = chai;

chai.use(chaiHttp);

const {
  Article,
  sequelize
} = models;

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
  it('should create an artcle', async () => {
    try {
      const newUserId = await getUserId('johnndoeh@email.com', 'johnndoeeh');
      const newCategoryId = await getCategoryId('technology');
      articleData = getArticleData(newArticle, { userId: newUserId, categoryId: newCategoryId });
      article = await Article.create(articleData);

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
    } catch (error) {
      console.log(error);
    }
  });

  it('should delete an article', async () => {
    try {
      article = await Article.create(articleData);
      expect(article.id).to.be.a('string');
      await Article.destroy({ where: { id: article.id } });
      expect(Article.findOne({ where: { id: article.id } })).to.rejectedWith(Error);
    } catch (error) {
      console.log(error);
    }
  });
});
