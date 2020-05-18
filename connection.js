const Sequelize = require("sequelize");
const config = require("config");

const connection = new Sequelize(process.env.DATABASE_URL);
module.exports = connection;
