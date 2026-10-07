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
          :aria-label="isEdit ? 'Edit category' : 'New category'"
          class="my-8 w-full max-w-md rounded-2xl border border-border-light bg-background-light-secondary shadow-lg dark:border-border-dark dark:bg-background-dark-secondary"
        >
          <div
            class="flex items-center justify-between border-b border-border-light px-6 py-4 dark:border-border-dark"
          >
            <div>
              <p class="section-label">{{ isEdit ? "Edit" : "Create" }}</p>
              <h2
                class="mt-0.5 font-display text-lg font-semibold tracking-tight"
              >
                {{ isEdit ? "Edit category" : "New category" }}
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

          <form
            class="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5"
            @submit.prevent="submit"
          >
            <div>
              <label for="c-name" class="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <input
                id="c-name"
                ref="nameInput"
                v-model="name"
                type="text"
                required
                placeholder="e.g. Electronics"
                class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
              />
            </div>

            <div>
              <label for="c-description" class="mb-1.5 block text-sm font-medium">
                Description
              </label>
              <textarea
                id="c-description"
                v-model="description"
                required
                rows="3"
                placeholder="What lives in this category…"
                class="w-full resize-y rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
              />
            </div>

            <div>
              <label for="c-parent" class="mb-1.5 block text-sm font-medium">
                Parent category
                <span
                  class="font-normal text-textColor-light-secondary dark:text-textColor-dark-secondary"
                  >— optional</span
                >
              </label>
              <select
                id="c-parent"
                v-model="parentId"
                class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
              >
                <option value="">None (top level)</option>
                <option
                  v-for="category in parentOptions"
                  :key="String(category.id)"
                  :value="String(category.id)"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

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
                {{ isEdit ? "Save changes" : "Create category" }}
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
  category: Categorie | null;
  categories: Categorie[];
}>();

const emit = defineEmits<{
  close: [];
  save: [payload: CategorySavePayload];
}>();

const isEdit = computed(() => props.category != null);

const nameInput = ref<HTMLInputElement | null>(null);
const name = ref("");
const description = ref("");
const parentId = ref("");

const parentOptions = computed(() =>
  props.categories.filter(
    (c) => String(c.id) !== String(props.category?.id ?? "")
  )
);

function hydrate() {
  const c = props.category;
  if (c) {
    name.value = c.name;
    description.value = c.description;
    parentId.value = c.category_id ? String(c.category_id) : "";
  } else {
    name.value = "";
    description.value = "";
    parentId.value = "";
  }
}

watch(
  () => props.open,
  async (open) => {
    hydrate();
    if (open) {
      document.body.style.overflow = "hidden";
      await nextTick();
      nameInput.value?.focus();
    } else {
      document.body.style.overflow = "";
    }
  }
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
  }
);
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

const canSave = computed(
  () => !!name.value.trim() && !!description.value.trim()
);

function submit() {
  if (!canSave.value) return;
  emit("save", {
    id: props.category ? Number(props.category.id) : null,
    name: name.value.trim(),
    description: description.value.trim(),
    category_id: parentId.value === "" ? null : Number(parentId.value),
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
