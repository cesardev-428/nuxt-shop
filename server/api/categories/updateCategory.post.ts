import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, description, category_id } = body;

  const data = await db
    .update(schema.categories)
    .set({
      name,
      description,
      category_id,
    })
    .where(eq(schema.categories.id, body.id))
    .returning();

  if (!data || data.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update category",
    });
  }
  return data[0];
});
