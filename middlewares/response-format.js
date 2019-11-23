const responseFormat = (message, object = null) => {
  return {
    message,
    data: object,
  };
};

module.exports = responseFormat;
