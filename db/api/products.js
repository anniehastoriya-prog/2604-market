import express from "express";
const router = express.Router();
export default router;

import { getOrdersByProductId } from "#db/queries/orders";
import { getProducts, getProductById } from "#db/queries/products";
import requireUser from "#middleware/requireUser";

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.param("id", async (req, res, next, id) => {
  const product = await getProductById(id);
  if (!product) return res.status(404).send("Product not found.");
  req.product = product;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.product);
});

router.get("/:id/orders", requireUser, async (req, res) => {
  const orders = await getOrdersByProductId(req.product.id);
  res.send(orders);
});
