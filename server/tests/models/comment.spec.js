/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromise from 'chai-as-promised';
import models from '<serverModels>';
import { getModelObjectId } from '<test>/helpers/utils';
import { getUserData } from '<fixtures>/user';


chai.use(chaiAsPromise);

const { expect } = chai;

chai.use(chaiHttp);

const {
  Comment,
  Article,
  sequelize,
  User,
  Category,
} = models;

let userId;
let articleId;
let categoryId;
let comment;
let type;
let newComment;
let nullComment;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('Comment Model', async () => {
  it('should create a comment', async () => {
    try {
      categoryId = await getModelObjectId(Category, { name: 'technology' });
      userId = await getModelObjectId(User, getUserData({ email: 'johndoe@gmail.com', username: 'john1doe' }));
      articleId = await getModelObjectId(Article, {
        title: 'Sample Title',
        body: 'This is a sample article body',
        userId,
        categoryId
      });
      comment = 'This is a sample comment';
      type = 'no idea';

      newComment = await Comment.create({
        comment,
        userId,
        articleId,
        type
      });
    } catch (error) {
      console.log(error);
    }

    expect(comment).to.be.equal(newComment.comment);
    expect(articleId).to.be.equal(newComment.articleId);
    expect(userId).to.be.equal(newComment.userId);
  });

  it('should delete a comment when the Article associated with it is deleted', async () => {
    try {
      userId = await getModelObjectId(User, getUserData({ email: 'Matthewx@gmail.com', username: 'Matthew5X' }));
      articleId = await getModelObjectId(Article, {
        title: 'Article to delete Title',
        body: 'This is the body of an article to be deleted',
        userId,
        categoryId
      });
      comment = 'I should be deleted when my Article is deleted';
      type = 'no idea';

      newComment = await Comment.create({
        comment,
        userId,
        articleId,
        type
      });

      await Article.destroy({ where: { id: articleId } });
      nullComment = await Comment.findByPk(newComment.id);
    } catch (error) {
      console.log(error);
    }
    expect(nullComment).to.be.a('null');
  });

  it('should return a validation error if an empty comment is inserted', async () => {
    try {
      userId = await getModelObjectId(User, getUserData({ email: 'Kylexy@gmail.com', username: 'kylexY3rt5' }));
      articleId = await getModelObjectId(Article, {
        title: 'Article Title for blank comment',
        body: 'This is the body of an Article for a blank comment',
        userId,
        categoryId
      });

      comment = '';
      type = '';

      await Comment.create({
        comment,
        userId,
        articleId,
        type
      });
    } catch (error) {
      expect(error.errors[0].type).to.be.equal('Validation error');
      expect(error.errors[0].message).to.be.equal('Comment should not be empty');
      expect(error.errors[0].validatorName).to.be.equal('notEmpty');
    }
  });
});
