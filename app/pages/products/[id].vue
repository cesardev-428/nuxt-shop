<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-8 lg:py-10">
      <nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-2 text-sm">
        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-1.5 font-semibold text-neutral-500 transition-colors hover:text-primary dark:text-neutral-400"
        >
          <Icon name="iconamoon:arrow-right-2-light" size="16" class="rotate-180" />
          Products
        </NuxtLink>
        <template v-if="categoryName">
          <span class="text-neutral-400 dark:text-neutral-500" aria-hidden="true">/</span>
          <NuxtLink
            :to="`/products?category=${encodeURIComponent(categoryName)}`"
            class="font-semibold text-neutral-500 transition-colors hover:text-primary dark:text-neutral-400"
          >
            {{ categoryName }}
          </NuxtLink>
        </template>
      </nav>

      <!-- Loading -->
      <div
        v-if="loading"
        class="mt-8 grid animate-pulse gap-10 lg:grid-cols-2"
        aria-busy="true"
        aria-label="Loading product"
      >
        <div
          class="aspect-square rounded-xl border border-border-light bg-neutral-100 dark:border-border-dark dark:bg-neutral-800"
        ></div>
        <div class="space-y-4">
          <div class="h-8 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800"></div>
          <div class="h-10 w-32 rounded bg-neutral-100 dark:bg-neutral-800"></div>
          <div class="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-800"></div>
          <div class="h-4 w-5/6 rounded bg-neutral-100 dark:bg-neutral-800"></div>
          <div class="h-12 w-64 rounded bg-neutral-100 dark:bg-neutral-800"></div>
        </div>
      </div>

      <!-- Not found -->
      <div
        v-else-if="!product"
        class="mt-16 flex flex-col items-center text-center"
      >
        <Icon
          name="iconamoon:box-search-bold"
          size="48"
          class="text-neutral-400 dark:text-neutral-500"
        />
        <h1
          class="mt-5 font-display text-2xl font-bold text-textColor-light dark:text-textColor-dark"
        >
          Product not found
        </h1>
        <p class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
          This product doesn&rsquo;t exist or is no longer available. Head back
          to the catalog to keep browsing.
        </p>
        <NuxtLink
          to="/products"
          class="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Back to products
        </NuxtLink>
      </div>

      <!-- Detail -->
      <div v-else class="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div
          class="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-border-light bg-neutral-50 p-8 dark:border-border-dark dark:bg-neutral-900"
        >
          <img
            :src="productImage(product)"
            :alt="product.title"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="flex flex-col">
          <h1
            class="font-display text-3xl font-bold leading-tight text-textColor-light dark:text-textColor-dark lg:text-4xl"
          >
            {{ product.title }}
          </h1>

          <p
            class="mt-4 font-display text-3xl font-bold text-textColor-light dark:text-textColor-dark"
          >
            ${{ product.price }}
          </p>

          <p
            class="mt-5 max-w-[60ch] leading-relaxed text-neutral-600 dark:text-neutral-300"
          >
            {{ product.description }}
          </p>

          <div v-if="productTags.length" class="mt-6 flex flex-wrap gap-2">
            <NuxtLink
              v-for="tag in productTags"
              :key="String(tag.id)"
              :to="`/products?tag=${encodeURIComponent(tag.name)}`"
              class="rounded-full border border-border-light bg-white px-3 py-1 text-sm font-semibold text-textColor-light transition-colors hover:border-primary hover:text-primary dark:border-border-dark dark:bg-background-dark-secondary dark:text-textColor-dark"
            >
              {{ tag.name }}
            </NuxtLink>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <div
              class="flex items-center rounded-full border border-border-light dark:border-border-dark"
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                class="flex h-11 w-11 items-center justify-center rounded-l-full text-lg font-bold text-textColor-light transition-colors hover:bg-neutral-100 disabled:opacity-40 dark:text-textColor-dark dark:hover:bg-neutral-800"
                :disabled="quantity <= 1"
                @click="quantity = Math.max(1, quantity - 1)"
              >
                &minus;
              </button>
              <span
                class="w-10 text-center text-sm font-semibold text-textColor-light dark:text-textColor-dark"
                aria-live="polite"
                >{{ quantity }}</span
              >
              <button
                type="button"
                aria-label="Increase quantity"
                class="flex h-11 w-11 items-center justify-center rounded-r-full text-lg font-bold text-textColor-light transition-colors hover:bg-neutral-100 dark:text-textColor-dark dark:hover:bg-neutral-800"
                @click="quantity = Math.min(99, quantity + 1)"
              >
                +
              </button>
            </div>

            <button
              type="button"
              class="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:flex-none"
              @click="addToCart"
            >
              Add to cart &middot; ${{ lineTotal }}
            </button>
          </div>

          <p class="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
            Free shipping on orders over $50 &middot; 30-day returns
          </p>
          <p class="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
            Added {{ addedOn }}
          </p>
        </div>
      </div>

      <!-- Related -->
      <section v-if="related.length" class="mt-16 border-t border-border-light pt-10 dark:border-border-dark">
        <h2
          class="font-display text-2xl font-bold text-textColor-light dark:text-textColor-dark"
        >
          More in {{ categoryName }}
        </h2>
        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="item in related"
            :key="String(item.id)"
            :to="`/products/${item.id}`"
            class="group flex flex-col overflow-hidden rounded-xl border border-border-light bg-background-light transition-colors hover:border-primary dark:border-border-dark dark:bg-background-dark-secondary"
          >
            <div
              class="flex aspect-[4/3] items-center justify-center overflow-hidden bg-neutral-50 p-6 dark:bg-neutral-900"
            >
              <img
                :src="productImage(item)"
                :alt="item.title"
                loading="lazy"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div class="flex items-center justify-between gap-3 p-4">
              <span
                class="truncate text-sm font-semibold text-textColor-light dark:text-textColor-dark"
                >{{ item.title }}</span
              >
              <span
                class="font-display shrink-0 font-bold text-textColor-light dark:text-textColor-dark"
                >${{ item.price }}</span
              >
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const productsComposable = useProduct();
const productsStore = useProductStore();
const cartStore = useCartStore();

