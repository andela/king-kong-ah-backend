import dotenv from "dotenv";

dotenv.config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL_DEVELOPMENT",
    url: process.env.DATABASE_URL_DEVELOPMENT,
    dialect: "postgres"
  },
  test: {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
};
