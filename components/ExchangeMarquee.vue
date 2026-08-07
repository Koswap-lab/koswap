<template>
  <section class="reveal-on-scroll py-16 md:py-24 px-6 md:px-16 max-w-content mx-auto">
    <div class="mb-8">
      <h2 class="font-display font-bold text-graphite text-2xl md:text-3xl tracking-tight mb-6 flex items-center">
        <img src="/icon.png" alt="KO Icon" class="h-8 mr-3" />
        What's the market saying?
      </h2>
      
      <!-- Quidax-style Tabs & Search -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-6 font-sans font-bold text-[15px]">
          <button 
            @click="activeTab = 'spot'"
            class="pb-2 border-b-2 transition-colors"
            :class="activeTab === 'spot' ? 'border-volt text-graphite' : 'border-transparent text-slate hover:text-graphite'"
          >
            Spot
          </button>
          <button 
            @click="activeTab = 'new'"
            class="pb-2 border-b-2 transition-colors"
            :class="activeTab === 'new' ? 'border-volt text-graphite' : 'border-transparent text-slate hover:text-graphite'"
          >
            Newly listed
          </button>
          <button 
            @click="activeTab = 'gainers'"
            class="pb-2 border-b-2 transition-colors"
            :class="activeTab === 'gainers' ? 'border-volt text-graphite' : 'border-transparent text-slate hover:text-graphite'"
          >
            Top Gainers
          </button>
        </div>
        
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search for crypto" 
            class="w-full md:w-64 h-10 pl-4 pr-10 bg-[#F9F9F9] border border-transparent rounded-lg text-sm font-sans focus:outline-none focus:border-volt focus:bg-white transition-colors"
          />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Quidax-style Table -->
    <div class="bg-white rounded-2xl border border-graphite/10 overflow-hidden overflow-x-auto">
      <table class="w-full text-left font-sans whitespace-nowrap min-w-[800px]">
        <thead>
          <tr class="bg-[#F9F9F9] text-[11px] text-graphite font-bold uppercase tracking-widest border-b border-graphite/10">
            <th class="py-5 px-8">NAME</th>
            <th class="py-5 px-8">COIN PAIR</th>
            <th class="py-5 px-8">LAST PRICE</th>
            <th class="py-5 px-8">24H CHANGE</th>
            <th class="py-5 px-8 text-right">TRADE</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-graphite/5 text-[15px]">
          <tr v-for="asset in displayedData" :key="asset.symbol" class="hover:bg-bone/30 transition-colors group">
            
            <!-- Name & Icon -->
            <td class="py-4 px-8">
              <div class="flex items-center gap-4">
                <div class="w-8 h-8 flex items-center justify-center">
                  <div v-html="asset.icon" class="w-full h-full"></div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-graphite">{{ asset.symbol }}</span>
                  <span class="text-slate text-[13px]">{{ asset.name }}</span>
                </div>
              </div>
            </td>
            
            <!-- Coin Pair -->
            <td class="py-4 px-8 text-slate text-sm">
              / USDT
            </td>
            
            <!-- Last Price (Live USD) -->
            <td class="py-4 px-8 font-medium text-graphite relative">
              <span class="text-slate/60 text-[13px] mr-1">USDT</span>
              <span 
                :class="{
                  'text-emerald-500': asset.flashStatus === 'up',
                  'text-rose-500': asset.flashStatus === 'down'
                }"
                class="transition-colors duration-300"
              >
                {{ formatUSD(asset.price) }}
              </span>
            </td>
            
            <!-- 24h Change -->
            <td class="py-4 px-8">
              <div :class="[
                'inline-flex items-center gap-1.5 font-bold transition-colors duration-300',
                asset.isPositive ? 'text-emerald-500' : 'text-rose-500'
              ]">
                <svg v-if="asset.isPositive" class="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 4l8 12H4z" />
                </svg>
                <svg v-else class="w-2.5 h-2.5 fill-current rotate-180" viewBox="0 0 24 24">
                  <path d="M12 4l8 12H4z" />
                </svg>
                {{ asset.isPositive ? '+' : '' }}{{ asset.change.toFixed(2) }}%
              </div>
            </td>
            
            <!-- Trade Action -->
            <td class="py-4 px-8 text-right">
              <button class="bg-volt text-white hover:bg-volt-hover transition-colors px-6 py-2 rounded-full font-bold text-[13px]">
                Buy
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="py-5 text-center border-t border-graphite/10">
        <a href="#" class="font-sans font-bold text-volt hover:text-volt-hover text-[15px] transition-colors">
          See more markets
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const activeTab = ref('spot')

const formatUSD = (price: number) => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(price)
}

