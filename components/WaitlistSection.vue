<template>
  <section id="waitlist" class="reveal-on-scroll py-20 md:py-32 px-6 max-w-content mx-auto overflow-hidden">
    <!-- Solid Volt Banner mimicking the Quidax CTA section -->
    <div class="max-w-[1440px] mx-auto bg-volt text-white relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-20 lg:py-24 rounded-[40px] overflow-hidden">
      
      <!-- Background Ambient Glow -->
      <div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent"></div>

      <!-- Left Column: Copy & App Badges -->
      <div class="lg:w-1/2 relative z-10 text-center lg:text-left mb-16 lg:mb-0">
        <h2 class="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6 leading-[1.1]">
          Crypto First. <span class="text-citrine">Built for more.</span>
        </h2>
        <p class="font-sans text-white/90 font-medium text-lg max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed">
          Join the waitlist today to get early access to frictionless crypto and Naira swaps. Zero fees for the first month.
        </p>

        <!-- App Store Badges -->
        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <button class="h-[52px] bg-graphite rounded-xl px-5 flex items-center gap-3 hover:bg-graphite/90 transition-transform hover:scale-105 active:scale-95 shadow-xl">
            <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.59-.8 2.05-.08 3.59.87 4.54 2.29-3.8 2.31-3.16 7.42.54 8.94-.85 2.13-2.29 3.51-3.75 1.74zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.41-3.74 4.25z"/>
            </svg>
            <div class="text-left">
              <div class="text-[11px] text-white/70 leading-none">Download on the</div>
              <div class="text-[15px] text-white font-medium leading-tight">App Store</div>
            </div>
          </button>
          
          <button class="h-[52px] bg-graphite rounded-xl px-5 flex items-center gap-3 hover:bg-graphite/90 transition-transform hover:scale-105 active:scale-95 shadow-xl">
            <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.341l-3.327-1.921c-.244-.141-.244-.373 0-.514l3.327-1.921L4.858 3.655c-.246-.142-.447-.026-.447.258v16.174c0 .284.201.4.447.258l12.665-7.314v2.31zM18.895 14.547l3.666-2.116c.586-.338.586-.889 0-1.228l-3.666-2.116-1.372.792v3.876l1.372.792z"/>
            </svg>
            <div class="text-left">
              <div class="text-[11px] text-white/70 leading-none">GET IT ON</div>
              <div class="text-[15px] text-white font-medium leading-tight">Google Play</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Right Column: Phone Mockup / Waitlist Form -->
      <div class="lg:w-[400px] relative z-10 w-full">
        <div class="bg-white p-8 rounded-[32px] shadow-2xl relative border border-white/20">
          <!-- Decorative Phone Header notch -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-bone rounded-b-2xl"></div>

          <div class="pt-6 text-center">
            <h3 class="font-sans font-bold text-graphite text-2xl mb-2">Join the waitlist</h3>
            <p class="font-sans text-slate text-sm mb-6">Enter your email to secure early access.</p>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
              <input
                v-model="email"
                type="email"
                required
                placeholder="you@example.com"
                class="w-full bg-bone font-sans font-normal text-graphite h-[56px] px-5 rounded-[16px] border border-graphite/10 text-base focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-all"
              />
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-graphite text-white font-sans font-medium h-[56px] rounded-[16px] text-base hover:bg-black hover:shadow-lg transition-all duration-200 disabled:opacity-50 mt-2"
              >
                <span v-if="!loading">Submit</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              </button>
            </form>
            <p v-if="message" :class="isSuccess ? 'text-emerald-600' : 'text-rose-600'" class="font-sans font-medium text-[13px] mt-4">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

const handleSubmit = async () => {
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
