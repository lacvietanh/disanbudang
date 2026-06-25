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
            class="w-full h-full object-cover"
            :class="{ 'ken-burns-active': currentSlide === i }"
          />
        </div>
      </TransitionGroup>
    </div>

    <!-- Cinematic Overlay -->
    <div class="absolute inset-0 z-10 overlay-hero" />
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />

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

    <!-- Slide Caption Overlay -->
    <Transition name="caption-fade">
      <div
        :key="currentSlide"
        class="absolute bottom-8 left-8 z-20 max-w-md pointer-events-none"
      >
        <p class="text-gold-400 text-[10px] uppercase tracking-[0.25em] font-semibold mb-1.5">{{ slides[currentSlide]?.label }}</p>
        <p class="text-ivory/70 text-sm leading-relaxed">{{ slides[currentSlide]?.caption }}</p>
      </div>
    </Transition>

    <!-- Main Content -->
    <div class="relative z-20 flex-1 flex flex-col justify-end pb-20 md:pb-24 pt-28 lg:pt-32 env-safe-bottom">
      <div class="container-heritage">
        <div class="max-w-4xl">
          <!-- Eyebrow -->
          <div class="flex items-center gap-3 mb-4 md:mb-6 animate-fade-up" style="animation-delay: 0.1s">
            <span class="w-8 h-px bg-gold-400" />
            <span class="eyebrow text-gold-400 text-[10px] md:text-xs">Xã Bù Đăng Thành Phố Đồng Nai (Tỉnh Bình Phước cũ)</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-display text-ivory text-shadow-hero mb-4 animate-fade-up" style="animation-delay: 0.25s">
            Bảo Tàng Số
            <span class="block text-gradient-gold">Di Sản Bù Đăng</span>
          </h1>

          <!-- Tagline -->
          <p
            class="text-cinematic text-ivory/80 mb-5 md:mb-6 animate-fade-up max-w-2xl text-lg md:text-2xl"
            style="animation-delay: 0.4s"
          >
            "Linh hồn đại ngàn, tiếng vang lịch sử và bản sắc ngàn đời"
          </p>

          <p class="text-charcoal-300 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl animate-fade-up" style="animation-delay: 0.5s">
            Không gian lưu trữ di sản văn hóa, thiên nhiên kỳ vĩ và những câu chuyện lịch sử hào hùng của mảnh đất Bù Đăng.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-3 mb-12 md:mb-16 animate-fade-up" style="animation-delay: 0.65s">
            <NuxtLink to="/map" class="btn-primary text-sm px-6 py-3.5 flex-1 sm:flex-initial justify-center">
              <Icon name="mdi:map-outline" class="w-5 h-5" />
              Bản Đồ Di Sản
            </NuxtLink>
            <NuxtLink to="/gallery" class="btn-secondary text-sm px-6 py-3.5 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 flex-1 sm:flex-initial justify-center">
              <Icon name="mdi:image-multiple-outline" class="w-5 h-5" />
              Triển Lãm Số
            </NuxtLink>
            <NuxtLink to="/library" class="btn-ghost text-sm px-6 py-3.5 flex-1 sm:flex-initial justify-center">
              <Icon name="mdi:book-open-outline" class="w-5 h-5" />
              Thư Viện
            </NuxtLink>
          </div>

          <!-- Floating Stats -->
          <div
            class="flex flex-wrap gap-3 animate-fade-up"
            style="animation-delay: 0.8s"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="glass-dark rounded-xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-3 border border-gold-500/20 hover:border-gold-500/50 transition-colors duration-300 flex-1 min-w-[140px]"
            >
              <Icon :name="stat.icon" class="w-5 h-5 text-gold-400 flex-shrink-0" />
              <div>
                <p class="font-heading font-bold text-ivory text-base md:text-xl leading-none">
                  {{ stat.value }}{{ stat.suffix }}
                </p>
                <p class="text-charcoal-400 text-[10px] md:text-xs mt-0.5 whitespace-nowrap">{{ stat.label }}</p>
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
        :aria-label="`Xem slide thứ ${i + 1}`"
        @click="currentSlide = i"
      />
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <span class="eyebrow text-ivory/40 text-[9px]">Cuộn xuống</span>
      <div class="w-5 h-8 border border-ivory/30 rounded-full flex justify-center pt-1.5">
        <div class="w-1 h-2 bg-gold-400 rounded-full animate-bounce" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const slides = [
  {
    image: '/images/heritage/Bombo/TAN08220.jpg',
    alt: 'Sóc Bom Bo',
    label: 'SÓC BOM BO',
    caption: 'Nhịp chày giã gạo vang vọng đại ngàn',
  },
  {
    image: '/images/heritage/Img%20disanbudang/Khu%20Bao%20Ton%202.jpg',
    alt: 'Rừng nguyên sinh Bù Đăng',
    label: 'RỪNG NGUYÊN SINH BÙ ĐĂNG',
    caption: 'Kho báu đa dạng sinh học của Đông Nam Bộ',
  },
  {
    image: '/images/heritage/Img%20disanbudang/Nha%20Dai%20Truyen%20Thong.png',
    alt: 'Nhà dài truyền thống S\'tiêng',
    label: 'NHÀ DÀI TRUYỀN THỐNG',
    caption: 'Kiến trúc cộng đồng độc đáo trên cao nguyên',
  },
  {
    image: '/images/heritage/Img%20disanbudang/le%20hoi%20mung%20lua%20moi.png',
    alt: 'Lễ hội mừng lúa mới M\'nông',
    label: 'LỄ HỘI MỪNG LÚA MỚI',
    caption: 'Lời tạ ơn của đất trời và mùa vàng bội thu',
  },
  {
    image: '/images/heritage/Img%20disanbudang/thac-mo-dong-nai.png',
    alt: 'Thác Mơ Bù Đăng',
    label: 'THÁC MƠ BÙ ĐĂNG',
    caption: 'Viên ngọc xanh giữa đại ngàn Đông Nam Bộ',
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
  { icon: 'mdi:castle', value: '11', suffix: '', label: 'Di sản số hóa' },
  { icon: 'mdi:book-open-variant', value: '6', suffix: '', label: 'Ký ức cộng đồng' },
  { icon: 'mdi:headphones', value: '4', suffix: '', label: 'Audio guide' },
  { icon: 'mdi:school-outline', value: '5', suffix: '+', label: 'Trường học tham gia' },
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

.caption-fade-enter-active {
  transition: opacity 0.8s ease 0.3s;
}
.caption-fade-leave-active {
  transition: opacity 0.3s ease;
}
.caption-fade-enter-from,
.caption-fade-leave-to {
  opacity: 0;
}

.ken-burns-active {
  animation: kenburns 12s ease-out forwards;
}

@keyframes kenburns {
  0% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
</style>
