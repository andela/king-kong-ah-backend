import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '<server>/app';

chai.use(chaiHttp);

const { expect } = chai;

describe('User SignIn', () => {
  it('should return 404 for a user that does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'ututu@rr.com', password: 'tetete123' })
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('User does not exist');
        done();
      });
  });

  it('should not allow wrong user credentials', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'testing@authorshaven.com', password: 'tetete123' })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body)
          .to.have.property('message')
          .equal('User credentials are invalid');
        done();
      });
  });

  it('should sign in a user and save token in the cookie', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'testing@authorshaven.com', password: 'testing123' })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.be.an('object');
        expect(res).to.have.cookie('access-token');
        expect(res.body)
          .to.have.property('message')
          .equal('Login successful');
        done();
      });
  });
});
