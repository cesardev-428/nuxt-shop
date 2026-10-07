import { db, schema } from "@nuxthub/db";
import { count, sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = Number(query.page);
  const limit = Number(query.limit);
  const tag = typeof query.tag === "string" && query.tag ? query.tag : null;

  // Filtra productos cuyo array tag_id contiene la etiqueta indicada (por nombre)
  const tagFilter = tag
    ? sql`EXISTS (
        SELECT 1
        FROM json_each(${schema.products.tag_id}) AS jt
        JOIN ${schema.tags} AS t ON t.id = jt.value
        WHERE t.name = ${tag}
      )`
    : undefined;

  const data = await db
    .select()
    .from(schema.products)
    .where(tagFilter)
    .orderBy(schema.products.id)
    .limit(limit)
    .offset(limit * page - limit);

  const countRows = await db
    .select({ count: count() })
    .from(schema.products)
    .where(tagFilter);
  const totalProducts = countRows[0]?.count ?? 0;

  return { products: data, totalProducts: totalProducts };
});
