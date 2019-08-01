/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '<server>/app';
import models from '<server>/models';
import {
  article,
  newArticle,
  getArticleData
} from '<fixtures>/article';
import { getUserData } from '<fixtures>/user';
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory
} from '<controllers>/article';
import {
  getModelObjectId,
  signupUser,
  loginUser,
  verifyUser
} from '<test>/helpers/utils';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);

const {
  Article, sequelize, Category, User
} = models;

let categoryId;
let articleId;


let data = {
  email: 'victor@email.com',
  username: 'victorvic',
  password: '123456abcdef'
};

const agent = chai.request.agent(app);

before(async () => {
  try {
    await sequelize.sync({ force: true });
    categoryId = await getModelObjectId(Category, { name: 'technology' });
    await signupUser(agent, data);
    await loginUser(agent, data);

    article.categoryId = categoryId;
  } catch (error) {
    console.log(error);
  }
});

afterEach(() => sinon.restore());


describe('Create an Article', () => {
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
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return server error for create article', async () => {
    try {
      const req = {
        body: {},
        user: { userId: 'f1e2e1c8-6a90-4bcd-b349-49f989d311d6' }
      };
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Article, 'create').throws();
      await createArticle(req, res);
      expect(res.status).to.have.been.calledWith(500);
    } catch (error) {
      console.log(error);
    }
  });
});

describe('Get articles', () => {
  it('should not get articles if no article is published', (done) => {
    agent
      .get('/api/v1/articles')
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('No article published at the moment');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should get all articles', async () => {
    try {
      const newUserId = await getModelObjectId(
        User,
        getUserData({ email: 'johnson@email.com', username: 'johnson' })
      );
      const newCategoryId = await getModelObjectId(Category, {
        name: 'fashion'
      });
      const articleData = getArticleData(newArticle, {
        userId: newUserId,
        categoryId: newCategoryId,
        isPublished: true
      });
      await Article.create(articleData);
      const res = await agent.get('/api/v1/articles');
      expect(res.status).to.be.equal(200);
      expect(res.body)
        .to.have.property('message')
        .equal('Article retrieved successfully');
    } catch (error) {
      console.log(error);
    }
  });

  it('should create a new article if user is verified', (done) => {
    data = {
      email: 'victory@email.com',
      username: 'victorys',
      password: '123456abcdef'
    };
    verifyUser(agent, data)
      .then(() => {
        agent
          .post('/api/v1/articles')
          .send(article)
          .end((err, res) => {
            articleId = res.body.data.id;
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

  it('should return server error for get all articles', async () => {
    try {
      const req = {};
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Article, 'findAll').throws();
      await getArticles(req, res);
      expect(res.status).to.have.been.calledWith(500);
    } catch (error) {
      console.log(error);
    }
  });

  it('should get a single article by Id', (done) => {
    agent
      .get(`/api/v1/articles/${articleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body)
          .to.have.property('message')
          .equal('Article retrieved successfully');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should get a single article by Id', (done) => {
    agent
      .get(`/api/v1/articles/${articleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.data)
          .to.have.property('rating')
          .equal(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should not get a single article by Id if Id can not be found', (done) => {
    const invalidArticleId = '6bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba';
    agent
      .get(`/api/v1/articles/${invalidArticleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('No article with this id found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return 400 for invalid uuid param', (done) => {
    const invalidArticleId = '123456789';
    agent
      .get(`/api/v1/articles/${invalidArticleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return server error for get a single article', async () => {
    try {
      const req = {};
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Article, 'findOne').throws();
      await getArticle(req, res);
      expect(res.status).to.have.been.calledWith(500);
    } catch (error) {
      console.log(error);
    }
  });
});

describe('Update article', () => {
  it('should update an article that a user authored', (done) => {
    agent
      .patch(`/api/v1/articles/${articleId}`)
      .send(
        getArticleData({
          title: 'New Article',
          body: 'This is the new article'
        })
      )
      .then((res) => {
        expect(res.status).to.be.equal(200);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should return 404 if article can not be found', (done) => {
    const invalidArticleId = '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba';
    agent
      .patch(`/api/v1/articles/${invalidArticleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('No article with this id found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return server error for update article', async () => {
    try {
      const req = {
        body: {},
        params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }
      };
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Article, 'findOne').returnsThis();
      sinon.stub(Article, 'update').throws();
      await updateArticle(req, res);
      expect(res.status).to.have.been.calledWith(500);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return 400 for invalid uuid param', (done) => {
    const invalidArticleId = '123456789';
    agent
      .patch(`/api/v1/articles/${invalidArticleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});


describe('Delete article', () => {
  it('should delete an article that a user authored', (done) => {
    agent
      .delete(`/api/v1/articles/${articleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body)
          .to.have.property('message')
          .equal('Article deleted successfully');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should return 404 if article can not be found', (done) => {
    const invalidArticleId = '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba';
    agent
      .delete(`/api/v1/articles/${invalidArticleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('No article with this id found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return server error for delete article', async () => {
    try {
      const req = {
        params: { id: '7bc8c0fe-9e2a-4a6a-9e11-f6d85b5d8aba' }
      };
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Article, 'findOne').returnsThis();
      sinon.stub(Article, 'destroy').throws();
      await deleteArticle(req, res);
      expect(res.status).to.have.been.calledWith(500);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return 400 for invalid uuid param', (done) => {
    const invalidArticleId = '123456789';
    agent
      .delete(`/api/v1/articles/${invalidArticleId}`)
      .then((res) => {
        expect(res.status).to.be.equal(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('Get articles by category', () => {
  it('should get all articles by category', async () => {
    try {
      const newUserId = await getModelObjectId(
        User,
        getUserData({ email: 'simi@email.com', username: 'simi' })
      );
      const newCategoryId = await getModelObjectId(Category, {
        name: 'romance'
      });
      const articleData = getArticleData(newArticle, {
        userId: newUserId,
        categoryId: newCategoryId,
        isPublished: true
      });
      await Article.create(articleData);
      const res = await agent.get(`/api/v1/articles/${newCategoryId}/category`);
      expect(res.status).to.be.equal(200);
      expect(res.body)
        .to.have.property('message')
        .equal('Article retrieved successfully');
      expect(res.body.data[0].user).to.have.property('firstName', 'testing');
      expect(res.body.data[0].user).to.have.property('lastName', 'testing');
    } catch (error) {
      console.log(error);
    }
  });

  it('should not get all articles by category', async () => {
    try {
      const newUserId = await getModelObjectId(
        User,
        getUserData({ email: 'simisola@email.com', username: 'simisola' })
      );
      const newCategoryId = await getModelObjectId(Category, {
        name: 'romance'
      });
      const articleData = getArticleData(newArticle, {
        userId: newUserId,
        categoryId: newCategoryId,
        isPublished: true
      });
      await Article.create(articleData);
      const res = await agent.get('/api/v1/articles/e0ce07aa-4e05-4078-8d51-f2a96689ff72/category');
      expect(res.status).to.be.equal(404);
      expect(res.body)
        .to.have.property('message')
        .equal('There are no articles in this category yet');
    } catch (error) {
      console.log(error);
    }
  });

  it('should return server error for get all articles by id', async () => {
    try {
      const req = { params: 'e0ce07aa-4e05-4078-8d51-f2a96689ff72' };
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Article, 'findAll').throws();
      await getArticlesByCategory(req, res);
      expect(res.status).to.have.been.calledWith(500);
    } catch (error) {
      console.log(error);
    }
  });
});
