module.exports = {
  port: process.env.PORT || 3000,
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
