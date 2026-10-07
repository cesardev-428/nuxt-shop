<template>
  <Teleport to="body">
    <Transition name="form">
      <div
        v-if="open"
        class="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
        role="presentation"
        @click.self="close"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="isEdit ? 'Edit product' : 'New product'"
          class="my-8 w-full max-w-xl rounded-2xl border border-border-light bg-background-light-secondary shadow-lg dark:border-border-dark dark:bg-background-dark-secondary"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between border-b border-border-light px-6 py-4 dark:border-border-dark"
          >
            <div>
              <p class="section-label">{{ isEdit ? "Edit" : "Create" }}</p>
              <h2
                class="mt-0.5 font-display text-lg font-semibold tracking-tight"
              >
                {{ isEdit ? "Edit product" : "New product" }}
              </h2>
            </div>
            <button
              type="button"
              class="grid h-9 w-9 place-items-center rounded-lg text-textColor-light-secondary transition-colors hover:bg-background-light-hover hover:text-textColor-light dark:text-textColor-dark-secondary dark:hover:bg-background-dark-hover dark:hover:text-textColor-dark"
              aria-label="Close"
              @click="close"
            >
              <Icon name="iconamoon:close" class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <!-- Body -->
          <form
            class="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5"
            @submit.prevent="submit"
          >
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="p-title" class="mb-1.5 block text-sm font-medium">
                  Title
                </label>
                <input
                  id="p-title"
                  ref="titleInput"
                  v-model="title"
                  type="text"
                  required
                  placeholder="e.g. Wireless Keyboard"
                  class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
                />
              </div>

              <div>
                <label for="p-price" class="mb-1.5 block text-sm font-medium">
                  Price (USD)
                </label>
                <input
                  id="p-price"
                  v-model="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
                />
              </div>

              <div>
                <label
                  for="p-category"
                  class="mb-1.5 block text-sm font-medium"
                >
                  Category
                </label>
                <select
                  id="p-category"
                  v-model="categoryId"
                  class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
                >
                  <option value="">No category</option>
                  <option
                    v-for="category in categories"
                    :key="String(category.id)"
                    :value="String(category.id)"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="p-description"
                  class="mb-1.5 block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="p-description"
                  v-model="description"
                  required
                  rows="3"
                  placeholder="Short product description…"
                  class="w-full resize-y rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
                />
              </div>

              <div class="sm:col-span-2">
                <label
                  for="p-thumbnail"
                  class="mb-1.5 block text-sm font-medium"
                >
                  Thumbnail URL
                  <span
                    class="font-normal text-textColor-light-secondary dark:text-textColor-dark-secondary"
                    >— optional</span
                  >
                </label>
                <input
                  id="p-thumbnail"
                  v-model="thumbnail"
                  type="url"
                  placeholder="https://… or /products/1.png"
                  class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
                />
                <div class="mt-2 flex items-center gap-3">
                  <span
                    class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-border-light bg-background-light text-neutral-400 dark:border-border-dark dark:bg-background-dark"
                  >
                    <img
                      v-if="thumbnail.trim()"
                      :src="thumbnail.trim()"
                      alt=""
                      class="h-full w-full object-cover"
                      @error="previewBroken = true"
                    />
                    <Icon
                      v-else
                      name="iconamoon:box"
                      class="h-6 w-6"
                      aria-hidden="true"
                    />
                  </span>
                  <p
                    class="text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
                  >
                    <template v-if="previewBroken">
                      Image could not be loaded — check the URL.
                    </template>
                    <template v-else>
                      Empty → a deterministic image is used in the store.
                    </template>
                  </p>
                </div>
              </div>

              <!-- Tags -->
              <div class="sm:col-span-2">
                <label for="p-tags" class="mb-1.5 block text-sm font-medium">
                  Tags
                  <span
                    class="font-normal text-textColor-light-secondary dark:text-textColor-dark-secondary"
                    >— new names are created with the product</span
                  >
                </label>

                <div v-if="selected.length" class="mb-2 flex flex-wrap gap-1.5">
                  <span
                    v-for="(tag, i) in selected"
                    :key="tag.id ?? 'new-' + tag.name"
                    class="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 py-1 pl-2.5 pr-1.5 text-xs font-medium text-primary"
                  >
                    {{ tag.name }}
                    <span v-if="tag.id == null" class="opacity-70">· new</span>
                    <button
                      type="button"
                      :aria-label="`Remove tag ${tag.name}`"
                      class="grid h-4 w-4 place-items-center rounded-full transition-colors hover:bg-primary hover:text-white"
                      @click="removeTag(i)"
                    >
                      <Icon
                        name="iconamoon:close"
                        class="h-3 w-3"
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                </div>

                <div class="relative">
                  <input
                    id="p-tags"
                    v-model="tagSearch"
                    type="text"
                    placeholder="Search or create a tag…"
                    autocomplete="off"
                    class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
                    @keydown.enter.prevent="onTagEnter"
                  />
                  <ul
                    v-if="suggestions.length"
                    class="absolute left-0 right-0 top-full z-10 mt-1 max-h-44 overflow-y-auto rounded-lg border border-border-light bg-background-light-secondary py-1 shadow-sm dark:border-border-dark dark:bg-background-dark-secondary"
                  >
                    <li v-for="tag in suggestions" :key="String(tag.id)">
                      <button
                        type="button"
                        class="w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-background-light-hover dark:hover:bg-background-dark-hover"
                        @click="addTag(tag)"
                      >
                        {{ tag.name }}
                      </button>
                    </li>
                  </ul>
                </div>

                <div
                  class="mt-2 flex flex-wrap items-center justify-between gap-2"
                >
                  <p
                    class="text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
                  >
                    Press Enter to add or create a tag.
                  </p>
                  <button
                    v-if="canCreateTag"
                    type="button"
                    class="text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
                    @click="createTag"
                  >
                    Create tag “{{ tagSearch.trim() }}”
                  </button>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div
              class="flex justify-end gap-3 border-t border-border-light pt-4 dark:border-border-dark"
            >
              <button
                type="button"
                class="rounded-lg border border-border-light px-4 py-2 text-sm font-medium transition-colors hover:bg-background-light-hover dark:border-border-dark dark:hover:bg-background-dark-hover"
                @click="close"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="!canSave"
                class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-background-dark"
              >
                {{ isEdit ? "Save changes" : "Create product" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  product: Product | null;
  categories: Categorie[];
  tags: Tag[];
}>();

const emit = defineEmits<{
  close: [];
  save: [payload: ProductSavePayload];
}>();

const isEdit = computed(() => props.product != null);

/* form state */
const titleInput = ref<HTMLInputElement | null>(null);
const title = ref("");
const description = ref("");
const price = ref("");
const thumbnail = ref("");
const categoryId = ref("");
const selected = ref<Array<{ id: number | null; name: string }>>([]);
const tagSearch = ref("");
const previewBroken = ref(false);

/* hydratar al abrir */
function hydrate() {
  previewBroken.value = false;
  tagSearch.value = "";
  const p = props.product;
  if (p) {
    title.value = p.title;
    description.value = p.description;
    price.value = String(p.price);
    thumbnail.value = p.thumbnail ?? "";
    categoryId.value = p.category_id != null ? String(p.category_id) : "";
    const ids = (p.tag_id ?? []).map((t) => Number(t));
    selected.value = ids.map((id) => {
      const found = props.tags.find((t) => Number(t.id) === id);
      return { id, name: found ? String(found.name) : `#${id}` };
    });
  } else {
    title.value = "";
    description.value = "";
    price.value = "";
    thumbnail.value = "";
    categoryId.value = "";
    selected.value = [];
  }
}

watch(
  () => props.open,
  async (open) => {
    hydrate();
    if (open) {
      document.body.style.overflow = "hidden";
      await nextTick();
      titleInput.value?.focus();
    } else {
      document.body.style.overflow = "";
    }
  },
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});

