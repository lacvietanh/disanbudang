<template>
  <section class="hero-root relative min-h-screen flex flex-col overflow-hidden" aria-label="Hero section">

    <!-- ═══ BACKGROUND SLIDESHOW ═══ -->
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
            :class="currentSlide === i ? 'ken-burns-active' : ''"
            :style="slide.position ? `object-position: ${slide.position}` : ''"
            :loading="i === 0 ? 'eager' : 'lazy'"
          />
        </div>
      </TransitionGroup>
    </div>

    <!-- ═══ LAYERED OVERLAYS ═══ -->
    <!-- Cinematic vignette - brightened for better image visibility -->
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-charcoal-900/20" />
    <!-- Left content burn -->
    <div class="absolute inset-0 z-10 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/25 to-transparent" />
    <!-- Top fade for header -->
    <div class="absolute top-0 inset-x-0 h-32 z-10 bg-gradient-to-b from-charcoal-950/60 to-transparent" />
    <!-- Amber cinematic tint -->
    <div class="absolute inset-0 z-10 bg-gradient-to-br from-transparent via-transparent to-gold-900/12" />

    <!-- ═══ AMBIENT PARTICLES ═══ -->
    <div class="absolute inset-0 z-10 pointer-events-none">
      <div
        v-for="n in 10"
        :key="`p-${n}`"
        class="hero-particle absolute rounded-full"
        :style="{
          width: `${2 + (n % 3)}px`,
          height: `${2 + (n % 3)}px`,
          left: `${8 + n * 8.5}%`,
          top: `${15 + (n % 5) * 14}%`,
          animationDelay: `${n * 0.6}s`,
          animationDuration: `${6 + n * 0.8}s`,
          opacity: 0.25 + (n % 4) * 0.1,
        }"
      />
    </div>

    <!-- ═══ SLIDE CAPTION — bottom-left overlay ═══ -->
    <Transition name="caption-fade">
      <div
        :key="currentSlide"
        class="hidden lg:block absolute bottom-16 left-10 z-20 pointer-events-none max-w-xs"
      >
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-5 h-px bg-gold-400/80" />
          <p class="text-gold-400 text-[9px] uppercase tracking-[0.3em] font-bold">
            {{ slides[currentSlide]?.label }}
          </p>
        </div>
        <p class="text-ivory/60 text-xs leading-relaxed">
          {{ slides[currentSlide]?.caption }}
        </p>
      </div>
    </Transition>

    <!-- ═══ SLIDE COUNTER — top-right ═══ -->
    <div class="absolute top-24 right-6 lg:right-10 z-20 pointer-events-none hidden lg:flex items-center gap-2">
      <span class="font-heading font-bold text-ivory/80 text-sm tabular-nums">{{ String(currentSlide + 1).padStart(2,'0') }}</span>
      <span class="text-charcoal-600 text-xs">/</span>
      <span class="text-charcoal-500 text-xs tabular-nums">{{ String(slides.length).padStart(2,'0') }}</span>
    </div>

    <!-- ═══ MAIN CONTENT ═══ -->
    <div class="relative z-20 flex-1 flex flex-col justify-end pb-20 md:pb-24 pt-32 lg:pt-36">
      <div class="container-heritage">
        <div class="max-w-3xl xl:max-w-4xl">

          <!-- Eyebrow -->
          <div class="hero-item flex items-center gap-3 mb-5 md:mb-7" style="--delay: 0s">
            <span class="h-px w-10 bg-gold-400" />
            <span class="text-gold-400 text-[10px] md:text-[11px] uppercase tracking-[0.28em] font-bold">
              Bảo Tàng Số Di Sản · Thành Phố Đồng Nai
            </span>
          </div>

          <!-- H1 -->
          <h1 class="hero-item font-heading font-bold text-ivory leading-[1.15] mb-5 md:mb-7 text-shadow-hero" style="--delay: 0.12s; overflow: visible">
            <span class="block text-[clamp(1.9rem,5vw,4.2rem)] tracking-[-0.02em]">Bảo Tàng Số</span>
            <span class="block text-[clamp(1.9rem,5vw,4.2rem)] tracking-[-0.02em]">Di Sản Thành Phố</span>
            <span class="block text-[clamp(1.9rem,5vw,4.2rem)] tracking-[-0.02em] text-gradient-gold">Đồng Nai</span>
          </h1>

          <!-- Tagline quote -->
          <p
            class="hero-item font-accent italic text-ivory/65 text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed max-w-xl"
            style="--delay: 0.25s"
          >
            "Kết nối di sản văn hóa, lịch sử và thiên nhiên Thành Phố Đồng Nai"
          </p>

          <!-- Description -->
          <p
            class="hero-item text-charcoal-300 text-sm md:text-base leading-relaxed mb-9 md:mb-11 max-w-lg"
            style="--delay: 0.34s"
          >
            Không gian số bảo tồn di sản văn hóa vùng đất Bù Đăng — nơi thiên nhiên kỳ vĩ,
            lịch sử hào hùng và văn hóa S'tiêng hội tụ trong lòng Thành Phố Đồng Nai.
          </p>

          <!-- CTAs -->
          <div class="hero-item flex flex-wrap gap-3 mb-5" style="--delay: 0.44s">
            <NuxtLink to="/map" class="btn-primary text-sm px-7 py-3.5 flex-shrink-0">
              <Icon name="mdi:map-outline" class="w-4.5 h-4.5" />
              Bản Đồ Di Sản
            </NuxtLink>
            <NuxtLink
              to="/explore"
              class="btn-ghost text-sm px-7 py-3.5 border border-ivory/20 text-ivory/80 hover:border-gold-400/60 hover:text-gold-300 flex-shrink-0"
            >
              <Icon name="mdi:compass-outline" class="w-4.5 h-4.5" />
              Khám Phá
            </NuxtLink>
          </div>

          <!-- Audio Guide highlight pill -->
          <div class="hero-item mb-10 md:mb-14" style="--delay: 0.52s">
            <NuxtLink
              to="/explore"
              class="group inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full border border-gold-500/30 bg-gold-500/8 hover:bg-gold-500/15 hover:border-gold-500/60 transition-all duration-400 backdrop-blur-sm"
            >
              <!-- Waveform animated -->
              <div class="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center gap-[2px] flex-shrink-0 group-hover:bg-gold-500/30 transition-colors">
                <span v-for="i in 4" :key="i"
                  class="w-0.5 rounded-full bg-gold-400 audio-wave-bar"
                  :style="`animation-delay: ${(i-1) * 0.12}s`"
                />
              </div>
              <div class="flex flex-col">
                <span class="text-gold-300 text-xs font-bold uppercase tracking-wider leading-none mb-0.5">🎙 Audio Thuyết Minh</span>
                <span class="text-ivory/60 text-[10px]">4 track · Giọng đọc địa phương · Tự động phát</span>
              </div>
              <Icon name="mdi:arrow-right" class="w-3.5 h-3.5 text-gold-400/60 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all ml-1" />
            </NuxtLink>
          </div>

          <!-- Stats row -->
          <div class="hero-item" style="--delay: 0.56s">
            <div class="grid grid-cols-2 gap-y-4 gap-x-6 sm:flex sm:flex-wrap sm:items-stretch sm:gap-0 sm:divide-x sm:divide-ivory/10">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="stat-pill flex flex-col gap-0.5 sm:pr-5 sm:pl-5 sm:first:pl-0 py-1 sm:py-2 cursor-default group"
              >
                <div class="flex items-center gap-1.5">
                  <Icon :name="stat.icon" class="w-3.5 h-3.5 text-gold-400/70 group-hover:text-gold-400 transition-colors" />
                  <span class="font-heading font-bold text-ivory text-lg md:text-2xl leading-none tabular-nums group-hover:text-gold-300 transition-colors">
                    {{ stat.value }}{{ stat.suffix }}
                  </span>
                </div>
                <p class="text-charcoal-500 text-[10px] uppercase tracking-wider leading-none group-hover:text-charcoal-400 transition-colors">
                  {{ stat.label }}
                </p>
              </div>
              <!-- Location badge -->
              <div class="flex items-center gap-2 col-span-2 sm:col-span-1 sm:pl-5 cursor-default group border-t border-charcoal-800/20 pt-3 mt-1 sm:border-t-0 sm:pt-0 sm:mt-0">
                <div class="w-7 h-7 rounded-lg bg-forest-500/15 border border-forest-500/20 flex items-center justify-center group-hover:bg-forest-500/25 transition-colors">
                  <Icon name="mdi:city" class="w-3.5 h-3.5 text-forest-400" />
                </div>
                <div>
                  <p class="font-heading font-semibold text-ivory text-xs leading-none mb-0.5">Thành Phố Đồng Nai</p>
                  <p class="text-charcoal-500 text-[10px]">TPTT thứ 7 · Từ 30/04/2026</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ═══ SLIDE INDICATORS ═══ -->
    <div class="absolute bottom-[100px] lg:bottom-[56px] right-6 lg:right-10 z-20 flex flex-col gap-2">
      <button
        v-for="(_, i) in slides"
        :key="`dot-${i}`"
        class="rounded-full transition-all duration-500 cursor-pointer"
        :class="currentSlide === i
          ? 'w-1 h-7 bg-gold-400'
          : 'w-1 h-3 bg-ivory/25 hover:bg-ivory/50'"
        :aria-label="`Slide ${i + 1}`"
        @click="goToSlide(i)"
      />
    </div>

    <!-- ═══ SCROLL INDICATOR ═══ -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <div class="w-5 h-8 border border-ivory/20 rounded-full flex justify-center pt-1.5 hover:border-gold-400/40 transition-colors">
        <div class="w-1 h-1.5 bg-gold-400/70 rounded-full scroll-dot" />
      </div>
      <span class="text-ivory/30 text-[9px] uppercase tracking-widest">Cuộn xuống</span>
    </div>

  </section>
