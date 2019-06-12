export const newUser = {
  email: 'lewislulu@yahoo.com',
  username: 'lulu',
  firstName: 'Lewis',
  lastName: 'Thomas',
  bio: 'Welcome to my world.',
  password: '12345678'
};

export const goodUserData = {
  email: 'testing@authorshaven.com',
  username: 'testing',
  lastName: 'testing',
  firstName: 'testing',
  password: 'testing123'
};

export const emptyUserData = {
  email: '',
  username: '',
  lastName: '',
  firstName: '',
  password: ''
};

export const getUserData = args => ({
  ...goodUserData,
  ...args
});
