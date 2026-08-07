<template>
  <section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-bone">
    <!-- Animated Gradient Background Accent -->
    <div
      class="absolute top-0 right-0 w-[600px] h-[600px] blur-[120px] rounded-full pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3 transition-colors duration-1000"
      :class="currentSlideData.glowClass"
    ></div>

    <div class="max-w-content mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[600px]">
      
      <!-- Left Column: Copy & CTAs (Slider) -->
      <div class="lg:pr-8 relative z-10">
        <Transition name="slide-up" mode="out-in">
          <div :key="currentSlide" class="w-full">
            <p class="font-sans font-semibold text-slate uppercase tracking-[0.12em] text-xs md:text-sm mb-4">
              {{ currentSlideData.kicker }}
            </p>

            <h1 class="font-display font-bold text-graphite text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.1] tracking-tight mb-6">
              {{ currentSlideData.titleL1 }} <br />
              <span :class="currentSlideData.accentClass">{{ currentSlideData.titleL2 }}</span>
            </h1>

            <p class="font-sans font-normal text-slate text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              {{ currentSlideData.subcopy }}
            </p>
          </div>
        </Transition>

        <!-- Action Form -->
        <div class="w-full max-w-md mb-8">
          <form @submit.prevent="handleQuickSubmit" class="flex flex-row items-center gap-2 w-full bg-white p-1.5 rounded-[18px] border border-graphite/20 shadow-sm">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
              class="flex-1 bg-transparent font-sans font-normal text-graphite h-[48px] px-3 md:px-4 text-sm md:text-base focus:outline-none min-w-0"
            />
            <button
              type="submit"
              :disabled="loading"
              class="bg-volt text-white font-sans font-medium whitespace-nowrap transition-all duration-200 disabled:opacity-50 h-[48px] px-5 md:px-7 rounded-[14px] text-sm md:text-base hover:bg-volt-hover hover:-translate-y-[1px] hover:shadow-btn-hover"
            >
              <span v-if="!loading">Join waitlist</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wait...
              </span>
            </button>
          </form>
          <p v-if="message" :class="isSuccess ? 'text-emerald-700' : 'text-rose-600'" class="font-sans font-medium text-[13px] mt-3">
            {{ message }}
          </p>
        </div>

        <!-- App Store Badges (Static) -->
        <div class="flex items-center gap-4">
          <button class="h-[48px] bg-graphite rounded-xl px-4 flex items-center gap-2 hover:bg-graphite/90 transition-colors">
            <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.59-.8 2.05-.08 3.59.87 4.54 2.29-3.8 2.31-3.16 7.42.54 8.94-.85 2.13-2.29 3.51-3.75 1.74zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.41-3.74 4.25z"/>
            </svg>
            <div class="text-left">
              <div class="text-[10px] text-white/70 leading-none">Download on the</div>
              <div class="text-sm text-white font-medium leading-tight">App Store</div>
            </div>
          </button>
          
          <button class="h-[48px] bg-graphite rounded-xl px-4 flex items-center gap-2 hover:bg-graphite/90 transition-colors">
            <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.341l-3.327-1.921c-.244-.141-.244-.373 0-.514l3.327-1.921L4.858 3.655c-.246-.142-.447-.026-.447.258v16.174c0 .284.201.4.447.258l12.665-7.314v2.31zM18.895 14.547l3.666-2.116c.586-.338.586-.889 0-1.228l-3.666-2.116-1.372.792v3.876l1.372.792z"/>
            </svg>
            <div class="text-left">
              <div class="text-[10px] text-white/70 leading-none">GET IT ON</div>
              <div class="text-sm text-white font-medium leading-tight">Google Play</div>
            </div>
          </button>
        </div>
        
        <!-- Slider Dots -->
        <div class="flex justify-center lg:justify-start gap-2 mt-12">
          <button
            v-for="(_, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-volt scale-125' : 'bg-graphite/20 hover:bg-graphite/40'"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>

      <!-- Right Column: Animated Phone Mockup -->
      <div class="relative flex justify-center lg:justify-end">
        <div class="relative w-full max-w-[500px] transition-transform duration-1000 animate-float" style="z-index: 1;">
          <img src="~/assets/quidax_hero.png" alt="Crypto Swap Interface" class="w-full h-auto drop-shadow-2xl" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const email = ref('')
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

const currentSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | null = null

const slides = [
  {
    kicker: 'Built for how crypto actually moves.',
    titleL1: 'Swap digital assets',
    titleL2: 'with ease.',
    subcopy: 'The fastest way to swap between crypto and Naira directly to your bank account. No P2P headaches. No middleman delays.',
    accentClass: 'text-volt',
    glowClass: 'bg-volt/10'
  },
  {
    kicker: 'Bank-Grade Security',
    titleL1: 'Your keys, your control.',
    titleL2: 'Zero lockups.',
    subcopy: 'End-to-end encrypted protocol ensuring safe transactions. We never hold your funds longer than it takes to settle the swap.',
    accentClass: 'text-graphite',
    glowClass: 'bg-graphite/10'
  },
  {
    kicker: 'Transparent Pricing',
    titleL1: 'Guaranteed exchange rates.',
    titleL2: 'Zero hidden fees.',
    subcopy: 'The rate you see on your screen is the exact payout rate you receive. No slippage. Join the waitlist for 0% fees during our first month.',
    accentClass: 'text-[rgba(255,201,74,1)]', // Citrine
    glowClass: 'bg-[rgba(255,201,74,0.1)]'
  }
]

const currentSlideData = computed(() => slides[currentSlide.value])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
  resetTimer()
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetTimer()
}

const resetTimer = () => {
  if (slideTimer) clearInterval(slideTimer)
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
}

onMounted(() => {
  resetTimer()
})

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer)
})

const handleQuickSubmit = async () => {
  if (!email.value) return
  loading.value = true
  message.value = ''

  try {
    const res = await $fetch<{ success: boolean; message: string; duplicate?: boolean }>('/api/waitlist', {
      method: 'POST',
      body: { email: email.value }
    })

    isSuccess.value = true
    message.value = res.message
    if (!res.duplicate) {
      email.value = ''
    }
  } catch (err: any) {
    isSuccess.value = false
    message.value = err?.data?.statusMessage || 'An unexpected error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Slider Transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Floating animation for the phone mockup */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
