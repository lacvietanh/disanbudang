<template>
  <nav
    v-if="crumbs.length > 1"
    class="container-heritage py-3 mt-1 flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal-300"
    aria-label="Breadcrumb"
  >
    <NuxtLink
      to="/"
      class="hover:text-gold-400 transition-colors flex items-center gap-1.5"
    >
      <Icon name="mdi:home-outline" class="w-4 h-4" />
      <span>Trang Chủ</span>
    </NuxtLink>

    <template v-for="(crumb, index) in crumbs" :key="crumb.path">
      <Icon name="mdi:chevron-right" class="w-4 h-4 text-charcoal-600 shrink-0" />
      
      <span v-if="index === crumbs.length - 1" class="text-gold-400 font-semibold truncate max-w-[200px] sm:max-w-xs">
        {{ (isMounted && leafLabel) ? leafLabel : crumb.label }}
      </span>
      
      <NuxtLink
        v-else-if="crumb.isLink"
        :to="crumb.path"
        class="hover:text-gold-400 transition-colors truncate"
      >
        {{ crumb.label }}
      </NuxtLink>
      
      <span v-else class="truncate">
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

// Lookup table for static segments
const lookupTable: Record<string, string> = {
  about: 'Giới Thiệu',
  map: 'Bản Đồ',
  study: 'Học Tập',
  news: 'Bài Viết',
  contribute: 'Đóng Góp',
  invest: 'Đầu Tư',
  contact: 'Liên Hệ',
  heritage: 'Chi Tiết Di Sản',
  explore: 'Khám Phá',
  lesson: 'Bài Học',
}

// Routes that actually exist and can be linked
const activeRoutes = new Set([
  '/',
  '/about/',
  '/map/',
  '/study/',
  '/news/',
  '/contribute/',
  '/invest/',
  '/contact/',
  '/explore/',
])

const crumbs = computed(() => {
  // Split path and filter empty parts
  const segments = route.path.split('/').filter(Boolean)
  const list = []
  
  let currentPath = ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]!
    currentPath += `/${segment}`
    
    // Ensure trailing slash is added consistently
    const formattedPath = `${currentPath}/`
    const label = lookupTable[segment] || segment.replace(/-/g, ' ')
    const isLink = activeRoutes.has(formattedPath)
    
    list.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      path: formattedPath,
      isLink,
    })
  }
  return list
})

// Retrieve the dynamic leaf label set by pages using useBreadcrumb
const leafLabel = computed(() => {
  const state = useState<string>(`breadcrumb-label-${route.path}`)
  return state.value || ''
})
</script>
