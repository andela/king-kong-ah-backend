import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sgMail from '@sendgrid/mail';
import app from '<server>/app';
import models from '<server>/models';
import { goodUserData, emptyUserData, getUserData } from '<fixtures>/user';
import signUp from '<controllers>/signup';
import { tokenGenerator } from '<helpers>/utils';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const { User } = models;

let user;

let setApiKey;
let mailSender;
const { TOKEN_EXPIRY_DATE, SECRET } = process.env;

beforeEach(() => {
  setApiKey = sinon.stub(sgMail, 'setApiKey');
  mailSender = sinon.stub(sgMail, 'send').returns(Promise.resolve({}));
});

afterEach(() => {
  setApiKey.restore();
  mailSender.restore();
});

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
        user = res.body.data;
        expect(res.status).to.be.equal(201);
        expect(res).to.be.an('object');
        expect(res).to.have.cookie('access-token');
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

  it('should verify account', (done) => {
    const token = tokenGenerator(user.id, false, TOKEN_EXPIRY_DATE, SECRET);
    chai
      .request(app)
      .get(`/api/v1/auth/verify?token=${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.data.isVerified).to.equal(true);
        done();
      });
  });

  it('should throw error for invalid token', (done) => {
    const token = tokenGenerator(user.id, false, TOKEN_EXPIRY_DATE, SECRET);
    chai
      .request(app)
      .get(`/api/v1/auth/verify?token=qq${token}`)
      .end((err, res) => {
        expect(res.body.status).to.be.equal(403);
        expect(res.body.data).to.equal(undefined);
        done();
      });
  });

  it('should throw 403 error for invalid user id from verify token', (done) => {
    const token = tokenGenerator(`xnx${user.id}`, false, TOKEN_EXPIRY_DATE, SECRET);
    chai
      .request(app)
      .get(`/api/v1/auth/verify?token=${token}`)
      .end((err, res) => {
        expect(res.body.status).to.be.equal(403);
        expect(res.body.data).to.equal(undefined);
        done();
      });
  });
});
