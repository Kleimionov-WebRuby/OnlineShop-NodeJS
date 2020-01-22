const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const logConfig = require('./config/logs-config');
const RabbitMQ = require('./classes/rabbit');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    define: {
      timestamps: false,
    },
  },
);

const connectToDB = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      RabbitMQ.sendToLogger({
        logType: logConfig.logTypes.logs,
        message: `Connection has been established successfully. | database/api`,
      });
      sequelize.sync({ logging: false }).then(() =>
        RabbitMQ.sendToLogger({
          logType: logConfig.logTypes.logs,
          message: `Syncing was successful | database/api`,
        }),
      );
    })
    .catch(err => {
      RabbitMQ.sendToLogger({
        logType: logConfig.logTypes.error,
        message: `Unable to connect to the database | database/api: ${err}`,
      });
      setTimeout(connectToDB, 40000);
    });
};

module.exports = {
  sequelize,
  connectToDB,
};
