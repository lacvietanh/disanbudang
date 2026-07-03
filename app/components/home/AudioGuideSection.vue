<template>
  <section class="section bg-dark-earth relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/12 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-1/4 w-72 h-72 bg-earth-600/10 rounded-full blur-3xl" />
    </div>

    <div class="container-heritage relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Audio visual -->
        <div class="reveal">
          <!-- Featured audio card -->
          <div class="glass-dark rounded-3xl p-7 border border-gold-500/20 shadow-gold/10 shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Icon name="mdi:headphones" class="w-5 h-5 text-charcoal-900" />
                </div>
                <div>
                  <p class="text-ivory font-semibold text-sm">Audio Guide</p>
                  <p class="text-charcoal-400 text-xs">Thuyết minh di sản</p>
                </div>
              </div>
              <BaseBadge variant="earth" size="sm">Sắp Ra Mắt</BaseBadge>
            </div>

            <!-- Track info -->
            <div v-if="featuredAudio" class="flex gap-4 mb-6">
              <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-warm">
                <img
                  :src="featuredAudio.coverImage"
                  :alt="featuredAudio.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-heading font-bold text-ivory text-lg leading-tight mb-1">{{ featuredAudio.title }}</h4>
                <p class="text-charcoal-400 text-sm">{{ featuredAudio.narrator }}</p>
                <p class="text-charcoal-500 text-xs">{{ featuredAudio.narratorRole }}</p>
              </div>
            </div>

            <!-- Waveform visualization -->
            <div class="flex items-end gap-1 h-12 mb-4 px-2">
              <div
                v-for="(h, i) in waveformHeights"
                :key="i"
                class="waveform-bar flex-1 transition-all duration-500"
                :style="{
                  height: `${isPlaying ? h : 3}px`,
                  animationDelay: `${i * 0.05}s`,
                  animation: isPlaying ? `wave ${0.8 + i * 0.1}s ease-in-out ${i * 0.05}s infinite` : 'none',
                  opacity: isPlaying ? 1 : 0.35,
                }"
              />
            </div>

            <!-- Progress -->
            <div class="mb-4">
              <div class="h-1 bg-charcoal-700 rounded-full mb-2">
                <div
                  class="h-full bg-gradient-gold rounded-full transition-all duration-300"
                  :style="{ width: `${progress}%` }"
                />
              </div>
              <div class="flex justify-between text-charcoal-500 text-xs">
                <span>{{ formatTime(currentTime) }}</span>
                <span>{{ formatTime(featuredAudio?.duration ?? 0) }}</span>
              </div>
            </div>

            <!-- Controls -->
            <div class="flex items-center justify-center gap-6">
              <button class="text-charcoal-400 hover:text-ivory transition-colors" @click="skip(-15)">
                <Icon name="mdi:rewind-15" class="w-6 h-6" />
              </button>
              <button
                class="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center hover:bg-gold-400 transition-all duration-300 shadow-gold hover:scale-105"
                @click="togglePlay"
              >
                <Icon
                  :name="isPlaying ? 'mdi:pause' : 'mdi:play'"
                  class="w-7 h-7 text-charcoal-900"
                />
              </button>
              <button class="text-charcoal-400 hover:text-ivory transition-colors" @click="skip(15)">
                <Icon name="mdi:fast-forward-15" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- Other tracks -->
          <div class="mt-5 space-y-3">
            <p class="eyebrow text-gold-500 text-2xs mb-3">Các Audio Khác</p>
            <div
              v-for="heritage in otherAudios"
              :key="heritage.id"
              class="flex items-center gap-3 p-3 rounded-xl border border-charcoal-800 hover:border-gold-500/30 hover:bg-charcoal-800/50 transition-all duration-200 cursor-pointer group"
              @click="loadAudio(heritage)"
            >
              <div class="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <img :src="heritage.audio!.coverImage" :alt="heritage.audio!.title" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-ivory text-sm font-medium truncate group-hover:text-gold-300 transition-colors">{{ heritage.audio!.title }}</p>
                <p class="text-charcoal-500 text-xs truncate">{{ heritage.audio!.narrator }}</p>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-charcoal-500 text-xs">{{ formatTime(heritage.audio!.duration) }}</span>
                <Icon name="mdi:play-circle-outline" class="w-5 h-5 text-charcoal-600 group-hover:text-gold-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="space-y-8">
          <div class="reveal">
            <span class="section-label text-gold-400">Hệ Thống Audio Guide</span>
            <h2 class="text-display-sm text-ivory mb-5 leading-tight">
              Nghe Kể Chuyện<br/>
              <span class="text-gradient-gold">Di Sản Địa Phương</span>
            </h2>
            <p class="text-charcoal-300 text-lg leading-relaxed">
              Hệ thống audio guide đa ngôn ngữ — được thuyết minh bởi các nghệ nhân, già làng,
              nhà nghiên cứu và chính giọng đọc của học sinh địa phương.
            </p>
          </div>

          <div class="space-y-5">
            <div
              v-for="(feat, i) in audioFeatures"
              :key="i"
              class="flex gap-4 reveal"
              :style="{ animationDelay: `${i * 0.1}s` }"
            >
              <div class="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon :name="feat.icon" class="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory mb-1">{{ feat.title }}</h4>
                <p class="text-charcoal-400 text-sm leading-relaxed">{{ feat.desc }}</p>
              </div>
            </div>
          </div>

          <div class="reveal">
            <NuxtLink to="/library" class="btn-outline-gold">
              <Icon name="mdi:headphones" class="w-4 h-4" />
              Khám Phá Audio Guide
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MOCK_HERITAGES } from '~/data/mockHeritages'
import type { Heritage } from '~/types'

