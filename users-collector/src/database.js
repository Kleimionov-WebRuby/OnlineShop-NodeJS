const env = process.env.NODE_ENV || 'development';
const configDB = require('./config')[env];
const logConfig = require('./config/logs-config');
const Sequelize = require('sequelize');
const RabbitMQ = require('./classes/rabbit');

const sequelize = new Sequelize(
  configDB.database,
  configDB.username,
  configDB.password,
  {
    host: configDB.host,
    dialect: configDB.dialect,
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
        message:
          'Connection has been established successfully. | database/users-collector',
      });
      sequelize.sync({ logging: false });
    })
    .catch(err => {
      RabbitMQ.sendToLogger({
        logType: logConfig.logTypes.error,
        message: `Unable to connect to the database | database/users-collector: ${err}`,
      });
      setTimeout(connectToDB, 30000);
    });
};

module.exports = {
  sequelize,
  connectToDB,
};
