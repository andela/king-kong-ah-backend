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

describe('Reading stats relationship', () => {
  before(async () => {
    try {
      newUser = await User.create(getUserData({
        email: 'abdc@gf.com', username: 'alphabet'
      }));

      const category = await Category.create({ name: 'code' });

      newArticle = await Article.create(getArticleData(
        article,
        {
          userId: newUser.id,
          categoryId: category.id,
          title: 'Hello kingkong dev oo'
        }
      ));
    } catch (error) {
      console.log(error);
    }
  });

  it('should read an article', async () => {
    let read;

    try {
      read = await newUser.addRead(newArticle.dataValues.id);
    } catch (error) {
      console.log(error);
    }

    const readArticleId = read[0].dataValues.ArticleId;
    const readUserId = read[0].dataValues.UserId;

    expect(newUser.id).to.be.equal(readUserId);
    expect(newArticle.id).to.be.equal(readArticleId);
  });

  it('should not read article more than once', async () => {
    let read;

    try {
      await newUser.addRead(newArticle.dataValues.id);
      read = await newUser.getRead();
    } catch (error) {
      console.log(error);
    }

    const returnedArticle = read[0].dataValues;

    expect(read.length).to.be.equal(1);
    expect(returnedArticle.id).to.be.equal(newArticle.id);
  });
});
