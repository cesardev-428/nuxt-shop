<template>
  <li>
    <div
      class="flex items-center rounded-lg transition-colors"
      :class="
        isActive
          ? 'bg-primary/10'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
      "
    >
      <router-link
        @click="selectCategory(props.Node.id as string)"
        :to="'?category=' + props.Node.label"
        class="flex-1 truncate px-3 py-2 text-sm font-semibold transition-colors"
        :class="
          isActive
            ? 'text-primary'
            : 'text-textColor-light dark:text-textColor-dark'
        "
        >{{ props.Node.label }}</router-link
      >

      <button
        v-if="props.Node.children && props.Node.children.length > 0"
        type="button"
        :aria-expanded="dropdown"
        :aria-label="`Toggle subcategories of ${props.Node.label}`"
        @click="dropdown = !dropdown"
        class="mr-1.5 flex items-center rounded-md p-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
      >
        <Icon
          class="transition-transform duration-200"
          :class="{
            'rotate-90': dropdown,
            'text-primary': isActive,
            'text-textColor-light dark:text-textColor-dark': !isActive,
          }"
          name="iconamoon:arrow-right-2-light"
          size="18"
        >
        </Icon>
      </button>
    </div>
    <ul
      v-if="props.Node.children && props.Node.children.length > 0 && dropdown"
      class="ml-4 border-l border-border-light pl-1 dark:border-border-dark"
    >
      <categories
        v-for="(child, index) in props.Node.children"
        :Node="child"
        :key="index"
      ></categories>
    </ul>
  </li>
</template>
<script setup lang="ts">
const props = defineProps({
  Node: { type: Object, default: [], required: false },
});
const categoryStore = useCategoryStore();
const dropdown = ref(true);
const productsComposable = useProduct();
const productsStore = useProductStore();

const isActive = computed(
  () => categoryStore.categorySelected === props.Node.id
);

const selectCategory = async (id: string) => {
  productsStore.clearProducts();

  categoryStore.setCategorySelected(id);
  try {
    const data = await $fetch<{ products: Product[] }>(
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
