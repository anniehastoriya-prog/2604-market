DROP TABLE IF EXISTS order_products;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;

-- TODO
CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
);

CREATE TABLE orders (
  id serial PRIMARY KEY,
  name text NOT NULL,
  note text,
  user_id integer NOT NULL
 );

CREATE TABLE order_products (
  order_id integer NOT NULL,
  product_id integer NOT NULL,
  quanity integer NOT NULL
  order_id integer NOT NULL REFERENCES order(id) ON DELETE CASCADE,
  product_id integer NOT NULL REFERENCES product(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id serial PRIMARY KEY,
  title text NOT NULL,
  price decimal NOT NULL
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE

);
