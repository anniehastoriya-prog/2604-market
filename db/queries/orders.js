import db from "#db/client";

export async function createOrders(date, note, userId) {
  const sql = `
  INSERT INTO orders
    (name, description, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [order],
  } = await db.query(sql, [date, note, userId]);
  return order;
}

export async function getOrdersByUserId(id) {
  const sql = `
  SELECT *
  FROM orders
  WHERE user_id = $1
  `;
  const { rows: orders } = await db.query(sql, [id]);
  return orders;
}

export async function getOrderById(id) {
  const sql = `
  SELECT *
  FROM orders
  WHERE id = $1
  `;
  const {
    rows: [order],
  } = await db.query(sql, [id]);
  return order;
}

export async function getOrdersByProductId(id) {
  const sql = `
  SELECT orders.*
  FROM
    orders
    JOIN orders_products ON orders.id = orders_products.order_id
  WHERE orders_products.product_id = $1
  `;
  const { rows: orders } = await db.query(sql, [id]);
  return orders;
}
