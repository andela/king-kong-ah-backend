/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromise from 'chai-as-promised';
import models from '<serverModels>';
import { getUserId, getArticleId } from '<test>/helpers/utils';

chai.use(chaiAsPromise);

const { expect } = chai;

chai.use(chaiHttp);

const { Comment, Article, sequelize } = models;

let userId;
let articleId;
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
      userId = await getUserId('johndoe@gmail.com', 'john1doe');
      articleId = await getArticleId('Sample Title', 'This is a sample article body', userId);
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
      userId = await getUserId('Matthewx@gmail.com', 'Matthew5X');
      articleId = await getArticleId(
        'Article to delete Title',
        'This is the body of an article to be deleted',
        userId
      );
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
      userId = await getUserId('Kylexy@gmail.com', 'kylexY3rt5');
      articleId = await getArticleId(
        'Article Title for blank comment',
        'This is the body of an Article for a blank comment',
        userId
      );

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
