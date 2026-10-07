import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const deleteUser = await db
    .delete(schema.products)
    .where(eq(schema.products.id, id))
    .returning();

  if (deleteUser.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }
  return deleteUser[0];
});
