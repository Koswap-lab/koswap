<template>
  <div class="reveal-on-scroll w-full bg-graphite border-y border-white/10 overflow-hidden py-3">
    <div class="flex whitespace-nowrap animate-marquee">
      <!-- Duplicate the content multiple times to ensure seamless infinite scroll -->
      <div v-for="i in 4" :key="i" class="flex items-center">
        <div 
          v-for="(rate, index) in rates" 
          :key="`${i}-${index}`"
          class="flex items-center gap-3 px-8 font-mono text-sm border-r border-white/10 last:border-r-0"
        >
          <span class="text-white/60 uppercase tracking-widest">{{ rate.pair }}</span>
          <span class="text-white font-medium">{{ rate.price }}</span>
          <span 
            class="font-semibold flex items-center gap-1"
            :class="rate.isUp ? 'text-emerald-400' : 'text-rose-400'"
          >
            <svg v-if="rate.isUp" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {{ rate.change }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rates = [
  { pair: 'BTC/USD', price: '$88,420.00', change: '+2.41', isUp: true },
  { pair: 'ETH/USD', price: '$3,240.50', change: '+1.82', isUp: true },
  { pair: 'USDT/USD', price: '$1.00', change: '-0.01', isUp: false },
  { pair: 'SOL/USD', price: '$182.75', change: '+4.20', isUp: true },
  { pair: 'BNB/USD', price: '$563.40', change: '-0.50', isUp: false },
  { pair: 'USDC/USD', price: '$1.00', change: '+0.01', isUp: true }
]
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
  /* Will-change helps with smooth scrolling performance */
  will-change: transform;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
