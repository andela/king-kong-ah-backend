/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '<server>/app';
import models from '<server>/models';
import { article } from '<fixtures>/article';
import createArticle from '<controllers>/article';
import { signupUser, getCategoryId } from '<test>/helpers/utils';

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
  it('should create a new article', (done) => {
    article.categoryId = categoryId;
    signupUser(agent)
      .then(() => {
        agent
          .post('/api/v1/articles')
          .send(article)
          .then((res) => {
            expect(res.status).to.be.equal(201);
            expect(res).to.have.status(201);
            expect(res.body)
              .to.have.property('message')
              .equal('Article created successfully');
          });
        done();
      })
      .catch((err) => {
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
    console.log(req.body);
    expect(res.status).to.have.been.calledWith(500);
  });
});
