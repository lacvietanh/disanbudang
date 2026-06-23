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
            <img src="/logo-bd.png" alt="Logo Di Sản Bù Đăng" class="h-14 lg:h-16 w-auto object-contain" />
          </div>
          <p class="text-charcoal-300 text-sm leading-relaxed">
            Dự án bảo tồn và phát huy di sản văn hóa – lịch sử Xã Bù Đăng Thành Phố Đồng Nai (Tỉnh Bình Phước cũ).
            Nơi lưu giữ ký ức cộng đồng cho thế hệ hôm nay và mai sau.
          </p>
          <!-- Social -->
          <div class="flex items-center gap-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
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
                class="text-sm text-charcoal-300 hover:text-gold-400 transition-colors duration-200 link-underline"
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
              <span class="sr-only">Địa chỉ</span>
              Xã Bù Đăng Thành Phố Đồng Nai (Tỉnh Bình Phước cũ)
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:email-outline" class="w-4 h-4 text-gold-500 shrink-0" />
              Nguyenxuankiet294@gmail.com
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
        <p>© {{ currentYear }} Nguyễn Xuân Kiệt. Bảo lưu mọi quyền.</p>
        <div class="flex items-center gap-1">
          <span>Người thực hiện:</span>
          <span class="text-gold-400 font-medium mx-1">Nguyễn Xuân Kiệt</span>
          <span>• Cổng thông tin Di sản Bù Đăng</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socials: Array<{ name: string; icon: string; url: string }> = [
  // Social links sẽ được cập nhật khi có trang chính thức
  // { name: 'Facebook', icon: 'mdi:facebook', url: 'https://facebook.com/disanbudang' },
]

const footerLinks = [
  {
    title: 'Di Sản & Du Lịch',
    links: [
      { to: '/map', label: 'Bản Đồ Tương Tác' },
      { to: '/library', label: 'Thư Viện Di Sản' },
      { to: '/tourism', label: 'Dịch Vụ Lưu Trú & Ẩm Thực' },
      { to: '/heritage/chien-khu-d-bu-dang', label: 'Chiến Khu Đ' },
      { to: '/heritage/thac-mo-bu-dang', label: 'Thác Mơ' },
    ],
  },
  {
    title: 'Tham Gia & Đầu Tư',
    links: [
      { to: '/invest', label: 'Cơ Hội Đầu Tư' },
      { to: '/community', label: 'Di Sản Trong Tôi' },
      { to: '/quiz', label: 'Quiz Khám Phá' },
      { to: '/school', label: 'Góc Học Tập' },
      { to: '/news', label: 'Tin Tức & Sự Kiện' },
    ],
  },
]
</script>
