<template>
  <Transition name="fade-scale">
    <button
      v-show="isVisible"
      class="group fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center border border-gold-500/30 bg-charcoal-950/80 text-gold-400 shadow-warm hover:shadow-gold hover:text-charcoal-900 hover:bg-gold-400 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
      aria-label="Cuộn lên đầu trang"
      @click="scrollToTop"
    >
      <Icon name="mdi:arrow-up" class="w-5 h-5 group-hover:animate-bounce" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
const isVisible = ref(false)

if (import.meta.client) {
  useEventListener(window, 'scroll', () => {
    isVisible.value = window.scrollY > 300
  })
}

function scrollToTop() {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}
</style>
