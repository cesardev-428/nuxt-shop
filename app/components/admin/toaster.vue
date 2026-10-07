<template>
  <div
    class="pointer-events-none fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2"
    aria-live="polite"
  >
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 rounded-xl border border-border-light bg-background-light-secondary p-3.5 shadow-sm dark:border-border-dark dark:bg-background-dark-secondary"
        role="status"
      >
        <span
          class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
          :class="iconBgFor(toast.type)"
        >
          <Icon :name="iconFor(toast.type)" class="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <p class="flex-1 text-sm text-textColor-light dark:text-textColor-dark">
          {{ toast.message }}
        </p>
        <button
          type="button"
          class="text-textColor-light-secondary transition-colors hover:text-textColor-light dark:text-textColor-dark-secondary dark:hover:text-textColor-dark"
          aria-label="Dismiss notification"
          @click="dismiss(toast.id)"
        >
          <Icon name="iconamoon:close" class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { Toast } from "~/composables/useToast";

const { toasts, dismiss } = useToast();

function iconFor(type: Toast["type"]) {
  if (type === "error") return "iconamoon:close";
  if (type === "info") return "iconamoon:information-circle";
  return "iconamoon:check";
}
function iconBgFor(type: Toast["type"]) {
  return type === "error" ? "bg-red-600" : "bg-primary";
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}
</style>
