<template>
  <!-- Mini sticky audio player -->
  <Transition name="player-slide">
    <div
      v-if="audio.isMiniPlayerVisible && audio.currentTrack"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-full max-w-lg px-4"
    >
      <div class="glass-dark rounded-2xl p-4 shadow-warm-xl border border-earth-700/30">
        <div class="flex items-center gap-4">
          <!-- Cover -->
          <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-warm">
            <img
              v-if="audio.currentTrack.coverImage"
              :src="audio.currentTrack.coverImage"
              :alt="audio.currentTrack.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-gradient-earth flex items-center justify-center">
              <Icon name="mdi:headphones" class="w-6 h-6 text-ivory" />
            </div>
          </div>

          <!-- Info + Progress -->
          <div class="flex-1 min-w-0">
            <p class="text-ivory text-sm font-medium truncate">{{ audio.currentTrack.title }}</p>
            <p class="text-charcoal-400 text-xs truncate">
              {{ audio.errorMessage || audio.currentTrack.narrator }}
            </p>

            <!-- Progress bar -->
            <div class="mt-2 relative h-1 bg-charcoal-700 rounded-full cursor-pointer" @click="onProgressClick">
              <div
                class="absolute left-0 top-0 h-full bg-gold-500 rounded-full transition-all duration-300"
                :style="{ width: `${audio.progressPercent}%` }"
              />
            </div>

            <!-- Time -->
            <div class="flex justify-between mt-1">
              <span class="text-charcoal-500 text-2xs">{{ audio.formattedCurrentTime }}</span>
              <span class="text-charcoal-500 text-2xs">{{ audio.formattedDuration }}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              class="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center hover:bg-gold-400 transition-colors shadow-gold"
              :aria-label="audio.isPlaying ? 'Tạm dừng audio' : 'Phát audio'"
              @click="audio.togglePlay()"
            >
              <Icon
                :name="audio.isPlaying ? 'mdi:pause' : 'mdi:play'"
                class="w-5 h-5 text-charcoal-900"
              />
            </button>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-400 hover:text-ivory transition-colors"
              aria-label="Đóng trình phát audio"
              @click="audio.closeMiniPlayer()"
            >
              <Icon name="mdi:close" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const audio = useAudioStore()

function onProgressClick(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  audio.setCurrentTime(ratio * (audio.duration ?? 0))
}
</script>

<style scoped>
.player-slide-enter-active,
.player-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.player-slide-enter-from,
.player-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
