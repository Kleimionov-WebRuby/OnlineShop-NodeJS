module.exports = {
  port: process.env.PORT || 3000,
  development: {
    username: 'root',
    password: null,
    database: 'online_shop',
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
