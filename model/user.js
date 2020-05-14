const connection = require("../connection");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = connection.define(
  "User",
  {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
    },
  }
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}

function generateAuthToken(user) {
  const token = jwt.sign(
    { userId: user.userId, isAdmin: user.isAdmin },
    config.get("privateKey")
  );
  return token;
}

exports.User = User;
exports.validate = validateUser;
exports.generateAuthToken = generateAuthToken;
