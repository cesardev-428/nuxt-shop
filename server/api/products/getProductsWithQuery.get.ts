import { db, schema } from "@nuxthub/db";
import { and, like } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const _query = typeof query.query === "string" ? query.query : undefined;

  const terms = _query ? _query.split(/\s+/).filter(Boolean) : [];
  if (terms.length === 0) {
    return { products: [] };
  }

  const data = await db
    .select()
    .from(schema.products)
    .where(
      and(...terms.map((term) => like(schema.products.title, `%${term}%`)))
    );

  return { products: data };
});
