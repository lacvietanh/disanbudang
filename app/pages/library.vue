<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory pt-[72px]">
    <!-- Header section -->
    <div class="bg-dark-earth py-20 relative overflow-hidden border-b border-charcoal-850">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div class="absolute top-0 left-0 w-72 h-72 bg-forest-500/5 rounded-full blur-3xl" />
        <div class="noise-overlay" />
      </div>
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Không Gian Lưu Trữ Kỹ Thuật Số</span>
        <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-none mb-5">
          Thư Viện<br/> <span class="text-gradient-gold">Di Sản Bù Đăng</span>
        </h1>
        <p class="text-charcoal-300 text-base max-w-2xl leading-relaxed">
          Toàn bộ kho tàng số hóa — từ hồ sơ di tích lịch sử oai hùng, danh thắng sinh thái đến những ký ức sống động do chính đồng bào Bù Đăng cùng gìn giữ và đóng góp.
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
              class="w-full bg-charcoal-950 border border-charcoal-800 rounded-2xl text-ivory text-base placeholder-charcoal-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300"
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

    <!-- Main tab switcher -->
    <div class="border-b border-charcoal-850 bg-charcoal-950/60 backdrop-blur-sm sticky top-[72px] z-20">
      <div class="container-heritage flex items-center gap-1">
        <button
          v-for="tab in mainTabs"
          :key="tab.id"
          class="flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-300 whitespace-nowrap"
          :class="activeMainTab === tab.id
            ? 'border-gold-500 text-gold-400'
            : 'border-transparent text-charcoal-400 hover:text-ivory hover:border-charcoal-700'"
          @click="activeMainTab = tab.id"
          :id="`tab-${tab.id}`"
        >
          <Icon :name="tab.icon" class="w-4.5 h-4.5" />
          {{ tab.label }}
          <span
            class="text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5"
            :class="activeMainTab === tab.id ? 'bg-gold-500/20 text-gold-400' : 'bg-charcoal-800 text-charcoal-400'"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- ===== TAB: DI SẢN ===== -->
    <div v-if="activeMainTab === 'heritage'" class="container-heritage py-12">
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
          <div class="relative flex items-center">
            <select
              v-model="sortOrder"
              class="appearance-none bg-charcoal-950 border border-charcoal-800 rounded-xl pl-4 pr-10 py-2.5 text-xs text-ivory font-medium focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all cursor-pointer"
            >
              <option value="views">Lượt xem nhiều nhất</option>
              <option value="alpha">Tên di sản (A-Z)</option>
              <option value="newest">Ngày số hóa gần nhất</option>
            </select>
            <Icon name="mdi:chevron-down" class="w-4.5 h-4.5 text-gold-450 absolute right-3 pointer-events-none" />
          </div>
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

    <!-- ===== TAB: KÝ ỨC CỘNG ĐỒNG ===== -->
    <div v-if="activeMainTab === 'community'" class="container-heritage py-12">
      <!-- Sub-filter tabs -->
      <div class="flex items-center gap-2.5 overflow-x-auto scrollbar-none mb-10 border-b border-charcoal-850 pb-4">
        <button
          v-for="tab in communityTabs"
          :key="tab.id"
          class="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border bg-charcoal-900"
          :class="activeCommunityTab === tab.id
            ? 'bg-gold-500 text-charcoal-900 border-transparent shadow-gold'
            : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory'"
          @click="activeCommunityTab = tab.id"
        >
          <Icon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Featured post - large cinematic card -->
      <div v-if="featuredPost && activeCommunityTab === 'all'" class="mb-14">
        <NuxtLink
          :to="`/explore/${featuredPost.id}`"
          class="block group relative overflow-hidden rounded-3xl border border-charcoal-850 aspect-[21/8] min-h-[320px]"
        >
          <img :src="featuredPost.coverImage" :alt="featuredPost.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/60 to-transparent" />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />

          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10 max-w-3xl z-10">
            <BaseBadge variant="gold" class="mb-3.5">{{ typeLabels[featuredPost.type] }}</BaseBadge>
            <h2 class="font-heading font-bold text-ivory text-2xl lg:text-4xl leading-snug mb-3.5 text-shadow-hero group-hover:text-gold-300 transition-colors">
              {{ featuredPost.title }}
            </h2>
            <p class="text-charcoal-300 text-sm leading-relaxed mb-5 line-clamp-2">{{ featuredPost.excerpt }}</p>

            <div class="flex items-center gap-4 border-t border-charcoal-800/80 pt-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                  <Icon name="mdi:account-outline" class="w-4 h-4 text-gold-450" />
                </div>
                <div>
                  <span class="text-ivory text-xs font-semibold block leading-tight">{{ featuredPost.author.name }}</span>
                  <span class="text-charcoal-500 text-[10px]">{{ featuredPost.author.role }}</span>
                </div>
              </div>
              <div class="flex items-center gap-1.5 text-charcoal-400 ml-auto bg-charcoal-950/60 border border-charcoal-850 rounded-full px-3 py-1 text-xs">
                <Icon name="mdi:eye-outline" class="w-4 h-4" />
                <span>{{ featuredPost.viewCount ?? 0 }} lượt xem</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Posts grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, i) in filteredCommunityPosts"
          :key="post.id"
          :to="`/explore/${post.id}`"
          class="bg-charcoal-950/40 rounded-2xl overflow-hidden shadow-xl border border-charcoal-850 hover:border-gold-500/30 transition-all duration-500 group cursor-pointer flex flex-col justify-between"
          :style="{ animationDelay: `${i * 0.05}s` }"
        >
          <div>
            <div class="aspect-[16/10] overflow-hidden relative border-b border-charcoal-850">
              <img :src="post.coverImage" :alt="post.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 to-transparent" />
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="tag tag-gold text-[9px]">
                  <Icon :name="typeIcons[post.type]" class="w-3.5 h-3.5" />
                  {{ typeLabels[post.type] }}
                </span>
                <div class="flex items-center gap-1 text-charcoal-400 text-xs bg-charcoal-900 border border-charcoal-800 px-2 py-0.5 rounded-full">
                  <Icon name="mdi:eye-outline" class="w-3.5 h-3.5" />
                  <span>{{ post.viewCount ?? 0 }}</span>
                </div>
              </div>
              <h3 class="font-heading font-bold text-ivory text-base leading-snug mb-2.5 line-clamp-2 group-hover:text-gold-300 transition-colors">{{ post.title }}</h3>
              <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-3">{{ post.excerpt }}</p>
            </div>
          </div>

          <div class="p-6 pt-0">
            <div class="border-t border-charcoal-850 pt-4 flex items-center gap-3">
              <div class="w-7 h-7 rounded-full bg-charcoal-900 border border-charcoal-800 flex items-center justify-center shrink-0">
                <Icon name="mdi:account" class="w-4 h-4 text-gold-400" />
              </div>
              <div class="min-w-0">
                <p class="text-ivory text-xs font-semibold truncate leading-tight">{{ post.author.name }}</p>
                <p class="text-charcoal-500 text-[10px] truncate">{{ post.author.role }}{{ post.author.grade ? ` • Lớp ${post.author.grade}` : '' }}</p>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Empty state -->
        <div v-if="filteredCommunityPosts.length === 0" class="col-span-full py-24 text-center">
          <Icon name="mdi:book-open-page-variant-outline" class="w-14 h-14 text-charcoal-700 mx-auto mb-4" />
          <p class="text-charcoal-400 font-heading font-semibold text-lg mb-2">Chưa có nội dung trong danh mục này</p>
          <p class="text-charcoal-500 text-sm mb-6">Hãy là người đầu tiên chia sẻ câu chuyện của bạn!</p>
          <NuxtLink to="/contribute" class="btn-primary inline-flex">
            <Icon name="mdi:upload" class="w-4 h-4" />
            Đóng Góp Ngay
          </NuxtLink>
        </div>
      </div>

      <!-- Contribute CTA -->
      <div class="mt-16 text-center">
        <div class="inline-block bg-gradient-to-br from-charcoal-950 to-charcoal-900 border border-charcoal-850 rounded-3xl px-10 py-8 max-w-xl mx-auto shadow-2xl relative">
          <div class="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-xl pointer-events-none" />
          <Icon name="mdi:book-open-page-variant-outline" class="w-10 h-10 text-gold-400 mx-auto mb-3.5" />
          <h3 class="font-heading font-bold text-ivory text-xl mb-2.5">Ký Ức Của Bạn Xứng Đáng Được Kính Trọng</h3>
          <p class="text-charcoal-400 text-sm mb-5 leading-relaxed">Hãy chia sẻ hình ảnh kỷ vật xưa, những ghi chép bản địa hoặc cảm nghĩ riêng của bạn để xây dựng bức tranh di sản sống động.</p>
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
  title: 'Thư Viện Số Di Sản Bù Đăng - Tra Cứu và Ký Ức',
  description: 'Toàn bộ kho tàng số hóa di sản Bù Đăng bao gồm hồ sơ di tích lịch sử, danh thắng sinh thái và ký ức sống động từ đồng bào.'
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

const featuredPost = computed(() => MOCK_COMMUNITY_POSTS.find((p) => p.featured))

const filteredCommunityPosts = computed(() => {
  if (activeCommunityTab.value === 'all') {
    return MOCK_COMMUNITY_POSTS.filter((p) => !p.featured)
  }
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
  } else {
    return result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
  }
})

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
  nextTick(() => observeAll())

  if (route.query.category) {
    activeCategory.value = route.query.category as string
  }
  if (route.query.search) {
    searchQuery.value = route.query.search as string
  }
  if (route.query.tab === 'community') {
    activeMainTab.value = 'community'
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
