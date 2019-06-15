import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '<server>/app';
import { getUserData, emptyUserData } from '<fixtures>/user';

chai.use(chaiHttp);
const { expect } = chai;

describe('User Login validations', () => {
  it('should return 400 on empty request body or if any of the field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(emptyUserData)
      .end((err, res) => {
        expect(res.status && res.body.status).to.be.equal(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message.email)
          .to.be.an('array')
          .that.does.include('The email field is required.');
        expect(res.body.message.password)
          .to.be.an('array')
          .that.does.include('The password field is required.');
        done();
      });
  });

  it('should return 400 if email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(getUserData({ email: 'testing' }))
      .end((err, res) => {
        expect(res.body.message.email)
          .to.be.an('array')
          .that.does.include('The email format is invalid.');
        done();
      });
  });

  it('should return 400 if password is less than 8 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(getUserData({ password: 'test' }))
      .end((err, res) => {
        expect(res.body.message.password)
          .to.be.an('array')
          .that.does.include('The password must be at least 8 characters.');
        done();
      });
  });

  it('should return 400 if password is not alphanumeric', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(getUserData({ password: 'testings' }))
      .end((err, res) => {
        expect(res.body.message.password)
          .to.be.an('array')
          .that.does.include('The password format is invalid.');
        done();
      });
  });
});
