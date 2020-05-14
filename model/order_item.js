const Sequelize = require("sequelize");
const connection = require("../connection");

const Order_item = connection.define("Order_item", {
  orderItemId: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  orderId: {
    type: Sequelize.STRING,
  },
  productId: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  netAmount: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Order_item;
