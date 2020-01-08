const expressLoader = require('./express');
const routeLoader = require('./routes');
const sessionLoader = require('./sessions');
const errorLoader = require('./errors');

module.exports = expressApp => {
  expressLoader(expressApp);
  sessionLoader(expressApp);
  routeLoader(expressApp);
  errorLoader(expressApp);
};
