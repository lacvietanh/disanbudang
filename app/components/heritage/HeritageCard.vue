<template>
  <div
    class="relative group overflow-hidden rounded-2xl card-heritage cursor-pointer shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.75)] transition-shadow duration-500"
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
        class="card-image img-cinematic w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <!-- Featured pin -->
    <div v-if="heritage.featured" class="absolute top-3 left-3">
      <div class="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center shadow-gold">
        <Icon name="mdi:star" class="w-3.5 h-3.5 text-charcoal-900" />
      </div>
    </div>

    <!-- Audio indicator -->
    <div
      v-if="heritage.audio"
      class="absolute top-3 right-3 w-7 h-7 rounded-full bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center border border-ivory/15"
    >
      <Icon name="mdi:headphones" class="w-3.5 h-3.5 text-ivory/85" />
    </div>

    <!-- Caption panel: slim title bar at rest, expands to full detail on hover/focus -->
    <div class="absolute bottom-0 left-0 right-0 bg-charcoal-950/95 backdrop-blur-sm px-5 pt-3.5 pb-3.5">
      <!-- Title (always visible) -->
      <h3 class="font-heading font-bold text-ivory text-base leading-snug line-clamp-1 group-hover:text-gold-200 group-focus-within:text-gold-200 transition-colors duration-300">
        {{ heritage.title }}
      </h3>

      <!-- Reveal on hover/focus -->
      <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out-expo">
        <div class="overflow-hidden">
          <p class="eyebrow text-gold-400 text-2xs mt-2.5 mb-1.5">
            {{ getCategoryLabel(heritage.category) }}<span v-if="heritage.year"> · {{ heritage.year }}</span>
          </p>

          <p class="text-ivory/70 text-xs leading-snug line-clamp-2 mb-3">
            {{ heritage.shortDescription }}
          </p>

          <div class="flex items-center justify-between pb-0.5">
            <div class="flex gap-1.5 flex-wrap">
              <span
                v-for="tag in heritage.tags.slice(0, 2)"
                :key="tag"
                class="text-2xs text-ivory/50 bg-ivory/10 px-2 py-0.5 rounded-full"
              >
                {{ tag }}
              </span>
            </div>

            <div
              class="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500 text-charcoal-900 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-500 ease-out-expo shrink-0"
            >
              <Icon name="mdi:arrow-right" class="w-4.5 h-4.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from '~/types'

defineProps<{
  heritage: Heritage
}>()
defineEmits(['click'])

const { getCategoryLabel } = useHeritage()
</script>
