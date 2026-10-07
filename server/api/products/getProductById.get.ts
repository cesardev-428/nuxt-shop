import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const id = Number(query.id);
  if (!Number.isInteger(id) || id <= 0) {
    return { product: null };
  }

  const data = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.id, id))
    .limit(1);

  return { product: data[0] ?? null };
});
