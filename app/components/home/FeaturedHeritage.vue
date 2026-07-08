<template>
  <section class="section bg-charcoal-950 relative overflow-hidden" aria-label="Di sản nổi bật">

    <!-- Dot pattern background -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.025]
      bg-[radial-gradient(#C9922A_1px,transparent_1px)]
      [background-size:28px_28px]" />

    <div class="container-heritage relative z-10">

      <!-- ── HEADER ── -->
      <div class="flex items-end justify-between mb-12 lg:mb-16">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="w-8 h-px bg-gold-400" />
            <span class="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Bảo Tàng Thu Nhỏ</span>
          </div>
          <h2 class="font-heading font-bold text-ivory text-3xl lg:text-5xl leading-tight">
            Di Sản Nổi Bật
          </h2>
          <p class="text-charcoal-400 text-sm mt-2 max-w-md">
            Khám phá những điểm di sản văn hóa, lịch sử và thiên nhiên đặc sắc nhất của vùng đất Bù Đăng.
          </p>
        </div>
        <NuxtLink
          to="/explore"
          class="hidden lg:flex items-center gap-2 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors group flex-shrink-0"
        >
          Xem tất cả {{ totalCount }} di sản
          <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <!-- ── GRID — 1 large + 2 stacked ── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

        <!-- LARGE HERO CARD -->
        <div v-if="topFeatured[0]" class="lg:col-span-7 xl:col-span-8 reveal">
          <article
            class="relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer group h-[420px] lg:h-[580px] border border-charcoal-800/60 hover:border-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-700"
            @click="navigateTo(`/heritage/${topFeatured[0].slug}`)"
          >
            <img
              :src="topFeatured[0].coverImage"
              :alt="topFeatured[0].title"
              class="w-full h-full object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]"
            />
            <!-- Gradient burn -->
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
            <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/60 via-transparent to-transparent" />

            <!-- Editorial number -->
            <div class="absolute top-6 left-6 font-heading font-bold text-ivory/10 text-[80px] lg:text-[110px] leading-none select-none pointer-events-none">
              01
            </div>

            <!-- Content -->
            <div class="absolute bottom-0 left-0 right-0 p-7 lg:p-10">
              <div class="flex items-center gap-2 mb-4">
                <BaseBadge variant="brick" size="sm">{{ getCategoryLabel(topFeatured[0].category) }}</BaseBadge>
                <span class="text-charcoal-500 text-xs">·</span>
                <div class="flex items-center gap-1 text-charcoal-400 text-xs">
                  <Icon name="mdi:eye-outline" class="w-3.5 h-3.5" />
                  <span>{{ topFeatured[0].viewCount?.toLocaleString() }}</span>
                </div>
              </div>
              <h3 class="font-heading font-bold text-ivory text-3xl lg:text-4xl xl:text-5xl leading-tight mb-3 text-shadow-hero">
                {{ topFeatured[0].title }}
              </h3>
              <p class="text-ivory/60 text-sm leading-relaxed mb-5 max-w-lg line-clamp-2">
                {{ topFeatured[0].shortDescription }}
              </p>
              <span class="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold group-hover:text-gold-300 transition-colors">
                Đọc câu chuyện di sản
                <Icon name="mdi:arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </span>
            </div>
          </article>
        </div>

        <!-- SECONDARY STACK — 2 cards -->
        <div class="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 lg:gap-5">
          <article
            v-for="(item, idx) in topFeatured.slice(1, 3)"
            :key="item.id"
            class="relative overflow-hidden rounded-2xl cursor-pointer group flex-1 min-h-[200px] lg:min-h-0 border border-charcoal-800/60 hover:border-gold-500/25 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/8 reveal"
            @click="navigateTo(`/heritage/${item.slug}`)"
          >
            <img
              :src="item.coverImage"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent" />

            <!-- Editorial number -->
            <div class="absolute top-4 left-4 font-heading font-bold text-ivory/10 text-[50px] leading-none select-none pointer-events-none">
              {{ String(idx + 2).padStart(2, '0') }}
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
              <BaseBadge :variant="getCategoryVariant(item.category)" size="sm" class="mb-3">
                {{ getCategoryLabel(item.category) }}
              </BaseBadge>
              <h3 class="font-heading font-bold text-ivory text-xl lg:text-2xl leading-tight mb-1 group-hover:text-gold-200 transition-colors text-shadow-sm">
                {{ item.title }}
              </h3>
              <p class="text-charcoal-400 text-xs line-clamp-1">{{ item.subtitle }}</p>

              <!-- Arrow indicator -->
              <div class="absolute top-5 right-5 w-8 h-8 rounded-full bg-gold-500/0 group-hover:bg-gold-500 flex items-center justify-center transition-all duration-400 border border-ivory/10 group-hover:border-gold-500">
                <Icon name="mdi:arrow-right" class="w-4 h-4 text-ivory/30 group-hover:text-charcoal-900 transition-colors duration-300" />
              </div>
            </div>
          </article>
        </div>

      </div>

      <!-- ── MOBILE CTA ── -->
      <div class="flex lg:hidden justify-center mt-8">
        <NuxtLink to="/explore" class="btn-secondary hover:shadow-lg hover:shadow-gold-500/15">
          Xem tất cả {{ totalCount }} di sản
          <Icon name="mdi:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { MOCK_HERITAGES } from '~/data/mockHeritages'

const { getCategoryLabel } = useHeritage()
const { observeAll } = useScrollReveal()
const heritageStore = useHeritageStore()

const totalCount = computed(() => heritageStore.totalCount)
const topFeatured = computed(() => MOCK_HERITAGES.filter((h) => h.featured).slice(0, 3))

onMounted(() => nextTick(() => observeAll()))

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
