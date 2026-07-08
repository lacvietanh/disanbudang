<template>
  <div
    class="relative group overflow-hidden rounded-2xl card-heritage cursor-pointer"
    role="button"
    tabindex="0"
    :aria-label="`Chi tiết di sản: ${heritage.title}`"
    @click="$emit('click')"
    @keydown.enter.prevent="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <!-- Image -->
    <div class="aspect-[4/3] overflow-hidden">
      <NuxtImg
        :src="heritage.coverImage"
        :alt="heritage.title"
        class="card-image w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <!-- Overlay -->
    <div class="card-overlay absolute inset-0" />

    <!-- Category badge -->
    <div class="absolute top-4 left-4">
      <BaseBadge :variant="categoryVariant">
        {{ getCategoryLabel(heritage.category) }}
      </BaseBadge>
    </div>

    <!-- Featured pin -->
    <div v-if="heritage.featured" class="absolute top-4 right-4">
      <div class="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center shadow-gold">
        <Icon name="mdi:star" class="w-3.5 h-3.5 text-charcoal-900" />
      </div>
    </div>

    <!-- Content -->
    <div class="absolute bottom-0 left-0 right-0 p-5">
      <!-- Year -->
      <p v-if="heritage.year" class="eyebrow text-gold-400 text-2xs mb-1.5">{{ heritage.year }}</p>

      <!-- Title -->
      <h3 class="font-heading font-bold text-ivory text-xl leading-tight mb-2 text-shadow-sm line-clamp-2 group-hover:text-gold-200 transition-colors duration-300">
        {{ heritage.title }}
      </h3>

      <!-- Subtitle -->
      <p class="text-ivory/70 text-sm leading-snug line-clamp-2 mb-4">
        {{ heritage.shortDescription }}
      </p>

      <!-- Footer -->
      <div class="flex items-center justify-between">
        <!-- Tags -->
        <div class="flex gap-1.5 flex-wrap">
          <span
            v-for="tag in heritage.tags.slice(0, 2)"
            :key="tag"
            class="text-2xs text-ivory/50 bg-ivory/10 px-2 py-0.5 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <!-- CTA -->
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500 text-charcoal-900 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out-expo"
        >
          <Icon name="mdi:arrow-right" class="w-4.5 h-4.5" />
        </div>
      </div>
    </div>

    <!-- Audio indicator -->
    <div
      v-if="heritage.audio"
      class="absolute top-14 right-4 w-7 h-7 rounded-full bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center border border-ivory/20"
    >
      <Icon name="mdi:headphones" class="w-3.5 h-3.5 text-ivory/80" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from '~/types'

const props = defineProps<{
  heritage: Heritage
}>()
defineEmits(['click'])

const { getCategoryLabel } = useHeritage()

const categoryVariant = computed(() => {
  const map: Record<string, string> = {
    'lich-su': 'brick',
    'danh-thang': 'forest',
    'van-hoa-phi-vat-the': 'gold',
    'doi-song-cong-dong': 'earth',
    'giao-duc-truyen-thong': 'copper',
  }
  return (map[props.heritage.category] ?? 'gold') as any
})
</script>
