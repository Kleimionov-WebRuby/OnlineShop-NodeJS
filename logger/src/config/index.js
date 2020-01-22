module.exports = {
  databaseUrl: process.env.MONGO_URI || 'mongodb://localhost/shop_logger',
  rabbitUrl: process.env.rabbitURL,
  logsQueue: 'shop-logs-queue',
};