const audioStore = useAudioStore()
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const heritagesWithAudio = MOCK_HERITAGES.filter((h) => h.audio)
const featuredAudio = computed(() => heritagesWithAudio[0]?.audio ?? null)
const otherAudios = heritagesWithAudio.slice(1, 4)

const isPlaying = ref(false)
const currentTime = ref(0)
let timer: ReturnType<typeof setInterval>

// Simulate waveform
const waveformHeights = Array.from({ length: 32 }, () => Math.random() * 36 + 8)

const progress = computed(() =>
  featuredAudio.value ? (currentTime.value / featuredAudio.value.duration) * 100 : 0,
)

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    timer = setInterval(() => {
      if (currentTime.value < (featuredAudio.value?.duration ?? 0)) {
        currentTime.value++
      } else {
        isPlaying.value = false
        clearInterval(timer)
      }
    }, 1000)
    // Also load into global player
    const h = heritagesWithAudio[0]
    if (h?.audio) audioStore.loadTrack(h.audio, h.id)
  } else {
    clearInterval(timer)
  }
}

function skip(s: number) {
  currentTime.value = Math.max(0, Math.min(currentTime.value + s, featuredAudio.value?.duration ?? 0))
}

function loadAudio(heritage: Heritage) {
  if (heritage.audio) {
    audioStore.loadTrack(heritage.audio, heritage.id)
    audioStore.play()
  }
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

onUnmounted(() => clearInterval(timer))

const audioFeatures = [
  {
    icon: 'mdi:microphone',
    title: 'Giọng Đọc Địa Phương',
    desc: 'Được thuyết minh bởi nghệ nhân, già làng và học sinh — chân thực và đầy cảm xúc.',
  },
  {
    icon: 'mdi:translate',
    title: 'Đa Ngôn Ngữ',
    desc: 'Tiếng Việt, S\'tiêng, M\'nông và Tiếng Anh — phục vụ mọi đối tượng.',
  },
  {
    icon: 'mdi:qrcode-scan',
    title: 'QR Thực Địa',
    desc: 'Quét QR tại di tích để nghe ngay thuyết minh tại chỗ — trải nghiệm immersive.',
  },
]
</script>
