<template>
  <div class="relative rounded-2xl overflow-hidden bg-charcoal-950 border border-charcoal-800 group">
    <!-- Image slideshow area -->
    <div class="relative overflow-hidden" :style="{ height: height }">
      <TransitionGroup name="slide-fade" tag="div" class="relative w-full h-full">
        <img
          v-for="(img, idx) in images"
          v-show="currentIndex === idx"
          :key="idx"
          :src="img.url"
          :alt="img.caption"
          class="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </TransitionGroup>

      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent pointer-events-none" />

      <!-- TTS / AI Voice badge -->
      <div class="absolute top-3 right-3 flex items-center gap-1.5 bg-charcoal-950/80 border border-charcoal-700 px-2.5 py-1 rounded-full text-3xs font-semibold text-gold-400">
        <Icon name="mdi:robot" class="w-3 h-3" />
        <span>AI Voice</span>
      </div>

      <!-- Caption at bottom -->
      <div class="absolute bottom-0 inset-x-0 p-4 pointer-events-none">
        <Transition name="caption-fade" mode="out-in">
          <p :key="currentIndex" class="text-xs text-charcoal-200 leading-relaxed line-clamp-2">
            {{ images[currentIndex]?.caption }}
          </p>
        </Transition>
      </div>

      <!-- Slide dots -->
      <div class="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-auto">
        <button
          v-for="(_, idx) in images"
          :key="idx"
          class="w-1.5 h-1.5 rounded-full transition-all duration-300"
          :class="currentIndex === idx ? 'bg-gold-400 w-4' : 'bg-charcoal-600 hover:bg-charcoal-400'"
          @click="goTo(idx)"
          :aria-label="`Chuyển sang ảnh ${idx + 1}`"
        />
      </div>
    </div>

    <!-- Controls bar -->
    <div class="flex items-center justify-between px-4 py-3 bg-charcoal-950/60 backdrop-blur-sm border-t border-charcoal-800">
      <!-- Prev / Play-Pause / Next -->
      <div class="flex items-center gap-2">
        <button
          class="w-8 h-8 rounded-full bg-charcoal-900 hover:bg-charcoal-800 flex items-center justify-center text-charcoal-400 hover:text-ivory transition-all"
          @click="prev"
          aria-label="Ảnh trước"
        >
          <Icon name="mdi:chevron-left" class="w-5 h-5" />
        </button>

        <button
          class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 font-bold"
          :class="isPlaying ? 'bg-gold-500 text-charcoal-950 hover:bg-gold-400' : 'bg-charcoal-900 text-gold-400 hover:bg-charcoal-800'"
          @click="togglePlay"
          :aria-label="isPlaying ? 'Tạm dừng' : 'Phát thuyết minh'"
        >
          <Icon :name="isPlaying ? 'mdi:pause' : 'mdi:play'" class="w-5 h-5" />
        </button>

        <button
          class="w-8 h-8 rounded-full bg-charcoal-900 hover:bg-charcoal-800 flex items-center justify-center text-charcoal-400 hover:text-ivory transition-all"
          @click="next"
          aria-label="Ảnh tiếp"
        >
          <Icon name="mdi:chevron-right" class="w-5 h-5" />
        </button>
      </div>

      <!-- Progress & slide counter -->
      <div class="flex items-center gap-3">
        <div class="w-24 h-1 bg-charcoal-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-gold-500 transition-all duration-300"
            :style="{ width: progressPct + '%' }"
          />
        </div>
        <span class="text-3xs text-charcoal-500 font-semibold tabular-nums">
          {{ currentIndex + 1 }} / {{ images.length }}
        </span>
      </div>

      <!-- Volume / TTS indicator -->
      <button
        class="w-8 h-8 rounded-full flex items-center justify-center transition-all"
        :class="ttsActive ? 'text-gold-400 bg-gold-500/10' : 'text-charcoal-500 hover:text-charcoal-300'"
        @click="toggleTts"
        :aria-label="ttsActive ? 'Tắt thuyết minh' : 'Bật thuyết minh giọng đọc'"
      >
        <Icon :name="ttsActive ? 'mdi:volume-high' : 'mdi:volume-off'" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SlideImage {
  url: string
  caption: string
}

const props = withDefaults(defineProps<{
  images: SlideImage[]
  height?: string
  autoInterval?: number   // ms between slides
}>(), {
  height: '300px',
  autoInterval: 5000,
})

const currentIndex = ref(0)
const isPlaying = ref(false)
const ttsActive = ref(false)
let playTimer: ReturnType<typeof setInterval> | null = null

const progressPct = computed(() => ((currentIndex.value + 1) / props.images.length) * 100)

function goTo(idx: number) {
  currentIndex.value = idx
  if (ttsActive.value) speakCaption()
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
  if (ttsActive.value) speakCaption()
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  if (ttsActive.value) speakCaption()
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    playTimer = setInterval(() => next(), props.autoInterval)
    if (ttsActive.value) speakCaption()
  } else {
    if (playTimer) clearInterval(playTimer)
    if (import.meta.client && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  }
}

function toggleTts() {
  ttsActive.value = !ttsActive.value
  if (ttsActive.value) {
    speakCaption()
  } else {
    if (import.meta.client && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  }
}

function speakCaption() {
  if (!import.meta.client || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const caption = props.images[currentIndex.value]?.caption
  if (!caption) return
  const utterance = new SpeechSynthesisUtterance(caption)
  utterance.lang = 'vi-VN'
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}

onBeforeUnmount(() => {
  if (playTimer) clearInterval(playTimer)
  if (import.meta.client && 'speechSynthesis' in window) window.speechSynthesis.cancel()
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.6s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.caption-fade-enter-active {
  transition: all 0.4s ease 0.1s;
}
.caption-fade-leave-active {
  transition: all 0.2s ease;
}
.caption-fade-enter-from,
.caption-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
