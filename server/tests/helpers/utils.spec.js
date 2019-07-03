/* eslint-disable no-console */
import {
  newArticle,
  largeText,
  aMinuteText
} from '<fixtures>/article';
import { res } from '<fixtures>/utils';
import {
  hashPassword, tokenGenerator, createEllipsis, cookieGenerator
} from '<helpers>/utils';
import getReadingTime from '<helpers>/articleReadingTime';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

describe('Helpers - Utils', () => {
  describe('Hash password successfully', () => {
    it('should hash variable', () => {
      const password = '1234567890';
      const hash = hashPassword(password);

      expect(hash).to.not.equal(password);
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
    let token;
    try {
      token = tokenGenerator('5c1d4726-647e-4f77-a251-10381d3510f3', false);
    } catch (error) {
      console.log(error);
    }

    expect(token).to.be.a('string');
  });
});

describe('Cookie Generator', () => {
  it('should generate cookie with default values', () => {
    cookieGenerator('5c1d4726-647e-4f77-a251-10381d3510f3', false, 3600, res);
    cookieGenerator('5c1d4726-647e-4f77-a251-10381d3510f3', false, undefined, res);

    expect(res.token).to.be.a('string');
  });
});

describe('Get article reading time', () => {
  let readingTime;
  it('should return 4 min reading time', () => {
    readingTime = getReadingTime(largeText);
    expect(readingTime).to.equal('4 minute read');
  });

  it('should return 1 min reading time', () => {
    readingTime = getReadingTime(aMinuteText);
    expect(readingTime).to.equal('1 minute read');
  });

  it('should return less than a minute reading time', () => {
    readingTime = getReadingTime('This is a body');
    expect(readingTime).to.equal('less than a minute read');
  });
});
