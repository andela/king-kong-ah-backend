/* eslint-disable no-console */
import chai from 'chai';
import models from '<serverModels>';
import { getModelObjectId } from '<test>/helpers/utils';
import { getUserData } from '<fixtures>/user';

const { expect } = chai;
const { User, sequelize } = models;

let userId;
let followerId;
let followerId2;
let followerId3;
let user;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('User Follower relationship', () => {
  let followersId;
  let followersCount;
  let userFollower;

  it('should follow a user', async () => {
    try {
      userId = await getModelObjectId(User, getUserData({ email: 'usermain@user.com', username: 'usermain' }));
      followerId = await getModelObjectId(User, getUserData({ email: 'followeremail@gmail.com', username: 'fellowfollower' }));
      user = await User.findByPk(userId);
      userFollower = await user.addFollowers(followerId);
    } catch (error) {
      console.log(error);
    }

    expect(userFollower[0].dataValues.userId).to.be.equal(userId);
    expect(userFollower[0].dataValues.followerId).to.be.equal(followerId);
  });

  it('should return followers', async () => {
    try {
      followerId2 = await getModelObjectId(User, getUserData({ email: 'followeremail2@gmail.com', username: 'fellowfollower2' }));
      await user.addFollowers(followerId2);
      const followers = await user.getFollowers();
      followersId = followers.map(getFollowers => getFollowers.dataValues.id);
    } catch (error) {
      console.log(error);
    }

    expect(followersId).to.be.an('array').that.does.include(followerId2);
    expect(followersId).to.be.an('array').that.does.include(followerId);
  });

  it('should not follow user more than once', async () => {
    try {
      followerId3 = await getModelObjectId(User, getUserData({ email: 'followeremail3@gmail.com', username: 'fellowfollower3' }));
      await user.addFollowers(followerId3);
      await user.addFollowers(followerId3);
      const followers = await user.getFollowers();
      followersId = followers.map(getFollowers => getFollowers.dataValues.id);
      followersCount = followersId.length;
    } catch (error) {
      console.log(error);
    }

    expect(followersCount).to.equal(3);
    expect(followersCount).to.not.equal(4);
    expect(followersId).to.be.an('array').that.does.include(followerId3);
    expect(followersId).to.be.an('array').that.does.include(followerId2);
    expect(followersId).to.be.an('array').that.does.include(followerId);
  });
});
