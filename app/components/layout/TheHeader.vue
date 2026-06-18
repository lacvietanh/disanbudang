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
          <div class="w-9 h-9 rounded-lg bg-gradient-earth flex items-center justify-center shadow-gold/30 shadow-md">
            <span class="text-ivory font-heading font-bold text-lg leading-none">D</span>
          </div>
          <div class="hidden sm:block">
            <p class="font-heading font-bold text-ivory text-base leading-tight">Di Sản</p>
            <p class="font-accent italic text-gold-400 text-xs leading-tight tracking-wide">Bù Đăng</p>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <ul class="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Menu điều hướng chính">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="px-2 py-1 xl:px-4 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all duration-300 text-ivory/80 hover:text-ivory hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
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
  </header>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const isMobileOpen = ref(false)
const isSearchOpen = ref(false)

const navItems = [
  { to: '/', label: 'Trang Chủ', icon: 'mdi:home-outline' },
  { to: '/map', label: 'Bản Đồ', icon: 'mdi:map-outline' },
  { to: '/library', label: 'Thư Viện', icon: 'mdi:library' },
  { to: '/community', label: 'Cộng Đồng', icon: 'mdi:account-group-outline' },
  { to: '/quiz', label: 'Quiz', icon: 'mdi:help-circle-outline' },
  { to: '/school', label: 'Góc Học Tập', icon: 'mdi:school-outline' },
  { to: '/news', label: 'Tin Tức', icon: 'mdi:newspaper-variant-outline' },
  { to: '/about', label: 'Giới Thiệu', icon: 'mdi:information-outline' },
]

if (import.meta.client) {
  useEventListener(window, 'scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
}

// Close menu on route change
const route = useRoute()
watch(() => route.path, () => { isMobileOpen.value = false })
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
