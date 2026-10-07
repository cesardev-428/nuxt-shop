import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const category = Number(query.category);
  const page = Number(query.page);
  const limit = Number(query.limit);

  const data = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.category_id, category))
    .orderBy(schema.products.id)
    .limit(limit)
    .offset(limit * page - limit);

  return { products: data };
});
