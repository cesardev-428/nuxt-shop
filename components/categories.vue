<template>
  <li
    class="text-base font-semibold px-2 py-2 rounded cursor-pointer hover:dark:bg-gray-700 hover:bg-gray-400 hover:text-gray-300 flex items-center"
  >
    <router-link
      @click="selectCategory(props.Node.id as string)"
      :to="'?category=' + props.Node.label"
      class="w-full h-full transition-all duration-200"
      :class="
        categoryStore.categorySelected === props.Node.id
          ? 'text-primary bold scale-105'
          : 'text-textColor-light dark:text-textColor-dark'
      "
      >{{ props.Node.label }}</router-link
    >

    <div
      :class="{
        'hidden  ': !(props.Node.children && props.Node.children.length > 0),
      }"
      @click="dropdown = !dropdown"
      class="cursor-pointer ml-auto p-1 rounded-full flex items-center hover:dark:bg-neutral-800 hover:bg-gray-300 hover:text-gray-800 dark:hover:text-gray-300 transition-all duration-200"
    >
      <Icon
        class="transition-all duration-200"
        name="iconamoon:arrow-right-2-light"
        size="20"
        :class="{
          'rotate-90': dropdown,
          'text-primary bold scale-105':
            categoryStore.categorySelected === props.Node.id,
          'text-textColor-light dark:text-textColor-dark':
            categoryStore.categorySelected !== props.Node.id,
        }"
      >
      </Icon>
    </div>
  </li>
  <ul
    v-if="props.Node.children && props.Node.children.length > 0 && dropdown"
    class="ml-3"
  >
    <categories
      v-if="props.Node.children && props.Node.children.length > 0"
      v-for="(child, index) in props.Node.children"
      :Node="child"
      :key="index"
    ></categories>
  </ul>
</template>
<script setup lang="ts">
const props = defineProps({
  Node: { type: Object, default: [], required: false },
});
const categoryStore = useCategoryStore();
const dropdown = ref(true);
const productsComposable = useProduct();
const productsStore = useProductStore();
const selectCategory = async (id: string) => {
  productsStore.clearProducts();

  categoryStore.setCategorySelected(id);
  try {
    const data = await $fetch(
      `/api/products/getProducts?limit=${6}&page=${1}&category=${
        categoryStore.categorySelected
      }`
    );
    const total = await productsComposable.getLength(
      categoryStore.categorySelected as string
    );
    productsStore.setPages(total, 6);
    productsStore.setProducts(data.products);
  } catch (err: any) {
    console.error(err);
  }
};
</script>
