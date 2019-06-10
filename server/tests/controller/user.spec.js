import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '<server>/app';
import { goodUserData, emptyUserData, getUserData } from '<fixtures>/user';

chai.use(chaiHttp);

const { expect } = chai;
describe('User signup', () => {
  it('should not allow null values', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(emptyUserData)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it('should create a new user and save a token in the cookie', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(goodUserData)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.be.an('object');
        expect(res).to.have.cookie('access_token');
        expect(res.body)
          .to.have.property('message')
          .equal('User created successfully');
        done();
      });
  });

  it('should not allow duplicate email and username', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(getUserData({ email: 'testing@authorshaven.com', username: 'testing' }))
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });

  it('should not allow duplicate email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(getUserData({ email: 'testing@authorshaven.com', username: 'mosimi' }))
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res.body.message).to.equal('Email exist');
        done();
      });
  });

  it('should not allow duplicate username', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(getUserData({ email: 'testero@authorshaven.com', username: 'testing' }))
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });
});
