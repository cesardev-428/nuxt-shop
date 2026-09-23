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
const cartModal = ref(false);
const { cart } = useCart();

onClickOutside(onClickOutsideRef, (event) => {
  suggestionMenu.value = false;
  cartModal.value = false;
});

//watch searchQuery
watch(searchQuery, async (newQuery) => {
  if (newQuery.length < 4) {
    searchResults.value = [];
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  try {
    const data = await productComposable.getProductsWitchQuery(newQuery);
    /* console.log("Search results:", data); */
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
    class="flex relative w-full items-center px-3 lg:px-5 h-[72px] lg:h-20 z-30 backdrop-blur-sm dark:backdrop-blur-lg"
  >
    <div class="flex w-full items-center gap-2">
      <filters></filters>
      <div class="flex flex-shrink flex-grow flex-col text-sm font-semibold">
        <div
          :class="[
            'flex h-12 flex-grow rounded-full pl-4 pr-3 transition-all hover:bg-black/10 hover:dark:bg-background-dark-hover',
            suggestionMenu
              ? 'bg-black/10 dark:bg-background-dark-secondary'
              : 'bg-black/5 dark:bg-background-dark-secondary',
          ]"
        >
          <div
            @click="suggestionMenu = true"
            class="flex w-full items-center gap-4"
          >
            <div
              v-if="!suggestionMenu"
              class="flex text-neutral-500 dark:text-neutral-400"
            >
              <Icon name="iconamoon:search" size="20" />
            </div>
            <div class="flex w-full">
              <input
                class="w-full bg-transparent py-2 outline-none text-textColor-light dark:text-textColor-dark"
                type="text"
                v-model="searchQuery"
                @keyup.enter="search"
                :placeholder="
                  route.query.category
                    ? `Search in ${route.query.category}...`
                    : 'Search...'
                "
              />
              <div
                v-if="searchQuery || suggestionMenu"
                @click.stop="clearSearch"
                class="flex items-center justify-center cursor-pointer transition-all"
              >
                <Icon
                  v-if="!isLoading"
                  class="text-textColor-light dark:text-textColor-dark"
                  name="iconamoon:close-circle-1-fill"
                  size="24"
                />
                <Icon v-else name="svg-spinners:bars-rotate-fade" size="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="suggestionMenu"
    ref="onClickOutsideRef"
    class="top-[72px] lg:top-20 left-0 right-0 z-50 bg-background-light-secondary dark:bg-background-dark-secondary backdrop-blur-sm dark:backdrop-blur-lg lg:rounded-b-3xl w-full"
  >
    <div
      class="max-h-[calc(100vh-72px)] lg:max-h-[calc(100vh-80px)] overflow-auto"
    >
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-80">
        <div
          class="bg-black/10 dark:bg-white/20 flex rounded-full w-12 h-12 items-center justify-center skeleton"
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
        class="w-full items-center flex flex-col justify-center text-center p-8"
      >
        <div
          class="w-28 h-28 bg-black/10 dark:bg-white/20 rounded-full items-center justify-center flex"
        >
          <Icon
            name="iconamoon:search-bold"
            class="w-16 h-16 dark:text-white"
          />
        </div>
        <div
          class="font-semibold text-3xl my-6 text-textColor-light dark:text-textColor-dark"
        >
          No items matching for:
          <strong>{{ searchQuery }}</strong>
        </div>
        <div
          class="text-sm text-center mb-5 text-textColor-light dark:text-textColor-dark"
        >
          Try improving your results by double checking your spelling
          <br />
          or trying a more general keyword.
        </div>
      </div>
      <!-- Results State-->
      <div
        v-else
        class="mx-auto p-3 lg:p-4 max-w-screen-2xl max-h-[500px] overflow-auto"
      >
        <h2 v-if="!searchQuery" class="text-2xl font-bold tracking-tight">
          New Products
        </h2>
        <div
          class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-5 mt-3 lg:mt-5"
        >
          <NuxtLink
            @click="suggestionMenu = false"
            v-for="(product, i) in searchResults"
            :key="i"
            class="group select-none"
          >
            <div class="cursor-pointer transition ease-[ease] duration-300">
              <div
                class="relative h-[300px] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-2xl overflow-hidden"
              >
                <img
                  :alt="product.title"
                  loading="lazy"
                  :title="product.title"
                  :src="product.thumbnail"
                  class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover transition-opacity duration-300 group-hover:opacity-50"
                />
              </div>
              <div class="grid gap-0.5 pt-3 pb-4 px-1.5 text-sm font-semibold">
                <div
                  class="flex gap-1 text-textColor-light dark:text-textColor-dark text-xl"
                >
                  <div v-html="product.price"></div>
                  <div
                    class="text-xl text-red-600 line-through"
                    v-html="(product.price * 1.2).toFixed(2)"
                  ></div>
                </div>
                <div
                  class="text-textColor-light dark:text-textColor-dark text-2xl"
                >
                  {{ product.title }}
                </div>
                <div
                  class="font-normal text-textColor-light dark:text-textColor-dark"
                >
                  {{ product.description.slice(0, 30) }}...
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
::-webkit-scrollbar {
  @apply w-0 h-0 bg-transparent;
}
::-webkit-scrollbar-track {
  @apply bg-transparent;
}
::-webkit-scrollbar-thumb {
  @apply bg-black/15 dark:bg-white/15 rounded-full border-solid border-white dark:border-black;
  border-width: 5px;
}
</style>
