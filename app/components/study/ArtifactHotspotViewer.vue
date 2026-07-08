<template>
  <div class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-charcoal-800 bg-charcoal-950 flex items-center justify-center p-4">
    <!-- Main Artifact Image -->
    <div class="relative max-w-lg w-full h-full flex items-center justify-center">
      <img
        :src="artifactImage"
        alt="Đàn đá Thành Phố Đồng Nai"
        class="max-h-[85%] w-auto object-contain rounded-xl shadow-lg border border-charcoal-800"
      />

      <!-- Glowing Hotspots -->
      <div
        v-for="spot in hotspots"
        :key="spot.id"
        class="absolute z-20"
        :style="{ left: spot.x + '%', top: spot.y + '%' }"
      >
        <!-- Pulsing Ring -->
        <button
          class="relative w-6 h-6 flex items-center justify-center rounded-full bg-gold-500/80 text-charcoal-900 border border-white/40 cursor-pointer shadow-lg active:scale-95 transition-transform"
          @click="activeSpotId = activeSpotId === spot.id ? null : spot.id"
          :aria-label="'Thông tin: ' + spot.title"
        >
          <span class="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-75"></span>
          <span class="relative text-[10px] font-bold">{{ spot.id }}</span>
        </button>

        <!-- Tooltip/Popup -->
        <transition name="fade">
          <div
            v-if="activeSpotId === spot.id"
            class="absolute bottom-9 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl border border-gold-500/30 bg-charcoal-900/98 backdrop-blur-md shadow-2xl text-left space-y-1.5 z-30"
          >
            <h5 class="text-gold-400 text-xs font-bold font-heading flex items-center gap-1.5">
              <Icon :name="spot.icon" class="w-4 h-4" />
              {{ spot.title }}
            </h5>
            <p class="text-charcoal-300 text-3xs leading-relaxed font-sans">{{ spot.desc }}</p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Active Details Sidebar inside the viewer (for desktop) -->
    <div class="absolute top-4 left-4 bg-charcoal-900/85 border border-charcoal-800 rounded-xl p-4 max-w-xs backdrop-blur-sm hidden md:block">
      <h4 class="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <Icon name="mdi:museum-outline" class="w-4.5 h-4.5" />
        Đàn đá tiền sử
      </h4>
      <p class="text-charcoal-400 text-3xs leading-relaxed">
        Phát hiện trong lòng đất đỏ bazan Thành Phố Đồng Nai. Nhấp vào các điểm số màu vàng để tìm hiểu chi tiết về cấu trúc và âm học của nhạc cụ cổ sơ nhất Việt Nam.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  artifactImage: {
    type: String,
    default: '/images/heritage/dan-da-stieng.png'
  }
})

const activeSpotId = ref<number | null>(1)

const hotspots = [
  {
    id: 1,
    x: 25,
    y: 40,
    title: 'Thanh Đá Lớn (Thanh Yang)',
    desc: 'Thanh đá có kích thước lớn nhất, đóng vai trò tạo ra âm cực trầm làm nền cho cả bộ đàn. Tần số sóng âm dao động sâu lắng biểu thị tiếng nói của thần linh.',
    icon: 'mdi:sine-wave'
  },
  {
    id: 2,
    x: 52,
    y: 55,
    title: 'Chất Liệu Bazan Cổ',
    desc: 'Chế tác thủ công từ đá bazan nguyên khối địa phương bằng kỹ thuật ghè đẽo thô sơ, tạo độ sần và giữ nguyên đặc tính cộng hưởng âm thanh độc đáo.',
    icon: 'mdi:stone-outline'
  },
  {
    id: 3,
    x: 72,
    y: 35,
    title: 'Thanh Cao Độ (Thanh Âm)',
    desc: 'Thanh đá mỏng và nhỏ hơn, phát ra âm thanh trong trẻo, vang dội như tiếng nước chảy hay tiếng gió hú giữa núi rừng.',
    icon: 'mdi:music-note'
  }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}
</style>
