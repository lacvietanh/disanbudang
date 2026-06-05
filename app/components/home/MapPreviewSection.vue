<template>
  <section class="section bg-warm-paper relative">
    <div class="container-heritage">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Left content -->
        <div>
          <span class="section-label">Bản Đồ Tương Tác</span>
          <h2 class="section-title leading-tight">
            Hành Trình Khám Phá<br/>
            <span class="text-gradient-earth">Qua Bản Đồ</span>
          </h2>
          <p class="text-charcoal-500 text-lg leading-relaxed mb-8">
            Tìm kiếm và khám phá di sản trên bản đồ số — lọc theo loại hình, thời kỳ lịch sử,
            xem thông tin chi tiết và lên kế hoạch hành trình thực địa.
          </p>

          <div class="space-y-4 mb-8">
            <div v-for="feat in mapFeatures" :key="feat.text" class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-earth-500/10 flex items-center justify-center flex-shrink-0">
                <Icon :name="feat.icon" class="w-4 h-4 text-earth-600" />
              </div>
              <span class="text-charcoal-600 text-sm">{{ feat.text }}</span>
            </div>
          </div>

          <NuxtLink to="/map" class="btn-dark">
            <Icon name="mdi:map-outline" class="w-4 h-4" />
            Mở Bản Đồ Đầy Đủ
          </NuxtLink>
        </div>

        <!-- Right: Map preview -->
        <div class="relative reveal">
          <div class="relative rounded-3xl overflow-hidden shadow-warm-xl aspect-[4/3] bg-charcoal-800">
            <!-- Map placeholder with styled look -->
            <div class="w-full h-full bg-gradient-to-br from-forest-900 via-charcoal-800 to-charcoal-900 relative">
              <!-- Grid pattern -->
              <div class="absolute inset-0 opacity-10"
                style="background-image: linear-gradient(rgba(201,146,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,146,42,0.5) 1px, transparent 1px); background-size: 40px 40px;"
              />

              <!-- "Map" terrain blobs -->
              <div class="absolute inset-0">
                <div class="absolute top-1/4 left-1/4 w-32 h-20 bg-forest-700/40 rounded-full blur-lg" />
                <div class="absolute top-1/3 right-1/3 w-24 h-16 bg-forest-600/30 rounded-full blur-xl" />
                <div class="absolute bottom-1/3 left-1/3 w-40 h-24 bg-forest-800/40 rounded-full blur-lg" />
              </div>

              <!-- Heritage pins -->
              <div
                v-for="pin in mapPins"
                :key="pin.id"
                class="absolute group/pin cursor-pointer"
                :style="{ left: `${pin.x}%`, top: `${pin.y}%` }"
                @click="navigateTo(`/heritage/${pin.slug}`)"
              >
                <!-- Pin -->
                <div
                  class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-warm-md transition-transform duration-300 group-hover/pin:scale-125 animate-pulse-gold"
                  :style="{ backgroundColor: pin.color }"
                >
                  <Icon name="mdi:map-marker" class="w-4 h-4 text-white" />
                </div>

                <!-- Popup -->
                <div class="absolute bottom-10 left-1/2 -translate-x-1/2 bg-charcoal-900/95 backdrop-blur-md rounded-xl p-3 w-40 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none border border-earth-700/30 shadow-warm-lg -translate-y-1 group-hover/pin:translate-y-0 z-10">
                  <p class="text-ivory text-xs font-medium leading-tight">{{ pin.title }}</p>
                  <p class="text-charcoal-400 text-2xs mt-0.5">{{ pin.category }}</p>
                </div>
              </div>
            </div>

            <!-- Overlay gradient at bottom -->
            <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-charcoal-900/80 to-transparent flex items-end p-4">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span class="text-ivory/80 text-xs">{{ mapPins.length }} di sản trên bản đồ</span>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="mt-4 flex flex-wrap gap-3 justify-center">
            <div v-for="leg in legend" :key="leg.label" class="flex items-center gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: leg.color }" />
              <span class="text-charcoal-500 text-xs">{{ leg.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MOCK_HERITAGES } from '~/data/mockHeritages'
import { CATEGORY_MAP } from '~/data/categories'

const mapFeatures = [
  { icon: 'mdi:magnify', text: 'Tìm kiếm và lọc di sản theo nhiều tiêu chí' },
  { icon: 'mdi:map-marker-multiple', text: 'Hiển thị tất cả di sản với pin phân loại màu sắc' },
  { icon: 'mdi:information-outline', text: 'Xem thông tin nhanh và audio preview khi click pin' },
  { icon: 'mdi:navigation', text: 'Lên lịch trình tham quan thực địa' },
]

const categoryColors: Record<string, string> = {
  'lich-su': '#8B3A2A',
  'danh-thang': '#2D5016',
  'van-hoa-phi-vat-the': '#C9922A',
  'doi-song-cong-dong': '#6B4C35',
  'giao-duc-truyen-thong': '#B87333',
}

const mapPins = MOCK_HERITAGES.map((h, i) => ({
  id: h.id,
  slug: h.slug,
  title: h.title,
  category: CATEGORY_MAP[h.category]?.labelShort ?? h.category,
  color: categoryColors[h.category] ?? '#C9922A',
  x: 15 + (i * 11) % 70,
  y: 20 + (i * 17) % 55,
}))

const legend = [
  { label: 'Lịch Sử', color: '#8B3A2A' },
  { label: 'Danh Thắng', color: '#2D5016' },
  { label: 'Văn Hóa', color: '#C9922A' },
  { label: 'Cộng Đồng', color: '#6B4C35' },
  { label: 'Giáo Dục', color: '#B87333' },
]
</script>
