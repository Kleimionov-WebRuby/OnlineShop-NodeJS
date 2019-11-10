const express = require('express');
const bodyParser = require('body-parser');

require('./connection');

const app = express();

app.use(bodyParser.json());

const port = 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
