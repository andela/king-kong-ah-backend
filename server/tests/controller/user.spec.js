import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

const { expect } = chai;
// const token;

describe('User signup', () => {
  it('should create a new user and save a token in the cookie', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'testing@authorshaven.com',
        username: 'test',
        lastName: 'test',
        firstName: 'test',
        password: 'testing'
      })
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
      .send({
        email: 'testing@authorshaven.com',
        username: 'testing',
        lastName: 'testing',
        firstName: 'testing',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });
});
