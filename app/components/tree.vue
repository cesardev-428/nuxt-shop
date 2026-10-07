<template>
  <li v-for="node in props.Nodes" class=" ">
    <div class="flex group/cat">
      <!-- <a @click.prevent="selectCategory(node.id as Number)" :href="'?Category='+node.label" class="text-lg flex items-start py-1 group-hover/cat:text-primary group-hover/cat:hover:text-primary duration-200" :class="categoryStore.categorySelected === node.id ? 'text-primary bold scale-105' : 'text-textPrimaryl dark:text-textPrimary'">
      {{node.label}}
    </a> -->
      <router-link
        @click="selectCategory(node.id as string)"
        :to="'?category=' + node.label"
        class="text-lg flex items-start py-1 group-hover/cat:text-primary group-hover/cat:hover:text-primary duration-200"
        :class="
          categoryStore.categorySelected === node.id
            ? 'text-primary bold scale-105'
            : 'text-textColor-light dark:text-textColor-dark'
        "
        >{{ node.label }}</router-link
      >

      <button v-if="node.children && node.children.length > 0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4 mt-1 group-hover/cat:stroke-primary group-hover/cat:hover:stroke-primary duration-200"
          :class="
            categoryStore.categorySelected === node.id
              ? 'stroke-primary bold scale-110'
              : 'stroke-textPrimaryl dark:stroke-textPrimary'
          "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
    <ul v-if="node.children" class="ml-4">
      <tree :Nodes="node.children"></tree>
    </ul>
  </li>
</template>
<script setup lang="ts">
import tree from "~/components/tree.vue";

const categoryStore = useCategoryStore();
const productsComposable = useProduct();
const productsStore = useProductStore();
const props = defineProps<{
  Nodes?: Array<Tree>;
}>();
const emit = defineEmits<{
  (e: "loading", loading: boolean): void;
}>();
const selectCategory = async (id: string) => {
  productsStore.clearProducts();
  emit("loading", true);
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
  } finally {
    emit("loading", false);
  }
};
</script>
