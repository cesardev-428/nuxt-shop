<template>
  <div
    class="fixed top-0 z-[999] flex h-full w-60 flex-col divide-y divide-black/5 border-r border-black/5 bg-background-light-secondary text-textColor-light shadow-xl dark:divide-white/10 dark:border-white/10 dark:bg-background-dark-secondary dark:text-textColor-dark md:hidden"
  >
    <div class="px-5 py-4">
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5"
        @click="close"
      >
        <span
          class="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </span>
        <span class="font-display text-base font-bold tracking-tight"
          >store<span class="text-primary">.</span></span
        >
      </NuxtLink>
    </div>

    <div class="w-full px-3 py-4">
      <nav class="flex w-full flex-col gap-1">
        <NuxtLink to="/" class="menu-link" @click="close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
            <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1Z" />
          </svg>
          <span>Home</span>
        </NuxtLink>

        <NuxtLink to="/products" class="menu-link" @click="close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
            <path d="M3 6h18l-1.5 12.5a2 2 0 0 1-2 1.5H6.5a2 2 0 0 1-2-1.5Z" />
            <path d="M8 10V6a4 4 0 0 1 8 0v4" />
          </svg>
          <span>Products</span>
        </NuxtLink>

        <NuxtLink to="/#categories" class="menu-link" @click="close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          <span>Categories</span>
        </NuxtLink>

        <NuxtLink to="/#about" class="menu-link" @click="close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5" />
            <path d="M12 8h.01" />
          </svg>
          <span>About</span>
        </NuxtLink>

        <NuxtLink to="/#contact" class="menu-link" @click="close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <span>Contact</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Categorías (solo en /products) -->
    <div
      v-if="$route.path === '/products'"
      class="h-full w-full overflow-auto px-3 py-4"
    >
      <span class="ml-2 font-display text-lg font-bold">Categories</span>
      <ul>
        <categoriesMobile
          v-for="(node, index) in categoriesStore"
          :key="index"
          :Node="node"
        ></categoriesMobile>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const categoriesStore = useCategoryStore().nodes;
const emit = defineEmits<{ (e: "close", value: boolean): void }>();
const close = () => emit("close", false);
</script>

<style scoped>
.menu-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 2.75rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #525252;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}
.menu-link:hover {
  background-color: #f5f5f5;
  color: #0a0a0b;
}
:global(.dark) .menu-link {
  color: #a3a3a3;
}
:global(.dark) .menu-link:hover {
  background-color: #1f1f23;
  color: #fafafa;
}
.menu-link.router-link-exact-active {
  background-color: #eff6ff;
  color: #2563eb;
}
:global(.dark) .menu-link.router-link-exact-active {
  background-color: rgba(37, 99, 235, 0.15);
  color: #3b82f6;
}
</style>
