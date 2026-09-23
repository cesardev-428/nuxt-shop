<template>
  <div
    id="main-wrapper"
    class="flex min-h-screen bg-background-light dark:bg-transparent"
  >
    <aside
      class="dark:bg-background-dark-secondary bg-background-light hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transform hidden xl:block xl:translate-x-0 xl:end-auto xl:bottom-0 fixed xl:top-[90px] xl:left-auto top-0 left-0 with-vertical h-screen shrink-0 w-[270px] shadow-md xl:rounded-md rounded-none left-sidebar"
    >
      <div
        class="w-full px-2 py-2 text-textColor-light dark:text-textColor-dark"
      >
        <div class="py-4">
          <span class="ml-2 text-xl font-bold">Categories</span>
        </div>
      </div>
      <ul class="px-2 py-2 h-[80%] overflow-auto">
        <categories
          v-for="(node, index) in categoriesStore.nodes"
          :key="index"
          :Node="node"
        ></categories>
      </ul>
    </aside>

    <div class="w-full ml-0 xl:ml-[275px] overflow-hidden">
      <search></search>

      <tags></tags>

      <products :loading="loading" :page="currentPage"></products>
      <pagination
        @loading="loading = $event"
        @send-current-page="currentPage = $event"
      ></pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
const loading = ref<boolean>(false);
const currentPage = ref<number>(1);
const categoriesStore = useCategoryStore();

onMounted(async () => {
  if (categoriesStore.categories.length > 0) {
    return;
  }
  try {
    const data = (await $fetch("/api/categories/getAll")) as Array<Categorie>;
    // console.log(data);

    categoriesStore.setCategories(data);
  } catch (e) {
    console.error(e);
  }
});
</script>
<style></style>
