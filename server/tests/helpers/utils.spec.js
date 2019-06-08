/* eslint-disable no-console */
import chai from 'chai';

import chaiHttp from 'chai-http';
import utils from '../../helpers/utils';

const { hashPassword } = utils;

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
