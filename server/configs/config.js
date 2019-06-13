import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL_DEVELOPMENT',
    url: process.env.DATABASE_URL_DEVELOPMENT,
    dialect: 'postgres'
  },
  test: {
    storage: './database.sqlite',
    dialect: 'sqlite',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
