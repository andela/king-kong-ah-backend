/* eslint-disable no-console */
import chai from 'chai';
import models from '<serverModels>';
import { newArticle, getArticleData } from '<fixtures>/article';
import {
  getModelObjectId,
} from '<test>/helpers/utils';
import { getUserData } from '<fixtures>/user';


const { expect } = chai;
const {
  Article,
  sequelize,
  User,
  Category,
  Tag,
} = models;

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

describe('Tag Article relationship', () => {
  let tags;
  let tagsId;
  let tagArticleId;
  let tagArticleTagId;
  let articleTagsId;
  let articleTags;
  let numOfArticleTags;

  before(async () => {
    try {
      const newUserId = await getModelObjectId(User, getUserData({ email: 'testarticle@email.com', username: 'testarticle2' }));
      const newCategoryId = await getModelObjectId(Category, { name: 'technology' });
      articleData = getArticleData(newArticle, { userId: newUserId, categoryId: newCategoryId });
      article = await Article.create(articleData);
    } catch (error) {
      console.log(error);
    }
  });

  it('should tag an article', async () => {
    try {
      articleId = article.id;
      tagId = await getModelObjectId(Tag, { name: 'EPIC' });
      const tagArticles = await article.addTags(tagId);
      tagArticleId = tagArticles[0].dataValues.ArticleId;
      tagArticleTagId = tagArticles[0].dataValues.TagId;
    } catch (error) {
      console.log(error);
    }

    expect(tagArticleId).to.be.equal(articleId);
    expect(tagArticleTagId).to.be.equal(tagId);
  });

  it('should return article tag', async () => {
    try {
      articleId = article.id;
      const articles = await Article.findByPk(articleId);
      tags = ['EPIC', 'Andela'];
      tagsId = [];

      const tagArticles = tags.map(async (tag) => {
        tagId = await getModelObjectId(Tag, { name: tag });
        tagsId.push(tagId);
        await articles.addTags(tagId);
      });

      await Promise.all(tagArticles);

      articleTags = await articles.getTags();
      articleTagsId = articleTags.map(getTags => getTags.dataValues.id);
    } catch (error) {
      console.log(error);
    }

    expect(articleTagsId).to.be.an('array').that.does.include(tagsId[0]);
    expect(articleTagsId).to.be.an('array').that.does.include(tagsId[1]);
    expect(articleTagsId.length).to.equal(tagsId.length);
  });

  it('should not tag article with same tag name more than once', async () => {
    try {
      articleId = article.id;
      const articles = await Article.findByPk(articleId);

      tags = ['EPIC', 'Andela', 'EPIC', 'Andela'];
      tagsId = [];

      const tagArticles = tags.map(async (tag) => {
        tagId = await getModelObjectId(Tag, { name: tag });
        tagsId.push(tagId);
        await articles.addTags(tagId);
      });

      await Promise.all(tagArticles);

      articleTags = await article.getTags();
      numOfArticleTags = articleTags.length;
    } catch (error) {
      console.log(error);
    }

    expect(numOfArticleTags).to.equal(2);
    expect(numOfArticleTags).to.not.equal(4);
    expect(numOfArticleTags).to.not.equal(tagsId.length);
  });
});
