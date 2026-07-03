<template>
  <section class="section bg-charcoal-950 relative overflow-hidden border-t border-charcoal-800" aria-label="Tầm nhìn mở rộng">
    <div class="noise-overlay" />
    <!-- Decorative glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

    <div class="container-heritage relative z-10">
      <!-- Header -->
      <div class="text-center mb-14 reveal">
        <span class="section-label">Lộ Trình</span>
        <h2 class="section-title">Từ Bù Đăng — Vươn Ra Thành Phố Đồng Nai</h2>
        <p class="text-charcoal-400 text-base max-w-2xl mx-auto mt-4">
          Bù Đăng là thí điểm — Thành Phố Đồng Nai là đích đến.
          Dự án số hóa di sản theo mô hình nhân rộng ra toàn thành phố.
        </p>
      </div>

      <!-- Phase cards -->
      <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto reveal">
        <!-- Phase 1 -->
        <div class="relative rounded-3xl border border-gold-500/30 bg-gold-500/5 p-8 overflow-hidden group hover:border-gold-500/60 transition-all duration-500">
          <div class="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-5">
              <span class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs font-bold tracking-widest uppercase">
                <span class="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                Đang triển khai
              </span>
            </div>
            <h3 class="font-heading font-bold text-ivory text-2xl mb-4">
              🏕️ Giai Đoạn 1
              <span class="block text-gold-400 text-xl mt-1">Vùng đất Bù Đăng</span>
            </h3>
            <ul class="space-y-3 text-sm text-charcoal-300">
              <li class="flex items-start gap-2.5">
                <Icon name="mdi:check-circle" class="w-4 h-4 text-forest-400 mt-0.5 shrink-0" />
                <span>11 di sản văn hóa, lịch sử, thiên nhiên đã được số hóa đầy đủ</span>
              </li>
              <li class="flex items-start gap-2.5">
                <Icon name="mdi:check-circle" class="w-4 h-4 text-forest-400 mt-0.5 shrink-0" />
                <span>5 phân hệ chức năng: Khám phá · Học tập · Bản đồ · Tin tức · Đóng góp</span>
              </li>
              <li class="flex items-start gap-2.5">
                <Icon name="mdi:check-circle" class="w-4 h-4 text-forest-400 mt-0.5 shrink-0" />
                <span>AI trợ lý hướng dẫn di sản &amp; quiz tương tác gamification</span>
              </li>
              <li class="flex items-start gap-2.5">
                <Icon name="mdi:check-circle" class="w-4 h-4 text-forest-400 mt-0.5 shrink-0" />
                <span>Cộng đồng đóng góp ký ức &amp; chuẩn hóa SEO đa ngôn ngữ</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Phase 2 -->
        <div class="relative rounded-3xl border border-charcoal-700 bg-charcoal-900/60 p-8 overflow-hidden group hover:border-gold-500/30 transition-all duration-500">
          <div class="absolute inset-0 bg-gradient-to-br from-charcoal-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-5">
              <span class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-800 border border-charcoal-700 text-charcoal-400 text-xs font-bold tracking-widest uppercase">
                <Icon name="mdi:rocket-launch-outline" class="w-3 h-3" />
                Tầm nhìn 2026–2027
              </span>
            </div>
            <h3 class="font-heading font-bold text-ivory text-2xl mb-4">
              🏙️ Giai Đoạn 2
              <span class="block text-charcoal-300 text-xl mt-1">Toàn Thành Phố Đồng Nai</span>
              <span class="block text-charcoal-500 text-sm mt-0.5 font-normal">TP trực thuộc Trung ương thứ 7</span>
            </h3>
            <ul class="space-y-3 text-sm text-charcoal-400">
              <li class="flex items-start gap-2.5">
                <Icon name="mdi:arrow-right-circle-outline" class="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                <span>Nhân rộng mô hình số hóa ra toàn bộ các điểm di sản Thành Phố Đồng Nai</span>
              </li>
              <li class="flex items-start gap-2.5">
                <Icon name="mdi:arrow-right-circle-outline" class="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                <span>Kết nối mạng lưới bảo tàng số liên thông toàn thành phố</span>
              </li>
              <li class="flex items-start gap-2.5">
                <Icon name="mdi:arrow-right-circle-outline" class="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                <span>Tích hợp hệ thống smart tourism &amp; QR code thực địa</span>
              </li>
              <li class="flex items-start gap-2.5">
                <Icon name="mdi:arrow-right-circle-outline" class="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                <span>Hợp tác với Sở VHTT&amp;DL Đồng Nai để phổ cập giáo dục địa phương</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Arrow connector -->
      <div class="hidden md:flex justify-center items-center my-8 -mt-2 reveal">
        <div class="flex items-center gap-3 text-charcoal-500 text-sm">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-charcoal-700 to-transparent w-32" />
          <span class="px-4 py-2 rounded-full border border-charcoal-700 bg-charcoal-900 text-xs tracking-widest uppercase text-charcoal-400">
            Bù Đăng → Đồng Nai
          </span>
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-charcoal-700 to-transparent w-32" />
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-10 reveal">
        <NuxtLink to="/about" class="btn-primary inline-flex items-center gap-2 px-6 py-3">
          <Icon name="mdi:map-legend" class="w-4 h-4" />
          Xem đầy đủ tầm nhìn dự án
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))
</script>
