const express = require('express');
const database = require('./database');
const initLoader = require('./loaders');
const config = require('./config');

const app = express();

const runApp = async () => {
  await database.connectToDB();
  initLoader(app);

  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
};

runApp();
