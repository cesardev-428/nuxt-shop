import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  //server
  /* devServer: {
    host: '0.0.0.0', // Permite conexiones desde cualquier IP
    port: 3000 // Puedes cambiar el puerto si lo deseas, el default es 3000
  }, */
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxthub/core",
    "@nuxt/icon",
  ],

  app: {
    head: {
      title: "store. — Everything you need, nothing you don't",
      meta: [
        {
          name: "description",
          content:
            "A tech-minimalist online store. Curated tech, home and everyday essentials — free shipping over $50.",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
        },
      ],
    },
  },

  colorMode: {
    classSuffix: "", // Esto asegura que la clase sea 'dark' y no 'dark-mode'
    preference: "system", // O 'light' o 'dark' según tu preferencia inicial
    fallback: "light",
  },

  runtimeConfig: {
    // Secret para el JWT del backoffice — sobrescribir con NUXT_JWT_SECRET en producción
    jwtSecret: "",
  },

  hub: {
    // SQLite local (LibSQL) en .data/db/sqlite.db para desarrollo/testing
    db: "sqlite",
  },
});
