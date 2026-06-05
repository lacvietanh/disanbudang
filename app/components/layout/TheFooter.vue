<template>
  <footer class="bg-charcoal-900 text-ivory relative overflow-hidden">
    <!-- Background texture -->
    <div class="absolute inset-0 opacity-5 pointer-events-none"
      style='background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect width=%2260%22 height=%2260%22 fill=%22none%22/%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22 fill=%22%23C9922A%22 opacity=%220.5%22/%3E%3C/svg%3E"); background-size: 60px 60px;'
    />

    <!-- Decorative top border -->
    <div class="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

    <div class="container-heritage py-16 lg:py-20 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        <!-- Brand Column -->
        <div class="lg:col-span-1 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-earth flex items-center justify-center">
              <span class="text-ivory font-heading font-bold text-xl">D</span>
            </div>
            <div>
              <p class="font-heading font-bold text-ivory text-lg leading-tight">Di Sản Bù Đăng</p>
              <p class="font-accent italic text-gold-400 text-sm">Bảo Tàng Số Địa Phương</p>
            </div>
          </div>
          <p class="text-charcoal-300 text-sm leading-relaxed">
            Dự án bảo tồn và phát huy di sản văn hóa – lịch sử huyện Bù Đăng, tỉnh Bình Phước.
            Nơi lưu giữ ký ức cộng đồng cho thế hệ hôm nay và mai sau.
          </p>
          <!-- Social -->
          <div class="flex items-center gap-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              class="w-9 h-9 rounded-lg bg-charcoal-800 flex items-center justify-center text-charcoal-400 hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300"
            >
              <Icon :name="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Navigation Columns -->
        <div v-for="col in footerLinks" :key="col.title" class="space-y-5">
          <h5 class="eyebrow text-gold-400 text-xs">{{ col.title }}</h5>
          <ul class="space-y-3">
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-charcoal-300 hover:text-ivory transition-colors duration-200 link-underline"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact / QR Column -->
        <div class="space-y-5">
          <h5 class="eyebrow text-gold-400 text-xs">Liên Hệ</h5>
          <div class="space-y-3 text-sm text-charcoal-300">
            <p class="flex items-start gap-2">
              <Icon name="mdi:map-marker-outline" class="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
              UBND Huyện Bù Đăng, Tỉnh Bình Phước, Việt Nam
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:email-outline" class="w-4 h-4 text-gold-500 shrink-0" />
              disanbudang@binhphuoc.gov.vn
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:phone-outline" class="w-4 h-4 text-gold-500 shrink-0" />
              (0271) 3 567 890
            </p>
          </div>

          <!-- Mini QR -->
          <div class="flex items-center gap-3 pt-2">
            <div class="w-14 h-14 bg-ivory rounded-lg flex items-center justify-center">
              <Icon name="mdi:qrcode" class="w-10 h-10 text-charcoal-800" />
            </div>
            <div class="text-xs text-charcoal-400">
              <p class="text-charcoal-300 font-medium mb-0.5">Quét QR</p>
              <p>Truy cập nhanh<br/>trên thiết bị di động</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-14 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
        <p>© {{ currentYear }} Di Sản Bù Đăng. Bảo lưu mọi quyền.</p>
        <div class="flex items-center gap-1">
          <span>Dự án của</span>
          <span class="text-gold-400 font-medium mx-1">UBND Huyện Bù Đăng</span>
          <span>• Bình Phước, Việt Nam</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socials = [
  { name: 'Facebook', icon: 'mdi:facebook', url: '#' },
  { name: 'YouTube', icon: 'mdi:youtube', url: '#' },
  { name: 'Instagram', icon: 'mdi:instagram', url: '#' },
  { name: 'TikTok', icon: 'mdi:music-note', url: '#' },
]

const footerLinks = [
  {
    title: 'Di Sản',
    links: [
      { to: '/map', label: 'Bản Đồ Tương Tác' },
      { to: '/library', label: 'Thư Viện Di Sản' },
      { to: '/heritage/chien-khu-d-bu-dang', label: 'Chiến Khu Đ' },
      { to: '/heritage/thac-mo-bu-dang', label: 'Thác Mơ' },
      { to: '/heritage/le-hoi-cong-chieng-stieng', label: 'Cồng Chiêng S\'tiêng' },
    ],
  },
  {
    title: 'Tham Gia',
    links: [
      { to: '/community', label: 'Di Sản Trong Tôi' },
      { to: '/quiz', label: 'Quiz Khám Phá' },
      { to: '/school', label: 'Góc Học Tập' },
      { to: '/contribute', label: 'Đóng Góp Tư Liệu' },
      { to: '/news', label: 'Tin Tức & Sự Kiện' },
    ],
  },
]
</script>