function close() {
  emit("close");
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.open) close();
}
watch(
  () => props.open,
  (open) => {
    if (open) window.addEventListener("keydown", onKeydown);
    else window.removeEventListener("keydown", onKeydown);
  },
);
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

/* tags */
const q = computed(() => tagSearch.value.trim().toLowerCase());

const suggestions = computed(() => {
  if (!q.value) return [];
  const selectedIds = new Set(
    selected.value.map((t) => t.id).filter((id): id is number => id != null),
  );
  return props.tags
    .filter(
      (t) =>
        !selectedIds.has(Number(t.id)) &&
        String(t.name).toLowerCase().includes(q.value),
    )
    .slice(0, 6);
});

const nameTaken = computed(() =>
  selected.value.some((t) => t.name.toLowerCase() === q.value),
);

const canCreateTag = computed(
  () => !!q.value && !nameTaken.value && !exactMatch.value,
);

const exactMatch = computed(
  () =>
    props.tags.find((t) => String(t.name).toLowerCase() === q.value) ?? null,
);

function addTag(tag: Tag) {
  if (selected.value.some((t) => t.id === Number(tag.id))) return;
  selected.value.push({ id: Number(tag.id), name: String(tag.name) });
  tagSearch.value = "";
}

function createTag() {
  const name = tagSearch.value.trim();
  if (!name || nameTaken.value) return;
  selected.value.push({ id: null, name });
  tagSearch.value = "";
}

function onTagEnter() {
  if (exactMatch.value && !nameTaken.value) addTag(exactMatch.value);
  else createTag();
}

function removeTag(index: number) {
  selected.value.splice(index, 1);
}

/* validación + submit */
const priceValue = computed(() => {
  const n = Number(price.value);
  return Number.isFinite(n) && n >= 0 ? n : null;
});

const canSave = computed(
  () =>
    !!title.value.trim() &&
    !!description.value.trim() &&
    priceValue.value != null,
);

function submit() {
  if (!canSave.value) return;
  emit("save", {
    id: props.product ? Number(props.product.id) : null,
    title: title.value.trim(),
    description: description.value.trim(),
    price: priceValue.value as number,
    thumbnail: thumbnail.value.trim() || null,
    category_id: categoryId.value === "" ? null : Number(categoryId.value),
    tagIds: selected.value
      .filter((t) => t.id != null)
      .map((t) => t.id as number),
    newTagNames: selected.value.filter((t) => t.id == null).map((t) => t.name),
  });
}
</script>

<style scoped>
.form-enter-active,
.form-leave-active {
  transition: opacity 0.2s ease;
}
.form-enter-from,
.form-leave-to {
  opacity: 0;
}
</style>
