const Product = require('../models/product');
const Category = require('../models/category');
const { Op } = require('sequelize');

class ProductRepository {
  getAll(pagination, options) {
    const { title, withImg } = options;
    const { page, size } = pagination;
    let pageNum, sizeNum;

    page ? (pageNum = page) : (pageNum = 1);
    size ? (sizeNum = size) : (sizeNum = 2);

    const skip = sizeNum * (pageNum - 1);
    const limit = sizeNum;
    const whereOptions = {
      title: {
        [Op.like]: `%${title}%`,
      },
      picture: {
        [Op.not]: null,
      },
    };
    const sequelizeOptions = {
      where: whereOptions,
      attributes: ['id', 'title', 'desc', 'price', 'picture', 'amount'],
      include: [
        {
          model: Category,
          attributes: ['id', 'categoryName'],
          through: { attributes: [] },
        },
      ],
      limit,
      offset: skip,
      order: [['amount', 'DESC']],
      distinct: true, // Without this option I get wrong count in response. In count includes the included rows as categories
    };

    if (!title) {
      delete whereOptions.title;
    }

    if (!withImg) {
      delete whereOptions.picture;
    }

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
