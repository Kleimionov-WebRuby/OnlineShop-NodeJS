module.exports = {
  rabbitUrl: process.env.rabbitURL,
  logsQueue: 'shop-logs-queue',
  mailerQueue: 'shop-mailer-queue',
  port: process.env.PORT || 3000,
  production: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_DB_HOST || 'localhost',
    dialect: 'mysql',
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.MYSQL_DB_HOST || 'localhost',
    dialect: 'mysql',
  },
};
