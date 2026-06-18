<template>
  <div class="min-h-screen bg-charcoal-900 flex flex-col relative">
    <!-- Page header -->
    <div class="border-b border-charcoal-800/80 py-5 bg-charcoal-950/90 backdrop-blur-xl relative z-30 shadow-lg shadow-charcoal-950/40">
      <div class="container-heritage flex items-center justify-between">
        <div>
          <span class="eyebrow text-gold-400 text-3xs mb-1.5 block tracking-widest font-bold">Không Gian Bản Đồ Tương Tác</span>
          <h1 class="font-heading font-bold text-ivory text-2xl leading-none tracking-tight">Bản Đồ Di Sản Bù Đăng</h1>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-charcoal-355 text-xs hidden sm:inline-flex items-center gap-2 bg-charcoal-900 border border-charcoal-800 rounded-full px-3.5 py-1.5 font-medium">
            <span class="w-2 h-2 rounded-full bg-gold-400 animate-pulse-gold"></span>
            {{ store.filteredHeritages.length }} di sản hiển thị
          </span>
          <button
            class="lg:hidden btn-ghost text-xs border border-charcoal-800 rounded-xl px-4 py-2 hover:border-gold-500/40"
            @click="sidebarOpen = !sidebarOpen"
          >
            <Icon :name="sidebarOpen ? 'mdi:close' : 'mdi:filter-outline'" class="w-4 h-4 text-gold-400 mr-1" />
            Bộ lọc & Tuyến
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar -->
      <aside
        class="absolute lg:relative z-20 w-80 lg:w-90 h-full bg-charcoal-950/95 backdrop-blur-xl border-r border-charcoal-850 flex flex-col transition-transform duration-300 lg:translate-x-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <!-- Tab Selectors -->
        <div class="grid grid-cols-2 border-b border-charcoal-850 bg-charcoal-900/40">
          <button
            class="py-4 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
            :class="activeTab === 'search' ? 'border-gold-500 text-gold-400 bg-charcoal-950/80' : 'border-transparent text-charcoal-400 hover:text-ivory'"
            @click="activeTab = 'search'"
          >
            <Icon name="mdi:magnify" class="w-4 h-4 text-gold-500" />
            Tìm Di Sản
          </button>
          <button
            class="py-4 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
            :class="activeTab === 'route' ? 'border-gold-500 text-gold-400 bg-charcoal-950/80' : 'border-transparent text-charcoal-400 hover:text-ivory'"
            @click="activeTab = 'route'"
          >
            <Icon name="mdi:road-variant" class="w-4 h-4 text-gold-500" />
            Tuyến Lộ Trình
          </button>
        </div>

        <!-- SEARCH & FILTER TAB -->
        <div v-if="activeTab === 'search'" class="flex-1 flex flex-col min-h-0">
          <!-- Search input -->
          <div class="p-4 border-b border-charcoal-850 bg-charcoal-950/40">
            <div class="relative">
              <Icon name="mdi:magnify" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm di tích, văn hóa, danh thắng..."
                class="w-full pl-9 pr-9 py-2.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm placeholder-charcoal-500 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 shadow-inner"
              />
              <button
                v-if="searchQuery"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-ivory transition-colors"
                @click="searchQuery = ''"
              >
                <Icon name="mdi:close-circle" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Category filter list -->
          <div class="p-4 border-b border-charcoal-850 space-y-3 shrink-0 bg-charcoal-950/20">
            <p class="eyebrow text-gold-400 text-3xs tracking-widest font-bold">DANH MỤC DI SẢN BÙ ĐĂNG</p>
            <div class="flex flex-col gap-1.5 max-h-52 overflow-y-auto scrollbar-none pr-1">
              <button
                class="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border border-charcoal-800 hover:border-charcoal-700 hover:text-ivory"
                :class="activeCategory === '' ? 'bg-gold-500/10 text-gold-300 border-gold-500/30 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20'"
                @click="setCategory('')"
              >
                <Icon name="mdi:apps" class="w-4 h-4 text-gold-400" />
                Tất cả di sản
                <span class="ml-auto text-3xs font-medium text-charcoal-400 bg-charcoal-800 px-2 py-0.5 rounded-full border border-charcoal-700">{{ store.totalCount }}</span>
              </button>
              <button
                v-for="cat in categories"
                :key="cat.id"
                class="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border"
                :class="activeCategory === cat.id ? 'text-ivory border-gold-500/30 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                :style="activeCategory === cat.id ? { backgroundColor: `${cat.color}15`, borderColor: `${cat.color}35` } : {}"
                @click="setCategory(cat.id)"
              >
                <Icon :name="cat.icon" class="w-4 h-4" :style="{ color: cat.color }" />
                {{ cat.labelShort }}
                <span class="ml-auto text-3xs font-medium text-charcoal-400 bg-charcoal-800 px-2 py-0.5 rounded-full border border-charcoal-700">{{ heritagesByCategory[cat.id]?.length ?? 0 }}</span>
              </button>
            </div>
          </div>

          <!-- Period filter timeline -->
          <div class="p-4 border-b border-charcoal-850 space-y-3 shrink-0 bg-charcoal-950/20">
            <p class="eyebrow text-gold-400 text-3xs tracking-widest font-bold">THỜI KỲ LỊCH SỬ</p>
            <div class="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              <button
                class="flex-shrink-0 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border"
                :class="activePeriod === '' ? 'bg-gold-500/10 text-gold-300 border-gold-500/30 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                @click="activePeriod = ''"
              >
                Tất cả
              </button>
              <button
                v-for="per in periods"
                :key="per.id"
                class="flex-shrink-0 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border"
                :class="activePeriod === per.id ? 'bg-gold-500/15 text-gold-300 border-gold-500/40 shadow-md' : 'text-charcoal-400 bg-charcoal-900/20 border-charcoal-800 hover:border-charcoal-700 hover:text-ivory'"
                @click="activePeriod = per.id"
              >
                {{ per.label }}
              </button>
            </div>
          </div>

          <!-- Heritage list result -->
          <div class="flex-1 overflow-y-auto scrollbar-none bg-charcoal-950/40">
            <div class="p-3.5 space-y-2">
              <div
                v-for="heritage in store.filteredHeritages"
                :key="heritage.id"
                class="group flex gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-300 border relative overflow-hidden"
                :class="selectedId === heritage.id
                  ? 'bg-gold-500/5 border-gold-500/40 shadow-lg shadow-gold-500/5'
                  : 'bg-charcoal-900/30 border-charcoal-800/40 hover:border-charcoal-750 hover:bg-charcoal-900/70 hover:translate-x-0.5'"
                @click="selectHeritage(heritage)"
              >
                <!-- Indicator block left -->
                <div v-if="selectedId === heritage.id" class="absolute left-0 top-0 bottom-0 w-1 bg-gold-400 rounded-r-md"></div>
                
                <div class="w-18 h-13 rounded-lg overflow-hidden flex-shrink-0 relative border border-charcoal-700 shadow-md">
                  <img :src="heritage.coverImage" :alt="heritage.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-ivory text-sm font-semibold leading-snug line-clamp-1 group-hover:text-gold-300 transition-colors">
                    {{ heritage.title }}
                  </p>
                  <p class="text-charcoal-400 text-3xs uppercase tracking-wider font-bold mt-1.5 flex items-center gap-1.5">
                    <Icon name="mdi:tag-outline" class="w-3.5 h-3.5 text-gold-500" />
                    {{ getCategoryLabel(heritage.category) }}
                  </p>
                </div>
              </div>

              <div v-if="store.filteredHeritages.length === 0" class="py-16 text-center">
                <Icon name="mdi:map-marker-off" class="w-12 h-12 text-charcoal-700 mx-auto mb-3" />
                <p class="text-charcoal-400 text-sm font-medium">Không tìm thấy di sản nào</p>
                <p class="text-charcoal-500 text-xs mt-1">Vui lòng nhập từ khóa tìm kiếm khác</p>
              </div>
            </div>
          </div>
        </div>

        <!-- JOURNEY / ROUTES TAB -->
        <div v-if="activeTab === 'route'" class="flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-none p-4 space-y-5 bg-charcoal-950/20">
          <div class="space-y-1">
            <p class="eyebrow text-gold-400 text-3xs tracking-widest font-bold">TUYẾN ĐƯỜNG ĐỀ XUẤT</p>
            <p class="text-xs text-charcoal-450 leading-relaxed">Khám phá dòng chảy lịch sử và văn hóa bản địa Bù Đăng theo các tuyến đề xuất chuyên sâu.</p>
          </div>

          <div class="space-y-4">
            <!-- Active Route Card -->
            <div
              v-for="route in suggestedRoutes"
              :key="route.id"
              class="border rounded-2xl p-4.5 cursor-pointer transition-all duration-300 relative overflow-hidden"
              :class="selectedRouteId === route.id
                ? 'bg-charcoal-900 border-gold-500/50 shadow-lg shadow-gold-500/5'
                : 'bg-charcoal-900/30 border-charcoal-850 hover:border-charcoal-800 hover:bg-charcoal-900/50'"
              @click="toggleRoute(route)"
            >
              <div class="flex items-center gap-3.5 mb-2.5">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-ivory shrink-0 border border-white/5"
                  :style="{ backgroundColor: `${route.color}15`, color: route.color, borderColor: `${route.color}25` }"
                >
                  <Icon :name="route.icon" class="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 class="font-heading font-bold text-sm text-ivory leading-tight">{{ route.name }}</h4>
                  <p class="text-3xs text-charcoal-400 font-bold uppercase mt-0.5 tracking-wider">{{ route.stops.length }} điểm khám phá</p>
                </div>
              </div>
              <p class="text-xs text-charcoal-405 leading-relaxed">{{ route.description }}</p>

              <!-- Route Stops Sequence -->
              <div v-if="selectedRouteId === route.id" class="mt-4 pt-4 border-t border-charcoal-800/80 space-y-4">
                <p class="text-3xs uppercase text-gold-400 tracking-widest font-bold">Lộ trình chi tiết</p>
                <div class="relative pl-5 border-l border-charcoal-800 ml-2 space-y-4">
                  <div
                    v-for="(stop, sIdx) in route.stops"
                    :key="stop.id"
                    class="relative cursor-pointer group/stop"
                    @click.stop="selectStop(stop)"
                  >
                    <!-- Small marker bullet -->
                    <span
                      class="absolute -left-[25.5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-charcoal-950 transition-all duration-300"
                      :class="selectedId === stop.id ? 'bg-gold-400 scale-125 ring-4 ring-gold-500/20' : 'bg-charcoal-600 group-hover/stop:bg-ivory'"
                      :style="selectedId === stop.id ? {} : { backgroundColor: route.color }"
                    />
                    <p class="text-3xs text-charcoal-455 font-bold uppercase tracking-wider">Điểm dừng {{ sIdx + 1 }}</p>
                    <p class="text-xs text-ivory font-semibold group-hover/stop:text-gold-300 transition-colors mt-0.5">{{ stop.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Clear filters button -->
        <div v-if="(activeCategory || searchQuery || selectedRouteId) && activeTab === 'search'" class="p-4 border-t border-charcoal-850 shrink-0 bg-charcoal-950/60">
          <button class="w-full text-charcoal-400 hover:text-ivory text-xs flex items-center justify-center gap-2 transition-colors py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-800 font-semibold" @click="clearAll">
            <Icon name="mdi:filter-remove-outline" class="w-4 h-4 text-gold-500" />
            Xóa mọi bộ lọc
          </button>
        </div>
      </aside>

      <!-- Map Area -->
      <div class="flex-1 relative">
        <!-- Interactive map component -->
        <ClientOnly>
          <MapContainer
            :heritages="store.filteredHeritages"
            :selected-id="selectedId"
            class="w-full h-full"
            @select="selectHeritage"
          />
          <template #fallback>
            <div class="w-full h-full bg-charcoal-950 flex items-center justify-center">
              <div class="text-center space-y-4">
                <div class="w-16 h-16 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p class="text-charcoal-455 text-sm">Đang kết nối vệ tinh di sản Bù Đăng...</p>
              </div>
            </div>
          </template>
        </ClientOnly>

        <!-- Selected Heritage Overlay details panel -->
        <Transition name="popup-slide">
          <div
            v-if="selectedHeritage"
            class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg px-4"
          >
            <div class="bg-charcoal-950/98 backdrop-blur-xl rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl shadow-charcoal-950/80">
              <!-- Golden accent line on top of panel -->
              <div class="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
              
              <div class="flex gap-4 p-5 items-start">
                <div class="w-24 h-18 rounded-xl overflow-hidden shrink-0 border border-charcoal-800 relative shadow-inner">
                  <img :src="selectedHeritage.coverImage" :alt="selectedHeritage.title" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
                </div>
                <div class="flex-1 min-w-0">
                  <BaseBadge :variant="getCategoryVariant(selectedHeritage.category)" size="sm" class="mb-2 uppercase tracking-widest font-bold">
                    {{ getCategoryLabel(selectedHeritage.category) }}
                  </BaseBadge>
                  <h3 class="font-heading font-bold text-ivory text-base leading-tight tracking-tight mt-1">{{ selectedHeritage.title }}</h3>
                  <p class="text-charcoal-400 text-xs mt-2 line-clamp-2 leading-relaxed">{{ selectedHeritage.shortDescription }}</p>
                </div>
                <button class="text-charcoal-500 hover:text-gold-400 transition-colors shrink-0 p-1 hover:bg-charcoal-900 rounded-lg" @click="selectedId = null">
                  <Icon name="mdi:close" class="w-4 h-4" />
                </button>
              </div>

              <div class="px-5 pb-5 pt-0 flex gap-2.5">
                <NuxtLink :to="`/heritage/${selectedHeritage.slug}`" class="btn-primary text-xs flex-1 justify-center py-2.5 font-bold tracking-wide">
                  <Icon name="mdi:book-open-outline" class="w-4 h-4 mr-1" />
                  Chi Tiết Di Sản
                </NuxtLink>
                <button
                  v-if="selectedHeritage.audio"
                  class="btn-ghost text-xs px-4.5 border-charcoal-800 hover:border-gold-500/40 text-gold-400 hover:bg-gold-500/5 transition-all duration-300 rounded-xl"
                  title="Nghe Audio Guide"
                  @click="playAudio"
                >
                  <Icon name="mdi:headphones" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES, PERIODS } from '~/data/categories'
import { MOCK_HERITAGES } from '~/data/mockHeritages'
import type { Heritage } from '~/types'

definePageMeta({ layout: 'default' })
useSeoMeta({
  title: 'Bản Đồ Di Sản Bù Đăng — Cổng Khám Phá Số',
  description: 'Trực quan hóa vị trí địa lý cùng câu chuyện, audio guide, hình ảnh của toàn bộ di sản văn hóa, lịch sử và thiên nhiên tại Bù Đăng.',
})

const store = useHeritageStore()
const audioStore = useAudioStore()
const { getCategoryLabel } = useHeritage()

const sidebarOpen = ref(true)
const selectedId = ref<string | null>(null)
const searchQuery = ref('')
const activeCategory = ref('')
const activePeriod = ref('')
const activeTab = ref('search')
const selectedRouteId = ref<string | null>(null)

const categories = CATEGORIES
const periods = PERIODS
const selectedHeritage = computed(() =>
  selectedId.value ? store.getById(selectedId.value) ?? null : null,
)

const heritagesByCategory = store.heritagesByCategory

// Suggested routes
const suggestedRoutes = [
  {
    id: 'route-history',
    name: 'Tuyến Cách Mạng Oai Hùng',
    icon: 'mdi:shield-outline',
    color: '#8B3A2A',
    description: 'Về nguồn khám phá các căn cứ quân sự huyết mạch và lớp học kháng chiến oai hùng giữa lòng đại ngàn Bù Đăng.',
    stops: [
      { id: 'hrt-001', title: 'Chiến Khu Đ Bù Đăng' },
      { id: 'hrt-005', title: 'Di Tích Nhà Giáo Truyền Thống' }
    ]
  },
  {
    id: 'route-nature',
    name: 'Danh Lam & Sinh Thái Xanh',
    icon: 'mdi:pine-tree',
    color: '#2D5016',
    description: 'Hành trình hòa mình cùng rừng già nguyên sinh kỳ vĩ và lắng nghe tiếng réo rắt thiên nhiên của danh thắng Thác Mơ.',
    stops: [
      { id: 'hrt-002', title: 'Thác Mơ Bù Đăng' },
      { id: 'hrt-006', title: 'Rừng Nguyên Sinh Bù Đăng' }
    ]
  },
  {
    id: 'route-culture',
    name: 'Bản Sắc Bản Địa S\'tiêng - M\'nông',
    icon: 'mdi:account-group-outline',
    color: '#C9922A',
    description: 'Dòng chảy văn hóa cồng chiêng phi vật thể UNESCO, nghề dệt hoa văn thổ cẩm tỉ mẩn cùng nghi lễ nông nghiệp thiêng liêng.',
    stops: [
      { id: 'hrt-003', title: 'Lễ Hội Cồng Chiêng S\'tiêng' },
      { id: 'hrt-004', title: 'Nhà Dài Truyền Thống S\'tiêng' },
      { id: 'hrt-007', title: 'Làng Nghề Dệt Thổ Cẩm S\'tiêng' },
      { id: 'hrt-008', title: 'Lễ Hội Mừng Lúa Mới M\'nông' }
    ]
  }
]

watch(searchQuery, (q) => store.setSearch(q))
watch(activeCategory, (c) => store.setCategory(c))
watch(activePeriod, (p) => store.setPeriod(p))

// If a query parameter "select" is passed, trigger selection automatically
onMounted(() => {
  const route = useRoute()
  if (route.query.select) {
    selectedId.value = route.query.select as string
  }
})

function setCategory(id: string) {
  activeCategory.value = id
  selectedRouteId.value = null // reset route if manual filtering occurs
}

function clearAll() {
  searchQuery.value = ''
  activeCategory.value = ''
  activePeriod.value = ''
  selectedRouteId.value = null
  store.clearFilters()
}

function selectHeritage(heritage: Heritage) {
  selectedId.value = heritage.id
  sidebarOpen.value = false
}

function toggleRoute(route: any) {
  if (selectedRouteId.value === route.id) {
    selectedRouteId.value = null
    store.clearFilters()
  } else {
    selectedRouteId.value = route.id
    // Filter heritages on map to only show this route
    store.clearFilters()
    const matching = MOCK_HERITAGES.filter(h => route.stops.some((s: any) => s.id === h.id))
    // We update search/filters manually to only show those
    store.searchQuery = ''
    store.activeCategory = ''
    store.heritages = matching
    // Auto select first stop
    if (route.stops.length > 0) {
      selectStop(route.stops[0])
    }
  }
}

function selectStop(stop: any) {
  const matching = MOCK_HERITAGES.find(h => h.id === stop.id)
  if (matching) {
    selectedId.value = matching.id
  }
}

// Reset store heritages on unmount
onUnmounted(() => {
  store.heritages = MOCK_HERITAGES
  store.clearFilters()
})

function getCategoryVariant(cat: string) {
  const map: Record<string, any> = {
    'lich-su': 'brick', 'danh-thang': 'forest',
    'van-hoa-phi-vat-the': 'gold', 'doi-song-cong-dong': 'earth',
    'giao-duc-truyen-thong': 'copper',
  }
  return map[cat] ?? 'gold'
}

function playAudio() {
  if (selectedHeritage.value?.audio) {
    audioStore.loadTrack(selectedHeritage.value.audio, selectedHeritage.value.id)
    audioStore.play()
  }
}
</script>

<style scoped>
.popup-slide-enter-active, .popup-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.popup-slide-enter-from, .popup-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(16px);
}
</style>
