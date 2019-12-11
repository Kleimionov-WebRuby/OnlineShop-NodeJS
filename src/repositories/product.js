const Product = require('../models/product');
const Category = require('../models/category');
const { Op } = require('sequelize');

class ProductRepository {
  getAll(pagination, options, categories) {
    const { title, withImg, dateSort } = options; // dateSort = ASC || DESC in query params
    const { page, size } = pagination;
    let pageNum, sizeNum;

    page ? (pageNum = page) : (pageNum = 1);
    size ? (sizeNum = size) : (sizeNum = 2);

    const skip = sizeNum * (pageNum - 1);
    const limit = sizeNum;

    const categoryIds =
      categories && categories.length > 0
        ? JSON.parse(`[${categories}]`)
        : null;

    const whereOptions = {
      title: {
        [Op.like]: `%${title}%`,
      },
      picture: {
        [Op.not]: null,
      },
    };

    const orderOptions = [
      ['updatedAt', dateSort],
      ['amount', 'DESC'],
    ];

    const sequelizeOptions = {
      where: whereOptions,
      attributes: [
        'id',
        'title',
        'desc',
        'price',
        'picture',
        'amount',
        'updatedAt',
      ],
      include: [
        {
          model: Category,
          attributes: ['id', 'categoryName'],
          through: { attributes: [] },
          where: {
            id: {
              [Op.in]: categoryIds,
            },
          },
        },
      ],
      limit,
      offset: skip,
      order: orderOptions,
      distinct: true, // Without this option I get wrong count in response. In count includes the included rows as categories
    };

    // If the title attribute isn't in the query parameters - delete key title from whereOptions
    if (!title) delete whereOptions.title;
    // If the withImg attribute isn't in the query parameters - delete key picture from whereOptions
    if (!withImg) delete whereOptions.picture;
    // If the dateSort attribute isn't in the query parameters - cut order row "updatedAt" from orderOptions
    if (!dateSort) orderOptions.splice(0, 1);
    // If the categoryIds is isn't in the query parameters - delete key 'where' in sequelizeOptions from 'include' of categories
    if (!categoryIds) delete sequelizeOptions.include[0].where;

    return Product.findAndCountAll(sequelizeOptions);
  }

  get(id) {
    return Product.findByPk(id);
  }

  create(product) {
    return Product.create(product);
  }

  update(id, product) {
    return Product.update(product, {
      where: { id },
    });
  }

  delete(id) {
    return Product.destroy({
      where: { id },
    });
  }
}

module.exports = ProductRepository;
