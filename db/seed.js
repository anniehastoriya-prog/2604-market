import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // 10 products created
  for (let i = 1; i <= 10; i++) {
    await createProduct("Product " + i, i * 100);
  }
  // Create 1 user with 1 order of 5 distinct products
  for (let i = 1; i <= 1; i++) {
    const user = await createUser("user" + i, "password");
    const order = await createOrder(user.id);
    for (let j = 0; j < 5; j++) {
      await createOrderProduct(order.id, (i - 1) * 5 + j + 1);
    }
  }
}
