import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";
interface ProductAdd {
  title: string;
  description: string;
  price: number;
  thumbnail: string | null;
  category_id: number | null;
  tagIds: number[];
}
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, description, price, thumbnail, category_id, tagIds } =
    body as ProductAdd;
  return await db
    .insert(schema.products)
    .values({
      title,
      description,
      price,
      thumbnail,
      category_id,
      tag_id: tagIds,
    })
    .returning();
});
