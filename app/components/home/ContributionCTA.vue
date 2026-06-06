<template>
  <section class="section bg-dark-earth relative overflow-hidden">
    <!-- Contribution CTA -->
    <div class="container-heritage">
      <div class="relative overflow-hidden rounded-3xl reveal">
        <!-- Background image -->
        <img
          src="/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-lg.webp"
          alt="Ký ức địa phương"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-charcoal-900/92 via-charcoal-900/70 to-charcoal-900/40" />

        <div class="relative z-10 py-20 px-8 lg:px-16 max-w-3xl">
          <!-- Quote mark -->
          <div class="text-gold-400/30 font-heading text-9xl leading-none mb-4 select-none">"</div>

          <h2 class="text-display-sm text-ivory mb-5 -mt-8">
            Ký Ức Địa Phương<br/>
            <span class="text-gradient-gold">Cần Được Lưu Giữ</span>
          </h2>

          <p class="text-charcoal-200 text-lg leading-relaxed mb-8 max-w-xl">
            Mỗi tấm ảnh cũ, mỗi câu chuyện được kể lại, mỗi tư liệu được chia sẻ —
            đều là một viên gạch xây nên ngôi nhà ký ức của cộng đồng Bù Đăng.
          </p>

          <!-- Contribution options -->
          <div class="flex flex-wrap gap-4 mb-10">
            <div
              v-for="opt in options"
              :key="opt.label"
              class="flex items-center gap-2 glass-dark rounded-full px-4 py-2.5"
            >
              <Icon :name="opt.icon" class="w-4 h-4 text-gold-400" />
              <span class="text-ivory text-sm">{{ opt.label }}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/contribute" class="btn-primary text-base px-8 py-4">
              <Icon name="mdi:upload" class="w-5 h-5" />
              Đóng Góp Tư Liệu
            </NuxtLink>
            <NuxtLink to="/community" class="btn-ghost text-base px-8 py-4">
              <Icon name="mdi:account-group-outline" class="w-5 h-5" />
              Xem Cộng Đồng
            </NuxtLink>
          </div>
        </div>

        <!-- Floating stats right side -->
        <div class="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          <div
            v-for="stat in contributionStats"
            :key="stat.label"
            class="glass-dark rounded-2xl px-5 py-4 text-center w-32"
          >
            <p class="font-heading font-bold text-gold-400 text-2xl mb-0.5">{{ stat.value }}</p>
            <p class="text-charcoal-400 text-xs">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const options = [
  { icon: 'mdi:image-multiple', label: 'Ảnh & Video' },
  { icon: 'mdi:file-document', label: 'Tư Liệu Cũ' },
  { icon: 'mdi:microphone', label: 'Câu Chuyện' },
  { icon: 'mdi:map-marker-plus', label: 'Địa Điểm Mới' },
]

const contributionStats = [
  { value: '200+', label: 'Tư liệu' },
  { value: '1.2K', label: 'Ảnh' },
  { value: '80+', label: 'Người đóng góp' },
]
</script>
