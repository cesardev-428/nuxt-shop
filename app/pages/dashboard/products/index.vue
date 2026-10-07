<template>
  <div>
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="section-label">Catalog</p>
        <h1
          class="mt-1.5 font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Products
        </h1>
        <p
          class="mt-1 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          {{ filtered.length }} of {{ products.length }} products
          <span v-if="!pending">· demo writes</span>
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
        @click="openCreate"
      >
        <span class="text-base leading-none" aria-hidden="true">+</span>
        New product
      </button>
    </header>

    <!-- Toolbar -->
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative w-full sm:max-w-xs">
        <Icon
          name="iconamoon:search"
          class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <input
          v-model="search"
          type="search"
          placeholder="Search products…"
          aria-label="Search products"
          class="w-full rounded-lg border border-border-light bg-background-light-secondary py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark-secondary"
        />
      </div>
      <select
        v-model="categoryFilter"
        aria-label="Filter by category"
        class="rounded-lg border border-border-light bg-background-light-secondary px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark-secondary"
      >
        <option value="">All categories</option>
        <option
          v-for="category in categories"
          :key="String(category.id)"
          :value="String(category.id)"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Skeleton -->
    <div
      v-if="pending"
      class="space-y-2"
      aria-busy="true"
      aria-label="Loading products"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-16 animate-pulse rounded-xl border border-border-light bg-background-light-secondary dark:border-border-dark dark:bg-background-dark-secondary"
      />
    </div>

    <!-- Table -->
    <div
      v-else
      class="overflow-hidden rounded-2xl border border-border-light bg-background-light-secondary dark:border-border-dark dark:bg-background-dark-secondary"
    >
      <!-- Empty -->
      <div v-if="!products.length" class="px-6 py-16 text-center">
        <p class="font-display text-lg font-semibold">No products yet</p>
        <p
          class="mt-1 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          Create the first listing to populate the catalog.
        </p>
        <button
          type="button"
          class="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          @click="openCreate"
        >
          New product
        </button>
      </div>

      <div v-else-if="!filtered.length" class="px-6 py-16 text-center">
        <p class="font-display text-lg font-semibold">No matches</p>
        <p
          class="mt-1 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          Nothing matches the current search or category filter.
        </p>
        <button
          type="button"
          class="mt-5 rounded-lg border border-border-light px-4 py-2 text-sm font-medium transition-colors hover:bg-background-light-hover dark:border-border-dark dark:hover:bg-background-dark-hover"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>

      <template v-else>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[760px] text-sm">
            <thead
              class="border-b border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark"
            >
              <tr
                class="text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-textColor-light-secondary dark:text-textColor-dark-secondary"
              >
                <th scope="col" class="px-4 py-3">Product</th>
                <th scope="col" class="px-4 py-3">Category</th>
                <th scope="col" class="px-4 py-3">Price</th>
                <th scope="col" class="px-4 py-3">Tags</th>
                <th scope="col" class="px-4 py-3">Added</th>
                <th scope="col" class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-light dark:divide-border-dark">
              <tr
                v-for="product in paged"
                :key="Number(product.id)"
                class="transition-colors hover:bg-background-light-hover dark:hover:bg-background-dark-hover"
              >
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <span
                      class="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark"
                    >
                      <img
                        :src="thumb(product)"
                        :alt="product.title"
                        class="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </span>
                    <span class="min-w-0">
                      <span class="block max-w-[220px] truncate font-medium">
                        {{ product.title }}
                      </span>
                      <span
                        class="block max-w-[220px] truncate text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
                      >
                        {{ product.description }}
                      </span>
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-block max-w-[140px] truncate rounded-full border border-border-light px-2.5 py-0.5 text-xs dark:border-border-dark"
                  >
                    {{ categoryName(product.category_id) }}
                  </span>
                </td>
                <td
                  class="whitespace-nowrap px-4 py-3 font-display font-semibold"
                >
                  ${{ fmtPrice(product.price) }}
                </td>
                <td class="px-4 py-3">
                  <span class="flex flex-wrap gap-1">
                    <span
                      v-for="name in tagNames(product).slice(0, 3)"
                      :key="name"
                      class="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary"
                    >
                      {{ name }}
                    </span>
                    <span
                      v-if="tagNames(product).length > 3"
                      class="rounded-full border border-border-light px-2 py-0.5 text-[11px] text-textColor-light-secondary dark:border-border-dark dark:text-textColor-dark-secondary"
                    >
                      +{{ tagNames(product).length - 3 }}
                    </span>
                  </span>
                </td>
                <td
                  class="whitespace-nowrap px-4 py-3 text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
                >
                  {{ fmtDate(product.created_at) }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex justify-end gap-1.5">
                    <button
                      type="button"
                      class="grid h-8 w-8 place-items-center rounded-lg border border-border-light text-textColor-light-secondary transition-colors hover:border-primary hover:text-primary dark:border-border-dark dark:text-textColor-dark-secondary"
                      :aria-label="`Edit ${product.title}`"
                      @click="openEdit(product)"
                    >
                      <Icon
                        name="iconamoon:edit"
                        class="h-4 w-4"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      class="grid h-8 w-8 place-items-center rounded-lg border border-border-light text-textColor-light-secondary transition-colors hover:border-red-600 hover:text-red-600 dark:border-border-dark dark:text-textColor-dark-secondary"
                      :aria-label="`Delete ${product.title}`"
                      @click="askDelete(product)"
                    >
                      <Icon
                        name="iconamoon:trash"
                        class="h-4 w-4"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div
          v-if="totalPages > 1"
          class="flex items-center justify-between gap-3 border-t border-border-light px-4 py-3 dark:border-border-dark"
        >
          <span
            class="text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
          >
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <div class="flex gap-2">
            <button
              type="button"
              :disabled="currentPage <= 1"
              aria-label="Previous page"
              class="grid h-8 w-8 place-items-center rounded-lg border border-border-light transition-colors hover:bg-background-light-hover disabled:cursor-not-allowed disabled:opacity-40 dark:border-border-dark dark:hover:bg-background-dark-hover"
              @click="page--"
            >
              <Icon
                name="iconamoon:arrow-left-1"
                class="h-4 w-4"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              :disabled="currentPage >= totalPages"
              aria-label="Next page"
              class="grid h-8 w-8 place-items-center rounded-lg border border-border-light transition-colors hover:bg-background-light-hover disabled:cursor-not-allowed disabled:opacity-40 dark:border-border-dark dark:hover:bg-background-dark-hover"
              @click="page++"
            >
              <Icon
                name="iconamoon:arrow-right-1"
                class="h-4 w-4"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Modales -->
    <AdminProductForm
      :open="formOpen"
      :product="editing"
      :categories="categories"
      :tags="tags"
      @close="formOpen = false"
      @save="onSave"
    />
    <AdminConfirmDialog
      :open="confirmOpen"
      title="Delete product?"
      :message="
        deleting
          ? `“${deleting.title}” will be removed from this session. Demo only — the database is not touched.`
          : ''
      "
      @cancel="confirmOpen = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { json } from "drizzle-orm/gel-core";

definePageMeta({ middleware: "auth", layout: "admin" });

useHead({ title: "Products — store. admin" });

const route = useRoute();
const router = useRouter();
const toast = useToast();

const pending = ref(true);
const products = ref<Product[]>([]);
const categories = ref<Categorie[]>([]);
const tags = ref<Tag[]>([]);

const search = ref("");
const categoryFilter = ref("");
const page = ref(1);
const PER_PAGE = 10;

const formOpen = ref(false);
const editing = ref<Product | null>(null);
const confirmOpen = ref(false);
const deleting = ref<Product | null>(null);

/* datos (lecturas reales) */
onMounted(async () => {
  try {
    const [catRes, tagRes, prodRes] = await Promise.all([
      $fetch<Categorie[]>("/api/categories/getAll"),
      $fetch<Tag[]>("/api/tags/getAll"),
      $fetch<{ products: Product[] }>("/api/products/getProductsWithout", {
        query: { page: 1, limit: 1000 },
      }),
    ]);
    categories.value = catRes;
    tags.value = tagRes;
    products.value = prodRes.products ?? [];

    if (route.query.new) {
      const { new: _new, ...rest } = route.query;
      void router.replace({ query: rest });
      openCreate();
    }
  } finally {
    pending.value = false;
  }
});

/* filtros + paginación (cliente) */
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return products.value.filter((p) => {
    if (
      categoryFilter.value !== "" &&
      Number(p.category_id) !== Number(categoryFilter.value)
    ) {
      return false;
    }
    if (q && !p.title.toLowerCase().includes(q)) return false;
    return true;
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)),
);
const currentPage = computed(() => Math.min(page.value, totalPages.value));
const paged = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return filtered.value.slice(start, start + PER_PAGE);
});

