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
          <p class="text-charcoal-300 text-lg leading-relaxed">
            Huyện Bù Đăng, tỉnh Bình Phước không chỉ là một tọa độ trên bản đồ Đông Nam Bộ. Đây là miền đất của những cánh rừng nguyên sinh ngút ngàn che chở cách mạng, nơi tiếng thác đổ hoang sơ hòa quyện cùng tiếng cồng chiêng vang vọng khắp sườn đồi từ bao đời nay.
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
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=85"
                alt="Rừng nguyên sinh Bù Đăng"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="rounded-2xl overflow-hidden aspect-square shadow-warm-lg border border-charcoal-700/50 group">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85"
                alt="Lễ hội cồng chiêng"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <div class="space-y-4 pt-8">
            <div class="rounded-2xl overflow-hidden aspect-square shadow-warm-lg border border-charcoal-700/50 group">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85"
                alt="Thác Mơ Bù Đăng"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="rounded-2xl overflow-hidden aspect-[3/4] shadow-warm-lg border border-charcoal-700/50 group">
              <img
                src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=85"
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
