import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("SEVER:", body);
  return await db.insert(schema.tags).values(body).returning();
});
