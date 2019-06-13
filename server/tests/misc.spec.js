import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '<server>/app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Default route', () => {
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
