<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup></script>
<style>
:root {
  --bg: #f9fafb;
  --bg-gradient: #100238;
}
.dark {
  --bg: #111827;
  --bg-gradient: #100238;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  background: var(--bg);
}
</style>
