import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const configEnv = useRuntimeConfig();
  const client = createClient(configEnv.supabaseUrl, configEnv.supabaseKey);

  const category = query.category;

  if (!category) {
    const { data, error } = await client.from("Products").select();
    if (error) {
      throw createError(error);
    }
    return data.length;
  } else {
    const { data, error } = await client
      .from("Products")
      .select()
      .eq("category_id", category);
    if (error) {
      throw createError(error);
    }
    return data.length;
  }
});
