<template>
  <div class="min-h-screen bg-charcoal-950 pt-[104px] pb-24">
    <div class="container-heritage">
      <div class="mb-12 text-center space-y-4">
        <span class="eyebrow text-gold-400">TRẢI NGHIỆM ĐỊA PHƯƠNG</span>
        <h1 class="font-heading font-bold text-ivory text-4xl leading-tight">Dịch Vụ Du Lịch</h1>
        <p class="text-charcoal-350 text-base max-w-2xl mx-auto">
          Hoàn thiện chuyến đi của bạn với những lựa chọn lưu trú thư giãn và ẩm thực mang đậm hương vị đại ngàn.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="svc in services" :key="svc.id" class="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-300 group">
          <div class="aspect-video bg-charcoal-850 relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center text-charcoal-700">
              <Icon name="mdi:image-outline" class="w-12 h-12" />
            </div>
            <!-- MVP: Placeholder images -->
            <img v-if="svc.image" :src="svc.image" :alt="svc.name" class="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-3 left-3 z-20">
              <span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-charcoal-950/80 text-gold-400 border border-gold-500/30 rounded-full backdrop-blur-sm">
                {{ getTypeLabel(svc.type) }}
              </span>
            </div>
          </div>
          
          <div class="p-5">
            <h3 class="font-heading font-bold text-ivory text-lg mb-1.5">{{ svc.name }}</h3>
            <p class="text-charcoal-400 text-xs mb-4 line-clamp-2">{{ svc.description }}</p>
            
            <div class="space-y-2 mb-5">
              <p class="flex items-start gap-2 text-xs text-charcoal-300">
                <Icon name="mdi:map-marker-outline" class="w-4 h-4 text-gold-500 shrink-0" />
                <span class="line-clamp-1">{{ svc.address }}</span>
              </p>
              <p v-if="svc.phone" class="flex items-center gap-2 text-xs text-charcoal-300">
                <Icon name="mdi:phone-outline" class="w-4 h-4 text-gold-500 shrink-0" />
                {{ svc.phone }}
              </p>
              <p v-if="svc.priceRange" class="flex items-center gap-2 text-xs text-charcoal-300">
                <Icon name="mdi:cash" class="w-4 h-4 text-gold-500 shrink-0" />
                {{ svc.priceRange }}
              </p>
            </div>

            <button class="w-full btn-ghost text-xs justify-center border-charcoal-750 text-ivory hover:text-gold-400">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TourismService } from '~/types'

useSeoMeta({
  title: 'Dịch vụ Du lịch Bù Đăng — Lưu trú & Ẩm thực',
  description: 'Tìm kiếm homestay, nhà hàng và đặc sản địa phương cho chuyến khám phá Bù Đăng của bạn.'
})

const services: TourismService[] = [
  {
    id: 'ts-1',
    name: 'S\'tiêng Eco Homestay',
    type: 'homestay',
    description: 'Trải nghiệm ngủ nhà dài truyền thống, bao quanh bởi rừng cây xanh mát.',
    address: 'Thôn 2, Xã Đoàn Kết, Bù Đăng',
    phone: '0987 654 321',
    priceRange: '350.000đ - 600.000đ / đêm'
  },
  {
    id: 'ts-2',
    name: 'Nhà hàng Ẩm thực Bản Địa',
    type: 'restaurant',
    description: 'Chuyên phục vụ cơm lam, gà nướng mật ong rừng và canh thụt đặc sản.',
    address: 'Khu vực Thác Mơ',
    priceRange: '150.000đ - 300.000đ / người'
  },
  {
    id: 'ts-3',
    name: 'Cơ sở Dệt Thổ Cẩm',
    type: 'specialty',
    description: 'Sản phẩm dệt thủ công mang hoa văn truyền thống, món quà ý nghĩa mang về.',
    address: 'Làng nghề Bom Bo',
    phone: '0912 345 678'
  }
]

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    homestay: 'Lưu trú',
    restaurant: 'Nhà hàng',
    specialty: 'Đặc sản',
    tour: 'Tour trải nghiệm'
  }
  return labels[type] || 'Dịch vụ'
}
</script>
