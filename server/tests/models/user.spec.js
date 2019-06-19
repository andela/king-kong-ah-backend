/* eslint-disable no-console */
import models from '<serverModels>';
import { newUser } from '<fixtures>/user';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;
const { User, sequelize } = models;

before(async () => {
  await sequelize.sync({ force: true });
});

const modelTest = describe('Model - User', () => {
  describe('Create users successfully', () => {
    it('should create a new user', async () => {
      let user;

      try {
        user = await User.create(newUser);
      } catch (error) {
        console.log(error);
      }
      expect(user.email).to.equal(newUser.email);
      expect(user.username).to.equal(newUser.username);
      expect(user.firstName).to.equal(newUser.firstName);
      expect(user.bio).to.equal(newUser.bio);
    });

    it('should create a new admin', async () => {
      const newUser1 = {
        ...newUser,
        email: 'admin@gmail.com',
        username: 'admin',
        isAdmin: true
      };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        console.log(error);
      }

      expect(user.email).to.equal(newUser1.email);
      expect(user.username).to.equal(newUser1.username);
      expect(user.firstName).to.equal(newUser1.firstName);
      expect(user.bio).to.equal(newUser1.bio);
      expect(user.isAdmin).to.equal(true);
    });

    it('should allow empty profile image', async () => {
      const newUser1 = {
        ...newUser,
        email: 'lewislulu1@yahoo.com',
        username: 'lulu1'
      };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        console.log(error);
      }
      expect(user.profileImage).to.equal(undefined);
    });

    it('should have false default value for isAdmin', async () => {
      const newUser1 = {
        ...newUser,
        email: 'franklyn@yahoo.com',
        username: 'franky'
      };

      let user;

      try {
        user = await User.create(newUser1);
        expect(user.isAdmin).to.equal(false);
      } catch (error) {
        console.log(error);
      }
    });

    it('should allow valid email patterns', async () => {
      const newUser1 = { ...newUser, username: 'lulu2', email: 'lewislulu@gmail.com' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        console.log(error);
      }
      expect(user.email).to.equal(newUser1.email);
    });

    it('should hash password', async () => {
      const newUser1 = { ...newUser, username: 'lulu3', email: 'lewislulu1@gmail.com' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        console.log(error);
      }

      expect(user.password).to.not.equal(undefined);
      expect(user.password).to.not.equal(newUser1.password);
    });
  });

  describe('Deny user creation', () => {
    it('should not allow invalid emails pattern', async () => {
      const newUser1 = { ...newUser, email: 'google' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        expect(user).to.equal(undefined);
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Email field must be an email.');
      }
    });

    it('should not allow duplicate emails', async () => {
      const newUser1 = { ...newUser, username: 'xxx' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        expect(user).to.equal(undefined);
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('email must be unique');
      }
    });

    it('should not allow duplicate usernames', async () => {
      const newUser1 = { ...newUser, email: 'lewislulu1@yahoo.com' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        expect(user).to.equal(undefined);
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('username must be unique');
      }
    });

    it('should require last name', async () => {
      const newUser1 = { ...newUser, lastName: undefined };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        expect(user).to.equal(undefined);
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Last name is required.');
      }
    });

    it('should require first name', async () => {
      const newUser1 = { ...newUser, firstName: undefined };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        expect(user).to.equal(undefined);
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('First name is required.');
      }
    });

    it('should not allow invalid profile image', async () => {
      const newUser1 = {
        ...newUser,
        email: 'enya@gmail.com',
        username: 'enya',
        profileImage: 'http:/google.com'
      };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        expect(user).to.equal(undefined);
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Profile image must be a url.');
      }
    });
  });
});

export default modelTest;