const loading = ref(true);
const product = ref<Product | null>(null);
const productTags = ref<Tag[]>([]);
const related = ref<Product[]>([]);
const categoryName = ref("");
const quantity = ref(1);

const lineTotal = computed(() => {
  if (!product.value) return "0.00";
  return ((product.value.price as number) * quantity.value).toFixed(2);
});

const addedOn = computed(() => {
  if (!product.value) return "";
  return new Date(product.value.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const loadRelated = async (current: Product) => {
  if (!current.category_id) return;
  try {
    const data = await productsComposable.getProductsForCategory(
      String(current.category_id),
      6,
      1
    );
    related.value = data.products
      .filter((p) => String(p.id) !== String(current.id))
      .slice(0, 3);
  } catch (err) {
    console.error(err);
  }
};

const addToCart = () => {
  if (!product.value) return;
  productsStore.addProductTocart({
    product: {
      ...product.value,
      thumbnail: productImage(product.value),
    },
    quantity: quantity.value,
  });
  cartStore.setSidebar(false); // setSidebar invierte el valor: false abre
};

onMounted(async () => {
  try {
    const data = await productsComposable.getProductById(
      route.params.id as string
    );
    product.value = data;

    if (data) {
      useHead({
        title: `${data.title} — store.`,
      });

      const [categories, tags] = await Promise.all([
        $fetch<Array<Categorie>>("/api/categories/getAll"),
        data.tag_id && (data.tag_id as unknown as number[]).length > 0
          ? $fetch<Array<Tag>>("/api/tags/getTagsFromProducts", {
              method: "POST",
              body: { Id_tags: data.tag_id as unknown as number[] },
            })
          : Promise.resolve([]),
      ]);

      const category = categories.find(
        (c) => String(c.id) === String(data.category_id)
      );
      categoryName.value = category?.name ?? "";
      productTags.value = tags;

      loadRelated(data);
    } else {
      useHead({ title: "Product not found — store." });
    }
  } catch (err) {
    console.error(err);
    product.value = null;
    useHead({ title: "Product not found — store." });
  } finally {
    loading.value = false;
  }
});
</script>
