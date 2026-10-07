<template>
  <div
    class="min-h-screen bg-background-light text-textColor-light dark:bg-background-dark dark:text-textColor-dark"
  >
    <!-- Topbar -->
    <header
      class="sticky top-0 z-40 h-16 border-b border-border-light bg-background-light-secondary dark:border-border-dark dark:bg-background-dark-secondary"
    >
      <div class="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="flex items-center gap-2.5"
            aria-label="store. — Home"
          >
            <span
              class="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white"
            >
              <Icon name="iconamoon:box" class="h-4 w-4" aria-hidden="true" />
            </span>
            <span class="font-display text-lg font-bold tracking-tight">
              store<span class="text-primary">.</span>
            </span>
          </NuxtLink>
          <span
            class="rounded-full border border-border-light px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary dark:border-border-dark"
          >
            Admin
          </span>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          <NuxtLink
            to="/"
            class="hidden items-center gap-1.5 text-sm font-medium text-textColor-light-secondary transition-colors hover:text-primary dark:text-textColor-dark-secondary sm:inline-flex"
          >
            View store
            <Icon name="iconamoon:arrow-right-1" class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
          <span
            v-if="auth.user"
            class="hidden max-w-40 truncate text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary md:block"
          >
            {{ auth.user.email }}
          </span>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-lg border border-border-light px-3 py-1.5 text-sm font-medium transition-colors hover:border-border-light-hover hover:bg-background-light-hover dark:border-border-dark dark:hover:border-border-dark-hover dark:hover:bg-background-dark-hover"
            @click="auth.logout()"
          >
            <Icon name="iconamoon:exit" class="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      </div>
    </header>

    <div class="mx-auto flex max-w-7xl">
      <!-- Rail -->
      <aside
        class="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col border-r border-border-light p-4 dark:border-border-dark md:flex"
      >
        <nav class="flex flex-col gap-1">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            :active-class="'bg-primary/10 text-primary font-semibold'"
            class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-textColor-light-secondary transition-colors hover:bg-background-light-hover hover:text-textColor-light dark:text-textColor-dark-secondary dark:hover:bg-background-dark-hover dark:hover:text-textColor-dark"
          >
            <Icon :name="item.icon" class="h-4 w-4" aria-hidden="true" />
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div
          class="mt-auto rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs leading-relaxed text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          <span class="font-semibold text-primary">Demo mode</span> — catalog
          reads are live; product &amp; category changes stay in this session
          (backend not implemented).
        </div>
      </aside>

      <!-- Content -->
      <main class="min-w-0 flex-1">
        <!-- Mobile nav -->
        <nav
          class="flex gap-1 overflow-x-auto border-b border-border-light p-3 dark:border-border-dark md:hidden"
        >
          <NuxtLink
            v-for="item in nav"
            :key="'m-' + item.to"
            :to="item.to"
            :active-class="'bg-primary/10 text-primary font-semibold'"
            class="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="p-4 sm:p-6 lg:p-8">
          <slot />
        </div>
      </main>
    </div>

    <AdminToaster />
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore();

if (!auth.user) {
  await auth.fetchMe();
}

const nav = [
  { to: "/dashboard", label: "Overview", icon: "iconamoon:home" },
  { to: "/dashboard/products", label: "Products", icon: "iconamoon:box" },
  { to: "/dashboard/categories", label: "Categories", icon: "iconamoon:folder" },
];
</script>
