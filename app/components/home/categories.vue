<template>
  <section
    id="categories"
    class="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
  >
    <div class="mb-12 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="section-label">Categories</p>
        <h2
          class="mt-2 font-display text-3xl font-bold tracking-tight text-textColor-light md:text-4xl dark:text-textColor-dark"
        >
          Shop by category
        </h2>
      </div>
      <NuxtLink
        to="/products"
        class="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 hover:gap-2.5"
      >
        All products
        <svg
          class="h-4 w-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8h10" />
          <path d="m9 4 4 4-4 4" />
        </svg>
      </NuxtLink>
    </div>

    <div
      class="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
    >
      <NuxtLink
        v-for="category in featuredCategories"
        :key="category.id"
        :to="'/products?category=' + encodeURIComponent(category.name)"
        class="group relative flex flex-col items-center rounded-3xl border border-black/10 bg-background-light-secondary px-4 pb-6 pt-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45)] focus:outline-none focus:ring-2 focus:ring-primary dark:border-white/10 dark:bg-background-dark-secondary dark:hover:border-primary/50"
      >
        <!-- Asa de la bolsa -->
        <span
          aria-hidden="true"
          class="absolute -top-[18px] left-1/2 h-5 w-10 -translate-x-1/2 text-gray-300 transition-colors duration-300 group-hover:text-primary dark:text-gray-600"
        >
          <svg
            viewBox="0 0 40 20"
            fill="none"
            class="h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M3 19C3 7 10.5 2 20 2s17 5 17 17"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            />
          </svg>
        </span>

        <!-- Icono de bolsa -->
        <span
          class="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </span>

        <h3
          class="font-display text-sm font-semibold leading-tight text-textColor-light sm:text-base dark:text-textColor-dark"
        >
          {{ category.name }}
        </h3>
        <p
          class="mt-1 text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          <template v-if="counts[category.id] !== undefined && counts[category.id] !== null">
            {{ counts[category.id] }} products
          </template>
          <template v-else>Shop now</template>
        </p>

        <span
          class="mt-4 inline-flex translate-x-1 items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          Shop
          <svg
            class="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10" />
            <path d="m9 4 4 4-4 4" />
          </svg>
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
const categoriesStore = useCategoryStore();
const categoriesComposable = useCategories();
const counts = ref<Record<string, number | null>>({});

/* Hasta 5 categorías: primero las raíz, sin repetir nombres */
const featuredCategories = computed<Categorie[]>(() => {
  const list = categoriesStore.categories;
  const unique = list.filter(
    (c: Categorie, i: number, arr: Categorie[]) =>
      arr.findIndex((x) => x.name === c.name) === i
  );
  const roots = unique.filter((c: Categorie) => !c.category_id);
  const rest = unique.filter((c: Categorie) => c.category_id);
  return [...roots, ...rest].slice(0, 5);
});

onMounted(async () => {
  if (categoriesStore.categories.length > 0) return;
  try {
    const data = await categoriesComposable.getCategories();
    categoriesStore.setCategories(data);
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
});

watch(
  featuredCategories,
  async (list: Categorie[]) => {
    const pending = list.filter((c: Categorie) => counts.value[c.id] === undefined);
    if (pending.length === 0) return;
    await Promise.all(
      pending.map(async (c: Categorie) => {
        try {
          counts.value[c.id] = await $fetch<number>(
            `/api/products/getLength?category=${c.id}`
          );
        } catch {
          counts.value[c.id] = null;
        }
      })
    );
  },
  { immediate: true }
);
</script>
