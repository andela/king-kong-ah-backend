/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';

import models from '<server>/models';
import app from '<server>/app';
import { loginUser, getModelObjectId } from '<test>/helpers/utils';
import { getUserData } from '<fixtures>/user';

chai.use(chaiHttp);

const { expect } = chai;
const agent = chai.request.agent(app);
const {
  Rating,
  User,
  Article,
  Category
} = models;

let articleId;
let userId;
let authorId;
let userArticleId;

describe('Rating - controller', () => {
  before(async () => {
    try {
      userId = await getModelObjectId(User, getUserData({
        email: 'rating@email.com',
        username: 'ratingsss',
        password: '123456abcdef',
        isVerified: true
      }));

      authorId = await getModelObjectId(User, getUserData({ email: 'differentUser@email.com', username: 'differentuser' }));

      await loginUser(agent, ({ email: 'rating@email.com', password: '123456abcdef' }));

      const categoryId = await getModelObjectId(Category, { name: 'technology' });

      articleId = await getModelObjectId(Article, {
        title: 'Sample Title',
        body: 'This is a sample article body',
        userId: authorId,
        categoryId
      });

      userArticleId = await getModelObjectId(Article, {
        title: 'Sample Title',
        body: 'This is a sample article body',
        userId,
        categoryId
      });
    } catch (e) {
      console.log(e);
    }
  });

  after(() => { agent.close(); });

  it('should rate an article', (done) => {
    agent
      .post('/api/v1/ratings')
      .send({ articleId, rating: 4 })
      .then((res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body)
          .to.have.property('message')
          .equal('Successfully created rating');
        expect(res.body.data.rating).to.equal(4);
        expect(res.body.data.articleId).to.equal(articleId);
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('should prevent authors from rating own article', (done) => {
    agent
      .post('/api/v1/ratings')
      .send({ articleId: userArticleId, rating: 1 })
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body)
          .to.have.property('message')
          .equal('Cannot rate own article');
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('should update an existing article rating', async () => {
    getModelObjectId(Rating, { articleId, userId })
      .then((ratingId) => {
        agent
          .patch(`/api/v1/ratings/${ratingId}`)
          .send({ rating: 1 })
          .then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body)
              .to.have.property('message')
              .equal('Successfully updated rating');
            expect(res.body.data.rating).to.equal(1);
            expect(res.body.data.articleId).to.equal(articleId);
          }).catch((err) => {
            console.log(err);
          });
      });
  });

  it('should return error 404 for non-existing article', (done) => {
    agent
      .post('/api/v1/ratings')
      .send({ articleId: userId, rating: 5 })
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('Article not found');
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('should return error 404 for non-existing user article rating', (done) => {
    agent
      .patch(`/api/v1/ratings/${articleId}`)
      .send({ rating: 5 })
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('Rating not found');
        done();
      }).catch((err) => {
        done(err);
      });
  });
});
