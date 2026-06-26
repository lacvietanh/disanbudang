<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory pb-20 pt-[72px]">
    <!-- Header Hero -->
    <div class="bg-dark-earth py-20 relative overflow-hidden border-b border-charcoal-850">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div class="noise-overlay" />
      </div>
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Không Gian Nghệ Thuật Số</span>
        <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-none mb-5">
          Triển Lãm Ảnh<br/> <span class="text-gradient-gold">Di Sản Bù Đăng</span>
        </h1>
        <p class="text-charcoal-350 text-base max-w-3xl leading-relaxed">
          Nơi hội tụ những khoảnh khắc đắt giá ghi lại linh hồn và hơi thở của đại ngàn Bù Đăng. Từ những khung cảnh thiên nhiên hùng vĩ của Thác Đứng, trảng cỏ Bù Lạch, đến nếp sống sinh hoạt đậm đà bản sắc của đồng bào dân tộc S'tiêng, M'nông. Mỗi bức ảnh nghệ thuật và tư liệu lịch sử được trưng bày tại đây đều là một lát cắt chân thực giúp bảo tồn nguyên vẹn các giá trị văn hóa vô giá khỏi sự đào thải của thời gian, đồng thời đánh thức lòng tự hào và tình yêu quê hương trong mỗi người xem.
        </p>

        <!-- Search input -->
        <div class="mt-8 max-w-xl">
          <div class="relative">
            <Icon
              v-if="!searchQuery"
              name="mdi:magnify"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400 pointer-events-none z-10"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm hình ảnh di sản, địa danh..."
              :style="{ paddingLeft: searchQuery ? '1rem' : '3rem', paddingRight: searchQuery ? '2.5rem' : '1rem', paddingTop: '1rem', paddingBottom: '1rem' }"
              class="w-full bg-charcoal-950 border border-charcoal-800 rounded-2xl text-ivory text-base placeholder-charcoal-550 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300"
            />
            <button
              v-if="searchQuery"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-ivory"
              @click="searchQuery = ''"
            >
              <Icon name="mdi:close-circle" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="container-heritage py-12">
      <!-- Category & Language Filters -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-charcoal-850 pb-6">
        <!-- Categories -->
        <div class="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 shrink-0">
          <button
            class="flex-shrink-0 flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border bg-charcoal-900"
            :class="!activeCategory ? 'bg-gold-500 text-charcoal-900 border-transparent shadow-gold' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory'"
            @click="activeCategory = ''"
          >
            <Icon name="mdi:apps" class="w-4 h-4" />
            Tất cả ({{ images.length }})
          </button>
          <button
            v-for="cat in uniqueCategories"
            :key="cat"
            class="flex-shrink-0 flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border bg-charcoal-900"
            :class="activeCategory === cat ? 'text-ivory border-transparent' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory'"
            :style="activeCategory === cat ? { backgroundColor: getCategoryColor(cat) } : {}"
            @click="activeCategory = cat"
          >
            <Icon :name="getCategoryIcon(cat)" class="w-4 h-4" />
            {{ getCategoryLabel(cat) }}
          </button>
        </div>

        <!-- Language and Metadata Display Toggle -->
        <div class="flex items-center gap-4 shrink-0">
          <span class="text-xs text-charcoal-400 uppercase tracking-widest font-semibold">Ngôn ngữ alt:</span>
          <div class="inline-flex rounded-lg bg-charcoal-950 p-1 border border-charcoal-800">
            <button
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              :class="lang === 'vi' ? 'bg-gold-500 text-charcoal-900' : 'text-charcoal-400 hover:text-ivory'"
              @click="lang = 'vi'"
            >
              Tiếng Việt
            </button>
            <button
              class="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              :class="lang === 'en' ? 'bg-gold-500 text-charcoal-900' : 'text-charcoal-400 hover:text-ivory'"
              @click="lang = 'en'"
            >
              English
            </button>
          </div>
        </div>
      </div>

      <!-- Gallery Grid (Masonry using CSS Columns) -->
      <div v-if="filteredImages.length > 0" class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <div
          v-for="img in filteredImages"
          :key="img.id"
          class="break-inside-avoid relative overflow-hidden rounded-3xl group border border-charcoal-800 cursor-pointer shadow-warm-lg bg-charcoal-950"
          @click="openLightbox(img)"
        >
          <!-- Progressive Image Loading Wrapper -->
          <div class="relative w-full overflow-hidden" :style="{ aspectRatio: img.orientation === 'landscape' ? '16/10' : '3/4' }">
            <!-- Blur Placeholder (Base64) -->
            <img
              :src="img.placeholder"
              alt="placeholder"
              class="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 transition-opacity duration-700 pointer-events-none"
              :class="{ 'opacity-0': loadedImages[img.id] }"
            />

            <!-- High-Res Image -->
            <img
              :src="img.sizes.md"
              :srcset="`${img.sizes.sm} 480w, ${img.sizes.md} 800w, ${img.sizes.lg} 1200w`"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              :alt="lang === 'vi' ? img.alt.vi : img.alt.en"
              loading="lazy"
              class="w-full h-full object-cover transition-all duration-1000 ease-out-expo group-hover:scale-105"
              @load="onImageLoad(img.id)"
            />

            <!-- Cinematic Overlay on Hover -->
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 border-t border-gold-500/10">
              <span class="text-xs uppercase tracking-widest font-semibold mb-1" :style="{ color: getCategoryColor(img.category) }">
                {{ getCategoryLabel(img.category) }}
              </span>
              <h3 class="font-heading font-bold text-ivory text-xl mb-1 text-gradient-gold">
                {{ img.title }}
              </h3>
              <p class="text-charcoal-350 text-xs line-clamp-2">
                {{ lang === 'vi' ? img.alt.vi : img.alt.en }}
              </p>
              <div class="flex items-center justify-between mt-4 pt-3 border-t border-charcoal-800/80">
                <span class="text-2xs text-charcoal-400 flex items-center gap-1">
                  <Icon name="mdi:map-marker" class="w-3 h-3 text-gold-500" />
                  {{ img.location }}
                </span>
                <span class="text-2xs text-charcoal-500 italic">
                  {{ getDomain(img.source) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-24 text-center border border-dashed border-charcoal-800 rounded-3xl bg-charcoal-950/20 max-w-xl mx-auto">
        <Icon name="mdi:image-search-outline" class="w-16 h-16 text-charcoal-600 mx-auto mb-4" />
        <h2 class="font-heading font-bold text-ivory text-xl mb-2">Không tìm thấy hình ảnh</h2>
        <p class="text-charcoal-400 text-sm mb-6 max-w-sm mx-auto">Chúng tôi không tìm thấy kết quả phù hợp với từ khóa hoặc danh mục đã chọn.</p>
        <button class="btn-primary" @click="clearFilters">Xóa bộ lọc</button>
      </div>
    </div>

    <!-- Gorgeous Lightbox Overlay -->
    <Transition name="fade">
      <div v-if="activeLightboxImage" class="fixed inset-0 z-[100] bg-charcoal-950/98 flex items-center justify-center p-4 backdrop-blur-md">
        <!-- Close Button -->
        <button
          class="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-charcoal-900 border border-charcoal-800 text-ivory hover:text-gold-400 flex items-center justify-center transition-all duration-300"
          aria-label="Đóng ảnh"
          @click="closeLightbox"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>

        <!-- Navigation Buttons -->
        <button
          class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-900/50 border border-charcoal-800/50 text-ivory hover:text-gold-400 hover:bg-charcoal-900 flex items-center justify-center transition-all duration-300"
          aria-label="Ảnh trước"
          @click="prevImage"
        >
          <Icon name="mdi:chevron-left" class="w-8 h-8" />
        </button>
        <button
          class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-900/50 border border-charcoal-800/50 text-ivory hover:text-gold-400 hover:bg-charcoal-900 flex items-center justify-center transition-all duration-300"
          aria-label="Ảnh tiếp theo"
          @click="nextImage"
        >
          <Icon name="mdi:chevron-right" class="w-8 h-8" />
        </button>

        <!-- Lightbox Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 max-w-6xl w-full h-[85vh] bg-charcoal-900 border border-charcoal-800 rounded-3xl overflow-hidden shadow-warm-xxl">
          <!-- Image frame -->
          <div class="lg:col-span-2 relative bg-charcoal-950 flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-charcoal-800">
            <img
              :src="activeLightboxImage.sizes.lg"
              :alt="lang === 'vi' ? activeLightboxImage.alt.vi : activeLightboxImage.alt.en"
              class="max-h-full max-w-full object-contain rounded-xl shadow-warm-lg"
            />
          </div>

          <!-- Metadata Sidebar -->
          <div class="p-8 flex flex-col justify-between h-full overflow-y-auto">
            <div>
              <span
                class="eyebrow text-2xs px-3.5 py-1.5 rounded-full inline-block mb-6"
                :style="{ backgroundColor: `${getCategoryColor(activeLightboxImage.category)}20`, color: getCategoryColor(activeLightboxImage.category), border: `1px solid ${getCategoryColor(activeLightboxImage.category)}35` }"
              >
                {{ getCategoryLabel(activeLightboxImage.category) }}
              </span>

              <h2 class="font-heading font-bold text-ivory text-3xl leading-snug mb-4">
                {{ activeLightboxImage.title }}
              </h2>

              <div class="space-y-4 mb-6">
                <div class="flex items-start gap-3">
                  <Icon name="mdi:map-marker" class="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 class="text-xs text-charcoal-450 uppercase font-semibold tracking-wider">Địa danh / Vị trí</h4>
                    <p class="text-charcoal-250 text-sm font-medium">{{ activeLightboxImage.location }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <Icon name="mdi:web" class="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 class="text-xs text-charcoal-450 uppercase font-semibold tracking-wider">Nguồn chính thống</h4>
                    <a :href="activeLightboxImage.source" target="_blank" class="text-gold-400 text-sm hover:underline">
                      {{ getDomain(activeLightboxImage.source) }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="border-t border-charcoal-800/80 pt-6">
                <h4 class="text-xs text-charcoal-450 uppercase font-semibold tracking-wider mb-2">Mô tả văn hóa</h4>
                <p class="text-charcoal-300 text-sm leading-relaxed">
                  {{ lang === 'vi' ? activeLightboxImage.alt.vi : activeLightboxImage.alt.en }}
                </p>
              </div>
            </div>

            <!-- Footer: Dominant Color theme & Download link -->
            <div class="border-t border-charcoal-800/80 pt-6 mt-8">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs text-charcoal-450 uppercase font-semibold tracking-wider mb-2">Màu chủ đạo</h4>
                  <div class="flex items-center gap-2">
                    <span
                      class="w-6 h-6 rounded-full border border-charcoal-700 shadow-sm"
                      :style="{ backgroundColor: activeLightboxImage.dominantColors[0] }"
                      :title="activeLightboxImage.dominantColors[0]"
                    />
                    <span class="text-xs font-mono text-charcoal-400">{{ activeLightboxImage.dominantColors[0] }}</span>
                  </div>
                </div>

                <a
                  :href="activeLightboxImage.sizes.lg"
                  download
                  target="_blank"
                  class="btn-primary py-2.5 px-5 text-xs inline-flex items-center gap-1.5"
                >
                  <Icon name="mdi:download" class="w-4 h-4" />
                  Tải ảnh gốc
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import metadata from '../../public/images/heritage/metadata.json'

definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Triển Lãm Ảnh Di Sản Bù Đăng — Thư Viện Kỹ Thuật Số',
  description: 'Khám phá bộ sưu tập hình ảnh di sản, văn hóa phi vật thể, danh thắng sinh thái tự nhiên và di tích lịch sử Bù Đăng.',
})

interface HeritageImage {
  id: string
  title: string
  source: string
  location: string
  category: string
  alt: {
    vi: string
    en: string
  }
  dominantColors: string[]
  orientation: string
  placeholder: string
  sizes: {
    sm: string
    md: string
    lg: string
  }
}

const images = ref<HeritageImage[]>(metadata.images)

// State
const searchQuery = ref('')
const activeCategory = ref('')
const lang = ref<'vi' | 'en'>('vi')
const loadedImages = ref<Record<string, boolean>>({})
const activeLightboxImage = ref<HeritageImage | null>(null)

watch(activeLightboxImage, (newVal) => {
  if (import.meta.client) {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

function handleKeydown(e: KeyboardEvent) {
  if (!activeLightboxImage.value) return
  if (e.key === 'Escape') {
    closeLightbox()
  } else if (e.key === 'ArrowLeft') {
    prevImage()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})

// Unique categories list
const uniqueCategories = computed(() => {
  const cats = images.value.map((img) => img.category)
  return Array.from(new Set(cats))
})

// Filter images based on category and search query
const filteredImages = computed(() => {
  return images.value.filter((img) => {
    const matchesCategory = !activeCategory.value || img.category === activeCategory.value
    const matchesSearch =
      !searchQuery.value ||
      img.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      img.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      img.alt.vi.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      img.alt.en.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

function onImageLoad(id: string) {
  loadedImages.value[id] = true
}

function clearFilters() {
  searchQuery.value = ''
  activeCategory.value = ''
}

// Category helper maps
function getCategoryLabel(cat: string) {
  const map: Record<string, string> = {
    'lich-su': 'Lịch Sử',
    'danh-thang': 'Danh Thắng',
    'van-hoa-phi-vat-the': 'Phi Vật Thể',
    'doi-song-cong-dong': 'Cộng Đồng',
    'giao-duc-truyen-thong': 'Giáo Dục',
  }
  return map[cat] || cat
}

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    'lich-su': '#8B3A2A', // brick
    'danh-thang': '#2D5016', // forest
    'van-hoa-phi-vat-the': '#C9922A', // gold
    'doi-song-cong-dong': '#6B4C35', // earth
    'giao-duc-truyen-thong': '#B87333', // copper
  }
  return map[cat] || '#C9922A'
}

function getCategoryIcon(cat: string) {
  const map: Record<string, string> = {
    'lich-su': 'mdi:history',
    'danh-thang': 'mdi:image-filter-hdr',
    'van-hoa-phi-vat-the': 'mdi:music-clef-treble',
    'doi-song-cong-dong': 'mdi:account-group',
    'giao-duc-truyen-thong': 'mdi:school',
  }
  return map[cat] || 'mdi:image'
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

// Lightbox Navigation
function openLightbox(img: HeritageImage) {
  activeLightboxImage.value = img
}

function closeLightbox() {
  activeLightboxImage.value = null
}

function prevImage() {
  if (!activeLightboxImage.value) return
  const currentIndex = filteredImages.value.findIndex((img) => img.id === activeLightboxImage.value?.id)
  const prevIndex = (currentIndex - 1 + filteredImages.value.length) % filteredImages.value.length
  activeLightboxImage.value = filteredImages.value[prevIndex] || null
}

function nextImage() {
  if (!activeLightboxImage.value) return
  const currentIndex = filteredImages.value.findIndex((img) => img.id === activeLightboxImage.value?.id)
  const nextIndex = (currentIndex + 1) % filteredImages.value.length
  activeLightboxImage.value = filteredImages.value[nextIndex] || null
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
