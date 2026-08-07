<template>
  <div class="min-h-screen bg-bone text-graphite font-sans antialiased flex flex-col selection:bg-citrine selection:text-graphite">
    <Navbar />
    
    <main class="flex-grow">
      <Hero />
      <MarketMarquee />
      <PromoSlider />
      <ExchangeMarquee />
      <HowItWorks />
      <WhyKoSwap />
      <WaitlistSection />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        obs.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  })

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el)
  })
})
</script>
