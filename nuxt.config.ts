// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Auto-import components
  components: true,
  css: ["~/assets/styles/fontface.css", "~/assets/styles/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss", 'nuxt-icon', '@pinia/nuxt']
})