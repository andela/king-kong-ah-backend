/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '<server>/app';
import models from '<server>/models';
import { signupUser } from '<test>/helpers/utils';
import { update, getUserProfile } from '<controllers>/profile';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const { sequelize, User } = models;
let userId;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

const agent = chai.request.agent(app);

describe('Profile - controller', () => {
  let user;
  before(async () => {
    try {
      user = await signupUser(agent);
      userId = user.body.data.id;
    } catch (error) {
      console.log(error);
    }
  });

  it('should update a user profile', (done) => {
    agent
      .patch('/api/v1/profile')
      .send({ bio: 'Welcome to my world.' })
      .then((res) => {
        expect(user.body.status).to.be.equal('success');
        expect(res.status).to.be.equal(200);
        expect(res.body.data.id).to.be.a('string');
        expect(res.body.message).to.equal('Profile updated successfully');
        expect(res.body.data.bio).to.equal('Welcome to my world.');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return server error for profile update controller', async () => {
    const req = { userId, body: { bio: 'Welcome to my world.' } };
    const res = {
      status() {},
      json() {}
    };
    const stubStatus = sinon.stub(res, 'status').returnsThis();
    const stubUser = sinon.stub(User, 'findByPk').throws();
    await update(req, res);
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
        done(err);
      });
  });

  it('should return 404 for empty param', (done) => {
    agent.get('/api/v1/profile').then((res) => {
      expect(res.status).to.be.equal(404);
    });
    done().catch((err) => {
      done(err);
    });
  });

  it('should return server error for getProfile controller', async () => {
    const req = { body: { bio: 'Welcome to my world.' } };
    const res = {
      status() {},
      json() {}
    };
    try {
      const stubStatus = sinon.stub(res, 'status').returnsThis();
      const stubUser = sinon.stub(User, 'findByPk').throws();
      await getUserProfile(req, res);
      expect(res.status).to.have.been.calledWith(500);
      stubStatus.restore();
      stubUser.restore();
    } catch (error) {
      console.log(error);
    }
  });

  it('should return 400 for invalid uuid param', (done) => {
    agent
      .get('/api/v1/profile/123')
      .then((res) => {
        expect(res.status).to.be.equal(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return error 404 for valid uuid format with no profile found', (done) => {
    agent
      .get(`/api/v1/profile/a${userId}`)
      .then((res) => {
        expect(res.status).to.be.equal(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
