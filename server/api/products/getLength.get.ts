import { db, schema } from "@nuxthub/db";
import { count, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const category = query.category;

  if (!category) {
    const rows = await db.select({ count: count() }).from(schema.products);
    return rows[0]?.count ?? 0;
  } else {
    const rows = await db
      .select({ count: count() })
      .from(schema.products)
      .where(eq(schema.products.category_id, Number(category)));
    return rows[0]?.count ?? 0;
  }
});
