const getPaginationFromQuery = query => {
  const { page, size } = query;
  const pagination = {
    page: Number(page),
    size: Number(size),
  };

  delete query.page;
  delete query.size;

  return { pagination, options: query };
};

module.exports = { getPaginationFromQuery };
