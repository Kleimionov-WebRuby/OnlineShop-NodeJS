module.exports = {
  port: process.env.PORT || 3000,
  development: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_DB_HOST || 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
