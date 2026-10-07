<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="open"
        class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
        role="presentation"
        @click.self="emit('cancel')"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          class="w-full max-w-md rounded-2xl border border-border-light bg-background-light-secondary p-6 shadow-lg dark:border-border-dark dark:bg-background-dark-secondary"
        >
          <h2 class="font-display text-lg font-semibold tracking-tight">
            {{ title }}
          </h2>
          <p
            class="mt-2 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
          >
            {{ message }}
          </p>

          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="rounded-lg border border-border-light px-4 py-2 text-sm font-medium transition-colors hover:bg-background-light-hover dark:border-border-dark dark:hover:bg-background-dark-hover"
              @click="emit('cancel')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              @click="emit('confirm')"
            >
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
  }>(),
  { confirmLabel: "Delete" }
);

const emit = defineEmits<{ confirm: []; cancel: [] }>();

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.open) emit("cancel");
}

watch(
  () => props.open,
  (open) => {
    if (!import.meta.client) return;
    if (open) window.addEventListener("keydown", onKeydown);
    else window.removeEventListener("keydown", onKeydown);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
