<template>
  <header
    id="header"
    class="sticky top-0 z-50 w-full border-b transition-all duration-300"
    :class="
      headerS
        ? 'border-black/5 bg-background-light/80 backdrop-blur-md dark:border-white/10 dark:bg-background-dark/80'
        : 'border-transparent bg-background-light dark:bg-background-dark'
    "
  >
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Marca -->
      <NuxtLink
        to="/"
        class="group flex shrink-0 items-center gap-2.5"
        aria-label="store. — Home"
      >
        <span
          class="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white transition-transform duration-300 group-hover:scale-105"
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
        <span
          class="font-display text-lg font-bold tracking-tight text-textColor-light dark:text-textColor-dark"
          >store<span class="text-primary">.</span></span
        >
      </NuxtLink>

      <!-- Enlaces -->
      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
        <NuxtLink to="/#categories" class="nav-link">Categories</NuxtLink>
        <NuxtLink to="/#about" class="nav-link">About</NuxtLink>
        <NuxtLink to="/#contact" class="nav-link">Contact</NuxtLink>
      </div>

      <!-- Acciones -->
      <div class="flex items-center gap-1 sm:gap-2">
        <button
          id="darkModeToggle"
          :aria-label="
            colorMode.value === 'dark'
              ? 'Switch to light mode'
              : 'Switch to dark mode'
          "
          @click="
            colorMode.preference =
              colorMode.preference === 'light' ? 'dark' : 'light'
          "
          class="grid h-10 w-10 place-items-center rounded-full border border-transparent text-textColor-light-secondary transition-colors duration-300 hover:border-black/10 hover:bg-black/5 dark:text-textColor-dark-secondary dark:hover:border-white/10 dark:hover:bg-white/10"
        >
          <Icon
            v-if="colorMode.value === 'dark'"
            name="circum:dark"
            size="22"
          />
          <Icon v-else name="circum:light" size="22" />
        </button>

        <button
          aria-label="Shopping cart"
          @click="cartStore.setSidebar(cartStore.sidebarOn)"
          class="relative grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300"
          :class="
            !cartStore.sidebarOn
              ? 'border-transparent text-textColor-light-secondary hover:border-black/10 hover:bg-black/5 dark:text-textColor-dark-secondary dark:hover:border-white/10 dark:hover:bg-white/10'
              : 'border-black/10 bg-black/5 text-textColor-light dark:border-white/10 dark:bg-white/10 dark:text-textColor-dark'
          "
        >
          <Icon
            v-if="!cartStore.sidebarOn"
            name="iconamoon:shopping-bag"
            size="22"
          />
          <Icon v-else name="iconamoon:close" size="22" />
          <span
            v-show="cartStore.getLength > 0 && !cartStore.sidebarOn"
            class="absolute -end-1 -top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-4 text-white"
          >
            <span
              class="absolute inset-0 animate-ping rounded-full bg-primary"
            ></span>
            <span class="relative">{{ cartStore.getLength }}</span>
          </span>
        </button>

        <button
          aria-label="Open menu"
          @click="sidebarModel = !sidebarModel"
          class="relative z-50 grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 md:hidden"
          :class="
            !sidebarModel
              ? 'border-transparent text-textColor-light-secondary hover:border-black/10 hover:bg-black/5 dark:text-textColor-dark-secondary dark:hover:border-white/10 dark:hover:bg-white/10'
              : 'border-black/10 bg-black/5 text-textColor-light dark:border-white/10 dark:bg-white/10 dark:text-textColor-dark'
          "
        >
          <Icon
            v-if="!sidebarModel"
            name="iconamoon:menu-burger-horizontal"
            size="22"
          />
          <Icon v-else name="iconamoon:close" size="22" />
        </button>
      </div>
    </nav>

    <!-- Overlay para menú móvil / carrito -->
    <div v-if="showModal" @click="closeModal" class="fixed inset-0 z-40">
      <div
        class="h-full w-full bg-black/30 backdrop-blur-sm"
      ></div>
    </div>
    <carr v-if="cartStore.sidebarOn"></carr>
    <sidebar
      v-if="sidebarModel"
      @close="sidebarModel = $event"
    ></sidebar>
  </header>
</template>
<script lang="ts" setup>
import carr from "~/components/cart.vue";

const cartStore = useCartStore();
const colorMode = useColorMode();
const sidebarModel = ref(false);
const headerS = ref(false);
const screenWidth = ref<number>(0);

const onScroll = () => {
  headerS.value = window.scrollY > 0;
};
const onResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  onScroll();
  onResize();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
});

const closeModal = () => {
  sidebarModel.value = false;
  cartStore.setSidebar(true);
};

const showModal = computed(() => {
  if (screenWidth.value >= 768) {
    return cartStore.sidebarOn;
  }
  return cartStore.sidebarOn || sidebarModel.value;
});
</script>

<style scoped>
.nav-link {
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  color: #525252;
  overflow: hidden;
  padding-bottom: 2px;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #0a0a0b;
}
:global(.dark) .nav-link {
  color: #a3a3a3;
}
:global(.dark) .nav-link:hover {
  color: #fafafa;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #2563eb;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease-out;
}
.nav-link:hover::after,
.nav-link.router-link-exact-active::after {
  transform: scaleX(1);
  transform-origin: left;
}
.nav-link.router-link-exact-active {
  color: #0a0a0b;
}
:global(.dark) .nav-link.router-link-exact-active {
  color: #fafafa;
}
</style>
