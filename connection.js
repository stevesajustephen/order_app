const Sequelize = require("sequelize");
const config = require("config");

// const connection = new Sequelize(
//   "postgres://postgres:docker@localhost:5432/order_app"
// );

const connection = new Sequelize(process.env.DATABASE_URL);
module.exports = connection;
