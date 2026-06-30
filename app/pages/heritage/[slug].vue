<template>
  <div>
    <div v-if="!isLoaded" class="min-h-screen flex items-center justify-center bg-charcoal-900">
      <div class="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="heritage" class="bg-charcoal-900 min-h-screen text-ivory pt-[72px]">
      <!-- ===== HERO ===== -->
      <section class="relative h-[80vh] min-h-[600px] flex items-end overflow-hidden border-b border-charcoal-850">
        <img
          :src="heritage.coverImage"
          :alt="heritage.title"
          class="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-[15000ms] ease-out-expo scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 to-transparent" />

        <div class="relative z-10 container-heritage pb-16">
          <div class="max-w-3xl">
            <BaseBadge :variant="categoryVariant" class="mb-4">
              {{ getCategoryLabel(heritage.category) }}
            </BaseBadge>
            <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 text-shadow-hero">
              {{ heritage.title }}
            </h1>
            <p class="font-accent italic text-gold-300 text-xl md:text-2xl mb-6 leading-relaxed">"{{ heritage.subtitle }}"</p>

            <!-- Quick meta info -->
            <div class="flex flex-wrap gap-5 text-sm text-charcoal-350">
              <span v-if="heritage.year" class="flex items-center gap-1.5 bg-charcoal-950/40 px-3 py-1 rounded-full border border-charcoal-800">
                <Icon name="mdi:calendar-range" class="w-4 h-4 text-gold-400" />
                {{ heritage.year }}
              </span>
              <span class="flex items-center gap-1.5 bg-charcoal-950/40 px-3 py-1 rounded-full border border-charcoal-800">
                <Icon name="mdi:eye-outline" class="w-4 h-4 text-gold-400" />
                {{ heritage.viewCount?.toLocaleString() }} lượt xem
              </span>
              <span class="flex items-center gap-1.5 bg-charcoal-950/40 px-3 py-1 rounded-full border border-charcoal-800">
                <Icon name="mdi:tag-multiple-outline" class="w-4 h-4 text-gold-400" />
                {{ heritage.tags.slice(0, 3).join(' • ') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Audio play overlay -->
        <div v-if="heritage.audio" class="absolute right-8 bottom-12 z-10">
          <button
            class="flex items-center gap-3.5 glass-dark rounded-2xl px-5 py-3 border border-gold-500/20 hover:border-gold-500 hover:shadow-gold/10 hover:shadow-lg transition-all duration-300 group"
            @click="playAudio"
          >
            <div class="w-11 h-11 rounded-full bg-gold-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="mdi:play" class="w-5 h-5 text-charcoal-900" />
            </div>
            <div class="text-left hidden sm:block">
              <p class="text-ivory text-sm font-medium">Bản Thuyết Minh</p>
              <p class="text-charcoal-400 text-xs mt-0.5">{{ formatTime(heritage.audio.duration) }} phút</p>
            </div>
          </button>
        </div>
      </section>

      <!-- ===== STICKY NAV TABS ===== -->
      <div class="sticky top-[72px] z-40 bg-charcoal-950/90 backdrop-blur-md border-b border-charcoal-850 py-3 text-sm shrink-0">
        <div class="container-heritage flex items-center justify-start gap-8 overflow-x-auto scrollbar-none">
          <button
            v-for="tab in activeTabsList"
            :key="tab.id"
            class="text-xs uppercase tracking-widest font-semibold transition-colors py-1 border-b-2"
            :class="currentActiveTab === tab.id ? 'border-gold-500 text-gold-400' : 'border-transparent text-charcoal-400 hover:text-ivory'"
            @click="scrollToTabSection(tab.id)"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- ===== CONTENT ===== -->
      <div class="container-heritage py-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <!-- Main story column -->
          <div class="lg:col-span-8 space-y-16">

            <div id="story" class="reveal scroll-mt-28">
              <div class="flex items-center gap-3 mb-6">
                <span class="w-1.5 h-6 bg-gold-500 rounded-full inline-block" />
                <h2 class="font-heading font-bold text-ivory text-2xl lg:text-3xl">Cội Nguồn Di Sản</h2>
              </div>
              <div class="prose-heritage space-y-5">
                <p
                  v-for="(paragraph, idx) in storyParagraphs"
                  :key="idx"
                  :class="idx === 0 ? 'drop-cap text-charcoal-300 text-base leading-relaxed' : 'text-charcoal-300 text-base leading-relaxed'"
                >{{ paragraph }}</p>
              </div>
            </div>

            <!-- Section: Timeline -->
            <div v-if="heritage.timeline.length" id="timeline" class="reveal scroll-mt-28">
              <div class="flex items-center gap-3 mb-8">
                <span class="w-1.5 h-6 bg-brick-500 rounded-full inline-block" />
                <h2 class="font-heading font-bold text-ivory text-2xl lg:text-3xl">Biên Niên Sử</h2>
              </div>
              <div class="relative pl-6 border-l-2 border-charcoal-800 ml-3 space-y-6">
                <div
                  v-for="(item, i) in heritage.timeline"
                  :key="i"
                  class="relative reveal"
                >
                  <!-- Dot marker -->
                  <span class="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-gold-500 border-2 border-charcoal-900 shadow-gold" />
                  <span class="text-2xs text-gold-400 font-semibold uppercase tracking-widest">{{ item.year }}</span>
                  <h3 class="font-heading font-bold text-ivory text-lg mt-1 mb-2">{{ item.title }}</h3>
                  <p class="text-charcoal-400 text-sm leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>

            <!-- Section: Gallery -->
            <div v-if="heritage.gallery.length" id="gallery" class="reveal scroll-mt-28">
              <div class="flex items-center gap-3 mb-8">
                <span class="w-1.5 h-6 bg-forest-500 rounded-full inline-block" />
                <h2 class="font-heading font-bold text-ivory text-2xl lg:text-3xl">Tàng Tích Ảnh</h2>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="(img, i) in heritage.gallery"
                  :key="i"
                  :class="i === 0 ? 'sm:col-span-2 aspect-[16/8]' : 'aspect-[4/3]'"
                  class="overflow-hidden rounded-2xl border border-charcoal-800 relative group cursor-pointer"
                  @click="lightboxIndex = i"
                >
                  <img
                    :src="img.src"
                    :alt="img.alt"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div class="absolute bottom-4 left-4 right-4 text-xs z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p class="text-ivory font-medium">{{ img.caption }}</p>
                    <p v-if="img.photographer" class="text-charcoal-400 mt-0.5">Ảnh: {{ img.photographer }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section: Audio Play Detail -->
            <div v-if="heritage.audio" class="reveal border border-charcoal-800 bg-charcoal-950/50 rounded-3xl p-6 lg:p-8 flex flex-col sm:flex-row gap-6 items-center">
              <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-charcoal-800 relative">
                <img v-if="heritage.audio.coverImage" :src="heritage.audio.coverImage" :alt="heritage.audio.title" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 text-center sm:text-left space-y-1">
                <span class="eyebrow text-gold-400 text-3xs">Thuyết minh chính thức</span>
                <h4 class="font-heading font-bold text-ivory text-lg">{{ heritage.audio.title }}</h4>
                <p class="text-charcoal-400 text-sm">Người kể: {{ heritage.audio.narrator }} • {{ heritage.audio.narratorRole }}</p>
              </div>
              <button
                class="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center hover:bg-gold-400 transition-colors shadow-gold shrink-0"
                @click="playAudio"
              >
                <Icon name="mdi:play" class="w-7 h-7 text-charcoal-900" />
              </button>
            </div>

            <!-- References -->
            <div v-if="heritage.references.length" class="reveal pt-6 border-t border-charcoal-850">
              <h2 class="font-heading font-bold text-ivory text-lg mb-4">Nguồn Tư Liệu Khảo Cứu</h2>
              <ul class="space-y-3">
                <li v-for="(ref, i) in heritage.references" :key="i" class="text-charcoal-400 text-sm flex gap-3">
                  <span class="text-gold-400 font-bold">[{{ i + 1 }}]</span>
                  <span class="leading-relaxed">{{ ref }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Sidebar column -->
          <div class="lg:col-span-4 space-y-6 lg:sticky lg:top-[150px] self-start" id="location">
            <!-- Quick Facts -->
            <div class="bg-charcoal-950/60 border border-charcoal-850 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
              <h3 class="font-heading font-bold text-ivory text-lg mb-5 flex items-center gap-2">
                <Icon name="mdi:information-outline" class="w-5 h-5 text-gold-400" />
                Tổng Quan Di Sản
              </h3>
              <div class="space-y-4">
                <div
                  v-for="fact in heritage.quickFacts"
                  :key="fact.label"
                  class="flex items-start gap-3 py-3 border-b border-charcoal-850 last:border-0"
                >
                  <Icon :name="fact.icon ?? 'mdi:circle-small'" class="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                  <div>
                    <p class="text-charcoal-500 text-xs font-medium uppercase tracking-wider">{{ fact.label }}</p>
                    <p class="font-medium text-ivory text-sm mt-1 leading-snug">{{ fact.value }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map location link -->
            <div class="bg-charcoal-950/60 border border-charcoal-850 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
              <h3 class="font-heading font-bold text-ivory text-lg mb-4 flex items-center gap-2">
                <Icon name="mdi:map-marker-outline" class="w-5 h-5 text-gold-400" />
                Tọa Độ Định Vị
              </h3>
              <div class="bg-charcoal-900 rounded-xl aspect-[4/3] flex flex-col items-center justify-center mb-4 border border-charcoal-800 text-center p-4">
                <Icon name="mdi:map" class="w-8 h-8 text-charcoal-600 mb-2" />
                <p class="text-ivory font-medium text-xs">{{ heritage.coordinates.lat.toFixed(5) }}, {{ heritage.coordinates.lng.toFixed(5) }}</p>
                <p class="text-charcoal-500 text-[10px] mt-1">Hệ tọa độ VN2000 chuẩn quốc gia</p>
              </div>
              <NuxtLink :to="`/map?select=${heritage.id}`" class="btn-primary w-full justify-center text-sm py-3">
                <Icon name="mdi:compass-outline" class="w-4 h-4" />
                Xem Bản Đồ Vệ Tinh
              </NuxtLink>
            </div>

            <!-- Quiz card -->
            <div v-if="relatedQuiz" class="bg-gradient-to-br from-earth-900 to-charcoal-900 border border-gold-500/20 rounded-2xl p-6 text-ivory">
              <Icon name="mdi:help-circle-outline" class="w-7 h-7 text-gold-400 mb-3" />
              <h3 class="font-heading font-bold text-lg mb-2 leading-snug">{{ relatedQuiz.title }}</h3>
              <p class="text-charcoal-350 text-xs leading-relaxed mb-5">Vượt qua các câu đố kiểm tra kiến thức về di tích này để nhận huy chương số.</p>
              <button class="btn-primary w-full justify-center text-xs py-3 bg-gold-500 text-charcoal-900" @click="startQuiz">
                <Icon name="mdi:trophy-outline" class="w-4 h-4" />
                Làm Thử Thách
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 404 -->
    <div v-else class="min-h-screen flex items-center justify-center bg-charcoal-900 pt-[72px]">
      <div class="text-center">
        <Icon name="mdi:map-marker-off" class="w-20 h-20 text-charcoal-700 mx-auto mb-6" />
        <h1 class="font-heading font-bold text-ivory text-3xl mb-3">Di sản không tồn tại</h1>
        <NuxtLink to="/library" class="btn-primary">Về Thư Viện</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const store = useHeritageStore()
const audioStore = useAudioStore()
const quizStore = useQuizStore()
const { getCategoryLabel } = useHeritage()
const { observeAll } = useScrollReveal()

const isLoaded = ref(false)
const lightboxIndex = ref<number | null>(null)
const currentActiveTab = ref('story')

const heritage = computed(() => store.getBySlug(slug.value) ?? null)

useBreadcrumb(() => heritage.value?.title || '')
const related = computed(() => heritage.value ? store.getRelated(heritage.value) : [])
const relatedQuiz = computed(() => heritage.value ? quizStore.getQuizByHeritageId(heritage.value.id) : null)
const storyParagraphs = computed(() => {
  if (!heritage.value?.longStory) return []
  return heritage.value.longStory.split('\n\n').map((p) => p.trim()).filter(Boolean)
})

const activeTabsList = computed(() => {
  const tabs = [{ id: 'story', name: 'Cội nguồn' }]
  if (heritage.value?.timeline && heritage.value.timeline.length > 0) {
    tabs.push({ id: 'timeline', name: 'Biên niên sử' })
  }
  if (heritage.value?.gallery && heritage.value.gallery.length > 0) {
    tabs.push({ id: 'gallery', name: 'Thư viện ảnh' })
  }
  tabs.push({ id: 'location', name: 'Vị trí & Bản đồ' })
  return tabs
})

function scrollToTabSection(id: string) {
  currentActiveTab.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const categoryVariant = computed(() => {
  const map: Record<string, any> = {
    'lich-su': 'brick', 'danh-thang': 'forest',
    'van-hoa-phi-vat-the': 'gold', 'doi-song-cong-dong': 'earth',
    'giao-duc-truyen-thong': 'copper',
  }
  return map[heritage.value?.category ?? ''] ?? 'gold'
})

onMounted(async () => {
  isLoaded.value = true
  if (heritage.value) {
    quizStore.markHeritageVisited(heritage.value.id)
  }
  await nextTick()
  observeAll()

  // Intersection observer to automatically highlight active tab
  if (import.meta.client) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentActiveTab.value = entry.target.id
        }
      })
    }, { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' })

    const targets = ['story', 'timeline', 'gallery', 'location']
    targets.forEach((t) => {
      const el = document.getElementById(t)
      if (el) observer.observe(el)
    })
  }
})

useHeritageSeo(heritage)

function playAudio() {
  if (heritage.value?.audio) {
    audioStore.loadTrack(heritage.value.audio, heritage.value.id)
    audioStore.play()
  }
}

function startQuiz() {
  if (relatedQuiz.value) {
    quizStore.startQuiz(relatedQuiz.value)
    navigateTo('/explore')
  }
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

definePageMeta({ layout: 'default' })
</script>
