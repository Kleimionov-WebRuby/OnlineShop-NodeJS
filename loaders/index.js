const expressLoader = require('./express');
const routeLoader = require('./routes');

module.exports = expressApp => {
  expressLoader(expressApp);
  routeLoader(expressApp);
};
