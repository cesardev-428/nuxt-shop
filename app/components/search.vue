<script setup>
import { onClickOutside } from "@vueuse/core";
const productComposable = useProduct();
const router = useRouter();
const route = useRoute();
const searchQuery = ref((route.query.q || "").toString());
const searchResults = ref([]);
const isLoading = ref(false);
const suggestionMenu = ref(false);
const onClickOutsideRef = ref(null);

onClickOutside(onClickOutsideRef, () => {
  suggestionMenu.value = false;
});

const search = () => {
  suggestionMenu.value = true;
  if (searchQuery.value) {
    router.replace({ query: { ...route.query, q: searchQuery.value } });
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  searchResults.value = [];
  isLoading.value = false;
  suggestionMenu.value = false;
  const query = { ...route.query };
  delete query.q;
  router.replace({ query });
};

//watch searchQuery
watch(searchQuery, async (newQuery) => {
  if (newQuery.length < 4) {
    searchResults.value = [];
    isLoading.value = false;
    suggestionMenu.value = false;
    return;
  }

  isLoading.value = true;
  suggestionMenu.value = true;
  try {
    const data = await productComposable.getProductsWitchQuery(newQuery);
    searchResults.value = data.products || [];
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div
    class="relative z-30 flex w-full items-center gap-3 px-4 py-4 backdrop-blur-sm lg:px-8 dark:backdrop-blur-lg"
  >
    <filters></filters>
    <div
      class="flex h-12 flex-grow items-center gap-3 rounded-full border px-4 transition-colors"
      :class="
        suggestionMenu
          ? 'border-primary dark:border-primary'
          : 'border-border-light dark:border-border-dark hover:border-neutral-400 dark:hover:border-neutral-600'
      "
    >
      <Icon
        name="iconamoon:search"
        size="20"
        class="shrink-0 text-neutral-500 dark:text-neutral-400"
      />
      <input
        class="w-full bg-transparent py-2 text-sm font-medium outline-none text-textColor-light dark:text-textColor-dark"
        type="search"
        aria-label="Search products"
        v-model="searchQuery"
        @keyup.enter="search"
        @focus="searchQuery.length >= 4 && (suggestionMenu = true)"
        :placeholder="
          route.query.category
            ? `Search in ${route.query.category}...`
            : 'Search products...'
        "
      />
      <div
        v-if="searchQuery"
        @click.stop="clearSearch"
        class="flex cursor-pointer items-center justify-center transition-all"
        aria-label="Clear search"
        role="button"
      >
        <Icon
          v-if="!isLoading"
          class="text-neutral-500 hover:text-textColor-light dark:text-neutral-400 dark:hover:text-textColor-dark"
          name="iconamoon:close-circle-1-fill"
          size="22"
        />
        <Icon v-else name="svg-spinners:bars-rotate-fade" size="20" />
      </div>
    </div>
  </div>
  <div
    v-if="suggestionMenu"
    ref="onClickOutsideRef"
    class="z-50 w-full border-b border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark-secondary"
  >
    <div class="max-h-[calc(100vh-140px)] overflow-auto">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-40">
        <div
          class="bg-black/10 dark:bg-white/20 flex rounded-full w-12 h-12 items-center justify-center"
        >
          <Icon
            name="svg-spinners:8-dots-rotate"
            class="text-textColor-light dark:text-textColor-dark"
            size="26"
          />
        </div>
      </div>
      <!-- Empty State -->
      <div
        v-else-if="!searchResults.length"
        class="w-full flex flex-col justify-center text-center p-8"
      >
        <div
          class="font-semibold text-xl text-textColor-light dark:text-textColor-dark"
        >
          No products match
          <strong>&ldquo;{{ searchQuery }}&rdquo;</strong>
        </div>
        <div class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Check the spelling or try a more general keyword.
        </div>
      </div>
      <!-- Results State -->
      <div v-else class="mx-auto max-w-screen-2xl p-4 lg:p-6">
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <NuxtLink
            @click="suggestionMenu = false"
            v-for="product in searchResults"
            :key="String(product.id)"
            :to="`/products/${product.id}`"
            class="group select-none rounded-xl border border-border-light bg-background-light p-3 transition-colors hover:border-primary dark:border-border-dark dark:bg-background-dark-secondary"
          >
            <div
              class="flex h-36 items-center justify-center overflow-hidden rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900"
            >
              <img
                :alt="product.title"
                loading="lazy"
                :title="product.title"
                :src="productImage(product)"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div class="pt-3 text-sm">
              <div
                class="font-display font-bold text-textColor-light dark:text-textColor-dark"
              >
                ${{ product.price }}
              </div>
              <div
                class="mt-0.5 truncate font-semibold text-textColor-light dark:text-textColor-dark"
              >
                {{ product.title }}
              </div>
              <div class="mt-0.5 truncate text-neutral-500 dark:text-neutral-400">
                {{ product.description }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}
</style>
