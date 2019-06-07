const newUser = {
  email: 'lewislulu@yahoo.com',
  username: 'lulu',
  firstName: 'Lewis',
  lastName: 'Thomas',
  bio: 'Welcome to my world.',
  password: '123456'
};
export default newUser;
export const goodUserData = {
  email: 'testing@authorshaven.com',
  username: 'testing',
  lastName: 'testing',
  firstName: 'testing',
  password: 'testing'
};

export const badUserData = {
  email: 'testing@authorshaven.com',
  username: 3333333,
  lastName: 3333,
  firstName: 333333,
  password: 'testing'
};

export const emptyUserData = {
  email: '',
  username: '',
  lastName: '',
  firstName: '',
  password: ''
};

export const repeatedEmailAndUsername = {
  email: 'testing@authorshaven.com',
  username: 'testing',
  lastName: 'testing',
  firstName: 'testing',
  password: 'testing'
};

export const repeatedEmail = {
  email: 'testing@authorshaven.com',
  username: 'test',
  lastName: 'testing',
  firstName: 'testing',
  password: 'testing'
};
export const repeatedUsername = {
  email: 'tester@authorshaven.com',
  username: 'testing',
  lastName: 'testing',
  firstName: 'testing',
  password: 'testing'
};
export default {
  goodUserData,
  badUserData,
  emptyUserData,
  repeatedEmail,
  repeatedEmailAndUsername,
  repeatedUsername
};
