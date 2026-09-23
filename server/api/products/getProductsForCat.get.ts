import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const configEnv = useRuntimeConfig();
  const client = createClient(configEnv.supabaseUrl, configEnv.supabaseKey);

  const category = query.category;
  const page = query.page as number;
  const limit = query.limit as number;

  const { data, error } = await client
    .from("Products")
    .select()
    .eq("category_id", category)
    .limit(limit)
    .range(limit * page - limit, limit * page - 1);
  if (error) {
    throw createError(error);
  }

  return { products: data };
});
