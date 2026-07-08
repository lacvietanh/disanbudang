<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory pt-[72px]">
    <!-- Hero header -->
    <div class="bg-dark-earth py-10 md:py-14 relative overflow-hidden border-b border-charcoal-850">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div class="absolute top-0 left-0 w-72 h-72 bg-forest-500/5 rounded-full blur-3xl" />
        <div class="noise-overlay" />
      </div>
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Di Sản & Ký Ức Cộng Đồng</span>
        <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-[1.28] mb-5">
          Thư Viện Di Sản<br/>
          <span class="text-gradient-gold">Thành Phố Đồng Nai</span>
        </h1>
        <p class="text-charcoal-300 text-base max-w-2xl leading-relaxed">
          {{ store.totalCount }} di sản số hóa và hàng chục ký ức do người dân tự tay đóng góp — đây là kho lưu trữ sống của vùng đất Bù Đăng. Từ những di tích oai hùng đến những câu chuyện được kể lại bên bếp lửa.
        </p>

        <!-- Search bar — chỉ hiện ở tab Di Sản -->
        <div v-if="activeMainTab === 'heritage'" class="mt-8 max-w-xl">
          <div class="relative">
            <Icon
              name="mdi:magnify"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400 pointer-events-none z-10"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Nhập tên di sản, danh thắng, từ khóa..."
              class="w-full bg-charcoal-950 border border-charcoal-800 rounded-2xl text-ivory text-base pl-12 pr-12 py-4 placeholder-charcoal-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300"
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

    <!-- Sticky tab bar -->
    <div class="border-b border-charcoal-850 bg-charcoal-950/90 backdrop-blur-md sticky top-[68px] z-30">
      <div class="container-heritage flex items-center overflow-x-auto scrollbar-none">
        <button
          v-for="tab in mainTabs"
          :key="tab.id"
          class="flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-300 whitespace-nowrap"
          :class="activeMainTab === tab.id
            ? 'border-gold-500 text-gold-400'
            : 'border-transparent text-charcoal-400 hover:text-ivory'"
          :id="`main-tab-${tab.id}`"
          @click="activeMainTab = tab.id"
        >
          <Icon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
          <span
            class="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            :class="activeMainTab === tab.id ? 'bg-gold-500/20 text-gold-400' : 'bg-charcoal-800 text-charcoal-500'"
          >{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- ===== TAB: DI SẢN ===== -->
    <div v-show="activeMainTab === 'heritage'" class="container-heritage py-10">
      <!-- Filters + Sort -->
      <div class="flex flex-col gap-4 mb-8 pb-6 border-b border-charcoal-850">
        <!-- Filter chips -->
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
          <button
            class="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border"
            :class="!activeCategory
              ? 'bg-gold-500 text-charcoal-900 border-transparent'
              : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
            @click="activeCategory = ''"
          >
            <Icon name="mdi:apps" class="w-3.5 h-3.5" />
            Tất cả ({{ store.totalCount }})
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border"
            :class="activeCategory === cat.id
              ? 'text-ivory border-transparent'
              : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
            :style="activeCategory === cat.id ? { backgroundColor: cat.color } : {}"
            @click="activeCategory = cat.id"
          >
            <Icon :name="cat.icon" class="w-3.5 h-3.5" />
            {{ cat.labelShort }}
          </button>
        </div>

        <!-- Sort + Result count -->
        <div class="flex items-center justify-between gap-4">
          <p class="text-charcoal-400 text-sm">
            <span class="text-gold-400 font-bold">{{ sortedAndFilteredHeritages.length }}</span>
            / {{ store.totalCount }} di sản
            <span v-if="searchQuery || activeCategory" class="ml-2">
              <button class="text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-2 text-xs" @click="clearFilters">Xóa bộ lọc</button>
            </span>
          </p>
          <div class="relative flex items-center shrink-0">
            <select
              v-model="sortOrder"
              class="appearance-none bg-charcoal-950 border border-charcoal-800 rounded-xl pl-4 pr-9 py-2 text-xs text-ivory font-medium focus:outline-none focus:border-gold-500/60 transition-all cursor-pointer"
            >
              <option value="views">Xem nhiều nhất</option>
              <option value="alpha">Tên A-Z</option>
              <option value="newest">Mới nhất</option>
            </select>
            <Icon name="mdi:chevron-down" class="w-4 h-4 text-gold-450 absolute right-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="'skel-'+n" class="rounded-2xl overflow-hidden border border-charcoal-850 bg-charcoal-950/30 animate-pulse">
          <div class="aspect-[4/3] bg-charcoal-800/60" />
          <div class="p-5 space-y-3">
            <div class="h-3 w-16 bg-charcoal-800/60 rounded-full" />
            <div class="h-5 w-full bg-charcoal-800/60 rounded-lg" />
            <div class="h-4 w-3/4 bg-charcoal-800/60 rounded-lg" />
          </div>
        </div>
      </div>

      <!-- Heritage Grid -->
      <div v-else-if="sortedAndFilteredHeritages.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <HeritageCard
          v-for="heritage in sortedAndFilteredHeritages"
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
        <p class="text-charcoal-400 text-sm mb-6 max-w-sm mx-auto">Thử từ khóa khác hoặc xóa bộ lọc đang chọn.</p>
        <button class="btn-primary" @click="clearFilters">Xóa Bộ Lọc</button>
      </div>
    </div>

    <!-- ===== TAB: KÝ ỨC CỘNG ĐỒNG ===== -->
    <div v-show="activeMainTab === 'community'" class="container-heritage py-10">
      <!-- Sub-filter tabs -->
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-none mb-8 pb-4 border-b border-charcoal-850 -mx-1 px-1">
        <button
          v-for="tab in communityTabs"
          :key="tab.id"
          class="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border"
          :class="activeCommunityTab === tab.id
            ? 'bg-gold-500 text-charcoal-900 border-transparent'
            : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
          @click="activeCommunityTab = tab.id"
        >
          <Icon :name="tab.icon" class="w-3.5 h-3.5" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Posts grid -->
      <div v-if="filteredCommunityPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, i) in filteredCommunityPosts"
          :key="post.id"
          :to="`/explore/${post.id}`"
          class="bg-charcoal-950/40 rounded-2xl overflow-hidden border border-charcoal-850 hover:border-gold-500/30 transition-all duration-500 group flex flex-col reveal"
          :style="{ animationDelay: `${i * 0.05}s` }"
        >
          <!-- Cover image -->
          <div class="aspect-[16/10] overflow-hidden relative border-b border-charcoal-850 shrink-0">
            <img
              :src="post.coverImage"
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
            <!-- Featured badge -->
            <div v-if="post.featured" class="absolute top-3 left-3">
              <span class="bg-gold-500 text-charcoal-900 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">Nổi bật</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-center justify-between mb-3">
              <span class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
                <Icon :name="typeIcons[post.type]" class="w-3 h-3" />
                {{ typeLabels[post.type] }}
              </span>
              <div v-if="post.viewCount" class="flex items-center gap-1 text-charcoal-500 text-xs">
                <Icon name="mdi:eye-outline" class="w-3.5 h-3.5" />
                <span>{{ post.viewCount }}</span>
              </div>
            </div>
            <h3 class="font-heading font-bold text-ivory text-base leading-snug mb-2 line-clamp-2 group-hover:text-gold-300 transition-colors flex-1">
              {{ post.title }}
            </h3>
            <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-2 mb-4">{{ post.excerpt }}</p>

            <!-- Author -->
            <div class="flex items-center gap-2.5 border-t border-charcoal-850 pt-4 mt-auto">
              <div class="w-7 h-7 rounded-full bg-charcoal-900 border border-charcoal-800 flex items-center justify-center shrink-0">
                <Icon name="mdi:account" class="w-4 h-4 text-gold-400/70" />
              </div>
              <div class="min-w-0">
                <p class="text-ivory text-xs font-semibold truncate leading-tight">{{ post.author.name }}</p>
                <p class="text-charcoal-500 text-[10px] truncate">
                  {{ post.author.role }}{{ post.author.grade ? ` · Lớp ${post.author.grade}` : '' }}
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="py-24 text-center border border-dashed border-charcoal-800 rounded-3xl max-w-xl mx-auto">
        <Icon name="mdi:book-open-page-variant-outline" class="w-14 h-14 text-charcoal-700 mx-auto mb-4" />
        <p class="text-charcoal-400 font-heading font-semibold text-lg mb-2">Chưa có nội dung trong danh mục này</p>
        <p class="text-charcoal-500 text-sm mb-6">Hãy là người đầu tiên chia sẻ câu chuyện của mình.</p>
        <NuxtLink to="/contribute" class="btn-primary inline-flex">
          <Icon name="mdi:upload" class="w-4 h-4" />
          Đóng Góp Ngay
        </NuxtLink>
      </div>

      <!-- Contribute CTA -->
      <div class="mt-14 text-center reveal">
        <div class="inline-block bg-charcoal-950 border border-charcoal-850 rounded-3xl px-8 py-7 max-w-lg mx-auto shadow-2xl">
          <Icon name="mdi:book-open-page-variant-outline" class="w-9 h-9 text-gold-400 mx-auto mb-3" />
          <h3 class="font-heading font-bold text-ivory text-lg mb-2">Ký ức nào cũng xứng đáng được lưu lại</h3>
          <p class="text-charcoal-400 text-sm mb-5 leading-relaxed">Một tấm ảnh xưa, một đoạn ghi chép, hay chỉ là câu chuyện kể bên bếp lửa — mỗi mảnh ghép đều làm bức tranh di sản thêm đầy đặn.</p>
          <NuxtLink to="/contribute" class="btn-primary inline-flex">
            Gửi Ký Ức Đóng Góp
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/data/categories'
import { MOCK_COMMUNITY_POSTS } from '~/data/mockPosts'
import type { PostType } from '~/types'

definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Thư Viện Di Sản Thành Phố Đồng Nai — Khám Phá & Ký Ức Cộng Đồng',
  description: 'Toàn bộ di sản số hóa và ký ức cộng đồng của Thành Phố Đồng Nai. Tra cứu di tích lịch sử, danh thắng thiên nhiên, văn hoá phi vật thể và những câu chuyện từ chính người dân địa phương.'
})

