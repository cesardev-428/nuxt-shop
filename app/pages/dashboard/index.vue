<template>
  <div>
    <header class="mb-6">
      <p class="section-label">Overview</p>
      <h1
        class="mt-1.5 font-display text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Dashboard
      </h1>
      <p
        class="mt-1 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
      >
        Catalog at a glance — reads are live from the store database.
      </p>
    </header>

    <!-- Skeleton -->
    <div
      v-if="pending"
      class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="h-28 animate-pulse rounded-2xl border border-border-light bg-background-light-secondary dark:border-border-dark dark:bg-background-dark-secondary"
      />
    </div>

    <template v-else>
      <!-- Stats -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl border border-border-light bg-background-light-secondary p-5 dark:border-border-dark dark:bg-background-dark-secondary"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.16em] text-textColor-light-secondary dark:text-textColor-dark-secondary"
          >
            {{ stat.label }}
          </p>
          <p class="mt-2 font-display text-3xl font-bold tracking-tight">
            {{ stat.value }}
          </p>
          <p
            class="mt-1 text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
          >
            {{ stat.hint }}
          </p>
        </div>
      </div>

      <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <!-- Recientes -->
        <section
          class="rounded-2xl border border-border-light bg-background-light-secondary dark:border-border-dark dark:bg-background-dark-secondary"
        >
          <div
            class="flex items-center justify-between border-b border-border-light px-5 py-4 dark:border-border-dark"
          >
            <h2 class="font-display text-base font-semibold">
              Recent products
            </h2>
            <NuxtLink
              to="/dashboard/products"
              class="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              View all
            </NuxtLink>
          </div>

          <ul v-if="recent.length" class="divide-y divide-border-light dark:divide-border-dark">
            <li
              v-for="product in recent"
              :key="product.id"
              class="flex items-center gap-3 px-5 py-3"
            >
              <span
                class="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark"
              >
                <img
                  :src="product.thumbnail || productImage(product)"
                  :alt="product.title"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-sm font-medium">
                  {{ product.title }}
                </span>
                <span
                  class="block text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
                >
                  {{ formatDate(product.created_at) }}
                </span>
              </span>
              <span class="font-display text-sm font-semibold">
                ${{ Number(product.price).toFixed(2) }}
              </span>
            </li>
          </ul>
          <p v-else class="px-5 py-6 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary">
            No products yet.
          </p>
        </section>

        <!-- Acciones -->
        <section class="space-y-3">
          <NuxtLink
            to="/dashboard/products?new=1"
            class="group flex items-center justify-between rounded-2xl border border-border-light bg-background-light-secondary p-5 transition-colors hover:border-primary dark:border-border-dark dark:bg-background-dark-secondary"
          >
            <span>
              <span class="block font-display font-semibold">New product</span>
              <span
                class="block text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
              >
                Create a listing with tags
              </span>
            </span>
            <Icon
              name="iconamoon:arrow-right-1"
              class="h-5 w-5 text-primary transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </NuxtLink>
          <NuxtLink
            to="/dashboard/categories"
            class="group flex items-center justify-between rounded-2xl border border-border-light bg-background-light-secondary p-5 transition-colors hover:border-primary dark:border-border-dark dark:bg-background-dark-secondary"
          >
            <span>
              <span class="block font-display font-semibold">
                Manage categories
              </span>
              <span
                class="block text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
              >
                {{ totalCategories }} categories in the tree
              </span>
            </span>
            <Icon
              name="iconamoon:arrow-right-1"
              class="h-5 w-5 text-primary transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </NuxtLink>
        </section>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth", layout: "admin" });

useHead({ title: "Dashboard — store. admin" });

const pending = ref(true);
const totalProducts = ref(0);
const totalCategories = ref(0);
const totalTags = ref(0);
const avgPrice = ref("0.00");
const recent = ref<Product[]>([]);

const stats = computed(() => [
  {
    label: "Total products",
    value: String(totalProducts.value),
    hint: "Live count",
  },
  {
    label: "Categories",
    value: String(totalCategories.value),
    hint: "Shop departments",
  },
  { label: "Tags", value: String(totalTags.value), hint: "Shared across products" },
  { label: "Avg price", value: `$${avgPrice.value}`, hint: "Across catalog" },
]);

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

onMounted(async () => {
  try {
    const [length, categories, tags, productRes] = await Promise.all([
      $fetch<number>("/api/products/getLength"),
      $fetch<Categorie[]>("/api/categories/getAll"),
      $fetch<Tag[]>("/api/tags/getAll"),
      $fetch<{ products: Product[] }>("/api/products/getProductsWithout", {
        query: { page: 1, limit: 1000 },
      }),
    ]);

    totalProducts.value = Number(length) || 0;
    totalCategories.value = categories.length;
    totalTags.value = tags.length;

    const products = productRes.products ?? [];
    if (products.length) {
      const sum = products.reduce((acc, p) => acc + Number(p.price), 0);
      avgPrice.value = (sum / products.length).toFixed(2);
      recent.value = [...products]
        .sort((a, b) => Number(b.id) - Number(a.id))
        .slice(0, 5);
    }
  } catch {
    // panel sigue visible con contadores en 0
  } finally {
    pending.value = false;
  }
});
</script>
