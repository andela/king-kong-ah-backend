import chai from 'chai';
import chaiHttp from 'chai-http';
import './controller/user.spec';

chai.use(chaiHttp);

const { expect } = chai;

describe('Default test', () => {
  context('Basic test', () => {
    it('Should call expect from chai', () => {
      expect(2).to.equal(2);
    });
  });
});
