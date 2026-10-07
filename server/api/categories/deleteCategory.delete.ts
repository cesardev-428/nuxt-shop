import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const deleteCategory = await db
    .delete(schema.categories)
    .where(eq(schema.categories.id, id))
    .returning();

  if (deleteCategory.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Category not found",
    });
  }
  return deleteCategory[0];
});
