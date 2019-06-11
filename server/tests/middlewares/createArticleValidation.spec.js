import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiUUID from 'chai-uuid';
import app from '<server>/app';
import {
  goodArticleData,
  getArticleData,
  emptyArticleData,
  invalidTitle,
  invalidCategoryId
} from '<fixtures>/article';

chai.use(chaiHttp);
chai.use(chaiUUID);
const { expect } = chai;

describe('Article creation validation', () => {
  it('should return 400 on empty request body or if any of the field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(emptyArticleData)
      .end((err, res) => {
        expect(res.status && res.body.status).to.be.equal(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message.title)
          .to.be.an('array')
          .that.does.include('The title field is required.');
        expect(res.body.message.body)
          .to.be.an('array')
          .that.does.include('The body field is required.');
        expect(res.body.message.categoryId)
          .to.be.an('array')
          .that.does.include('The categoryId field is required.');
        done();
      });
  });

  it('should return true if categoryId is a valid UUID', () => {
    chai.expect(goodArticleData.categoryId).to.be.a.uuid();
  });

  it('should return 400 if categoryId is not UUID', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(getArticleData({ categoryId: invalidCategoryId }))
      .end((err, res) => {
        expect(res.status && res.body.status).to.be.equal(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message.categoryId)
          .to.be.an('array')
          .that.does.include('The categoryId format is invalid.');
        done();
      });
  });

  it('should return 400 if Title is more than 100 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(getArticleData({ title: invalidTitle }))
      .end((err, res) => {
        expect(res.status && res.body.status).to.be.equal(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message.title)
          .to.be.an('array')
          .that.does.include('The title may not be greater than 100 characters.');
        done();
      });
  });
});
