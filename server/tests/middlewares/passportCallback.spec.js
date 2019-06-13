/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import passportCallback from '<middlewares>/passport/callback';
import getProfile from '<fixtures>/passportCallback';
import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';

chai.use(chaiAsPromise);
const { expect } = chai;

const done = (err, obj) => obj;

describe('Passportcallback function', () => {
  it('should signup successfully with google profile', async () => {
    const profile = getProfile('google', true);
    const res = await passportCallback(null, null, profile, done);

    expect(res.oauthId).to.be.equal(profile.id);
    expect(res.profileImage).to.be.equal(profile._json.picture);
    expect(res.lastName).to.be.equal(profile._json.family_name);
    expect(res.firstName).to.be.equal(profile._json.given_name);
    expect(res.email).to.be.equal(profile._json.email);
    expect(res.profileImage).to.be.equal(profile._json.picture);
    expect(res.type).to.be.equal(profile.provider);
    expect(res).to.have.property('password');
  });

  it('should signup successfully with google incomplete profile', async () => {
    const profile = getProfile('google');
    const res = await passportCallback(null, null, profile, done);

    expect(res.oauthId).to.be.equal(profile.id);
    expect(res.profileImage).to.be.equal(profile._json.picture);
    expect(res.lastName).to.be.equal(profile._json.family_name);
    expect(res.firstName).to.be.equal(profile._json.given_name);
    expect(res.email).to.be.equal(profile._json.email);
    expect(res.profileImage).to.be.equal(undefined);
    expect(res.type).to.be.equal(profile.provider);
    expect(res).to.have.property('password');
  });

  it('should signup successfully with facebook profile', async () => {
    const profile = getProfile('facebook', true);
    const res = await passportCallback(null, null, profile, done);
    const [lastName, firstName] = profile._json.name.split(' ');

    expect(res.oauthId).to.be.equal(profile.id);
    expect(res.profileImage).to.be.equal(profile._json.picture.data.url);
    expect(res.lastName).to.be.equal(lastName);
    expect(res.firstName).to.be.equal(firstName);
    expect(res.type).to.be.equal(profile.provider);
    expect(res).to.have.property('password');
  });

  it('should signup successfully with facebook incomplete profile', async () => {
    const profile = getProfile('facebook');
    const res = await passportCallback(null, null, profile, done);
    const [lastName, firstName] = profile._json.name.split(' ');

    expect(res.oauthId).to.be.equal(profile.id);
    expect(res.profileImage).to.be.equal(undefined);
    expect(res.lastName).to.be.equal(lastName);
    expect(res.firstName).to.be.equal(firstName);
    expect(res.type).to.be.equal(profile.provider);
    expect(res).to.have.property('password');
  });

  it('should signup successfully with twitter profile', async () => {
    const profile = getProfile('twitter', true);
    const res = await passportCallback(null, null, profile, done);
    const [lastName, firstName] = profile._json.name.split(' ');

    expect(res.oauthId).to.be.equal(profile.id);
    expect(res.profileImage).to.be.equal(profile._json.profile_image_url_https);
    expect(res.lastName).to.be.equal(lastName);
    expect(res.firstName).to.be.equal(firstName);
    expect(res.type).to.be.equal(profile.provider);
    expect(res).to.have.property('password');
  });

  it('should signup successfully with twitter incomplete profile', async () => {
    const profile = getProfile('twitter');
    const res = await passportCallback(null, null, profile, done);
    const [lastName, firstName] = profile._json.name.split(' ');

    expect(res.oauthId).to.be.equal(profile.id);
    expect(res.profileImage).to.be.equal(undefined);
    expect(res.lastName).to.be.equal(lastName);
    expect(res.firstName).to.be.equal(firstName);
    expect(res.type).to.be.equal(profile.provider);
    expect(res).to.have.property('password');
  });
});
