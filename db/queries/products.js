import db from "#db/client";

export async function createProduct(title, price) {
  const sql = `
  INSERT INTO products
    (title, duration_ms)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [product],
  } = await db.query(sql, [title, price]);
  return product;
}

export async function getProducts() {
  const sql = `
  SELECT *
  FROM products
  `;
  const { rows: products } = await db.query(sql);
  return products;
}

export async function getProductssByOrderId(id) {
  const sql = `
  SELECT products.*
  FROM
    tracks
    JOIN orders_products ON orders_products.product_id = products.id
    JOIN orders ON order.id = orders_products.order_id
  WHERE orders.id = $1
  `;
  const { rows: products } = await db.query(sql, [id]);
  return products;
}

export async function getProductById(id) {
  const sql = `
  SELECT *
  FROM products
  WHERE id = $1
  `;
  const {
    rows: [product],
  } = await db.query(sql, [id]);
  return product;
}
