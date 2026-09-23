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
  <div
    @click="isDropdownVisible = !isDropdownVisible"
    class="cursor-pointer select-none items-center justify-center text-base font-semibold"
  >
    <div
      class="box-border flex items-center rounded-full p-3.5 transition-all active:scale-95"
      :class="{
        'bg-background-dark-secondary text-white hover:bg-black dark:bg-white dark:text-black hover:dark:bg-white':
          isDropdownVisible,
        'bg-background-light hover:bg-[#e2e2e2] dark:bg-background-dark-secondary hover:dark:bg-[#333]':
          !isDropdownVisible,
      }"
    >
      <Icon
        name="iconamoon:options-bold"
        size="22"
        :class="{
          'text-textColor-light dark:text-textColor-dark': isDropdownVisible,
          'text-textColor-light dark:text-textColor-dark': !isDropdownVisible,
        }"
      />
    </div>
    <Transition name="dropdown">
      <div
        v-if="isDropdownVisible"
        class="absolute left-0 z-50 mt-2 rounded-2xl text-base font-semibold bg-background-light dark:bg-background-dark-secondary shadow-[0_0_8px_rgba(0,0,0,.1)]"
      >
        <div class="m-2 w-48">
          <div
            v-for="(option, i) in options"
            :key="i"
            class="rounded-[10px] px-3 py-2 transition-all duration-300 hover:bg-[#e9e9e9] hover:dark:bg-[#3c3c3c]"
          >
            <div
              @click.stop="selectfilter(option.value)"
              class="flex items-center justify-between"
            >
              <div
                class="mr-1 w-full text-textColor-light dark:text-textColor-dark"
              >
                {{ option.value }}
              </div>
              <Icon
                v-if="
                  productsStore.filter.isFiltered &&
                  option.value === productsStore.filter.name
                "
                name="iconamoon:check-circle-1-light"
                size="24"
                class="bg-text-textColor-light dark:text-textColor-dark"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
