import { db, schema } from "@nuxthub/db";
import { desc, inArray } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const Id_tags: number[] = (body.Id_tags || []).map(Number);

  if (Id_tags.length === 0) {
    return [];
  }

  const data = await db
    .select()
    .from(schema.tags)
    .where(inArray(schema.tags.id, Id_tags))
    .orderBy(desc(schema.tags.created_at));

  return data;
});
