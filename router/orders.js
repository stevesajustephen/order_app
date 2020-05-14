const express = require("express");
const { Order, validate } = require("../model/order");
const Order_item = require("../model/order_item");
const auth = require("../middleware/auth");
const connection = require("../connection");

const router = express();

router.get("/", auth, async (req, res) => {
  let orders = null;
  if (req.user.isAdmin) {
    orders = await Order.findAll();
  } else {
    orders = await Order.findAll({ where: { userId: req.user.userId } });
  }
  res.send(orders);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const count = await Order.count();
  let order = {
    orderNumber: `ORDER${count}`,
    userId: req.user.userId,
    total: req.body.total,
  };
  const transaction = await connection.transaction();

  try {
    order = await Order.create(order, { transaction });
    for (const product of req.body.products) {
      const order_item = {
        orderId: order.orderId,
        productId: product.productId,
        quantity: parseInt(product.quantity),
        netAmount: null,
      };
      await Order_item.create(order_item, { transaction });
    }
    await transaction.commit();
    res.send(order);
  } catch (err) {
    if (transaction) await transaction.rollback();
    res.status(500).send("something went wrong");
  }
});

module.exports = router;
