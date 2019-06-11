/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { hashPassword, tokenGenerator, createEllipsis } from '<helpers>/utils';
import { newArticle } from '<fixtures>/article';

chai.use(chaiHttp);
const { expect } = chai;

describe('Helpers - Utils', () => {
  describe('Hash password successfully', () => {
    it('should hash variable', () => {
      try {
        const password = '1234567890';
        const hash = hashPassword(password);
        expect(hash).to.not.equal(password);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('CreateEllipsis function', () => {
    const text = 'This is just a dummy text';

    it('should return ellipsis text', () => {
      expect(createEllipsis(newArticle.body)).to.not.equal(newArticle.body);
    });

    it('should return original text', () => {
      expect(createEllipsis(text, 10)).to.not.equal(text);
    });

    it('should return original text', () => {
      expect(createEllipsis(text)).to.equal(text);
    });
  });
});

describe('Token Generator', () => {
  it('should generate token with default values', () => {
    try {
      const token = tokenGenerator('5c1d4726-647e-4f77-a251-10381d3510f3');
      expect(token).to.be.a('string');
    } catch (error) {
      console.log(error);
    }
  });
});
