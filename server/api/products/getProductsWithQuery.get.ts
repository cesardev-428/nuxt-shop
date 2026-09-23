import { createClient } from "@supabase/supabase-js";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const configEnv = useRuntimeConfig();
  const client = createClient(configEnv.supabaseUrl, configEnv.supabaseKey);
  const _query = query.query;

  if (_query) {
    const { data, error } = await client
      .from("Products")
      .select("*")
      .textSearch("title", _query, {
        type: "websearch",
        config: "english",
      });
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }
    return { products: data };
  }
});
