<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <div class="border-b border-border-light dark:border-border-dark">
      <div class="mx-auto max-w-screen-2xl px-4 pb-6 pt-8 lg:px-8">
        <p class="section-label">Catalog</p>
        <div class="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1
            class="font-display text-3xl font-bold text-textColor-light dark:text-textColor-dark lg:text-4xl"
          >
            All products
          </h1>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ total }} items in the catalog
          </p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-screen-2xl xl:grid xl:grid-cols-[260px_1fr]">
      <aside
        class="hidden border-r border-border-light dark:border-border-dark xl:sticky xl:top-16 xl:block xl:max-h-[calc(100vh-4rem)] xl:self-start xl:overflow-auto"
      >
        <div class="px-5 py-6">
          <p class="section-label">Categories</p>
          <ul class="mt-4 space-y-0.5">
            <categories
              v-for="(node, index) in categoriesStore.nodes"
              :key="index"
              :Node="node"
            ></categories>
          </ul>
        </div>
      </aside>

      <div class="min-w-0">
        <search></search>

        <tags></tags>

        <products :loading="loading"></products>
        <pagination
          @loading="loading = $event"
          @send-current-page="currentPage = $event"
        ></pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const loading = ref<boolean>(true);
const currentPage = ref<number>(1);
const categoriesStore = useCategoryStore();
const productsComposable = useProduct();
const total = ref<number>(0);

onMounted(async () => {
  try {
    if (categoriesStore.categories.length === 0) {
      const data = await $fetch<Array<Categorie>>("/api/categories/getAll");
      categoriesStore.setCategories(data);
    }
    total.value = await productsComposable.getLength();
  } catch (e) {
    console.error(e);
  }
});
</script>
<style></style>
