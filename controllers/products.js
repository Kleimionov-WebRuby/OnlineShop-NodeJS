const Product = require('../db/models').Product;

module.exports = {
  async create(req, res) {
    try {
      const { title, desc, price, amount } = req.body;

      if (!title || !desc || !price || !amount) {
        return res
          .status(400)
          .send({ message: 'Check your fields. Maybe some of them are empty' });
      }

      const existingProduct = await Product.findOne({
        where: { title: title },
      });

      if (existingProduct !== null) {
        return res.status(400).send({
          message:
            'This product already in store. You can increase the quantity of this product.',
        });
      }

      const productCollection = {
        title,
        desc,
        price,
        amount,
      };
      const product = await Product.create(productCollection);

      res.status(201).send(product);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};

//
// Сделать унифицированный формат ответа.
//
