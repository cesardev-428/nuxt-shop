<script setup lang="ts">
const productsStore = useProductStore();

const isDropdownVisible = ref(false);
const options = ref([
  { value: "Newest" },
  { value: "Price: High to Low" },
  { value: "Price: Low to High" },
]);

const selectfilter = (filterName: string) => {
  if (
    productsStore.filter.isFiltered &&
    productsStore.filter.name === filterName
  ) {
    productsStore.clearFilter();
    isDropdownVisible.value = false;

    return;
  }
  productsStore.setFilter(filterName);
  isDropdownVisible.value = false;
};
</script>

<template>
  <div class="relative shrink-0">
    <button
      type="button"
      :aria-expanded="isDropdownVisible"
      aria-haspopup="menu"
      aria-label="Sort products"
      class="flex h-12 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors"
      :class="
        isDropdownVisible || productsStore.filter.isFiltered
          ? 'border-primary text-primary'
          : 'border-border-light dark:border-border-dark text-textColor-light dark:text-textColor-dark hover:border-primary hover:text-primary'
      "
      @click="isDropdownVisible = !isDropdownVisible"
    >
      <Icon name="iconamoon:options-bold" size="20" />
      <span class="hidden sm:inline">Sort</span>
    </button>
    <Transition name="dropdown">
      <div
        v-if="isDropdownVisible"
        role="menu"
        class="absolute left-0 z-50 mt-2 w-52 rounded-xl border border-border-light bg-background-light p-1.5 shadow-[0_8px_24px_rgba(10,10,11,.08)] dark:border-border-dark dark:bg-background-dark-secondary dark:shadow-[0_8px_24px_rgba(0,0,0,.4)]"
      >
        <button
          v-for="(option, i) in options"
          :key="i"
          type="button"
          role="menuitem"
          class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-textColor-light transition-colors hover:bg-neutral-100 dark:text-textColor-dark dark:hover:bg-neutral-800"
          @click.stop="selectfilter(option.value)"
        >
          <span>{{ option.value }}</span>
          <Icon
            v-if="
              productsStore.filter.isFiltered &&
              option.value === productsStore.filter.name
            "
            name="iconamoon:check-circle-1-light"
            size="20"
            class="text-primary"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
