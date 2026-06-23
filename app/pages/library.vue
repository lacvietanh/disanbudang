<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory pt-[72px]">
    <!-- Header section -->
    <div class="bg-dark-earth py-20 relative overflow-hidden border-b border-charcoal-850">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div class="noise-overlay" />
      </div>
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Không Gian Lưu Trữ Kỹ Thuật Số</span>
        <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-none mb-5">
          Thư Viện<br/> <span class="text-gradient-gold">Di Sản Bù Đăng</span>
        </h1>
        <p class="text-charcoal-350 text-base max-w-2xl leading-relaxed">
          Tra cứu toàn bộ tư liệu di tích lịch sử kháng chiến, danh lam thắng cảnh sinh thái và di sản văn hóa phi vật thể địa phương đã được số hóa chính thống.
        </p>

        <!-- Search bar -->
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
              placeholder="Nhập tên di sản, kỷ nguyên, thẻ từ khóa..."
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

    <div class="container-heritage py-12">
      <!-- Filters + Sort Grid -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-charcoal-850 pb-6">
        <!-- Filters row -->
        <div class="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 shrink-0">
          <button
            class="flex-shrink-0 flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border bg-charcoal-900"
            :class="!activeCategory ? 'bg-gold-500 text-charcoal-900 border-transparent shadow-gold' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory'"
            @click="activeCategory = ''"
          >
            <Icon name="mdi:apps" class="w-4 h-4" />
            Tất cả ({{ store.totalCount }})
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="flex-shrink-0 flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border bg-charcoal-900"
            :class="activeCategory === cat.id ? 'text-ivory border-transparent' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory'"
            :style="activeCategory === cat.id ? { backgroundColor: cat.color } : {}"
            @click="activeCategory = cat.id"
          >
            <Icon :name="cat.icon" class="w-4 h-4" />
            {{ cat.labelShort }}
          </button>
        </div>

        <!-- Sort Select box -->
        <div class="flex items-center gap-3 shrink-0">
          <span class="text-xs text-charcoal-400 uppercase tracking-widest font-semibold">Sắp xếp:</span>
          <select
            v-model="sortOrder"
            class="bg-charcoal-950 border border-charcoal-800 rounded-xl px-4 py-2.5 text-xs text-ivory font-medium focus:outline-none focus:border-gold-500 transition-colors"
          >
            <option value="views">Lượt xem nhiều nhất</option>
            <option value="alpha">Tên di sản (A-Z)</option>
            <option value="newest">Ngày số hóa gần nhất</option>
          </select>
        </div>
      </div>

      <!-- Results count -->
      <div class="flex items-center justify-between mb-8">
        <p class="text-charcoal-400 text-sm">
          Hiển thị <span class="text-gold-400 font-bold">{{ sortedAndFilteredHeritages.length }}</span> / {{ store.totalCount }} di sản
        </p>
        <button
          v-if="searchQuery || activeCategory"
          class="text-gold-400 text-sm flex items-center gap-1.5 hover:text-gold-300 transition-colors bg-charcoal-900 border border-charcoal-800 px-3.5 py-1.5 rounded-xl"
          @click="clearFilters"
        >
          <Icon name="mdi:filter-remove-outline" class="w-4 h-4" />
          Xóa mọi bộ lọc
        </button>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="'skel-'+n" class="rounded-2xl overflow-hidden border border-charcoal-850 bg-charcoal-950/30 animate-pulse">
          <div class="aspect-[4/3] bg-charcoal-800/60" />
          <div class="p-5 space-y-3">
            <div class="h-3 w-16 bg-charcoal-800/60 rounded-full" />
            <div class="h-5 w-full bg-charcoal-800/60 rounded-lg" />
            <div class="h-4 w-3/4 bg-charcoal-800/60 rounded-lg" />
            <div class="h-3 w-1/3 bg-charcoal-800/60 rounded-full mt-3" />
          </div>
        </div>
      </div>

      <!-- Archival Grid -->
      <div v-else-if="sortedAndFilteredHeritages.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <HeritageCard
          v-for="(heritage, i) in sortedAndFilteredHeritages"
          :key="heritage.id"
          :heritage="heritage"
          class="border border-charcoal-850"
          @click="navigateTo(`/heritage/${heritage.slug}`)"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center border border-dashed border-charcoal-800 rounded-3xl bg-charcoal-950/20 max-w-xl mx-auto">
        <Icon name="mdi:archive-search-outline" class="w-16 h-16 text-charcoal-600 mx-auto mb-4" />
        <h2 class="font-heading font-bold text-ivory text-xl mb-2">Không Tìm Thấy Kết Quả</h2>
        <p class="text-charcoal-400 text-sm mb-6 max-w-sm mx-auto">Chúng tôi không tìm thấy kết quả phù hợp với từ khóa hoặc bộ lọc danh mục đã chọn.</p>
        <button class="btn-primary" @click="clearFilters">Xóa Bộ Lọc</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/data/categories'

definePageMeta({ layout: 'default' })
useSeoMeta({
  title: 'Thư Viện Số Di Sản Bù Đăng — Tra Cứu Kho Tàng Địa Phương',
  description: 'Tìm kiếm, lọc và phân loại hồ sơ thông tin của các di sản lịch sử oai hùng, danh thắng sinh thái tự nhiên và nét văn hóa độc đáo tại Bù Đăng.',
})

const store = useHeritageStore()
const { observeAll } = useScrollReveal()
const route = useRoute()

const categories = CATEGORIES
const searchQuery = ref('')
const activeCategory = ref('')
const sortOrder = ref('views')
const isLoading = ref(true)

let debounceTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, (q) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  if (!q) {
    store.setSearch(q)
  } else {
    debounceTimer = setTimeout(() => {
      store.setSearch(q)
    }, 300)
  }
})
onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
watch(activeCategory, (c) => store.setCategory(c))

const sortedAndFilteredHeritages = computed(() => {
  const result = [...store.filteredHeritages]
  if (sortOrder.value === 'alpha') {
    return result.sort((a, b) => a.title.localeCompare(b.title, 'vi'))
  } else if (sortOrder.value === 'newest') {
    return result.sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
  } else {
    // Default by viewCount
    return result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
  }
})

onMounted(() => {
  // Brief skeleton delay for perceived performance
  setTimeout(() => {
    isLoading.value = false
  }, 300)

  if (route.query.category) {
    activeCategory.value = route.query.category as string
  }
  if (route.query.search) {
    searchQuery.value = route.query.search as string
  }
})

watch(() => route.query.search, (value) => {
  searchQuery.value = typeof value === 'string' ? value : ''
})

function clearFilters() {
  searchQuery.value = ''
  activeCategory.value = ''
  store.clearFilters()
}
</script>
