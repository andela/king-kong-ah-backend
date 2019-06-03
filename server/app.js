import db from './models';

/* eslint-disable no-console */
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to DB has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
/* eslint-enable no-console */
