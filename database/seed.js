import { createClient } from "@libsql/client";
import { faker } from "@faker-js/faker";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const db = createClient({ url: "file:.data/db/sqlite.db" });

const scryptAsync = promisify(scrypt);

/* Admin por defecto — sobrescribir con ADMIN_EMAIL / ADMIN_PASSWORD en la shell */
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@store.example";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scryptAsync(password, salt, 64, {
    N: 16384,
    r: 8,
    p: 1,
  });
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

const seedAdmin = async () => {
  const existing = await db.execute({
    sql: "SELECT id FROM Users WHERE email = ?",
    args: [ADMIN_EMAIL.toLowerCase()],
  });
  if (existing.rows.length > 0) {
    console.log(`Admin already exists: ${ADMIN_EMAIL}`);
    return;
  }
  await db.execute({
    sql: "INSERT INTO Users (email, name, password_hash, role) VALUES (?, ?, ?, ?)",
    args: [
      ADMIN_EMAIL.toLowerCase(),
      "Store Admin",
      await hashPassword(ADMIN_PASSWORD),
      "admin",
    ],
  });
  console.log(`Admin seeded: ${ADMIN_EMAIL}`);
};

const seedCategories = async (numEntries) => {
  const values = Array.from({ length: numEntries }, () => [
    faker.commerce.department(),
    faker.lorem.words(10),
  ]);
  await db.execute({
    sql: `INSERT INTO Categories (name, description, category_id) VALUES ${values
      .map(() => "(?, ?, NULL)")
      .join(", ")}`,
    args: values.flat(),
  });

  const { rows } = await db.execute("SELECT id FROM Categories ORDER BY id");
  const ids = rows.map((row) => Number(row.id));

  // pool de padres posibles: nulls intercalados con ids (como el original), excluyendo el propio id
  const parentPool = [];
  ids.forEach((id, i) => {
    if (i % 2 === 0) parentPool.push(null);
    parentPool.push(id);
  });

  for (const id of ids) {
    const candidates = parentPool.filter((parent) => parent !== id);
    await db.execute({
      sql: "UPDATE Categories SET category_id = ? WHERE id = ?",
      args: [faker.helpers.arrayElement(candidates), id],
    });
  }

  return ids;
};

const seedTags = async (numEntries) => {
  const values = Array.from({ length: numEntries }, () => [
    faker.commerce.productAdjective(),
  ]);
  await db.execute({
    sql: `INSERT INTO Tags (name) VALUES ${values.map(() => "(?)").join(", ")}`,
    args: values.flat(),
  });

  const { rows } = await db.execute("SELECT id FROM Tags ORDER BY id");
  return rows.map((row) => Number(row.id));
};

const seedProducts = async (numEntries, categoryIds, tagIds) => {
  const values = Array.from({ length: numEntries }, () => [
    faker.commerce.product(),
    faker.lorem.words(10),
    faker.number.float({ min: 2, max: 100, multipleOf: 0.02 }),
    null,
    faker.helpers.arrayElement(categoryIds),
    JSON.stringify(
      faker.helpers.arrayElements(tagIds, {
        min: 1,
        max: 5,
      }),
    ),
  ]);
  await db.execute({
    sql: `INSERT INTO Products (title, description, price, thumbnail, category_id, tag_id) VALUES ${values
      .map(() => "(?, ?, ?, ?, ?, ?)")
      .join(", ")}`,
    args: values.flat(),
  });

  console.log("Products seeded successfully.");
};

try {
  const categoryIds = await seedCategories(100);
  const tagIds = await seedTags(500);
  await seedProducts(1000, categoryIds, tagIds);
  await seedAdmin();
  console.log("Seeded: 100 categories, 500 tags, 1000 products, 1 admin.");
} catch (error) {
  if (String(error).includes("no such table")) {
    console.error("Tables not found. Run `npm run db:migrate` first.");
  }
  throw error;
}
