/* eslint-disable no-console */
import chai from 'chai';
import models from '<serverModels>';
import { getUserData } from '<fixtures>/user';
import {
  getArticleData, newArticle as article
} from '<fixtures>/article';

const { expect } = chai;

const {
  User, Article, Category, sequelize
} = models;

let newUser;
let newArticle;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('Bookmark relationship', () => {
  before(async () => {
    try {
      newUser = await User.create(getUserData({
        email: 'abdc@gfhlo.com', username: 'alphabetnum'
      }));

      const category = await Category.create({ name: 'nature' });

      newArticle = await Article.create(getArticleData(
        article,
        {
          userId: newUser.id,
          categoryId: category.id,
          title: 'Hello kingkong mama'
        }
      ));
    } catch (error) {
      console.log(error);
    }
  });

  it('should bookmark an article', async () => {
    let bookmark;

    try {
      bookmark = await newUser.addBookmark(newArticle.dataValues.id);
    } catch (error) {
      console.log(error);
    }

    const bookmarkedArticleId = bookmark[0].dataValues.articleId;
    const bookmarkedUserId = bookmark[0].dataValues.userId;

    expect(newUser.id).to.be.equal(bookmarkedUserId);
    expect(newArticle.id).to.be.equal(bookmarkedArticleId);
  });

  it('should not bookmark an article more than once', async () => {
    let bookmark;

    try {
      await newUser.addBookmark(newArticle.dataValues.id);
      bookmark = await newUser.getBookmark();
    } catch (error) {
      console.log(error);
    }

    const returnedArticle = bookmark[0].dataValues;

    expect(bookmark.length).to.be.equal(1);
    expect(returnedArticle.id).to.be.equal(newArticle.id);
  });
});
