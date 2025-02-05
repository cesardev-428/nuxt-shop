
<template>
 <header class="shadow-xl bg-bgPrimaryl bg-transparent py-4">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="#" class="text-2xl font-bold dark:text-textPrimary text-primaryl transition-colors duration-300">
        Logo
      </a>
      <!-- <img src="/public/favicon.ico" alt=""> -->
      <div class="hidden md:flex space-x-6">
        <a href="#" class="nav-link text-textPrimaryl dark:text-textPrimary hover:text-primary dark:hover:text-primary font-bold  transition-colors duration-300 text-lg">Home</a>
        <a href="#" class="nav-link text-textPrimaryl dark:text-textPrimary hover:text-primary dark:hover:text-primary font-bold transition-colors duration-300 text-lg">About</a>
        <a href="#" class="nav-link text-textPrimaryl dark:text-textPrimary hover:text-primary dark:hover:text-primary font-bold transition-colors duration-300 text-lg">Services</a>
        <a href="#" class="nav-link text-textPrimaryl dark:text-textPrimary hover:text-primary dark:hover:text-primary font-bold transition-colors duration-300 text-lg">Contact</a>
      </div>
      <div class="hidden md:flex items-center space-x-4">
        <button id="darkModeToggle" @click="colorMode.preference = (colorMode.preference === 'light') ? 'dark' : 'light'" class=" dark:text-textPrimary text-textPrimaryl hover:text-hoverPrimary focus:outline-none transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        
        <button 
          @click="cart.setSidebar(cart.sidebarOn)"
          class="relative dark:text-textPrimary text-textPrimaryl hover:text-hoverPrimary  focus:outline-none transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
          <div
            v-show="cart.getLength > 0"
            class="px-1 py-0.5 bg-primary min-w-5 rounded-full text-center text-white text-xs absolute -top-2 -end-1 translate-x-1/4 text-nowrap">
            <div class="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-primary w-full h-full"></div>
            {{cart.getLength}}
          </div>
        </button> 

        <a href="#" class="dark:bg-accentPrimary bg-accentPrimaryl dark:text-textPrimary text-white hover:bg-hoverPrimary px-4 py-2 rounded-lg transition-colors duration-300">Sign Up</a>
      </div>
      <!-- <button id="mobileMenuButton" class="md:hidden text-textPrimaryl  hover:text-primary  focus:outline-none transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button> -->
    </nav>
    <!-- <div id="mobileMenu" class="mobile-menu md:hidden bg-white dark:bg-slate-800 shadow-lg absolute w-full left-0 transform -translate-y-full opacity-0">
      <div class="container mx-auto px-4 py-4 space-y-4">
        <a href="#" class="block text-textPrimaryl  hover:text-primary  transition-colors duration-300">Home</a>
        <a href="#" class="block text-textPrimaryl  hover:text-primary  transition-colors duration-300">About</a>
        <a href="#" class="block text-textPrimaryl  hover:text-primary  transition-colors duration-300">Services</a>
        <a href="#" class="block text-secondaryl  hover:text-primary  transition-colors duration-300">Contact</a>
        <a href="#" class="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-900 transition-colors duration-300">Sign Up</a>
      </div>
    </div> -->
  </header>
</template>
<script lang="ts" setup>

const colorMode = useColorMode()

const cart = useCartStore()





</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
.nav-link {
  position: relative;
  overflow: hidden;
  
}
.nav-link::after {
  content: '';
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