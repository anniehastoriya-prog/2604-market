import express from "express";
const router = express.Router();
export default router;

import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
} from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products";
import { getProductsByOrderId, getProductById } from "#db/queries/products";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.use(requireUser);

// Gets the orders by using the User's ID.
router.get("/", async (req, res) => {
  const orders = await getOrdersByUserId(req.user.id);
  res.send(orders);
});

// The user picks a selected date and then a new order is created.
// The date is then sent to the server which is then saved.
router.post("/", requireBody(["date"]), async (req, res) => {
  const { date, note } = req.body;
  const order = await createOrder(date, note, req.user.id);
  res.status(201).send(order);
});

// Checks to see if the order exists.
// If it doesn't exist, an error message is displayed.
router.param("id", async (req, res, next, id) => {
  const order = await getOrderById(id);
  if (!order) return res.status(404).send("Order not found.");
  if (order.user_id !== req.user.id)
    return res
      .status(403)
      .send("You do not have permission to access this order.");
  req.order = order;
  next();
});

// Gets the ID from the order
router.get("/:id", (req, res) => {
  res.send(req.order);
});

// Gets all the products needed for a specific order
router.get("/:id/products", async (req, res) => {
  const products = await getProductsByOrderId(req.order.id);
  res.send(products);
});

// User selects product using productID and selects the quantity.
// Server checks if product exists.
// If product does not exist, error message is sent.
// If product does exist, product will be added to the order.
router.post(
  "/:id/products",
  requireBody(["productId", "quantity"]),
  async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await getProductById(productId);
    if (!product) return res.status(400).send("Product not found.");
    const orderProduct = await createOrderProduct(
      req.order.id,
      productId,
      quantity,
    );
    res.status(201).send(orderProduct);
  },
);
