/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromise from 'chai-as-promised';
import models from '<serverModels>';
import { newArticle, getArticleData } from '<fixtures>/article';
import { getUserId, getCategoryId, getTagId } from '<test>/helpers/utils';

chai.use(chaiAsPromise);

const { expect } = chai;

chai.use(chaiHttp);

const { Article, sequelize } = models;

let article;
let articleData;
let articleId;
let tagId;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('Tag Article relationship', async () => {
  it('should tag an article', async () => {
    const newUserId = await getUserId('testarticle@email.com', 'testarticle2');
    const newCategoryId = await getCategoryId('technology');
    articleData = getArticleData(newArticle, { userId: newUserId, categoryId: newCategoryId });
    article = await Article.create(articleData);
    articleId = article.id;
    tagId = await getTagId('EPIC');
    const tagArticles = await article.addTags(tagId);
    const tagArticleId = tagArticles[0].dataValues.ArticleId;
    const tagArticleTagId = tagArticles[0].dataValues.TagId;

    expect(tagArticleId).to.be.equal(articleId);
    expect(tagArticleTagId).to.be.equal(tagId);
  });

  it('should return article tag', async () => {
    const tagId1 = await getTagId('EPIC');
    await article.addTags(tagId1);
    const tagId2 = await getTagId('Andela');
    await article.addTags(tagId2);
    const articleTags = await article.getTags();
    const articleTagsId = articleTags.map(getTags => getTags.dataValues.id);
    await expect(articleTagsId).to.be.an('array').that.does.include(tagId);
    await expect(articleTagsId).to.be.an('array').that.does.include(tagId2);
  });

  it('should not tag article twice with same tag name', async () => {
    const tagId1 = await getTagId('EPIC');
    await article.addTags(tagId1);
    const tagId2 = await getTagId('EPIC');
    await article.addTags(tagId2);
    const tagId3 = await getTagId('Andela');
    await article.addTags(tagId3);
    const tagId4 = await getTagId('Andela');
    await article.addTags(tagId4);
    const articleTags = await article.getTags();
    const numOfArticleTags = articleTags.length;

    expect(numOfArticleTags).to.equal(2);
    expect(numOfArticleTags).to.not.equal(4);
  });
});
