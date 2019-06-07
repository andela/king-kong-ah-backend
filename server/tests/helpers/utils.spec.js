/* eslint-disable no-console */
import chai from 'chai';

import chaiHttp from 'chai-http';
import { hashPassword, tokenGenerator } from '<helpers>/utils';

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