const store = useHeritageStore()
const { observeAll } = useScrollReveal()
const route = useRoute()

const categories = CATEGORIES
const searchQuery = ref('')
const activeCategory = ref('')
const sortOrder = ref('views')
const isLoading = ref(true)
const activeMainTab = ref('heritage')
const activeCommunityTab = ref('all')

const mainTabs = computed(() => [
  { id: 'heritage', label: 'Di Sản', icon: 'mdi:archive-outline', count: store.totalCount },
  { id: 'community', label: 'Ký Ức Cộng Đồng', icon: 'mdi:account-group-outline', count: MOCK_COMMUNITY_POSTS.length },
])

const communityTabs = [
  { id: 'all', label: 'Tất Cả', icon: 'mdi:apps' },
  { id: 'story', label: 'Câu Chuyện', icon: 'mdi:book-open-variant' },
  { id: 'artwork', label: 'Tranh Vẽ', icon: 'mdi:palette' },
  { id: 'photo', label: 'Ảnh Tư Liệu', icon: 'mdi:camera' },
  { id: 'memory', label: 'Ký Ức', icon: 'mdi:heart' },
  { id: 'research', label: 'Khảo Cứu', icon: 'mdi:magnify' },
]

const typeLabels: Record<PostType, string> = {
  story: 'Câu Chuyện', artwork: 'Tranh Vẽ', photo: 'Ảnh Tư Liệu', memory: 'Ký Ức', research: 'Khảo Cứu',
}
const typeIcons: Record<PostType, string> = {
  story: 'mdi:book-open-variant', artwork: 'mdi:palette', photo: 'mdi:camera', memory: 'mdi:heart', research: 'mdi:magnify',
}

// Community posts — đơn giản: 'all' hiện tất cả, các tab khác filter theo type
const filteredCommunityPosts = computed(() => {
  if (activeCommunityTab.value === 'all') return MOCK_COMMUNITY_POSTS
  return MOCK_COMMUNITY_POSTS.filter((p) => p.type === activeCommunityTab.value)
})

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
  }
  return result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
})

onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 500)
  nextTick(() => observeAll())

  if (route.query.category) activeCategory.value = route.query.category as string
  if (route.query.search) searchQuery.value = route.query.search as string
  if (route.query.tab === 'community') activeMainTab.value = 'community'
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
