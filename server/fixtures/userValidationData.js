/** Test cases for user validation */

/** Empty request body */
export const case1 = {};
/** Invalid email */
export const case2 = {
  email: 'akinye',
  username: 'test',
  lastName: 'test',
  firstName: 'test',
  password: 'test'
};
/** Invalid email */
export const case3 = {
  email: 'akinye@gmail.com',
  username: 'test',
  lastName: 'test',
  firstName: 'test',
  password: 'test'
};
