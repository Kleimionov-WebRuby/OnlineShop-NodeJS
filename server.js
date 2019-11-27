const express = require('express');
const initLoader = require('./loaders');
const config = require('./config');

const app = express();

exports.start = () => {
  initLoader(app);
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
};
