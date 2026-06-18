<template>
  <div class="bg-ivory min-h-screen pt-[72px]">
    <!-- Hero -->
    <div class="bg-dark-earth py-20 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-64 h-64 bg-forest-500/10 rounded-full blur-3xl" />
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Tin Tức & Sự Kiện</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-none mb-5">
          Cập Nhật<br/><span class="text-gradient-gold">Di Sản Bù Đăng</span>
        </h1>
        <p class="text-charcoal-300 text-lg max-w-xl">
          Tin tức, sự kiện, nghiên cứu và hoạt động mới nhất về di sản văn hóa địa phương
        </p>
      </div>
    </div>

    <div class="container-heritage py-14">
      <!-- Category filter -->
      <div class="flex items-center gap-3 overflow-x-auto scrollbar-none mb-10">
        <button
          v-for="cat in ['all', ...newsCategories]"
          :key="cat"
          class="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all border"
          :class="activeCategory === cat
            ? 'bg-charcoal-800 text-ivory border-charcoal-700'
            : 'border-charcoal-200 text-charcoal-600 hover:border-charcoal-300'"
          @click="activeCategory = cat"
        >
          {{ cat === 'all' ? 'Tất Cả' : categoryLabels[cat as NewsCategory] }}
        </button>
      </div>

      <!-- Featured + side layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div v-if="filteredNews[0]" class="lg:col-span-7">
          <NuxtLink to="/news" class="group block">
            <div class="relative overflow-hidden rounded-3xl aspect-[16/9]">
              <img :src="filteredNews[0].coverImage" :alt="filteredNews[0].title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-cinematic" />
              <div class="absolute top-5 left-5">
                <BaseBadge variant="gold">{{ categoryLabels[filteredNews[0].category] }}</BaseBadge>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-7">
                <p class="text-charcoal-300 text-xs mb-2">{{ formatDate(filteredNews[0].publishedAt) }} • {{ filteredNews[0].readTime }} phút</p>
                <h2 class="font-heading font-bold text-ivory text-2xl leading-tight mb-2 text-shadow-hero group-hover:text-gold-200 transition-colors">{{ filteredNews[0].title }}</h2>
                <p class="text-ivory/70 text-sm line-clamp-2">{{ filteredNews[0].excerpt }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="lg:col-span-5 space-y-4">
          <NuxtLink
            v-for="item in filteredNews.slice(1, 5)"
            :key="item.id"
            to="/news"
            class="group flex gap-4 p-4 rounded-2xl border border-beige-200 hover:border-earth-200 hover:bg-beige-50 transition-all duration-200"
          >
            <img :src="item.coverImage" :alt="item.title" class="w-20 h-16 rounded-xl object-cover flex-shrink-0 transition-transform duration-500 group-hover:scale-105" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1.5">
                <BaseBadge :variant="categoryVariant[item.category]" size="sm">{{ categoryLabels[item.category] }}</BaseBadge>
                <span class="text-charcoal-400 text-xs">{{ item.readTime }} phút</span>
              </div>
              <h4 class="font-heading font-semibold text-charcoal-800 text-sm leading-tight line-clamp-2 group-hover:text-earth-600 transition-colors">{{ item.title }}</h4>
              <p class="text-charcoal-400 text-xs mt-1">{{ formatDate(item.publishedAt) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Events -->
      <div>
        <h2 class="font-heading font-bold text-charcoal-800 text-2xl mb-6">Sự Kiện & Hoạt Động Tiêu Biểu</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="event in events"
            :key="event.id"
            class="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 reveal"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <Icon name="mdi:calendar-star" class="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <p class="text-gold-600 text-sm font-semibold">{{ formatDate(event.startDate) }}</p>
                <p v-if="event.endDate" class="text-charcoal-400 text-xs">Đến {{ formatDate(event.endDate) }}</p>
              </div>
            </div>
            <h3 class="font-heading font-bold text-charcoal-800 text-base leading-tight mb-2">{{ event.title }}</h3>
            <p class="text-charcoal-500 text-sm leading-relaxed line-clamp-2 mb-4">{{ event.description }}</p>
            <div class="flex items-center gap-2 text-charcoal-400 text-xs">
              <Icon name="mdi:map-marker-outline" class="w-3.5 h-3.5" />
              {{ event.location }}
            </div>
            <div v-if="event.isOnline" class="mt-2 flex items-center gap-1.5">
              <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span class="text-green-600 text-xs">Trực tuyến</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MOCK_NEWS, MOCK_EVENTS } from '~/data/mockPosts'
import type { NewsCategory } from '~/types'

definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Tin Tức & Sự Kiện',
  description: 'Tin tức, sự kiện và hoạt động mới nhất về di sản Bù Đăng.'
})

useHead({
  script: MOCK_EVENTS.map(event => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate ?? event.startDate,
      eventAttendanceMode: event.isOnline ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: event.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Huyện Bù Đăng',
          addressRegion: 'Xã Bù Đăng Thành Phố Đồng Nai (Bình Phước Cũ)',
          addressCountry: 'VN'
        }
      }
    })
  }))
})

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const activeCategory = ref('all')
const newsCategories: NewsCategory[] = ['su-kien', 'tin-tuc', 'nghien-cuu', 'hoat-dong']

const categoryLabels: Record<NewsCategory, string> = {
  'su-kien': 'Sự Kiện', 'tin-tuc': 'Tin Tức', 'nghien-cuu': 'Nghiên Cứu', 'hoat-dong': 'Hoạt Động',
}
const categoryVariant: Record<NewsCategory, any> = {
  'su-kien': 'brick', 'tin-tuc': 'gold', 'nghien-cuu': 'forest', 'hoat-dong': 'earth',
}

const filteredNews = computed(() =>
  activeCategory.value === 'all' ? MOCK_NEWS : MOCK_NEWS.filter((n) => n.category === activeCategory.value),
)
const events = MOCK_EVENTS

function formatDate(str: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(str))
}
</script>
