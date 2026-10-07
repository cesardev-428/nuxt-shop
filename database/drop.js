import { createClient } from "@libsql/client";

const db = createClient({ url: "file:.data/db/sqlite.db" });

// Drop all tables in the database
async function dropTables() {
  const tables = ["Products", "Categories", "Tags", "Users"];
  for (const table of tables) {
    await db.execute(`DROP TABLE IF EXISTS ${table}`);
    console.log(`Dropped table: ${table}`);
  }
}
dropTables()
  .then(() => {
    console.log("All tables dropped successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error dropping tables:", error);
    process.exit(1);
  });
