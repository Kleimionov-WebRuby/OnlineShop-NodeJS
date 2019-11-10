const mysql = require('mysql2');

const connectionData = {
  host: 'localhost',
  user: 'root',
  database: 'online-shop',
  password: null,
};

const mysqlConnection = mysql.createConnection(connectionData);

mysqlConnection.connect(function(err) {
  if (err) {
    return console.error(`Error: ${err.message}`);
  } else {
    console.log('Connection to MySQL server is successful');
  }
});

mysqlConnection.end(err => {
  if (err) {
    return console.log(`Error: ${err.message}`);
  } else {
    console.log('Connection is closed');
  }
});
