require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
      password: DB_PASSWORD,
        database: "database_development",
          host: DB_HOST,
            dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
      password: DB_PASSWORD,
        database: "database_development",
          host: DB_HOST,
            dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
      password: DB_PASSWORD,
        database: "bips0889_happysport",
          host: DB_HOST,
            dialect: "postgres",
  }
}
