const express = require("express");
const _ = require("lodash");
const { User, validate, generateAuthToken } = require("../model/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express();

router.get("/", [auth, admin], async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  res.send(_.pick(user, ["name", "email"]));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) return res.status(400).send("user already registered");
  user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  };
  user = await User.create(user);
  const token = generateAuthToken(user);
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["userId", "name", "email", "isAdmin"]));
});

module.exports = router;
