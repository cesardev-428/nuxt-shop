<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>

</script>
<style >
/* body{
  background: #010101;
  background: linear-gradient(180deg, #010101, #100238) no-repeat;
  height: 100vh;
} */

:root {
  --bg: #dee1e6;
  --bg-gradient: #100238;
}
.dark-mode {
  --bg: #121212;
  --bg-gradient: #100238;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: var(--bg);
  /* background: linear-gradient(180deg, var(--bg), var(--bg-gradient)) no-repeat; */
  /* color: var(--color); */
  transition: background-color .3s;
}


</style>

