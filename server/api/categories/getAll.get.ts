import { createClient } from "@supabase/supabase-js";
export default defineEventHandler(async (event) => {
  const configEnv = useRuntimeConfig();
  const client = createClient(configEnv.supabaseUrl, configEnv.supabaseKey);

  const { data, error } = await client.from("Categories").select();
  if (error) {
    console.error("Error fetching categories:", error);
    throw createError(error);
  }

  return data;
});
