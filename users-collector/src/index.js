const database = require('./database');
const initModels = require('./models');
const CronJob = require('cron').CronJob;
const UserCollector = require('./classes/user-collector');
const userCollector = new UserCollector();

const runUsersCollector = async () => {
  try {
    await database.connectToDB();
    initModels();

    try {
      const job = new CronJob('00 21 12 * * 0-6', userCollector.deleteUser);

      job.start();
      console.log('is job running? ', job.running);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

runUsersCollector();
