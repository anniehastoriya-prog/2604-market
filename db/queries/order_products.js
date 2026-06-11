import db from "#db/client";

export async function createOrderProduct(orderId, productId) {
  const sql = `
  INSERT INTO orders_products
    (order_id, product_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [orderProduct],
  } = await db.query(sql, [orderId, productId]);
  return orderProduct;
}
