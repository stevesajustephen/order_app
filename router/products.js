const express = require("express");
const _ = require("lodash");
const { Product, validate } = require("../model/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express();

router.get("/", auth, async (req, res) => {
  const products = await Product.findAll();
  res.send(products);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let product = {
    name: req.body.name,
    price: req.body.price,
  };
  product = await Product.create(product);
  res.send(_.pick(product, ["productId", "name", "price"]));
});

module.exports = router;
