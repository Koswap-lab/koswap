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
        { name: 'description', content: 'KO.SWAP is the effortless way to swap crypto and Naira in Nigeria. Join the waitlist for early access.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // Open Graph
        { property: 'og:title', content: 'KO.SWAP - Fast, frictionless crypto & naira swaps' },
        { property: 'og:description', content: 'KO.SWAP is the effortless way to swap crypto and Naira in Nigeria. Join the waitlist for early access.' },
        { property: 'og:image', content: 'https://www.koswap.co/ko-swap-logo-black-background.jpg' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'KO.SWAP Logo' },
        { property: 'og:url', content: 'https://www.koswap.co/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'KO.SWAP' },

        // Twitter / X Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'KO.SWAP - Fast, frictionless crypto & naira swaps' },
        { name: 'twitter:description', content: 'KO.SWAP is the effortless way to swap crypto and Naira in Nigeria. Join the waitlist for early access.' },
        { name: 'twitter:image', content: 'https://www.koswap.co/ko-swap-logo-black-background.jpg' }
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