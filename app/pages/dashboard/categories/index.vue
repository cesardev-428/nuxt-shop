<template>
  <div>
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="section-label">Taxonomy</p>
        <h1
          class="mt-1.5 font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Categories
        </h1>
        <p
          class="mt-1 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          {{ filtered.length }} of {{ categories.length }} categories
          <span v-if="!pending">· demo writes</span>
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
        @click="openCreate"
      >
        <span class="text-base leading-none" aria-hidden="true">+</span>
        New category
      </button>
    </header>

    <!-- Search -->
    <div class="relative mb-4 w-full sm:max-w-xs">
      <Icon
        name="iconamoon:search"
        class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />
      <input
        v-model="search"
        type="search"
        placeholder="Search categories…"
        aria-label="Search categories"
        class="w-full rounded-lg border border-border-light bg-background-light-secondary py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark-secondary"
      />
    </div>

    <!-- Skeleton -->
    <div
      v-if="pending"
      class="space-y-2"
      aria-busy="true"
      aria-label="Loading categories"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-14 animate-pulse rounded-xl border border-border-light bg-background-light-secondary dark:border-border-dark dark:bg-background-dark-secondary"
      />
    </div>

    <!-- Table -->
    <div
      v-else
      class="overflow-hidden rounded-2xl border border-border-light bg-background-light-secondary dark:border-border-dark dark:bg-background-dark-secondary"
    >
      <div v-if="!categories.length" class="px-6 py-16 text-center">
        <p class="font-display text-lg font-semibold">No categories yet</p>
        <p
          class="mt-1 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          Create the first category to organize the catalog.
        </p>
        <button
          type="button"
          class="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          @click="openCreate"
        >
          New category
        </button>
      </div>

      <div v-else-if="!filtered.length" class="px-6 py-16 text-center">
        <p class="font-display text-lg font-semibold">No matches</p>
        <p
          class="mt-1 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          Nothing matches “{{ search.trim() }}”.
        </p>
        <button
          type="button"
          class="mt-5 rounded-lg border border-border-light px-4 py-2 text-sm font-medium transition-colors hover:bg-background-light-hover dark:border-border-dark dark:hover:bg-background-dark-hover"
          @click="search = ''"
        >
          Clear search
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full min-w-[680px] text-sm">
          <thead
            class="border-b border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark"
          >
            <tr
              class="text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-textColor-light-secondary dark:text-textColor-dark-secondary"
            >
              <th scope="col" class="px-4 py-3">Name</th>
              <th scope="col" class="px-4 py-3">Parent</th>
              <th scope="col" class="px-4 py-3">Description</th>
              <th scope="col" class="px-4 py-3">Added</th>
              <th scope="col" class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light dark:divide-border-dark">
            <tr
              v-for="category in filtered"
              :key="String(category.id)"
              class="transition-colors hover:bg-background-light-hover dark:hover:bg-background-dark-hover"
            >
              <td class="px-4 py-3">
                <span class="flex items-center gap-2.5 font-medium">
                  <span
                    class="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border-light bg-background-light text-primary dark:border-border-dark dark:bg-background-dark"
                  >
                    <Icon
                      name="iconamoon:folder"
                      class="h-4 w-4"
                      aria-hidden="true"
                    />
                  </span>
                  {{ category.name }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-block max-w-[140px] truncate rounded-full border border-border-light px-2.5 py-0.5 text-xs dark:border-border-dark"
                >
                  {{ parentName(category) }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="block max-w-[260px] truncate text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
                >
                  {{ category.description }}
                </span>
              </td>
              <td
                class="whitespace-nowrap px-4 py-3 text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
              >
                {{ fmtDate(category.created_at) }}
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-end gap-1.5">
                  <button
                    type="button"
                    class="grid h-8 w-8 place-items-center rounded-lg border border-border-light text-textColor-light-secondary transition-colors hover:border-primary hover:text-primary dark:border-border-dark dark:text-textColor-dark-secondary"
                    :aria-label="`Edit ${category.name}`"
                    @click="openEdit(category)"
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
                    :aria-label="`Delete ${category.name}`"
                    @click="askDelete(category)"
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
    </div>

    <!-- Modales -->
    <AdminCategoryForm
      :open="formOpen"
      :category="editing"
      :categories="categories"
      @close="formOpen = false"
      @save="onSave"
    />
    <AdminConfirmDialog
      :open="confirmOpen"
      title="Delete category?"
      :message="
        deleting
          ? `“${deleting.name}” will be removed from this session. Demo only — the database is not touched.`
          : ''
      "
      @cancel="confirmOpen = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth", layout: "admin" });

useHead({ title: "Categories — store. admin" });

const toast = useToast();

const pending = ref(true);
const categories = ref<Categorie[]>([]);
const search = ref("");

const formOpen = ref(false);
const editing = ref<Categorie | null>(null);
const confirmOpen = ref(false);
const deleting = ref<Categorie | null>(null);

onMounted(async () => {
  try {
    categories.value = await $fetch<Categorie[]>("/api/categories/getAll");
  } finally {
    pending.value = false;
  }
});

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return categories.value;
  return categories.value.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q),
  );
});

function parentName(category: Categorie) {
  if (!category.category_id) return "—";
  const found = categories.value.find(
    (c) => String(c.id) === String(category.category_id),
  );
  return found ? found.name : "—";
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
function openEdit(c: Categorie) {
  editing.value = c;
  formOpen.value = true;
}
function askDelete(c: Categorie) {
  deleting.value = c;
  confirmOpen.value = true;
}

async function onSave(payload: CategorySavePayload) {
  if (payload.id == null) {
    try {
      const res = (await $fetch("/api/categories/createCategory", {
        method: "POST",
        body: payload,
      })) as Categorie;

      if (!res) {
        categories.value.push(res as Categorie);
      }
      toast.push("Category created — demo only, nothing persisted.");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  } else {
    const index = categories.value.findIndex(
      (c) => Number(c.id) === payload.id,
    );
    const existing = index !== -1 ? categories.value[index] : undefined;
    if (index !== -1 && existing) {
      try {
        await $fetch("/api/categories/updateCategory", {
          method: "POST",
          body: payload,
        });
        categories.value[index] = {
          ...existing,
          name: payload.name,
          description: payload.description,
          category_id:
            payload.category_id != null ? String(payload.category_id) : "",
        };
        toast.push("Category saved — demo only, nothing persisted.");
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    }
  }
  formOpen.value = false;
}

async function confirmDelete() {
  const target = deleting.value;
  if (!target) return;
  try {
    await $fetch("/api/categories/deleteCategory", {
      method: "DELETE",
      body: { id: target.id },
    });
    categories.value = categories.value.filter(
      (c) => Number(c.id) !== Number(target.id),
    );
    confirmOpen.value = false;
    deleting.value = null;
    toast.push(`“${target.name}” deleted — demo only.`);
  } catch (error) {
    console.error("Failed to delete category:", error);
  }
}
</script>
