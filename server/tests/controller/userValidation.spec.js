import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '<server>/app';
import { case1, case2, case3 } from '<fixtures>/userValidationData';

chai.use(chaiHttp);

const { expect } = chai;

describe('User signup validations', () => {
  it('should return 400 on empty request body or if any of the field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(case1)
      .end((err, res) => {
        expect(res.status && res.body.status).to.be.equal(400);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.property('error');
        expect(res.body.error.email).to.be.an('array').that.does.include('The email field is required.');
        expect(res.body.error.lastName).to.be.an('array').that.does.include('The lastName field is required.');
        expect(res.body.error.firstName).to.be.an('array').that.does.include('The firstName field is required.');
        expect(res.body.error.username).to.be.an('array').that.does.include('The username field is required.');
        expect(res.body.error.password).to.be.an('array').that.does.include('The password field is required.');
        done();
      });
  });
  it('should return 400 if email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(case2)
      .end((err, res) => {
        expect(res.body.error.email).to.be.an('array').that.does.include('The email format is invalid.');
        done();
      });
  });
  it('should return 400 if password less than 6 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(case3)
      .end((err, res) => {
        expect(res.body.error.password).to.be.an('array').that.does.include('The password must be at least 6 characters.');
        done();
      });
  });
});
