<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'border-b'
        : 'bg-transparent'
    ]"
    :style="{
      height: navHeight,
      ...(isScrolled ? {
        background: 'rgba(250, 247, 242, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'rgba(28, 27, 25, 0.06)'
      } : {})
    }"
  >
    <div
      class="max-w-content mx-auto flex items-center justify-between h-full px-6 md:px-16"
    >
      <!-- Logo Image -->
      <a href="#" class="inline-block">
        <img src="/ko-swap-logo-transparent-background.png" alt="KO.SWAP Logo" class="h-8 md:h-10" />
      </a>

      <!-- CTA Button -->
      <a
        href="#waitlist"
        class="inline-flex items-center justify-center h-[36px] md:h-[44px] px-4 md:px-[24px] rounded-lg md:rounded-[12px] bg-volt text-white font-sans font-medium text-[13px] md:text-[14px] whitespace-nowrap transition-all duration-200 hover:bg-volt-hover hover:-translate-y-[1px] hover:shadow-btn-hover"
        style="letter-spacing: 0.01em;"
      >
        Join the waitlist
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobile = ref(false)

const navHeight = computed(() => isMobile.value ? '64px' : '80px')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>
