import db from "#db/client";

import { createOrder } from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products";
import { createProduct } from "#db/queries/products";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log(" Database seeded.");

async function seed() {
  // 10 products created
  for (let i = 1; i <= 10; i++) {
    await createProduct(
      "Product " + i,
      "Description for product " + i,
      i * 100,
    );
  }
  // Create 1 user with 1 order of 5 distinct products
  for (let i = 1; i <= 1; i++) {
    const user = await createUser("user" + i, "password");
    const order = await createOrder(new Date(), "First order", user.id);
    for (let j = 0; j < 5; j++) {
      const op = await createOrderProduct(order.id, (i - 1) * 5 + j + 1, 1);
      console.log("Created order product:", op);
    }
  }
}
