<template>
  <div class="min-h-screen bg-charcoal-950 pt-[104px] pb-24">
    <div class="container-narrow">
      <div class="mb-12 text-center space-y-4">
        <span class="eyebrow text-gold-400">CƠ HỘI PHÁT TRIỂN</span>
        <h1 class="font-heading font-bold text-ivory text-4xl leading-tight">Đầu Tư Bù Đăng</h1>
        <p class="text-charcoal-350 text-base max-w-2xl mx-auto">
          Khám phá những tiềm năng kinh tế, hạ tầng và chính sách ưu đãi dành cho các nhà đầu tư tại vùng đất giàu bản sắc.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="opp in opportunities" :key="opp.id" class="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-300">
          <div class="w-12 h-12 bg-gold-500/10 text-gold-400 rounded-xl flex items-center justify-center mb-4">
            <Icon :name="getIcon(opp.category)" class="w-6 h-6" />
          </div>
          <h3 class="font-heading font-bold text-ivory text-xl mb-2">{{ opp.title }}</h3>
          <p class="text-charcoal-400 text-sm mb-4 leading-relaxed">{{ opp.description }}</p>
          <div class="bg-charcoal-950/50 p-4 rounded-xl border border-charcoal-850">
            <p class="text-xs text-gold-300 font-medium mb-1">Tiềm năng cốt lõi:</p>
            <p class="text-charcoal-300 text-xs">{{ opp.potential }}</p>
          </div>
          <a :href="'mailto:' + opp.contactEmail" class="mt-6 btn-ghost w-full justify-center text-sm border-charcoal-700 hover:border-gold-500/50 text-ivory">
            <Icon name="mdi:email-outline" class="w-4 h-4 mr-2" />
            Liên hệ hợp tác
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InvestmentOpportunity } from '~/types'

useSeoMeta({
  title: 'Đầu Tư Bù Đăng — Tiềm năng & Cơ hội',
  description: 'Thông tin quy hoạch, hạ tầng và các cơ hội đầu tư phát triển kinh tế tại huyện Bù Đăng.'
})

const opportunities: InvestmentOpportunity[] = [
  {
    id: 'inv-1',
    title: 'Nông nghiệp Công nghệ cao',
    category: 'agriculture',
    description: 'Quỹ đất đỏ bazan màu mỡ, phù hợp phát triển vùng trồng cây công nghiệp (điều, tiêu, cao su) và trái cây theo chuẩn VietGAP.',
    potential: 'Sẵn sàng quỹ đất sạch 500ha, hạ tầng tưới tiêu đồng bộ.',
    contactEmail: 'invest@budang.gov.vn'
  },
  {
    id: 'inv-2',
    title: 'Du lịch Sinh thái & Văn hoá',
    category: 'tourism',
    description: 'Kết hợp vẻ đẹp hùng vĩ của tự nhiên và không gian văn hoá cồng chiêng S\'tiêng để xây dựng resort, khu nghỉ dưỡng sinh thái.',
    potential: 'Chính sách ưu đãi thuế 5 năm đầu, hỗ trợ giải phóng mặt bằng.',
    contactEmail: 'tourism@budang.gov.vn'
  }
]

const getIcon = (category: string) => {
  const icons: Record<string, string> = {
    agriculture: 'mdi:leaf',
    tourism: 'mdi:tent',
    infrastructure: 'mdi:road-variant',
    industry: 'mdi:factory'
  }
  return icons[category] || 'mdi:domain'
}
</script>
