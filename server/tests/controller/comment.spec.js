/* eslint-disable no-console */
import chai from 'chai';
import app from '<server>/app';
import sinon from 'sinon';
import models from '<server>/models';
import { getComment } from '<fixtures>/comment';
import createComment from '<controllers>/comment';
import validateComment from '<validations>/comment';
import { getUserData } from '<fixtures>/user';
import {
  getModelObjectId, signupUser, loginUser, verifyUser
} from '<test>/helpers/utils';
import { req, res } from '<fixtures>/utils';

const { expect } = chai;

const {
  Comment, User, Category, Article
} = models;

let userId, articleId;

const wrongId = '6e10f658-efd2-4bb9-9793-eaafc1fca7fd';

const agent = chai.request.agent(app);

describe('Comments', () => {
  before(async () => {
    const data = {
      email: 'johndoe89@email.com',
      username: 'johndoeeyugi',
      password: '123456abcdef'
    };
    try {
      await signupUser(agent, data);
      await loginUser(agent, { email: 'johndoe89@email.com', password: '123456abcdef' });
      const categoryId = await getModelObjectId(Category, { name: 'Technology' });
      userId = await getModelObjectId(User, getUserData({ email: 'gbohunmi@gmail.com', password: 'gbohunmi', username: 'etowersmember' }));
      articleId = await getModelObjectId(Article, {
        categoryId,
        title: 'Sample Title',
        body: 'This is a sample article body',
        userId
      });
    } catch (error) {
      console.log(error);
    }
  });

  it('should not create a comment on an existing article when the user is not verified', (done) => {
    agent
      .post(`/api/v1/comments/${articleId}`)
      .send(getComment({ userId, articleId }))
      .then((res) => {
        expect(res).to.have.status(403);
        expect(res.body.message).to.equal('Kindly go to your email to verify your account');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('should not create a comment with the wrong article ID', (done) => {
    agent
      .post(`/api/v1/comments/${wrongId}`)
      .send(getComment({ userId, articleId: wrongId }))
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('should not create a comment without a comment', (done) => {
    agent
      .post(`/api/v1/comments/${articleId}`)
      .send(getComment({ comment: '', userId: wrongId, articleId }))
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('should create a comment on an existing article when the user is verified', (done) => {
    verifyUser(agent, getUserData({ email: 'neyo@email.com', username: 'neyolola' }))
      .then(() => {
        agent
          .post(`/api/v1/comments/${articleId}`)
          .send(getComment({ userId, articleId }))
          .then((res) => {
            expect(res).to.have.status(201);
            expect(res.body.message).to.equal('Comment created successfully');
            expect(res.body).to.have.property('data');
            done();
          });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('should return server error for comment', async () => {
    const req = { body: {} };
    const res = {
      status() {},
      json() {}
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(Comment, 'create').throws();
    await createComment(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });

  it('should return server error for comment', async () => {
    try {
      await validateComment(req, res);
    } catch (error) {
      expect(error).to.not.equal(undefined);
      expect(error).to.be.instanceOf(Error);
    }
  });
});
