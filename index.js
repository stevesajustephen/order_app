const express = require("express");
const connection = require("./connection");
const users = require("./router/users");
const products = require("./router/products");
const orders = require("./router/orders");
const home = require("./router/home");
const auth = require("./router/auth");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use("/", home);
// app.use("/api/login", auth);
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/orders", orders);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});

connection
  .sync()
  .then(() => {
    console.log("connected to db.. .....");
  })
  .catch((err) => {
    console.log("connection error...  ", err);
  });
