<template>
  <div class="relative select-none" :style="{ aspectRatio: aspectRatio }">
    <!-- Base image -->
    <img
      :src="imageUrl"
      :alt="imageAlt"
      class="w-full h-full object-cover rounded-2xl"
      loading="lazy"
    />

    <!-- Hotspot pins -->
    <button
      v-for="(spot, idx) in hotspots"
      :key="idx"
      class="hotspot-pin focus:outline-gold-500"
      :style="{ left: spot.x + '%', top: spot.y + '%' }"
      @click="activeSpot = activeSpot === idx ? -1 : idx"
      :aria-label="`Xem thông tin: ${spot.label}`"
    >
      <span class="sr-only">{{ spot.label }}</span>
    </button>

    <!-- Tooltip popup -->
    <Transition name="hotspot-popup">
      <div
        v-if="activeSpot >= 0"
        class="absolute z-20 max-w-[220px] bg-charcoal-950/95 border border-gold-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm pointer-events-none"
        :style="tooltipStyle"
      >
        <button
          class="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-charcoal-400 hover:text-ivory pointer-events-auto"
          @click.stop="activeSpot = -1"
          aria-label="Đóng"
        >
          <Icon name="mdi:close" class="w-3.5 h-3.5" />
        </button>
        <p class="text-gold-400 text-3xs font-bold uppercase tracking-wider mb-1">
          {{ hotspots[activeSpot]?.label }}
        </p>
        <p class="text-charcoal-200 text-2xs leading-relaxed">
          {{ hotspots[activeSpot]?.desc }}
        </p>
      </div>
    </Transition>

    <!-- Hint label -->
    <div class="absolute bottom-3 right-3 text-3xs text-charcoal-400 bg-charcoal-950/70 px-2 py-1 rounded-lg flex items-center gap-1">
      <Icon name="mdi:cursor-pointer" class="w-3 h-3" />
      Bấm điểm vàng để xem chi tiết
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Hotspot {
  x: number   // % from left
  y: number   // % from top
  label: string
  desc: string
}

const props = withDefaults(defineProps<{
  imageUrl: string
  imageAlt: string
  hotspots: Hotspot[]
  aspectRatio?: string
}>(), {
  aspectRatio: '16/9'
})

const activeSpot = ref(-1)

// Position tooltip to stay within bounds
const tooltipStyle = computed(() => {
  if (activeSpot.value < 0) return {}
  const spot = props.hotspots[activeSpot.value]
  if (!spot) return {}
  const left = spot.x > 60 ? 'auto' : `${spot.x}%`
  const right = spot.x > 60 ? `${100 - spot.x}%` : 'auto'
  const top = spot.y > 60 ? 'auto' : `${spot.y + 5}%`
  const bottom = spot.y > 60 ? `${100 - spot.y + 5}%` : 'auto'
  return { left, right, top, bottom }
})
</script>

<style scoped>
.hotspot-popup-enter-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.hotspot-popup-leave-active {
  transition: all 0.15s ease;
}
.hotspot-popup-enter-from,
.hotspot-popup-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
