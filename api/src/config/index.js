module.exports = {
  port: process.env.PORT || 3000,
  production: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_DB_HOST || 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.MYSQL_DB_HOST || 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
