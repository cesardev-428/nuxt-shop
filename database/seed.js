import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

let arrayIdCategories = [];
let _arrayIdCategories = [];

let arrayIdTags = [];

const seedCategories = async (numEntries) => {
  const categories = [];

  for (let i = 0; i < numEntries; i++) {
    // create an object of fake data and pass it to the products array
    categories.push({
      name: faker.commerce.department(),
      description: faker.lorem.words(10),
      category_id: null,
    });
  }
  // query supabase to create the data rows from the products array
  const { data, error } = await supabase
    .from("Categories")
    .insert(categories)
    .select("id");
  arrayIdCategories = data.map((category) => category.id);

  for (let i = 0; i < arrayIdCategories.length; i++) {
    const id = arrayIdCategories[i];
    if (i % 2 === 0) {
      _arrayIdCategories.push(null);
    }
    _arrayIdCategories.push(id);
  }

  //update all the category_id with the id of the parent category.id or null
  for (let i = 0; i < numEntries; i++) {
    /* const index = await getIndex(_arrayIdCategories.length) */
    await supabase
      .from("Categories")
      .update({ category_id: faker.helpers.arrayElement(_arrayIdCategories) })
      .eq("id", arrayIdCategories[i])
      .select();
  }
};

const seedTags = async (numEntries) => {
  const tags = [];

  for (let i = 0; i < numEntries; i++) {
    // create an object of fake data and pass it to the products array
    tags.push({
      name: faker.commerce.productAdjective(),
    });
  }
  // query supabase to create the data rows from the products array
  const { data, error } = await supabase.from("Tags").insert(tags).select("id");
  arrayIdTags = data.map((tag) => tag.id);
  console.log("Array of Tag IDs:", arrayIdTags);
};

const seedProducts = async (numEntries) => {
  const products = [];

  for (let i = 0; i < numEntries; i++) {
    // create an object of fake data and pass it to the products array
    products.push({
      title: faker.commerce.product(),
      description: faker.lorem.words(10),
      price: faker.number.float({ min: 2, max: 100, multipleOf: 0.02 }),
      thumbnail: null,
      category_id: faker.helpers.arrayElement(arrayIdCategories),
      tag_id: faker.helpers.arrayElements(arrayIdTags, {
        min: 1,
        max: 5,
      }),
    });
  }
  // query supabase to create the data rows from the products array
  const { data, error } = await supabase
    .from("Products")
    .insert(products)
    .select("id");

  if (error) {
    console.error("Error inserting products:", error);
  } else {
    console.log("Products seeded successfully.");
  }
};

await seedCategories(20);
await seedTags(50);
await seedProducts(100);
