// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'KO.SWAP - Fast, frictionless crypto & naira swaps',
      meta: [
        { name: 'description', content: 'KO SWAP is the effortless way to swap crypto and Naira in Nigeria. Join the waitlist for early access.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'KO.SWAP - Fast, frictionless crypto & naira swaps' },
        { property: 'og:description', content: 'KO SWAP is the effortless way to swap crypto and Naira in Nigeria. Join the waitlist for early access.' },
        { property: 'og:image', content: 'https://www.koswap.co/ko-swap-logo-transparent-background.png' },
        { property: 'og:url', content: 'https://www.koswap.co/' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/ko-swap-logo-transparent-background.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js'
  }
})