watch([search, categoryFilter], () => {
  page.value = 1;
});

function clearFilters() {
  search.value = "";
  categoryFilter.value = "";
}

/* helpers */
function categoryName(id: number | null | undefined) {
  if (id == null) return "—";
  const found = categories.value.find((c) => Number(c.id) === Number(id));
  return found ? found.name : "—";
}

function tagNames(p: Product): string[] {
  return (p.tag_id ?? []).map((raw) => {
    const id = Number(raw);
    const found = tags.value.find((t) => Number(t.id) === id);
    return found ? String(found.name) : `#${id}`;
  });
}

function thumb(p: Product) {
  return p.thumbnail || productImage(p);
}
function fmtPrice(value: Number) {
  return Number(value).toFixed(2);
}
function fmtDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* CRUD (demo, cliente) */
function openCreate() {
  editing.value = null;
  formOpen.value = true;
}
function openEdit(p: Product) {
  editing.value = p;
  formOpen.value = true;
}
function askDelete(p: Product) {
  deleting.value = p;
  confirmOpen.value = true;
}

async function registerNewTags(names: string[]): Promise<number[]> {
  const namesSend = names.map((e) => {
    return {
      name: e,
    };
  });
  try {
    const res = await $fetch("/api/tags/addTags", {
      method: "POST",
      body: namesSend,
    });
    /* console.log("New tags idS:",res); */
    return res.map((e: any) => Number(e.id));
  } catch (error) {}

  return [];
}

