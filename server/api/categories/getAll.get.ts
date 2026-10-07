import { db, schema } from "@nuxthub/db";

export default defineEventHandler(async () => {
  const data = await db
    .select()
    .from(schema.categories)
    .orderBy(schema.categories.id);

  return data;
});
