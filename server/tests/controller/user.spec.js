import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '<server>/app';
import models from '<server>/models';
import { goodUserData, emptyUserData, getUserData } from '<fixtures>/user';
import signUp from '<controllers>/signup';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const { User } = models;

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
      .send(getUserData({ firstName: 666, lastName: 666, username: 99999 }))
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

  it('should not allow duplicate email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(getUserData({ email: 'testing@authorshaven.com' }))
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res.body.message).to.equal('Email exist');
        done();
      });
  });

  it('should return server error for signup controller', async () => {
    const req = { body: { password: 123456 }, formattedValues: goodUserData };
    const res = {
      status() {},
      json() {}
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(User, 'create').throws();
    await signUp(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });
});