async function onSave(payload: ProductSavePayload) {
  let newTagIds: number[] = [];
  if (payload.newTagNames.length > 0) {
    newTagIds = await registerNewTags(payload.newTagNames);
  }
  const tagIds = [...payload.tagIds, ...newTagIds];
  if (payload.id == null) {
    /* ADD PRODUCT */
    const dataSend = {
      title: payload.title,
      description: payload.description,
      price: payload.price,
      thumbnail: payload.thumbnail ?? undefined,
      category_id: payload.category_id,
      tagIds: tagIds as unknown as string[],
    };
    try {
      const res = (await $fetch("/api/products/addProduct", {
        method: "POST",
        body: dataSend,
      })) as Product[];
      toast.push("Product saved — demo only, nothing persisted.");
      products.value.push(res[0] as Product);
    } catch (error) {
      console.error(error);
    }
  } else {
    /* EDIT products */
    const index = products.value.findIndex((p) => Number(p.id) === payload.id);
    const existing = index !== -1 ? products.value[index] : undefined;
    if (index !== -1 && existing) {
      const dataEditSend = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        price: payload.price,
        thumbnail: payload.thumbnail ?? undefined,
        category_id: payload.category_id,
        tagIds: tagIds as unknown as string[],
      };
      try {
        const res = (await $fetch("/api/products/editProduct", {
          method: "POST",
          body: dataEditSend,
        })) as Product[];
      } catch (error) {
        console.error(error);
      }
      products.value[index] = {
        ...existing,
        title: payload.title,
        description: payload.description,
        price: payload.price,
        thumbnail: payload.thumbnail ?? undefined,
        category_id: payload.category_id,
        tag_id: payload.tagIds as unknown as string[],
      };
    }
    toast.push("Product saved — demo only, nothing persisted.");
  }
  formOpen.value = false;
}

async function confirmDelete() {
  const target = deleting.value;
  if (!target) return;

  try {
    const res = await $fetch("/api/products/deleteProduct", {
      method: "DELETE",
      body: { id: target.id },
    });
    console.log("Delete response:", res);
    products.value = products.value.filter(
      (p) => Number(p.id) !== Number(target.id),
    );
    confirmOpen.value = false;
    deleting.value = null;
    toast.push(`“${target.title}” deleted — demo only.`);
  } catch (error) {
    console.error(error);
  }
}
</script>
