import { createClient } from "@libsql/client";

const db = createClient({ url: "file:.data/db/sqlite.db" });

try {
  await db.batch([
    "DELETE FROM Products",
    "DELETE FROM Categories",
    "DELETE FROM Tags",
    "DELETE FROM Users",
  ]);
  console.log("Database reset: all rows deleted.");
} catch (error) {
  if (String(error).includes("no such table")) {
    console.error("Tables not found. Run `npm run db:migrate` first.");
  }
  throw error;
}
