// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.css', // Import Bootstrap CSS
  ],
  modules: ['nuxt-icon'],
  build: {
    transpile: ['bootstrap'],
  },
})
