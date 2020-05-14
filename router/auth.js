const express = require("express");
const { User, generateAuthToken } = require("../model/user");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateCredentials(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(400).send("invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send("invalid email or password");

  const token = generateAuthToken(user);
  res.send(token);
});

function validateCredentials(credentials) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(credentials);
}

module.exports = router;
