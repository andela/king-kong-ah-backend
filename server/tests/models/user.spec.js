/* eslint-disable no-console */
import chai from 'chai';

import chaiHttp from 'chai-http';
import models from '../../models';
import newUser from '../../fixtures/user';

chai.use(chaiHttp);

const { expect } = chai;
const { User, sequelize } = models;

before(async () => {
  await sequelize.sync({ force: true });
});

const modelTest = describe('Model - User', () => {
  describe('Create users successfully', () => {
    it('should create a new user', async () => {
      try {
        const user = await User.create(newUser);
        expect(user.email).to.equal(newUser.email);
        expect(user.username).to.equal(newUser.username);
        expect(user.firstName).to.equal(newUser.firstName);
        expect(user.bio).to.equal(newUser.bio);
      } catch (error) {
        console.log(error);
      }
    });

    it('should create a new admin', async () => {
      const newUser1 = {
        ...newUser,
        email: 'admin@gmail.com',
        username: 'admin',
        isAdmin: true
      };
      try {
        const user = await User.create(newUser1);
        expect(user.email).to.equal(newUser1.email);
        expect(user.username).to.equal(newUser1.username);
        expect(user.firstName).to.equal(newUser1.firstName);
        expect(user.bio).to.equal(newUser1.bio);
        expect(user.isAdmin).to.equal(true);
      } catch (error) {
        console.log(error);
      }
    });

    it('should allow empty profile image', async () => {
      const newUser1 = {
        ...newUser,
        email: 'lewislulu1@yahoo.com',
        username: 'lulu1'
      };
      try {
        const user = await User.create(newUser1);
        expect(user.profileImage).to.equal(undefined);
      } catch (error) {
        console.log(error);
      }
    });

    it('should have false default value for isAdmin', async () => {
      const newUser1 = {
        ...newUser,
        email: 'franklyn@yahoo.com',
        username: 'franky'
      };
      try {
        const user = await User.create(newUser1);
        expect(user.isAdmin).to.equal(false);
      } catch (error) {
        console.log(error);
      }
    });

    it('should allow valid email patterns', async () => {
      const newUser1 = { ...newUser, username: 'lulu2', email: 'lewislulu@gmail.com' };
      try {
        const user = await User.create(newUser1);
        expect(user.email).to.equal(newUser1.email);
      } catch (error) {
        console.log(error);
      }
    });

    it('should hash password', async () => {
      const newUser1 = { ...newUser, username: 'lulu3', email: 'lewislulu1@gmail.com' };
      try {
        const user = await User.create(newUser1);
        expect(user.password).to.not.equal(undefined);
        expect(user.password).to.not.equal(newUser1.password);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Deny user creation', () => {
    it('should not allow invalid emails pattern', async () => {
      const newUser1 = { ...newUser, email: 'google' };
      try {
        const user = await User.create(newUser1);
        expect(user).to.equal(undefined);
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Email field must be an email.');
      }
    });

    it('should not allow duplicate emails', async () => {
      const newUser1 = { ...newUser, username: 'xxx' };
      try {
        const user = await User.create(newUser1);
        expect(user).to.equal(undefined);
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('email must be unique');
      }
    });

    it('should not allow duplicate usernames', async () => {
      const newUser1 = { ...newUser, email: 'lewislulu1@yahoo.com' };
      try {
        const user = await User.create(newUser1);
        expect(user).to.equal(undefined);
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('username must be unique');
      }
    });

    it('should require email', async () => {
      const newUser1 = { ...newUser, email: undefined };
      try {
        const user = await User.create(newUser1);
        expect(user).to.equal(undefined);
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Email is required.');
      }
    });

    it('should require username', async () => {
      const newUser1 = { ...newUser, username: undefined };
      try {
        const user = await User.create(newUser1);
        expect(user).to.equal(undefined);
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Username is required.');
      }
    });

    it('should require last name', async () => {
      const newUser1 = { ...newUser, lastName: undefined };
      try {
        const user = await User.create(newUser1);
        expect(user).to.equal(undefined);
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Last name is required.');
      }
    });

    it('should require first name', async () => {
      const newUser1 = { ...newUser, firstName: undefined };
      try {
        const user = await User.create(newUser1);
        expect(user).to.equal(undefined);
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('First name is required.');
      }
    });

    it('should not allow invalid profile image', async () => {
      const newUser1 = {
        ...newUser, email: 'enya@gmail.com', username: 'enya', profileImage: 'http:/google.com'
      };
      try {
        const user = await User.create(newUser1);
        expect(user).to.equal(undefined);
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Profile image must be a url.');
      }
    });
  });
});

export default modelTest;
