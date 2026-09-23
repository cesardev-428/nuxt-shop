// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  //server
  /* devServer: {
    host: '0.0.0.0', // Permite conexiones desde cualquier IP
    port: 3000 // Puedes cambiar el puerto si lo deseas, el default es 3000
  }, */
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/supabase",
    "@nuxt/icon",
  ],

  colorMode: {
    classSuffix: "", // Esto asegura que la clase sea 'dark' y no 'dark-mode'
    preference: "system", // O 'light' o 'dark' según tu preferencia inicial
    fallback: "light",
  },

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    // Will be available in both server and client
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
});
