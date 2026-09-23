import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const deleteProject = async () => {
  // delete all rows from the table products
  const response = await supabase
    .from("Products")
    .delete()
    .in("id", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  console.log(response);

  // delete all rows from the table categories
  const responseCategories = await supabase
    .from("Categories")
    .delete()
    .in("id", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  console.log(responseCategories);
};

await deleteProject();
