/* eslint-disable no-console */
import db from './models';

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to DB has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
