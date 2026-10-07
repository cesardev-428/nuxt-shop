<template>
  <nav
    v-if="totalPages > 1"
    class="flex w-full items-center justify-center gap-4 px-4 pb-10 pt-2 lg:px-8"
    aria-label="Pagination"
  >
    <button
      type="button"
      aria-label="Previous page"
      :disabled="currentPage <= 1"
      @click="getNextPage(false)"
      class="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-textColor-light transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-light disabled:hover:text-textColor-light dark:border-border-dark dark:text-textColor-dark dark:disabled:hover:border-border-dark dark:disabled:hover:text-textColor-dark"
    >
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </button>
    <p
      class="min-w-[7rem] text-center text-sm font-semibold text-textColor-light dark:text-textColor-dark"
      aria-live="polite"
    >
      Page {{ currentPage }} of {{ totalPages }}
    </p>
    <button
      type="button"
      aria-label="Next page"
      :disabled="currentPage >= totalPages"
      @click="getNextPage(true)"
      class="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-textColor-light transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-light disabled:hover:text-textColor-light dark:border-border-dark dark:text-textColor-dark dark:disabled:hover:border-border-dark dark:disabled:hover:text-textColor-dark"
    >
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
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

const totalPages = computed(() =>
  categoryStore.categorySelected && tags.tagSelected !== "AllTags"
    ? productsStore.getPagesFromFormatted
    : productsStore.pages
);

/* Tag activo en la URL (los deep links llegan como /products?tag=nombre) */
const urlTag = (): string | null => {
  const t = route.query.tag;
  return typeof t === "string" && t !== "" && t !== "AllTags" ? t : null;
};

/* Evita que respuestas de inicializaciones anteriores apliquen datos obsoletos */
let initSeq = 0;
/* La primera carga la dispara onMounted; el watch de categorías solo cubre el resto */
let initialized = false;

onMounted(async () => {
  tags.setTagSelected(urlTag() ?? "AllTags");
  initialized = true;
  await initFromRoute();
});

const initFromRoute = async () => {
  if (route.query.category) {
    // Espera a que las categorías carguen para poder resolver nombre → id
    if (categoryStore.categories.length === 0) return;
    await initializeDataWithCategorie();
  } else {
    await initializeData();
  }
};

const initializeData = async () => {
  const seq = ++initSeq;
  const tag = urlTag();

  // clear categories selected
  categoryStore.setCategorySelected(null);
  // clear products
  productsStore.clearProducts();
  // reset current page
  currentPage.value = 1;

  emit("loading", true);
  try {
    const data = await productsComposable.getProductsWithoutCategory(
      limit.value,
      currentPage.value,
      tag
    );
    if (seq !== initSeq) return;
    productsStore.setProducts(data.products);
    productsStore.setPages(data.totalProducts, limit.value);
  } catch (err) {
    console.error(err);
  } finally {
    if (seq === initSeq) emit("loading", false);
  }
};

const initializeDataWithCategorie = async () => {
  if (!route.query.category) return;
  const seq = ++initSeq;

  categoryStore.updateCategorySelectedFromParam(
    route.query.category as string
  );
  emit("loading", true);
  try {
    const data = await productsComposable.getProductsForCategory(
      categoryStore.categorySelected as string,
      limit.value,
      currentPage.value
    );
    const total = await productsComposable.getLength(
      categoryStore.categorySelected as string
    );
    if (seq !== initSeq) return;
    productsStore.setPages(total, limit.value);
    productsStore.setProducts(data.products);
  } catch (err) {
    console.error(err);
  } finally {
    if (seq === initSeq) emit("loading", false);
  }
};

// watch: las categorías llegan de forma asíncrona
watch(
  () => categoryStore.categories,
  async () => {
    if (route.query.category) {
      await initFromRoute();
    } else if (!initialized) {
      initialized = true;
      await initFromRoute();
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

// watch: el tag cambia en la URL (click en un tag o deep link)
watch(
  () => route.query.tag,
  async () => {
    tags.setTagSelected(urlTag() ?? "AllTags");
    if (!route.query.category) {
      // Sin categoría el filtrado por tag es server-side
      await initializeData();
    }
    // Con categoría el filtrado por tag es client-side (productsFormatted)
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
      const data = await $fetch<{ products: Product[] }>(
        `/api/products/getProducts?limit=${limit.value}&page=${currentPage.value}&category=${categoryStore.categorySelected}`
      );
      productsStore.setProducts(data.products);
    } else {
      const tag = urlTag();
      const tagQs = tag ? `&tag=${encodeURIComponent(tag)}` : "";
      const data = await $fetch<{ products: Product[] }>(
        `/api/products/getProducts?limit=${limit.value}&page=${currentPage.value}${tagQs}`
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
