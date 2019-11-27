const database = require('./database');
const initModels = require('./models');
const server = require('./server');

const runApp = async () => {
  try {
    await database.connectToDB();
    initModels();
    server.start();
  } catch (err) {
    console.log(err);
  }
};

runApp();
