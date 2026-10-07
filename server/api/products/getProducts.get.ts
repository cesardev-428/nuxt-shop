import { db, schema } from "@nuxthub/db";
import { and, eq, sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = Number(query.page);
  const limit = Number(query.limit);
  const category = Number(query.category);
  const tag = typeof query.tag === "string" && query.tag ? query.tag : null;

  const conditions = [];
  if (category) {
    conditions.push(eq(schema.products.category_id, category));
  }
  // Filtra productos cuyo array tag_id contiene la etiqueta indicada (por nombre)
  if (tag) {
    conditions.push(sql`EXISTS (
      SELECT 1
      FROM json_each(${schema.products.tag_id}) AS jt
      JOIN ${schema.tags} AS t ON t.id = jt.value
      WHERE t.name = ${tag}
    )`);
  }

  const data = await db
    .select()
    .from(schema.products)
    .where(and(...conditions))
    .orderBy(schema.products.id)
    .limit(limit)
    .offset(limit * page - limit);

  return { products: data };
});
