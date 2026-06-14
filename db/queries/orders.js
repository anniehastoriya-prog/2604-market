import db from "#db/client";

//Creates a new row of orders in the database with the date, note, and user ID.
export async function createOrder(date, note, userId) {
  const sql = `
  INSERT INTO orders
    (date, note, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [order],
  } = await db.query(sql, [date, note, userId]);
  return order;
}

//Looks at all the orders within the database using the user's ID.
export async function getOrdersByUserId(id) {
  const sql = `
  SELECT *
  FROM orders
  WHERE user_id = $1
  `;
  const { rows: orders } = await db.query(sql, [id]);
  return orders;
}

//Looks up an order using its ID
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

//Finds all the orders that contain a specific product using the product's ID.
export async function getOrdersByProductId(id) {
  const sql = `
  SELECT orders.*
  FROM orders
    JOIN orders_products ON orders.id = orders_products.order_id
  WHERE orders_products.product_id = $1
  `;
  const { rows: orders } = await db.query(sql, [id]);
  return orders;
}
