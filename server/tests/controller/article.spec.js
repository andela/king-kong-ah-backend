/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '<server>/app';
import models from '<server>/models';
import { article, newArticle, getArticleData } from '<fixtures>/article';
import { createArticle, getArticles } from '<controllers>/article';
import {
  getCategoryId,
  signupUser,
  loginUser,
  verifyUser,
  getUserId
} from '<test>/helpers/utils';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);

const { Article, sequelize } = models;

let categoryId;

before(async () => {
  try {
    await sequelize.sync({ force: true });
    categoryId = await getCategoryId('technology');
  } catch (error) {
    console.log(error);
  }
});

afterEach(() => sinon.restore());

const agent = chai.request.agent(app);

describe('Create an Article', async () => {
  before(async () => {
    await signupUser(agent);
    await loginUser(agent);
    article.categoryId = categoryId;
  });

  it('should not create an article if user is not verified', (done) => {
    agent
      .post('/api/v1/articles')
      .send(article)
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body)
          .to.have.property('message')
          .equal('Kindly go to your email to verify your account');
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('should return server error for create article', async () => {
    const req = { body: {}, user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' } };
    const res = {
      status() {},
      json() {}
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(Article, 'create').throws();
    await createArticle(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });
});

describe('Get articles', () => {
  it('should not get articles if no article is published', (done) => {
    agent
      .get('/api/v1/articles')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body)
          .to.have.property('message')
          .equal('No article published at the moment');
        done();
      }).catch((err) => {
        console.log(err);
      });
  });

  it('should get all articles', async () => {
    const newUserId = await getUserId('johnson@email.com', 'johnson');
    const newCategoryId = await getCategoryId('fashion');
    const articleData = getArticleData(newArticle, {
      userId: newUserId, categoryId: newCategoryId, isPublished: true
    });
    await Article.create(articleData);
    agent
      .get('/api/v1/articles')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body)
          .to.have.property('message')
          .equal('Article retrieved successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should create a new article if user is verified', (done) => {
    const data = {
      email: 'victor@email.com', username: 'victorvic', password: '123456abcdef'
    };
    verifyUser(agent, data)
      .then(() => {
        agent
          .post('/api/v1/articles')
          .send(article)
          .end((err, res) => {
            expect(res.status).to.be.equal(201);
            expect(res).to.have.status(201);
            expect(res.body)
              .to.have.property('message')
              .equal('Article created successfully');
            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should return server error get all articles', async () => {
    const req = {};
    const res = {
      status() {},
      json() {}
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(Article, 'findAll').throws();
    await getArticles(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });
});
