<template>
  <BaseSection
    label="Bảo Tàng Thu Nhỏ"
    title="Tuyển Chọn Di Sản Độc Bản"
    description="Khám phá các di sản văn hóa phi vật thể, danh lam thắng cảnh và di tích cách mạng nổi tiếng của Bù Đăng qua góc nhìn nghệ thuật."
    class="relative bg-charcoal-900 border-b border-charcoal-800"
  >
    <!-- Background overlay elements -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#C9922A_1px,transparent_1px)] [background-size:24px_24px]" />

    <!-- Interactive Category Filter -->
    <div class="relative scroll-fade-right-dark reveal">
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-10 justify-start lg:justify-center">
        <button
          class="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border"
          :class="selectedCat === '' ? 'bg-gold-500 text-charcoal-900 border-transparent shadow-gold' : 'border-charcoal-850 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory bg-charcoal-900'"
          @click="selectedCat = ''"
        >
          <Icon name="mdi:apps" class="w-3.5 h-3.5" />
          Tất Cả
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border bg-charcoal-900"
          :class="selectedCat === cat.id ? 'text-ivory border-transparent' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory'"
          :style="selectedCat === cat.id ? { backgroundColor: cat.color } : {}"
          @click="selectedCat = cat.id"
        >
          <Icon :name="cat.icon" class="w-3.5 h-3.5" />
          {{ cat.labelShort }}
        </button>
      </div>
    </div>

    <!-- Empty state for specific category -->
    <div v-if="filteredHeritages.length === 0" class="py-16 text-center reveal">
      <Icon name="mdi:archive-eye-outline" class="w-16 h-16 text-charcoal-700 mx-auto mb-4" />
      <p class="text-charcoal-400">Không tìm thấy di sản thuộc danh mục này</p>
    </div>

    <!-- Asymmetrical dynamic grid -->
    <div v-else class="space-y-8">
      <!-- Highlighting top features if they match filter -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main featured -->
        <div v-if="displayFeatured[0]" class="lg:col-span-2 reveal">
          <div
            class="relative overflow-hidden rounded-3xl cursor-pointer group h-[480px] lg:h-[560px] border border-charcoal-800 hover:border-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500"
            @click="navigateTo(`/heritage/${displayFeatured[0].slug}`)"
          >
            <img
              :src="displayFeatured[0].coverImage"
              :alt="displayFeatured[0].title"
              class="w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-cinematic" />
            <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/70 via-transparent to-transparent" />

            <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <BaseBadge variant="brick" class="mb-4">
                {{ getCategoryLabel(displayFeatured[0].category) }}
              </BaseBadge>
              <h2 class="font-heading font-bold text-ivory text-3xl lg:text-5xl leading-tight mb-3 text-shadow-hero">
                {{ displayFeatured[0].title }}
              </h2>
              <p class="text-charcoal-300 text-base leading-relaxed mb-6 max-w-xl line-clamp-3">
                {{ displayFeatured[0].shortDescription }}
              </p>
              <div class="flex items-center gap-6">
                <span class="text-gold-400 font-body text-sm font-medium flex items-center gap-2 group-hover:text-gold-300 transition-colors">
                  Đọc câu chuyện di sản
                  <Icon name="mdi:arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span class="eyebrow text-charcoal-500 text-2xs">{{ displayFeatured[0].year }}</span>
              </div>
            </div>

            <!-- View count -->
            <div class="absolute top-6 right-6 glass-dark rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-charcoal-700">
              <Icon name="mdi:eye-outline" class="w-3.5 h-3.5 text-gold-400" />
              <span class="text-ivory/80 text-2xs font-medium">{{ displayFeatured[0].viewCount?.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <!-- Secondary stack -->
        <div class="space-y-6">
          <div
            v-for="item in displayFeatured.slice(1, 3)"
            :key="item.id"
            class="relative overflow-hidden rounded-2xl cursor-pointer group h-[225px] lg:h-[268px] border border-charcoal-800 reveal"
            @click="navigateTo(`/heritage/${item.slug}`)"
          >
            <img
              :src="item.coverImage"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-cinematic" />

            <div class="absolute bottom-0 left-0 right-0 p-6">
              <BaseBadge :variant="getCategoryVariant(item.category)" class="mb-3">
                {{ getCategoryLabel(item.category) }}
              </BaseBadge>
              <h3 class="font-heading font-bold text-ivory text-xl leading-tight mb-1 text-shadow-sm group-hover:text-gold-200 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-charcoal-400 text-xs line-clamp-1">{{ item.subtitle }}</p>
            </div>

            <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gold-500/0 group-hover:bg-gold-500 flex items-center justify-center transition-all duration-300">
              <Icon name="mdi:arrow-right" class="w-4 h-4 text-gold-400/40 group-hover:text-charcoal-900 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>

      <!-- Grid of remaining list -->
      <div v-if="displayOthers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        <HeritageCard
          v-for="heritage in displayOthers"
          :key="heritage.id"
          :heritage="heritage"
          class="reveal border border-charcoal-800"
          @click="navigateTo(`/heritage/${heritage.slug}`)"
        />
      </div>
    </div>

    <!-- View all CTA -->
    <div class="text-center mt-14">
      <NuxtLink to="/library" class="btn-secondary hover:shadow-gold/20 hover:shadow-lg">
        Xem Toàn Bộ Thư Viện
        <Icon name="mdi:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { MOCK_HERITAGES } from '~/data/mockHeritages'
import { CATEGORIES } from '~/data/categories'

const { getCategoryLabel } = useHeritage()
const { observeAll } = useScrollReveal()

const categories = CATEGORIES
const selectedCat = ref('')

const filteredHeritages = computed(() => {
  if (selectedCat.value === '') {
    return MOCK_HERITAGES
  }
  return MOCK_HERITAGES.filter((h) => h.category === selectedCat.value)
})

const displayFeatured = computed(() => {
  return filteredHeritages.value.filter((h) => h.featured)
})

const displayOthers = computed(() => {
  return filteredHeritages.value.filter((h) => !h.featured).slice(0, 4)
})

watch(selectedCat, () => {
  nextTick(() => observeAll())
})

onMounted(() => {
  nextTick(() => observeAll())
})

function getCategoryVariant(cat: string) {
  const map: Record<string, string> = {
    'lich-su': 'brick',
    'danh-thang': 'forest',
    'van-hoa-phi-vat-the': 'gold',
    'doi-song-cong-dong': 'earth',
    'giao-duc-truyen-thong': 'copper',
  }
  return (map[cat] ?? 'gold') as any
}
</script>
