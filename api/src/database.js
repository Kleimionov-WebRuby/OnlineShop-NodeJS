const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

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
      console.log('Connection has been established successfully.');
      sequelize.sync({ logging: false });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      setTimeout(connectToDB, 30000);
    });
};

module.exports = {
  sequelize,
  connectToDB,
};