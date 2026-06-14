import db from "#db/client";

//Creates a new order-product association and inserts it into the orders_products table.
export async function createOrderProduct(orderId, productId, quantity) {
  const sql = `
  INSERT INTO orders_products
    (order_id, product_id, quantity)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [orderProduct],
  } = await db.query(sql, [orderId, productId, quantity]);
  return orderProduct;
}
