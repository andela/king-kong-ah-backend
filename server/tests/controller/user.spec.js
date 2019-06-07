import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '<server>/app';
import {
  goodUserData,
  badUserData,
  emptyUserData,
  repeatedEmail,
  repeatedEmailAndUsername,
  repeatedUsername
} from '<fixtures>/user';

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
  it('should not allow invalid data types', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(badUserData)
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
      .send(repeatedEmailAndUsername)
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });
  it('should not allow duplicate email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(repeatedEmail)
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });
  it('should not allow duplicate username', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(repeatedUsername)
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });
});
