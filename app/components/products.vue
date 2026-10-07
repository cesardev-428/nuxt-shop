<template>
  <div class="w-full px-4 pb-8 pt-4 lg:px-8">
    <!-- Skeleton -->
    <div
      v-if="props.loading"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading products"
    >
      <div
        v-for="n in 6"
        :key="n"
        class="animate-pulse overflow-hidden rounded-xl border border-border-light dark:border-border-dark"
      >
        <div class="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800"></div>
        <div class="space-y-3 p-4">
          <div class="h-4 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800"></div>
          <div class="h-3 w-full rounded bg-neutral-100 dark:bg-neutral-800"></div>
          <div class="h-3 w-2/3 rounded bg-neutral-100 dark:bg-neutral-800"></div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div
      v-else-if="visibleProducts.length === 0"
      class="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-light px-6 py-16 text-center dark:border-border-dark"
    >
      <Icon
        name="iconamoon:search-bold"
        size="40"
        class="text-neutral-400 dark:text-neutral-500"
      />
      <p
        class="mt-4 font-display text-xl font-semibold text-textColor-light dark:text-textColor-dark"
      >
        No products to show
      </p>
      <p class="mt-1 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
        Try removing a tag or category filter to see the full catalog again.
      </p>
      <button
        type="button"
        class="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        @click="router.push('/products')"
      >
        Clear filters
      </button>
    </div>

    <!-- Grid -->
    <div
      v-else
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="product in visibleProducts"
        :key="String(product.id)"
        class="group relative flex flex-col overflow-hidden rounded-xl border border-border-light bg-background-light transition-colors duration-200 hover:border-primary dark:border-border-dark dark:bg-background-dark-secondary"
      >
        <NuxtLink
          :to="`/products/${product.id}`"
          class="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          :aria-label="`View details for ${product.title}`"
        >
          <div
            class="flex aspect-[4/3] items-center justify-center overflow-hidden bg-neutral-50 p-6 dark:bg-neutral-900"
          >
            <img
              class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              :alt="product.title"
              :src="productImage(product)"
            />
          </div>
          <div class="flex flex-1 flex-col p-4">
            <h3
              class="font-display text-lg font-semibold leading-snug text-textColor-light dark:text-textColor-dark"
            >
              {{ product.title }}
            </h3>
            <p
              class="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400"
            >
              {{ product.description }}
            </p>
          </div>
        </NuxtLink>
        <div
          class="mt-auto flex items-center justify-between gap-3 px-4 pb-4"
        >
          <span
            class="font-display text-xl font-bold text-textColor-light dark:text-textColor-dark"
            >${{ product.price }}</span
          >
          <button
            type="button"
            class="relative z-10 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            @click="open(product)"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>

  <modalAddCart
    v-if="openModal && productSelected"
    @close="openModal = false"
    :product="productSelected"
  />
</template>
<script setup lang="ts">
import modalAddCart from "./modalAddCart.vue";

const currentPage = useState<number>("currentPage");
const router = useRouter();
const productsStore = useProductStore();
const openModal = ref(false);
const productSelected = ref<Product>();

const props = defineProps({
  loading: { type: Boolean, default: true },
});

const visibleProducts = computed(() =>
  productsStore.productsFormatted.slice(
    (currentPage.value - 1) * 6,
    currentPage.value * 6
  )
);

const open = (product: Product) => {
  if (!product) return;

  productSelected.value = product;
  openModal.value = true;
};
</script>
