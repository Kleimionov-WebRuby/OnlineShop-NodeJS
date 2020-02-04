exports.carveSpecificFieldFromQuery = (query, searchingField) => {
  const result = {
    [searchingField]: query[searchingField],
  };

  delete query[searchingField];

  return result;
};

exports.carvePaginationFromQuery = query => {
  const { page, size } = query;
  const pagination = {
    page: Number(page),
    size: Number(size),
  };

  delete query.page;
  delete query.size;

  return { pagination };
};

exports.copyObject = object => {
  return JSON.parse(JSON.stringify(object));
};
