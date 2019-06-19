/* eslint-disable no-console */
import models from '<server>/models';
import { getUserData } from '<fixtures>/user';

const { Category, User, Tag, Article } = models;

export const signupUser = agent => agent
  .post('/api/v1/auth/signup')
  .send(getUserData({
    email: 'johndoe@email.com', username: 'johndoee', password: '123456abcdef'
  }));

export const loginUser = agent => agent
  .post('/api/v1/auth/login')
  .send({
    email: 'johndoe@email.com',
    password: '123456abcdef'
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


export const getArticleId = async (title, body, userId) => {
  try {
    const categoryId = await getCategoryId('technology');
    const newArticle = await Article.create({
      title,
      body,
      userId,
      categoryId
    });
    const { id } = newArticle;
    return id;
  } catch (error) {
    console.log(error);
  }
};
