<template>
  <header
    id="header"
    class="shadow-xl py-2 px-1 dark:bg-background-dark bg-background-light w-full z-50 h-[75px]"
    :class="{ 'sticky top-0  ': headerS }"
  >
    <nav class="px-4 py-2 flex justify-between items-center">
      <div class="flex">
        <nuxt-link
          class="flex items-center w-full px-3 mt-3 dark:text-textColor-dark text-textColor-light"
          to="/"
        >
          <svg
            class="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          <span class="ml-2 text-xl font-bold">The App</span>
        </nuxt-link>
      </div>
      <!-- <img src="/public/favicon.ico" alt=""> -->
      <div class="hidden xl:flex space-x-6">
        <nuxt-link
          to="/"
          class="nav-link dark:text-textColor-dark text-textColor-light dark:hover:text-textColor-dark-hover hover:text-textColor-light-hover font-bold transition-colors duration-300 text-2xl"
          >Home</nuxt-link
        >
        <nuxt-link
          to="/products"
          class="nav-link dark:text-textColor-dark text-textColor-light dark:hover:text-textColor-dark-hover hover:text-textColor-light-hover font-bold transition-colors duration-300 text-2xl"
          >Products</nuxt-link
        >
        <a
          href="#"
          class="nav-link dark:text-textColor-dark text-textColor-light dark:hover:text-textColor-dark-hover hover:text-textColor-light-hover font-bold transition-colors duration-300 text-2xl"
          >About</a
        >
        <a
          href="#"
          class="nav-link dark:text-textColor-dark text-textColor-light dark:hover:text-textColor-dark-hover hover:text-textColor-light-hover font-bold transition-colors duration-300 text-2xl"
          >Services</a
        >
        <a
          href="#"
          class="nav-link dark:text-textColor-dark text-textColor-light dark:hover:text-textColor-dark-hover hover:text-textColor-light-hover font-bold transition-colors duration-300 text-2xl"
          >Contact</a
        >
      </div>
      <div class="flex items-center space-x-2 gap-2">
        <button
          id="darkModeToggle"
          @click="
            colorMode.preference =
              colorMode.preference === 'light' ? 'dark' : 'light'
          "
          class="flex items-center justify-center min-w-12 min-h-12 rounded-[2rem] hover:bg-black/5 hover:dark:bg-white/15 relative dark:hover:bg-white/10 backdrop-blur-lg"
        >
          <Icon
            v-if="colorMode.preference === 'dark'"
            class="text-[#5f5f5f] dark:text-[#b7b7b7]"
            name="circum:dark"
            size="26"
          />
          <Icon
            v-else
            class="text-[#5f5f5f] dark:text-[#b7b7b7]"
            name="circum:light"
            size="26"
          />
        </button>

        <button
          @click="cart.setSidebar(cart.sidebarOn)"
          class="z-50"
          :class="[
            !cartStore.sidebarOn
              ? '  rounded-[2rem] hover:bg-black/5 hover:dark:bg-white/15  items-center justify-center min-w-12 min-h-12 inline-flex  relative dark:text-textColor-dark text-textColor-light hover:text-primary-dark focus:outline-none transition-colors duration-300'
              : ' hover:bg-white/65 dark:hover:bg-white/10 transition shadow-2xl items-center justify-center min-w-12 min-h-12 rounded-[2rem] flex bg-white/85 dark:bg-black/30 dark:border dark:border-white/10  backdrop-blur-lg',
          ]"
        >
          <Icon
            v-if="!cartStore.sidebarOn"
            class="text-[#5f5f5f] dark:text-[#b7b7b7]"
            name="iconamoon:shopping-bag"
            size="26"
          />
          <Icon
            v-else
            class="text-[#5f5f5f] dark:text-[#b7b7b7]"
            name="iconamoon:close"
            size="26"
          />
          <div
            v-show="cart.getLength > 0 && !cartStore.sidebarOn"
            class="px-1 py-0.5 bg-primary min-w-5 rounded-full text-center text-white text-xs absolute top-0 -end-1 translate-x-1/4 text-nowrap"
          >
            <div
              class="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-primary w-full h-full"
            ></div>
            {{ cart.getLength }}
          </div>
        </button>

        <a
          href="#"
          class="hidden xl:block bg-primary dark:hover:bg-primary/50 hover:bg-primary-dark text-textColor-dark hover:bg-hoverPrimary px-4 py-2 rounded-lg transition-colors duration-300"
          >Sign Up</a
        >
        <!-- menu -->
        <button
          @click="sidebarModel = !sidebarModel"
          class="z-50 xl:hidden"
          :class="[
            !sidebarModel
              ? '  rounded-[2rem] hover:bg-black/5 hover:dark:bg-white/15  items-center justify-center min-w-12 min-h-12 inline-flex  relative dark:text-textColor-dark text-textColor-light hover:text-primary-dark focus:outline-none transition-colors duration-300'
              : ' hover:bg-white/65 dark:hover:bg-white/10 transition shadow-2xl items-center justify-center min-w-12 min-h-12 rounded-[2rem] flex bg-white/85 dark:bg-black/30 dark:border dark:border-white/10  backdrop-blur-lg',
          ]"
        >
          <Icon
            v-if="!sidebarModel"
            class="text-[#5f5f5f] dark:text-[#b7b7b7]"
            name="iconamoon:menu-burger-horizontal"
            size="26"
          />
          <Icon
            v-else
            class="text-[#5f5f5f] dark:text-[#b7b7b7]"
            name="iconamoon:close"
            size="26"
          />
        </button>
      </div>
    </nav>

    <div v-if="showModal" @click="closeModal" :class="['fixed inset-0 z-[40]']">
      <div class="w-full h-full bg-black/30 backdrop-blur-lg"></div>
    </div>
    <carr v-if="cartStore.sidebarOn"></carr>
    <sidebar v-if="sidebarModel" @close="sidebarModel = $event"></sidebar>
  </header>
</template>
<script lang="ts" setup>
import carr from "~/components/cart.vue";
const cartStore = useCartStore();

const colorMode = useColorMode();
const sidebarModel = ref(false);
const cart = useCartStore();
const headerS = ref(false);
const screenWidth = ref();
// mounted
onMounted(() => {
  window.addEventListener("scroll", () => {
    headerS.value = window.scrollY > 0;
  });

  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth;
  });
});

const closeModal = () => {
  sidebarModel.value = false;
  cartStore.setSidebar(true);
};

// computed
const showModal = computed(() => {
  if (screenWidth.value >= 1280) {
    return false;
  }
  return cartStore.sidebarOn || sidebarModel.value;
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
.nav-link {
  position: relative;
  overflow: hidden;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease-out;
}
.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.mobile-menu {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
</style>
