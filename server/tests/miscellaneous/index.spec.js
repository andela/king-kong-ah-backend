import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '<server>/app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Routes', () => {
  it('should return a 404 error if user inputs an incorrect route', (done) => {
    chai
      .request(app)
      .get('/api/test')
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .to.equal('you have entered an incorrect route');
        done();
      });
  });

  it('should return 200', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.be.an('object');
        done();
      });
  });
});
