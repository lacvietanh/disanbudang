<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-[env(safe-area-inset-top,0px)]"
    :class="[
      isScrolled
        ? 'bg-charcoal-950/80 backdrop-blur-xl border-b border-gold-500/10 shadow-lg shadow-charcoal-950/40 py-1'
        : 'bg-charcoal-950/20 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none py-2',
    ]"
  >
    <div class="container-heritage">
      <nav class="flex items-center justify-between h-[72px]">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="/favicon/icon-192.png" alt="Logo Di Sản Bù Đăng" class="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          <span class="hidden md:block font-heading font-bold text-ivory text-base lg:text-lg leading-tight tracking-tight group-hover:text-gold-300 transition-colors duration-300">
            Di Sản<br class="hidden lg:block" /><span class="lg:block text-gold-400">Bù Đăng</span>
          </span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <ul class="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Menu điều hướng chính">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="px-2 py-1 xl:px-3 xl:py-2 rounded-full text-xs xl:text-sm font-medium whitespace-nowrap transition-all duration-300 text-ivory/80 hover:text-ivory hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
              active-class="text-gold-400 bg-gold-500/10"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <button
            class="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-ivory/20 text-ivory/70 text-sm hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Tìm kiếm di sản"
            @click="isSearchOpen = true"
          >
            <Icon name="mdi:magnify" class="w-4 h-4" />
            <span class="hidden lg:block">Tìm kiếm...</span>
          </button>

          <!-- Explore CTA -->
          <NuxtLink to="/map" class="btn-primary text-sm hidden md:inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
            <Icon name="mdi:map-outline" class="w-4 h-4" />
            Bản Đồ
          </NuxtLink>

          <!-- Hamburger -->
          <button
            class="lg:hidden p-2 rounded-lg text-ivory hover:bg-ivory/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label="Menu di động"
            :aria-expanded="isMobileOpen"
            @click="isMobileOpen = !isMobileOpen"
          >
            <Icon :name="isMobileOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileOpen"
        class="lg:hidden bg-charcoal-900/98 backdrop-blur-xl border-t border-earth-800/30"
      >
        <div class="container-heritage py-6 space-y-1" aria-label="Menu di động">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-ivory/80 hover:text-ivory hover:bg-ivory/8 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
            active-class="text-gold-400 bg-gold-500/10"
            @click="isMobileOpen = false"
          >
            <Icon :name="item.icon" class="w-5 h-5 text-gold-400" />
            {{ item.label }}
          </NuxtLink>

          <div class="pt-4 border-t border-earth-800/30">
            <NuxtLink to="/map" class="btn-primary w-full justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500" @click="isMobileOpen = false">
              <Icon name="mdi:map-outline" class="w-4 h-4" />
              Khám Phá Bản Đồ
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Search modal -->
    <Transition name="mobile-menu">
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 z-[80] bg-charcoal-950/90 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm di sản"
        @click.self="closeSearch"
        @keydown="handleModalTab"
      >
        <div ref="modalContainerRef" class="container-narrow pt-28">
          <div class="rounded-2xl border border-charcoal-800 bg-charcoal-950 shadow-2xl overflow-hidden">
            <div class="flex items-center gap-3 border-b border-charcoal-850 px-4 py-3">
              <Icon name="mdi:magnify" class="w-5 h-5 text-gold-400 shrink-0" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                placeholder="Tìm di sản, danh thắng, văn hóa..."
                class="w-full bg-transparent text-ivory placeholder-charcoal-500 focus:outline-none"
                @keydown.esc="closeSearch"
                @keydown.enter="goToLibrary"
              />
              <button
                class="p-2 rounded-lg text-charcoal-400 hover:text-ivory hover:bg-charcoal-900"
                aria-label="Đóng tìm kiếm"
                @click="closeSearch"
              >
                <Icon name="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <div class="max-h-[60vh] overflow-y-auto p-3">
              <NuxtLink
                v-for="heritage in searchResults"
                :key="heritage.id"
                :to="`/heritage/${heritage.slug}`"
                class="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-charcoal-900"
                @click="closeSearch"
              >
                <img :src="heritage.coverImage" :alt="heritage.title" class="w-14 h-12 rounded-lg object-cover" />
                <span class="min-w-0">
                  <span class="block text-ivory text-sm font-semibold truncate">{{ heritage.title }}</span>
                  <span class="block text-charcoal-400 text-xs truncate">{{ heritage.subtitle }}</span>
                </span>
              </NuxtLink>

              <button
                v-if="searchQuery"
                class="w-full mt-2 btn-primary justify-center"
                @click="goToLibrary"
              >
                Xem tất cả kết quả
                <Icon name="mdi:arrow-right" class="w-4 h-4" />
              </button>

              <p v-if="searchQuery && searchResults.length === 0" class="text-center text-charcoal-400 text-sm py-10">
                Không tìm thấy di sản phù hợp.
              </p>
              <p v-if="!searchQuery" class="text-center text-charcoal-500 text-sm py-10">
                Nhập tên di sản, địa danh hoặc từ khóa để tra cứu nhanh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const isMobileOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const heritageStore = useHeritageStore()

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return heritageStore.publishedHeritages
    .filter((heritage) =>
      heritage.title.toLowerCase().includes(q) ||
      heritage.subtitle.toLowerCase().includes(q) ||
      heritage.shortDescription.toLowerCase().includes(q) ||
      heritage.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
    .slice(0, 6)
})

const navItems = [
  { to: '/', label: 'Trang Chủ', icon: 'mdi:home-outline' },
  { to: '/about', label: 'Giới Thiệu', icon: 'mdi:information-outline' },
  { to: '/map', label: 'Bản Đồ', icon: 'mdi:map-outline' },
  { to: '/library', label: 'Thư Viện', icon: 'mdi:library-outline' },
  { to: '/study', label: 'Học Tập', icon: 'mdi:school-outline' },
  { to: '/news', label: 'Bài Viết', icon: 'mdi:newspaper-variant-outline' },
  { to: '/contribute', label: 'Đóng Góp', icon: 'mdi:hand-heart-outline' },
]

if (import.meta.client) {
  useEventListener(window, 'scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
}

// Close menu on route change
const route = useRoute()
watch(() => route.path, () => { isMobileOpen.value = false })

watch(isSearchOpen, async (open) => {
  if (!open) return
  await nextTick()
  searchInput.value?.focus()
})

const modalContainerRef = ref<HTMLElement | null>(null)

watch([isMobileOpen, isSearchOpen], ([mobileOpen, searchOpen]) => {
  if (import.meta.client) {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})

function handleModalTab(e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  if (!modalContainerRef.value) return

  const focusables = modalContainerRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  if (focusables.length === 0) return

  const firstEl = focusables[0] as HTMLElement
  const lastEl = focusables[focusables.length - 1] as HTMLElement

  if (e.shiftKey) {
    if (document.activeElement === firstEl) {
      lastEl.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === lastEl) {
      firstEl.focus()
      e.preventDefault()
    }
  }
}

function closeSearch() {
  isSearchOpen.value = false
}

function goToLibrary() {
  const query = searchQuery.value.trim()
  closeSearch()
  navigateTo(query ? `/library?search=${encodeURIComponent(query)}` : '/library')
}
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
