const carveSpecificFieldFromQuery = (query, searchingField) => {
  const result = {
    [searchingField]: query[searchingField],
  };

  delete query[searchingField];

  return result;
};

const carvePaginationFromQuery = query => {
  const { page, size } = query;
  const pagination = {
    page: Number(page),
    size: Number(size),
  };

  delete query.page;
  delete query.size;

  return { pagination };
};

module.exports = { carvePaginationFromQuery, carveSpecificFieldFromQuery };
