/* eslint-disable no-console */
import models from '<server>/models';
import { getUserData } from '<fixtures>/user';

const { Category, User, Tag } = models;

export const signupUser = agent => new Promise((resolve) => {
  agent
    .post('/api/v1/auth/signup')
    .send(getUserData({
      email: 'johndoe@email.com', username: 'johndoee', password: '123456abcdef'
    }))
    .then(() => {
      agent
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@email.com',
          password: '123456abcdef'
        })
        .then(() => {
          resolve();
        });
    });
});

export const getCategoryId = async (values) => {
  try {
    const [category] = await Category.findOrCreate({
      where: { name: values },
      defaults: {
        name: values
      },
    });
    const { id } = category;
    return id;
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (email, username) => {
  try {
    const user = await User.create(getUserData({
      email, username
    }));
    const { id } = user;
    return id;
  } catch (error) {
    console.log(error);
  }
};

export const getTagId = async (values) => {
  try {
    const [tag] = await Tag.findOrCreate({
      where: { name: values },
      defaults: {
        name: values
      },
    });
    const { id } = tag;
    return id;
  } catch (error) {
    console.log(error);
  }
};
