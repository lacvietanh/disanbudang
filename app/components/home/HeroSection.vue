<template>
  <section class="relative min-h-screen flex flex-col overflow-hidden" aria-label="Hero section">
    <!-- Background Images Slideshow -->
    <div class="absolute inset-0 z-0">
      <TransitionGroup name="hero-slide">
        <div
          v-for="(slide, i) in slides"
          v-show="currentSlide === i"
          :key="i"
          class="absolute inset-0"
        >
          <img
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-cover scale-[1.08] transition-transform duration-[12000ms] ease-out"
            :class="{ 'scale-100': currentSlide === i }"
          />
        </div>
      </TransitionGroup>
    </div>

    <!-- Cinematic Overlay -->
    <div class="absolute inset-0 z-10 overlay-hero" />
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-transparent" />

    <!-- Atmospheric particles -->
    <div class="absolute inset-0 z-10 pointer-events-none">
      <div
        v-for="n in 8"
        :key="n"
        class="absolute w-1 h-1 rounded-full bg-gold-400/40 animate-float"
        :style="{
          left: `${10 + n * 11}%`,
          top: `${20 + (n % 4) * 15}%`,
          animationDelay: `${n * 0.7}s`,
          animationDuration: `${5 + n}s`,
        }"
      />
    </div>

    <!-- Main Content -->
    <div class="relative z-20 flex-1 flex flex-col justify-end pb-20 md:pb-24">
      <div class="container-heritage">
        <div class="max-w-4xl">
          <!-- Eyebrow -->
          <div class="flex items-center gap-3 mb-6 animate-fade-up" style="animation-delay: 0.1s">
            <span class="w-8 h-px bg-gold-400" />
            <span class="eyebrow text-gold-400">Xã Bù Đăng Thành Phố Đồng Nai (Tỉnh Bình Phước cũ)</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-display text-ivory text-shadow-hero mb-4 animate-fade-up" style="animation-delay: 0.25s">
            Di Sản
            <span class="block text-gradient-gold">Bù Đăng</span>
          </h1>

          <!-- Tagline -->
          <p
            class="text-cinematic text-ivory/80 mb-6 animate-fade-up max-w-2xl"
            style="animation-delay: 0.4s"
          >
            "Những câu chuyện còn sống giữa đại ngàn Bù Đăng"
          </p>

          <p class="text-charcoal-300 text-lg leading-relaxed mb-10 max-w-xl animate-fade-up" style="animation-delay: 0.5s">
            Hành trình khám phá di sản văn hóa, lịch sử và thiên nhiên của vùng đất hào hùng,
            nơi lưu giữ ký ức của hàng nghìn con người và nhiều thế hệ.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4 mb-16 animate-fade-up" style="animation-delay: 0.65s">
            <NuxtLink to="/library" class="btn-primary text-base px-8 py-4">
              <Icon name="mdi:compass-outline" class="w-5 h-5" />
              Khám Phá Di Sản
            </NuxtLink>
            <NuxtLink to="/map" class="btn-ghost text-base px-8 py-4">
              <Icon name="mdi:map-outline" class="w-5 h-5" />
              Bản Đồ Tương Tác
            </NuxtLink>
          </div>

          <!-- Floating Stats -->
          <div
            class="flex flex-wrap gap-4 animate-fade-up"
            style="animation-delay: 0.8s"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="glass-dark rounded-xl px-5 py-3 flex items-center gap-3 border border-gold-500/20 hover:border-gold-500/50 transition-colors duration-300"
            >
              <Icon :name="stat.icon" class="w-5 h-5 text-gold-400 flex-shrink-0" />
              <div>
                <p class="font-heading font-bold text-ivory text-xl leading-none">
                  {{ stat.value }}{{ stat.suffix }}
                </p>
                <p class="text-charcoal-400 text-xs mt-0.5">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide indicators -->
    <div class="absolute bottom-8 right-8 z-20 flex gap-2">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="h-1 rounded-full transition-all duration-500"
        :class="currentSlide === i ? 'w-8 bg-gold-400' : 'w-3 bg-ivory/30 hover:bg-ivory/50'"
        @click="currentSlide = i"
      />
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <span class="eyebrow text-ivory/40 text-2xs">Cuộn xuống</span>
      <div class="w-5 h-8 border border-ivory/30 rounded-full flex justify-center pt-1.5">
        <div class="w-1 h-2 bg-gold-400 rounded-full animate-bounce" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1920&q=90',
    alt: 'Rừng Chiến Khu Đ hùng vĩ',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90',
    alt: 'Thác Mơ Bù Đăng',
  },
  {
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=90',
    alt: 'Rừng nguyên sinh Bù Đăng',
  },
]

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval>

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6000)
})

onUnmounted(() => clearInterval(slideInterval))

const stats = [
  { icon: 'mdi:castle', value: '8', suffix: '+', label: 'Di sản' },
  { icon: 'mdi:book-open-variant', value: '50', suffix: '+', label: 'Câu chuyện' },
  { icon: 'mdi:headphones', value: '12', suffix: '', label: 'Audio guide' },
  { icon: 'mdi:account-school', value: '2.000', suffix: '+', label: 'Học sinh' },
]
</script>

<style scoped>
.hero-slide-enter-active {
  transition: opacity 1.5s ease;
}
.hero-slide-leave-active {
  transition: opacity 1.5s ease;
}
.hero-slide-enter-from,
.hero-slide-leave-to {
  opacity: 0;
}
</style>
