<template>
  <nav
    class="inline-flex items-center p-1 rounded space-x-2 mt-4 w-full justify-center"
  >
    <button
      @click="getNextPage(false)"
      class="p-1 rounded border text-textColor-dark bg-primary"
      href="#"
    >
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </button>
    <p class="dark:text-textColor-dark text-textColor-light">
      Page {{ currentPage }} of
      {{
        tags.tagSelected === "AllTags"
          ? productsStore.pages
          : productsStore.getPagesFromFormatted
      }}
    </p>
    <button
      @click="getNextPage(true)"
      class="p-1 rounded border text-textColor-dark bg-primary"
      href="#"
    >
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </button>
  </nav>
</template>
<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const tags = useTagStore();
const productsStore = useProductStore();
const productsComposable = useProduct();
const categoryStore = useCategoryStore();

const currentPage = useState<number>("currentPage", () => 1);

const limit = ref(6);
const emit = defineEmits<{
  (e: "sendCurrentPage", page: number): void;
  (e: "loading", loading: boolean): void;
}>();
onMounted(async () => {
  if (route.query.category && categoryStore.categories.length > 0) {
    /* console.log("mounted pagination"); */
    await initializeDataWithCategorie();
  } else {
    await initializeData();
    /* console.log("mounted pagination without category"); */
  }
});

const initializeData = async () => {
  // clear categories selected
  categoryStore.setCategorySelected(null);
  // clear products
  productsStore.clearProducts();
  // reset current page
  currentPage.value = 1;

  /*  console.log("initializeData"); */

  try {
    const data = await productsComposable.getProductsWithoutCategory(
      limit.value,
      currentPage.value
    );
    /* console.log("initializeData", data); */
    productsStore.setProducts(data.products);
    productsStore.setPages(data.totalProducts, limit.value);
  } catch (err) {
    console.error(err);
  }
};

const initializeDataWithCategorie = async () => {
  if (route.query.category) {
    categoryStore.updateCategorySelectedFromParam(
      route.query.category as string
    );
    try {
      const data = await productsComposable.getProductsForCategory(
        categoryStore.categorySelected as string,
        limit.value,
        currentPage.value
      );
      const total = await productsComposable.getLength(
        categoryStore.categorySelected as string
      );
      productsStore.setPages(total, limit.value);
      productsStore.setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  }
};

// watch
watch(
  () => categoryStore.categories,
  async (newVal) => {
    if (newVal) {
      /* console.log("watch pagination"); */
      await initializeData();
    }
  },
  { deep: true }
);
watch(
  () => productsStore.pages,
  (newVal) => {
    if (newVal) {
      currentPage.value = 1;
      emit("sendCurrentPage", currentPage.value);
    }
  }
);

const getNextPage = async (next: boolean) => {
  /* console.log("Next page", next); */
  if (
    (next && currentPage.value >= productsStore.pages) ||
    (!next && currentPage.value <= 1)
  )
    return;

  next ? currentPage.value++ : currentPage.value--;
  emit("sendCurrentPage", currentPage.value);
  if (productsStore.products.length > currentPage.value * 6 - 6) return;
  /* console.log("llamada", productsStore.products.length, currentPage.value); */

  emit("loading", true);
  try {
    if (categoryStore.categorySelected) {
      const data = await $fetch(
        `/api/products/getProducts?limit=${limit.value}&page=${currentPage.value}&category=${categoryStore.categorySelected}`
      );
      productsStore.setProducts(data.products);
    } else {
      const data = await $fetch(
        `/api/products/getProducts?limit=${limit.value}&page=${currentPage.value}`
      );

      productsStore.setProducts(data.products);
    }
  } catch (err: any) {
    console.error(err);
  } finally {
    emit("loading", false);
  }
};
</script>
