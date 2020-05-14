const Sequelize = require("sequelize");
const config = require("config");

const database = config.get("database"); //order_app
const username = config.get("db_username"); //postgres
const password = config.get("db_password"); //docker

const connection = new Sequelize(database, username, password, {
  host: config.get("host"),
  dialect: config.get("dialect"),
});

module.exports = connection;
