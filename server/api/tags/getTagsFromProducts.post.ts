import { createClient } from "@supabase/supabase-js";
export default defineEventHandler(async (event) => {
  const configEnv = useRuntimeConfig();
  const client = createClient(configEnv.supabaseUrl, configEnv.supabaseKey);

  const body = await readBody(event);
  const Id_tags = body.Id_tags || [];
  const { data, error } = await client
    .from("Tags")
    .select()
    .in("id", Id_tags)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching tags from products:", error);
    throw createError(error);
  }

  /* const { data, error } = await client.from("Tags").select();
  if (error) {
    console.error("Error fetching categories:", error);
    throw createError(error);
  } */

  return data;
});
