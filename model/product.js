const connection = require("../connection");
const Sequelize = require("sequelize");
const Joi = require("@hapi/joi");

const Product = connection.define(
  "Product",
  {
    productId: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  },
  {}
);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().required(),
  });
  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
