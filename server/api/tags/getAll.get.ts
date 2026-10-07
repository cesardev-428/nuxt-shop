import { db, schema } from "@nuxthub/db";

export default defineEventHandler(async () => {
  const data = await db.select().from(schema.tags).orderBy(schema.tags.id);

  return data;
});
