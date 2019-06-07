/** Test cases for user validation */

/** Empty request body */
export const emptyRequest = {};
/** Invalid email */
export const invalidEmail = {
  email: 'akinye',
  username: 'test',
  lastName: 'test',
  firstName: 'test',
  password: 'test'
};
/** Invalid password */
export const invalidPassword = {
  email: 'akinye@gmail.com',
  username: 'test12',
  lastName: 'test',
  firstName: 'test',
  password: 'test'
};
/** Invalid username */
export const invalidUsername = {
  email: 'akinye@gmail.com',
  username: 'test',
  lastName: 'test',
  firstName: 'test',
  password: 'test12'
};
