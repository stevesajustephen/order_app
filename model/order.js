const Sequelize = require("sequelize");
const connection = require("../connection");
const Joi = require("@hapi/joi");

const Order = connection.define("Order", {
  orderId: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  orderNumber: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.STRING,
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

function validateOrder(order) {
  const schema = Joi.object({
    products: Joi.array()
      .items({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
      })
      .required(),
    total: Joi.number().required(),
  });
  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
