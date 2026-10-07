<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup></script>
<style>
:root {
  --bg: #fafafa;
  --grid-line: rgba(10, 10, 11, 0.06);
  color-scheme: light;
}
.dark {
  --bg: #0a0a0b;
  --grid-line: rgba(255, 255, 255, 0.06);
  color-scheme: dark;
}
html {
  scroll-behavior: smooth;
}
body {
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Helvetica Neue",
    sans-serif;
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
::selection {
  background: #2563eb;
  color: #ffffff;
}
/* Etiqueta de sección en versalitas — estilo tech-minimalist */
.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #2563eb;
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  /* Detiene animaciones decorativas (pulse, ping, spinners); las transiciones
     de color/hover se mantienen */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
