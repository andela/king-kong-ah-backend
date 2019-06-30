/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '<server>/app';
import models from '<server>/models';
import { verifyUser, getModelObjectId } from '<test>/helpers/utils';
import { updateProfile, getUserProfile } from '<controllers>/profile';
import { getUserData } from '<fixtures>/user';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const { sequelize, User } = models;
let userId;

const wrongId = '6e10f658-efd2-4bb9-9793-eaafc1fca7fd';
before(async () => {
  await sequelize.sync({ force: true });
});

afterEach(() => sinon.restore());

const agent = chai.request.agent(app);

describe('Profile - controller', () => {
  before(async () => {
    try {
      userId = await getModelObjectId(User, getUserData({ email: 'profiler@gmail.com', username: 'rating1234' }));
    } catch (e) {
      console.log(e);
    }
  });

  it('should update a user profile', (done) => {
    verifyUser(agent).then(() => {
      agent
        .patch('/api/v1/profile')
        .send({ bio: 'Welcome to my world.' })
        .then((res) => {
          userId = res.body.data.id;
          expect(res.status).to.be.equal(200);
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.message).to.equal('Profile updated successfully');
          expect(res.body.data.bio).to.equal('Welcome to my world.');
          done();
        });
    })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should return server error for profile update controller', async () => {
    const req = { body: { bio: 'Welcome to my world.' } };
    const res = {
      status() {},
      json() {}
    };
    const stubStatus = sinon.stub(res, 'status').returnsThis();
    const stubUser = sinon.stub(User, 'findByPk').throws();
    await updateProfile(req, res);
    expect(res.status).to.have.been.calledWith(500);
    stubStatus.restore();
    stubUser.restore();
  });

  it("should fetch a user's profile", (done) => {
    agent
      .get(`/api/v1/profile/${userId}`)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.equal('User profile');
        expect(res.body.data.bio).to.equal('Welcome to my world.');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('should return 404 for empty param', (done) => {
    agent.get('/api/v1/profile').then((res) => {
      expect(res.status).to.be.equal(404);
      done();
    });
  });

  it('should return server error for getProfile controller', async () => {
    const req = { body: { bio: 'Welcome to my world.' } };
    const res = {
      status() {},
      json() {}
    };
    const stubStatus = sinon.stub(res, 'status').returnsThis();
    const stubUser = sinon.stub(User, 'findByPk').throws();
    await getUserProfile(req, res);
    expect(res.status).to.have.been.calledWith(500);
    stubStatus.restore();
    stubUser.restore();
  });

  it('should return 400 for invalid uuid param', (done) => {
    agent
      .get(`/api/v1/profile/${wrongId}`)
      .then((res) => {
        expect(res.status).to.be.equal(404);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it('should return error 404 for valid uuid format with no profile found', (done) => {
    agent
      .get(`/api/v1/profile/${wrongId}`)
      .then((res) => {
        expect(res.status).to.be.equal(404);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
