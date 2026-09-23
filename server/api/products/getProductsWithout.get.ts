import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const configEnv = useRuntimeConfig();
  const client = createClient(configEnv.supabaseUrl, configEnv.supabaseKey);

  const page = query.page as number;
  const limit = query.limit as number;

  const { data, error } = await client
    .from("Products")
    .select()
    .limit(limit)
    .range(limit * page - limit, limit * page - 1);
  if (error) {
    throw createError(error);
  }

  // get length of products
  const { count, error: countError } = await client
    .from("Products")
    .select("*", { count: "exact" });
  if (countError) {
    throw createError(countError);
  }
  const totalProducts = count || 0;

  return { products: data, totalProducts: totalProducts };
});