</template>

<script setup lang="ts">
import { useHeritageStore } from '~/stores/heritage'

const heritageStore = useHeritageStore()

const slides = [
  {
    image: '/images/heritage/Bombo/TAN08220.jpg',
    alt: 'Sóc Bom Bo — tiếng chày giã gạo nuôi quân',
    label: 'SÓC BOM BO',
    caption: 'Nhịp chày giã gạo vang vọng đại ngàn — biểu tượng bất khuất của miền Đông Nam Bộ',
    position: 'center top',
  },
  {
    image: '/images/heritage/img-disanbudang/Khu-Bao-Ton-2.jpg',
    alt: 'Rừng nguyên sinh Bù Đăng',
    label: 'RỪNG NGUYÊN SINH BÙ ĐĂNG',
    caption: 'Kho báu đa dạng sinh học của Đông Nam Bộ còn nguyên vẹn qua hàng thế kỷ',
    position: 'center center',
  },
  {
    image: '/images/heritage/img-disanbudang/Nha-Dai-Truyen-Thong.png',
    alt: 'Nhà dài truyền thống S\'tiêng',
    label: 'NHÀ DÀI TRUYỀN THỐNG',
    caption: 'Kiến trúc cộng đồng độc đáo trên cao nguyên đất đỏ — linh hồn văn hóa S\'tiêng',
    position: 'center 30%',
  },
  {
    image: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    alt: 'Lễ hội mừng lúa mới M\'nông',
    label: 'LỄ HỘI MỪNG LÚA MỚI',
    caption: 'Lời tạ ơn của đất trời và mùa vàng bội thu — nghi lễ thiêng liêng ngàn đời',
    position: 'center center',
  },
  {
    image: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png',
    alt: 'Hồ Thác Mơ — Phước Long',
    label: 'HỒ THÁC MƠ — PHƯỚC LONG',
    caption: 'Viên ngọc xanh soi bóng núi Bà Rá huyền thoại — điểm đến khó quên',
    position: 'center 40%',
  },
]

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval>

