import express from "express";
const router = express.Router();
export default router;

import { getOrdersByProductId } from "#db/queries/orders";
import { getProducts, getProductById } from "#db/queries/products";
import requireUser from "#middleware/requireUser";

// router gets the products
router.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

// This router looks up product using its ID
// When the product does not exist the error message will be displayed
// If product does exist it will be sent to the next route.
router.param("id", async (req, res, next, id) => {
  const product = await getProductById(id);
  if (!product) return res.status(404).send("Product not found.");
  req.product = product;
  next();
});

// Gets the product using it's ID.
router.get("/:id", (req, res) => {
  res.send(req.product);
});

// Gets all the orders containing the specfifc product for the user.
// The order is sent.
router.get("/:id/orders", requireUser, async (req, res) => {
  const orders = await getOrdersByProductId(req.product.id, req.user.id);
  res.send(orders);
});
