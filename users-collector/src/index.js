const database = require('./database');
const User = require('./models/user');

const runUsersCollector = async () => {
  try {
    await database.connectToDB();
  } catch (err) {
    console.log(err);
  }
};

runUsersCollector();
