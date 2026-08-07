<template>
  <section class="reveal-on-scroll py-16 md:py-24 px-6 md:px-16 max-w-content mx-auto overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      
      <!-- Left: Image Card -->
      <div class="relative w-full max-w-[500px] mx-auto lg:mx-0 order-2 lg:order-1 flex justify-center">
        <img src="/whykoswap.png" alt="Swap UI" class="w-full max-w-sm rounded-[40px] shadow-[0_20px_60px_rgb(0,0,0,0.06)] hover:scale-[1.02] transition-transform duration-500" />
      </div>

      <!-- Right: Content -->
      <div class="order-1 lg:order-2 lg:pl-10">
        <h2 class="font-display font-bold text-graphite text-4xl md:text-5xl tracking-tight mb-4">
          Why KO SWAP?
        </h2>
        <p class="font-sans text-slate text-lg mb-12 max-w-lg leading-relaxed">
          Designed specifically for speed, reliability, and security without standard crypto obstacles.
        </p>

        <div class="space-y-8">
          <div v-for="(prop, idx) in props" :key="idx" class="flex gap-5 group cursor-default">
            <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-volt/10 flex items-center justify-center text-volt mt-1 transition-colors duration-300 group-hover:bg-volt group-hover:text-white">
              <component :is="prop.icon" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-sans font-bold text-graphite text-[17px] mb-1">{{ prop.title }}</h3>
              <p class="font-sans text-slate text-sm leading-relaxed max-w-sm">{{ prop.description }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

const ZapIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
])

const ShieldIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const RefreshIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-6 h-6' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' })
])

const props = [
  {
    icon: ZapIcon,
    title: 'Sub-minute settlement',
    description: 'Direct payout straight to your bank account or crypto wallet in seconds, not hours.'
  },
  {
    icon: ShieldIcon,
    title: 'Bank-grade security',
    description: 'End-to-end encrypted protocol ensuring safe transactions and zero fund lockups.'
  },
  {
    icon: RefreshIcon,
    title: 'Guaranteed exchange rate',
    description: 'The rate you see on your screen is the exact payout rate you receive. No slippage.'
  }
]
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>
