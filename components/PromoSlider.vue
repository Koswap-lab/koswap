<template>
  <section class="reveal-on-scroll py-12 overflow-hidden bg-bone">
    <div class="relative max-w-[1920px] mx-auto">
      
      <!-- Fade edges for premium look -->
      <div class="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-bone to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-bone to-transparent z-10 pointer-events-none"></div>

      <div class="flex overflow-x-auto no-scrollbar pb-6 px-6 md:px-16 snap-x snap-mandatory gap-4 md:gap-6 scroll-smooth" ref="slider">
          
          <!-- Promo Card 1 -->
          <div class="w-[85vw] sm:w-[300px] md:w-[400px] h-[160px] md:h-[200px] rounded-2xl md:rounded-3xl shrink-0 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow snap-start">
            <div class="absolute inset-0 bg-gradient-to-br from-rose-100 to-orange-100"></div>
            <div class="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="url(#paint0_linear)" fill-opacity="0.5"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#10B981"/>
                    <stop offset="1" stop-color="#34D399" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="relative z-10 p-6 md:p-8 flex flex-col h-full justify-center">
              <h3 class="font-display font-bold text-graphite text-xl md:text-2xl mb-2">Grow your Money with USDT</h3>
              <p class="font-sans text-xs md:text-sm text-slate mb-4">Earn up to 7% interest per year on your USDT</p>
              <button class="bg-rose-500 text-white font-sans font-semibold text-xs px-4 py-2 rounded-lg w-max hover:bg-rose-600 transition-colors">Try it Now</button>
            </div>
          </div>

          <!-- Promo Card 2 -->
          <div class="w-[85vw] sm:w-[300px] md:w-[400px] h-[160px] md:h-[200px] rounded-2xl md:rounded-3xl shrink-0 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow snap-start">
            <div class="absolute inset-0 bg-graphite"></div>
            <!-- Decorative geometric pattern -->
            <div class="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 group-hover:scale-105 transition-transform duration-500">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full text-white" fill="currentColor">
                <polygon points="0,100 100,0 100,100" />
              </svg>
            </div>
            <div class="relative z-10 p-6 md:p-8 flex items-center h-full">
              <div class="flex items-center gap-3 md:gap-4">
                <div class="font-display font-bold text-white text-2xl md:text-4xl tracking-tight">KO SWAP</div>
                <div class="w-px h-8 bg-white/20"></div>
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">T</div>
                  <span class="font-sans font-semibold text-white text-lg md:text-xl">tether</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Promo Card 3 -->
          <div class="w-[85vw] sm:w-[300px] md:w-[400px] h-[160px] md:h-[200px] rounded-2xl md:rounded-3xl shrink-0 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow snap-start">
            <div class="absolute inset-0 bg-gradient-to-br from-volt/90 to-volt-hover"></div>
            <!-- Floating coins simulation -->
            <div class="absolute top-4 right-10 w-8 h-8 rounded-full bg-yellow-400 shadow-lg group-hover:translate-y-[-10px] transition-transform duration-500"></div>
            <div class="absolute bottom-6 right-24 w-12 h-12 rounded-full bg-yellow-500 shadow-lg group-hover:translate-y-[-15px] transition-transform duration-700"></div>
            <div class="absolute top-1/2 right-4 w-6 h-6 rounded-full bg-yellow-300 shadow-lg group-hover:translate-y-[-5px] transition-transform duration-300"></div>
            
            <div class="relative z-10 p-6 md:p-8 flex flex-col h-full justify-center text-center">
              <h3 class="font-display font-bold text-white text-xl md:text-2xl mb-2 max-w-[200px] mx-auto leading-tight">Buy or Sell over 20 Cryptos with USDT</h3>
            </div>
          </div>

          <!-- Promo Card 4 -->
          <div class="w-[85vw] sm:w-[300px] md:w-[400px] h-[160px] md:h-[200px] rounded-2xl md:rounded-3xl shrink-0 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow snap-start">
            <div class="absolute inset-0 bg-[#141414]"></div>
            <div class="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-50 group-hover:scale-105 transition-transform duration-500">
               <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-volt">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="relative z-10 p-6 md:p-8 flex flex-col h-full justify-center">
              <p class="font-sans font-medium text-white/60 text-xs md:text-sm mb-1">New to crypto?</p>
              <h3 class="font-display font-bold text-volt text-xl md:text-2xl leading-tight">Check out the Crypto Beginners course</h3>
            </div>
          </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const slider = ref(null)
let intervalId = null

onMounted(() => {
  // Auto-scroll every 4 seconds
  intervalId = setInterval(() => {
    if (slider.value) {
      const maxScroll = slider.value.scrollWidth - slider.value.clientWidth
      
      // If we are at the end, scroll back to the start smoothly
      if (slider.value.scrollLeft >= maxScroll - 10) {
        slider.value.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        // Scroll forward by ~1 card width, CSS scroll-snap handles the perfect alignment
        slider.value.scrollBy({ left: 320, behavior: 'smooth' })
      }
    }
  }, 4000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
