<template>
  <main class="w-full">
    <Vheader> </Vheader>

    <slot />

    <!-- <footer
      class="w-full h-16 flex items-center justify-center bg-background-light dark:bg-background-dark-secondary text-textColor-light dark:text-textColor-dark"
    >
      <span>@2024</span>
    </footer> -->
  </main>
</template>

<script lang="ts" setup>
import Vheader from "~/components/header.vue";
/* import sidebar from '~/components/sidebar.vue'; */
</script>
<style></style>
