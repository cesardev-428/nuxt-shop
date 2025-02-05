<template>
  <div class="">
    <Vheader > </Vheader>
    <div class="main flex gap-3">
      <slot />
      <Transition name="slide-fade">
        <cart v-if="cartStore.sidebarOn"></cart>
      </Transition>
    </div>
    <footer class="">
      <span>@2024</span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import Vheader from '~/components/header.vue';
  import cart from '~/components/cart.vue';
  const cartStore = useCartStore()
  

</script>
<style>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
  /* opacity: 0; */
}
</style>