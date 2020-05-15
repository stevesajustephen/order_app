const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "pug",
    h1: "order App...",
  });
});

module.exports = router;