function goToSlide(i: number) {
  currentSlide.value = i
  clearInterval(slideInterval)
  startAutoPlay()
}

function startAutoPlay() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6500)
}

onMounted(() => startAutoPlay())
onUnmounted(() => clearInterval(slideInterval))

const stats = computed(() => [
  { icon: 'mdi:castle', value: String(heritageStore.totalCount), suffix: '', label: 'Di sản số hóa' },
  { icon: 'mdi:book-open-variant', value: '6', suffix: '', label: 'Ký ức cộng đồng' },
  { icon: 'mdi:headphones', value: '4', suffix: '', label: 'Audio guide' },
  { icon: 'mdi:help-circle-outline', value: '35', suffix: '+', label: 'Câu hỏi lịch sử' },
])
</script>

<style scoped>
/* ── Slideshow transition ── */
.hero-slide-enter-active { transition: opacity 1.8s ease; }
.hero-slide-leave-active { transition: opacity 1.8s ease; }
.hero-slide-enter-from,
.hero-slide-leave-to { opacity: 0; }

/* ── Ken Burns ── */
.ken-burns-active {
  animation: kenburns 20s ease-out infinite alternate;
}
@keyframes kenburns {
  0% { transform: scale(1.08) translateX(0px); }
  100% { transform: scale(1) translateX(-12px); }
}

/* ── Caption transition ── */
.caption-fade-enter-active { transition: opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s; }
.caption-fade-leave-active { transition: opacity 0.3s ease; }
.caption-fade-enter-from { opacity: 0; transform: translateY(6px); }
.caption-fade-leave-to { opacity: 0; }

/* ── Hero content items ── */
.hero-item {
  animation: heroFadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0s);
}
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Ambient particles ── */
.hero-particle {
  background: radial-gradient(circle, rgba(201, 146, 42, 0.6) 0%, transparent 70%);
  animation: floatParticle var(--dur, 7s) ease-in-out var(--delay, 0s) infinite alternate;
}
@keyframes floatParticle {
  from { transform: translateY(0px) scale(1); opacity: 0.2; }
  to   { transform: translateY(-22px) scale(1.5); opacity: 0.5; }
}

/* ── Scroll dot ── */
.scroll-dot {
  animation: scrollBounce 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(10px); opacity: 1; }
}

/* ── Stat pill hover ── */
.stat-pill { transition: all 0.2s ease; }
</style>
