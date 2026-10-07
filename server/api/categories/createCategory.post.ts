import { db, schema } from "@nuxthub/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, description } = body;

  const data = await db
    .insert(schema.categories)
    .values({
      name,
      description,
    })
    .returning();

  if (!data || data.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create category",
    });
  }
  return data[0];
});
