import app from '<server>/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;
describe('Oauth signup', () => {
  it('should successfully authenticate via facebook', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.text).to.be.a('string');
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('should return a status code of 200 for facebook redirect', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/facebook/redirect')
      .end((err, res) => {
        expect(res.text).to.be.a('string');
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('should successfully authenticate via twitter', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('should return a status code of 200 for twitter redirect', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/twitter/redirect')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