const btcIcon = `<svg viewBox="0 0 24 24" fill="#F7931A"><circle cx="12" cy="12" r="12" fill="#F7931A"/><path fill="#FFF" d="M16.66 10.56c.23-1.53-1.02-2.35-2.73-2.93l.56-2.24-1.36-.34-.54 2.18c-.36-.09-.72-.18-1.09-.27l.55-2.19-1.36-.34-.56 2.26c-.3-.07-.59-.14-.87-.21l-.01-.04-1.88-.47-.36 1.45s1.01.25 1 .25c.56.14.66.5.64.79l-1.31 5.25c-.06.14-.2.35-.61.25.01.01-1.01-.25-1.01-.25l-.69 1.6 1.77.44c.33.08.66.17.98.26l-.56 2.27 1.36.34.56-2.26c.37.1.73.19 1.09.28l-.56 2.24 1.36.34.57-2.29c2.31.44 4.05.26 4.75-1.84.57-1.69-.07-2.67-1.25-3.3 1.15-.4 1.78-1.4 1.55-2.8zm-2.8 4.02c-.38 1.55-2.95.75-3.78.54l.67-2.71c.83.21 3.51.55 3.11 2.17zm.33-3.87c-.35 1.4-2.52.69-3.23.51l.61-2.45c.71.18 2.99.47 2.62 1.94z"/></svg>`
const ethIcon = `<svg viewBox="0 0 24 24" fill="#627EEA"><circle cx="12" cy="12" r="12" fill="#627EEA"/><path fill="#FFF" d="M11.96 4.2L7.33 11.9l4.63 2.74 4.63-2.74L11.96 4.2zm0 9.87l-4.63-2.74L11.96 17l4.63-5.67-4.63 2.74z"/></svg>`
const solIcon = `<svg viewBox="0 0 24 24" fill="#14F195"><circle cx="12" cy="12" r="12" fill="#000"/><path fill="#14F195" d="M5.5 16h10l3-3H8.5l-3 3zm3-7h10l3-3H8.5l-3 3zm-3 4h10l3-3H5.5l-3 3z"/></svg>`
const ltcIcon = `<svg viewBox="0 0 24 24" fill="#345D9D"><circle cx="12" cy="12" r="12" fill="#345D9D"/><path fill="#FFF" d="M10.2 16.2l1.2-4.6-1.1-.3.4-1.4 1.1.3.8-3.3h2.8l-.8 3.1 1.5.4-.4 1.4-1.5-.4-1.1 4.2h3.8l-.8 3.1H10.2z"/></svg>`
const usdtIcon = `<svg viewBox="0 0 24 24" fill="#26A17B"><circle cx="12" cy="12" r="12" fill="#26A17B"/><path fill="#FFF" d="M13.8 9.3V7.2h3.5V5.5H6.7v1.7h3.5v2.1c-2.4.2-4.1 1.1-4.1 2.2 0 1.1 1.7 2 4.1 2.2v4.8h3.6v-4.8c2.4-.2 4.1-1.1 4.1-2.2 0-1.1-1.7-2-4.1-2.2zm-1.8 3.3c-2.1 0-3.6-.6-3.6-1.1s1.5-1.1 3.6-1.1 3.6.6 3.6 1.1-1.5 1.1-3.6 1.1z"/></svg>`
const bnbIcon = `<svg viewBox="0 0 24 24" fill="#F3BA2F"><circle cx="12" cy="12" r="12" fill="#F3BA2F"/><path fill="#FFF" d="M8.2 11.2l3.8-3.8 3.8 3.8 2.1-2.1-5.9-5.9-5.9 5.9 2.1 2.1zm7.6 1.6l-3.8 3.8-3.8-3.8-2.1 2.1 5.9 5.9 5.9-5.9-2.1-2.1zm-3.8-2l-1.9 1.9 1.9 1.9 1.9-1.9-1.9-1.9z"/></svg>`

// Simulated master data
const allData = ref([
  { id: 'sol', name: 'Solana', symbol: 'SOL', price: 72.77, change: -0.61, isPositive: false, flashStatus: 'none', icon: solIcon, listedDate: '2020-03-01' },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', price: 44.10, change: -1.54, isPositive: false, flashStatus: 'none', icon: ltcIcon, listedDate: '2011-10-07' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 1848.51, change: -1.14, isPositive: false, flashStatus: 'none', icon: ethIcon, listedDate: '2015-07-30' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 34214.78, change: 2.35, isPositive: true, flashStatus: 'none', icon: btcIcon, listedDate: '2009-01-03' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', price: 1.00, change: 0.01, isPositive: true, flashStatus: 'none', icon: usdtIcon, listedDate: '2014-11-26' },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', price: 215.30, change: 5.12, isPositive: true, flashStatus: 'none', icon: bnbIcon, listedDate: '2017-07-25' },
])

// Computed properties for tabs
const displayedData = computed(() => {
  if (activeTab.value === 'gainers') {
    return [...allData.value].sort((a, b) => b.change - a.change).slice(0, 4)
  }
  if (activeTab.value === 'new') {
    // Just sort by an arbitrary parameter or mock reverse for "newly listed" effect
    return [...allData.value].reverse().slice(0, 4)
  }
  // Spot
  return [...allData.value].slice(0, 4)
})

let intervalTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalTimer = setInterval(() => {
    const numToUpdate = Math.floor(Math.random() * 2) + 1
    for (let i = 0; i < numToUpdate; i++) {
      const idx = Math.floor(Math.random() * allData.value.length)
      const asset = allData.value[idx]
      const fluctuationPercent = (Math.random() - 0.5) / 100
      const oldPrice = asset.price
      const newPrice = oldPrice * (1 + fluctuationPercent)
      
      asset.price = newPrice
      const priceDiff = newPrice - oldPrice
      
      if (priceDiff > 0) {
        asset.flashStatus = 'up'
        asset.change += 0.01
      } else if (priceDiff < 0) {
        asset.flashStatus = 'down'
        asset.change -= 0.01
      }
      
      asset.isPositive = asset.change >= 0

      setTimeout(() => {
        if (allData.value[idx]) {
          allData.value[idx].flashStatus = 'none'
        }
      }, 1000)
    }
  }, 2500)
})

onUnmounted(() => {
  if (intervalTimer) clearInterval(intervalTimer)
})
</script>
