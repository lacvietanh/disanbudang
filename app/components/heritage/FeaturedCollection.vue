<template>
  <BaseSection
    label="Tuyển Chọn Đặc Biệt"
    title="Ký Ức Di Sản Nổi Bật"
    description="Khám phá những khoảnh khắc đắt giá ghi lại giá trị văn hóa và vẻ đẹp thiên nhiên trường tồn của Bù Đăng."
    class="bg-charcoal-950 border-y border-charcoal-850"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
      <div
        v-for="img in featuredImages"
        :key="img.id"
        class="group relative overflow-hidden rounded-3xl h-[400px] border border-charcoal-800 cursor-pointer shadow-warm bg-charcoal-900"
        @click="navigateTo('/gallery')"
      >
        <!-- Background Image -->
        <img
          :src="img.sizes.md"
          :alt="img.alt.vi"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
        />

        <!-- Overlay Gradients -->
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/40 to-transparent" />
        <div class="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/20 rounded-[23px] transition-colors duration-500" />

        <!-- Card Contents -->
        <div class="absolute inset-0 p-6 flex flex-col justify-end">
          <span class="text-3xs uppercase tracking-widest font-semibold text-gold-400 mb-1">
            {{ getCategoryLabel(img.category) }}
          </span>
          <h3 class="font-heading font-bold text-ivory text-xl mb-2 text-shadow-sm group-hover:text-gold-200 transition-colors">
            {{ img.title }}
          </h3>
          <p class="text-charcoal-400 text-xs line-clamp-2 mb-4">
            {{ img.alt.vi }}
          </p>

          <div class="flex items-center justify-between pt-3 border-t border-charcoal-800/80">
            <span class="text-3xs text-charcoal-450 flex items-center gap-1">
              <Icon name="mdi:map-marker" class="w-3.5 h-3.5 text-gold-500" />
              {{ img.location }}
            </span>
            <div class="w-7 h-7 rounded-full bg-gold-500/10 group-hover:bg-gold-500 flex items-center justify-center transition-all duration-300">
              <Icon name="mdi:arrow-right" class="w-4 h-4 text-gold-400 group-hover:text-charcoal-900" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View gallery CTA -->
    <div class="text-center mt-12">
      <NuxtLink to="/gallery" class="btn-primary">
        Ghé thăm Triển lãm ảnh
        <Icon name="mdi:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import metadata from '../../../public/images/heritage/metadata.json'

// Pull out 4 main heritage photos for display
const featuredImages = computed(() => {
  const targets = ['bu-lach', 'soc-bom-bo', 'cong-chieng', 'thac-dung']
  return metadata.images.filter((img) => targets.some(t => img.id.includes(t))).slice(0, 4)
})

function getCategoryLabel(cat: string) {
  const map: Record<string, string> = {
    'lich-su': 'Lịch Sử',
    'danh-thang': 'Danh Thắng',
    'van-hoa-phi-vat-the': 'Phi Vật Thể',
    'doi-song-cong-dong': 'Cộng Đồng',
  }
  return map[cat] || cat
}
</script>
