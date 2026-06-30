<template>
  <section class="section relative overflow-hidden bg-charcoal-900 border-t border-b border-charcoal-800" aria-label="Storytelling introduction">
    <!-- Subtle textured background -->
    <div class="noise-overlay" />
    <div class="absolute inset-0 bg-dark-earth opacity-40 pointer-events-none" />

    <div class="container-heritage relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text Content -->
        <div class="lg:col-span-7 space-y-6 reveal">
          <span class="section-label">Âm Vang Đại Ngàn</span>
          <h2 class="section-title">Nơi Đất Trời Gặp Gỡ Lịch Sử</h2>
          <p class="text-charcoal-300 text-lg leading-relaxed max-w-2xl mb-8 animate-fade-up" style="animation-delay: 0.2s">
            Năm 1965, giữa đại ngàn Bù Đăng hiểm trở, nhịp chày giã gạo của đồng bào S'tiêng đã nổi lên và ngân vang không dứt suốt những đêm trường kháng chiến. Từ cụ già bạc tóc đến em thơ nhỏ tuổi, hàng trăm con người cùng thắp sáng đuốc lồ ô, chạy đua với thời gian để giã gạo nuôi quân phục vụ tiền tuyến. Nhịp chày giã gạo giã cả lòng yêu nước ấy đã đi vào lịch sử oai hùng, hóa thành khúc nhạc cách mạng bất hủ <em class="text-gold-400 not-italic">"Tiếng chày trên Sóc Bom Bo"</em> làm lay động bao thế hệ. Bù Đăng không chỉ là tên gọi trên bản đồ hành chính — đây là cả một cõi di sản thiêng liêng với những dấu chân lịch sử và tiếng vọng ngàn năm đang chờ bạn lắng nghe và gìn giữ.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-brick-500/20 flex items-center justify-center text-brick-400 shrink-0">
                <Icon name="mdi:shield-outline" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory text-base mb-1">Căn Cứ Cách Mạng</h4>
                <p class="text-charcoal-400 text-sm">Rừng Chiến Khu Đ oai hùng từng là điểm tựa vững chãi của miền Đông Nam Bộ.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-forest-500/20 flex items-center justify-center text-forest-400 shrink-0">
                <Icon name="mdi:pine-tree" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory text-base mb-1">Thiên Nhiên Kỳ Vĩ</h4>
                <p class="text-charcoal-400 text-sm">Hệ sinh thái phong phú với những ngọn thác thơ mộng ẩn mình giữa đại ngàn.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                <Icon name="mdi:music-clef-treble" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory text-base mb-1">Âm Nhạc Cồng Chiêng</h4>
                <p class="text-charcoal-400 text-sm">Không gian cồng chiêng S'tiêng kết nối linh thiêng giữa con người và vũ trụ.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-earth-500/20 flex items-center justify-center text-earth-400 shrink-0">
                <Icon name="mdi:home-group" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory text-base mb-1">Đời Sống Bản Địa</h4>
                <p class="text-charcoal-400 text-sm">Những nếp nhà dài trăm mét kể câu chuyện cố kết cộng đồng keo sơn.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Curated Cinematic Graphics Grid -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-4 relative reveal">
          <div class="space-y-4">
            <div class="rounded-2xl overflow-hidden aspect-[3/4] shadow-warm-lg border border-charcoal-700/50 group">
              <img
                src="/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp"
                alt="Rừng nguyên sinh Bù Đăng"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="rounded-2xl overflow-hidden aspect-square shadow-warm-lg border border-charcoal-700/50 group">
              <img
                src="/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp"
                alt="Lễ hội cồng chiêng"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <div class="space-y-4 pt-8">
            <div class="rounded-2xl overflow-hidden aspect-square shadow-warm-lg border border-charcoal-700/50 group">
              <img
                src="/images/heritage/danh-thang/thac-dung-lg.webp"
                alt="Thác Mơ Bù Đăng"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="rounded-2xl overflow-hidden aspect-[3/4] shadow-warm-lg border border-charcoal-700/50 group">
              <img
                src="/images/heritage/lich-su/soc-bom-bo-lg.webp"
                alt="Chiến Khu Đ"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <!-- Decorative golden orbit -->
          <div class="absolute -z-10 -bottom-6 -right-6 w-40 h-40 rounded-full border border-gold-500/10 animate-spin-slow pointer-events-none" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))
</script>
