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
            :class="currentSlide === i ? 'ken-burns-active' : 'ken-burns-paused'"
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
        class="absolute bottom-24 lg:bottom-12 left-6 lg:left-8 z-20 max-w-md pointer-events-none"
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
            <span class="eyebrow text-gold-400 text-[10px] md:text-xs">Bảo Tàng Số — Thành Phố Đồng Nai · Khởi Đầu Từ Vùng Đất Bù Đăng</span>
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
            "Bù Đăng — Linh hồn đại ngàn trong lòng Thành Phố Đồng Nai"
          </p>

          <p class="text-charcoal-300 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl animate-fade-up" style="animation-delay: 0.5s">
            Không gian số bảo tồn di sản văn hóa, thiên nhiên kỳ vĩ và lịch sử hào hùng của vùng đất Bù Đăng. Mô hình thí điểm định hướng nhân rộng ra toàn bộ Thành Phố Đồng Nai — thành phố trực thuộc Trung ương thứ 7 của Việt Nam.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-3 mb-12 md:mb-16 animate-fade-up" style="animation-delay: 0.65s">
            <NuxtLink to="/map" class="btn-primary text-sm px-6 py-3.5 flex-1 sm:flex-initial justify-center">
              <Icon name="mdi:map-outline" class="w-5 h-5" />
              Bản Đồ Di Sản
            </NuxtLink>
            <NuxtLink to="/study" class="btn-secondary text-sm px-6 py-3.5 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 flex-1 sm:flex-initial justify-center">
              <Icon name="mdi:school-outline" class="w-5 h-5" />
              Góc Học Tập
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
              class="glass-dark rounded-xl px-4 py-3 md:px-5 md:py-3.5 flex items-start gap-3 border border-gold-500/20 hover:border-gold-500/50 hover:shadow-lg hover:shadow-gold-500/15 hover:-translate-y-0.5 transition-all duration-300 flex-1 min-w-[155px] cursor-default"
            >
              <Icon :name="stat.icon" class="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <div class="min-w-0 flex-1">
                <p class="font-heading font-bold text-ivory text-base md:text-xl leading-tight">
                  {{ stat.value }}{{ stat.suffix }}
                </p>
                <p class="text-charcoal-400 text-[10px] md:text-xs mt-1 leading-snug break-words">{{ stat.label }}</p>
              </div>
            </div>
            <!-- Location badge – separate from numeric stats -->
            <div class="glass-dark rounded-xl px-4 py-3 md:px-5 md:py-3.5 flex items-center gap-2.5 border border-forest-500/30 hover:border-forest-500/60 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
              <Icon name="mdi:city" class="w-5 h-5 text-forest-400 flex-shrink-0" />
              <div>
                <p class="font-heading font-bold text-ivory text-xs md:text-sm leading-tight">Thành Phố Đồng Nai</p>
                <p class="text-charcoal-400 text-[10px] mt-0.5">Thành phố trực thuộc TW thứ 7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide indicators -->
    <div class="absolute bottom-24 lg:bottom-12 right-6 lg:right-8 z-20 flex gap-2">
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
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <span class="eyebrow text-ivory/40 text-[9px]">Cuộn xuống</span>
      <div class="w-5 h-8 border border-ivory/30 rounded-full flex justify-center pt-1.5">
        <div class="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" />
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
    image: '/images/heritage/img-disanbudang/Khu-Bao-Ton-2.jpg',
    alt: 'Rừng nguyên sinh Bù Đăng',
    label: 'RỪNG NGUYÊN SINH BÙ ĐĂNG',
    caption: 'Kho báu đa dạng sinh học của Đông Nam Bộ',
  },
  {
    image: '/images/heritage/img-disanbudang/Nha-Dai-Truyen-Thong.png',
    alt: 'Nhà dài truyền thống S\'tiêng',
    label: 'NHÀ DÀI TRUYỀN THỐNG',
    caption: 'Kiến trúc cộng đồng độc đáo trên cao nguyên',
  },
  {
    image: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    alt: 'Lễ hội mừng lúa mới M\'nông',
    label: 'LỄ HỘI MỪNG LÚA MỚI',
    caption: 'Lời tạ ơn của đất trời và mùa vàng bội thu',
  },
  {
    image: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png',
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
  animation: kenburns 18s ease-out infinite alternate;
}

.ken-burns-paused {
  animation: none;
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
