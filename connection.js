const Sequelize = require("sequelize");
const config = require("config");

const database = config.get("database"); //order_app
const username = config.get("username"); //postgres
const password = config.get("password"); //docker

const connection = new Sequelize(database, username, password, {
  host: config.get("host"),
  dialect: config.get("dialect"),
});

module.exports = connection;
