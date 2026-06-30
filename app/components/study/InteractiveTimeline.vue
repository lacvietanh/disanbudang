<template>
  <div class="lesson-timeline-track space-y-0 pl-10">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="relative pb-6 last:pb-0 group"
    >
      <!-- Dot marker on the track -->
      <div
        class="absolute left-[-2.05rem] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer z-10"
        :class="activeIndex === idx
          ? 'bg-gold-500 border-gold-400 scale-110 shadow-lg shadow-gold-500/20'
          : 'bg-charcoal-900 border-charcoal-700 group-hover:border-gold-500/60'"
        @click="activeIndex = activeIndex === idx ? -1 : idx"
        :aria-label="`Mốc lịch sử: ${item.date}`"
      >
        <div v-if="activeIndex === idx" class="w-2 h-2 rounded-full bg-gold-300" />
      </div>

      <!-- Date badge -->
      <div class="flex items-start gap-3">
        <span
          class="shrink-0 text-3xs font-bold uppercase tracking-widest px-2 py-0.5 rounded border mt-0.5 transition-all duration-300"
          :class="activeIndex === idx
            ? 'text-gold-400 border-gold-500/40 bg-gold-500/10'
            : 'text-charcoal-500 border-charcoal-800 bg-transparent'"
        >{{ item.date }}</span>

        <div class="flex-1">
          <button
            class="text-left w-full text-sm font-semibold transition-colors duration-200"
            :class="activeIndex === idx ? 'text-gold-300' : 'text-ivory group-hover:text-gold-400'"
            @click="activeIndex = activeIndex === idx ? -1 : idx"
          >
            {{ item.event }}
          </button>

          <!-- Expandable detail -->
          <Transition name="timeline-expand">
            <div
              v-if="activeIndex === idx && item.detail"
              class="mt-2 text-xs text-charcoal-350 leading-relaxed pr-4 border-l border-gold-500/20 pl-3"
            >
              <p>{{ item.detail }}</p>
              <div v-if="item.image" class="mt-3 rounded-xl overflow-hidden max-w-xs">
                <img
                  :src="item.image"
                  :alt="item.event"
                  class="w-full object-cover max-h-40"
                  loading="lazy"
                />
              </div>
            </div>
          </Transition>
        </div>

        <!-- Expand/collapse icon -->
        <button
          v-if="item.detail"
          class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-charcoal-500 hover:text-gold-400 hover:bg-charcoal-800 transition-all duration-200 mt-0.5"
          @click="activeIndex = activeIndex === idx ? -1 : idx"
          :aria-label="activeIndex === idx ? 'Thu gọn chi tiết' : 'Xem chi tiết'"
        >
          <Icon
            :name="activeIndex === idx ? 'mdi:chevron-up' : 'mdi:chevron-down'"
            class="w-4 h-4"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TimelineItem {
  date: string
  event: string
  detail?: string
  image?: string
}

defineProps<{
  items: TimelineItem[]
}>()

const activeIndex = ref(-1)
</script>

<style scoped>
.timeline-expand-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.timeline-expand-leave-active {
  transition: all 0.2s ease;
}
.timeline-expand-enter-from,
.timeline-expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
