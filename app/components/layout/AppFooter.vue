<template>
  <footer class="bg-charcoal-900 text-white relative overflow-hidden border-t border-charcoal-800">
    <!-- Background texture -->
    <div class="absolute inset-0 opacity-5 pointer-events-none"
      style='background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect width=%2260%22 height=%2260%22 fill=%22none%22/%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22 fill=%22%23C7A664%22 opacity=%220.5%22/%3E%3C/svg%3E"); background-size: 60px 60px;'
    />

    <!-- Decorative top border -->
    <div class="h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

    <div class="container-heritage py-16 lg:py-20 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        <!-- Brand Column -->
        <div class="lg:col-span-1 space-y-6">
          <div class="flex items-center gap-3">
            <NuxtImg src="/favicon/icon-192.png" alt="Logo Di Sản Thành Phố Đồng Nai" class="h-14 lg:h-16 w-auto object-contain shrink-0" />
            <div class="flex flex-col justify-center text-left min-w-0">
              <span class="font-heading font-bold text-white text-sm lg:text-base leading-tight whitespace-nowrap">
                Di Sản
              </span>
              <span class="font-heading font-bold text-gold-300 text-sm lg:text-base leading-tight -mt-0.5 whitespace-nowrap">
                Bù Đăng
              </span>
            </div>
          </div>
          <p class="text-ivory/75 text-sm leading-relaxed">
            Dự án bảo tồn và tôn vinh di sản văn hóa, lịch sử và thiên nhiên khắp Thành Phố Đồng Nai —
            từ Biên Hòa, Sóc Bom Bo đến Chiến Khu Đ, núi Bà Rá và Chốt Chỉ Huy Tà Thiết.
          </p>

        </div>

        <!-- Navigation Columns -->
        <div v-for="col in footerLinks" :key="col.title" class="space-y-5">
          <h5 class="eyebrow text-gold-300 text-xs">{{ col.title }}</h5>
          <ul class="space-y-3">
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-ivory/75 hover:text-white transition-colors duration-200 link-underline"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact / QR Column -->
        <div class="space-y-5">
          <h5 class="eyebrow text-gold-300 text-xs">Liên Hệ</h5>
          <div class="space-y-3 text-sm text-ivory/75">
            <p class="flex items-start gap-2">
              <Icon name="mdi:map-marker-outline" class="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <span class="sr-only">Địa chỉ</span>
              Thành Phố Đồng Nai, Việt Nam
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:phone-outline" class="w-4 h-4 text-gold-400 shrink-0" />
              <span class="sr-only">Số điện thoại:</span>
              <a href="tel:0355356294" class="hover:text-white transition-colors">0355 356 294</a>
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:email-outline" class="w-4 h-4 text-gold-400 shrink-0" />
              <span class="sr-only">Email:</span>
              <a href="mailto:nguyenxuankiet294@gmail.com" class="hover:text-white transition-colors">nguyenxuankiet294@gmail.com</a>
            </p>
          </div>


        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-14 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/70">
        <p>© {{ currentYear }} Nguyễn Xuân Kiệt. Bảo lưu mọi quyền.</p>
          <div class="flex items-center gap-1">
            <span>Người thực hiện:</span>
            <span class="text-gold-300 font-medium mx-1">Nguyễn Xuân Kiệt</span>
            <span>• Cổng di sản số Thành Phố Đồng Nai</span>
          </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = [
  {
    title: 'Khám Phá',
    links: [
      { to: '/map', label: 'Bản Đồ Tương Tác' },
      { to: '/explore', label: 'Thư Viện Di Sản' },
      { to: '/explore?tab=community', label: 'Trải Nghiệm & Cộng Đồng' },
      { to: '/#quiz', label: 'Trắc Nghiệm Di Sản' },
      { to: '/study', label: 'Góc Học Tập Học Sinh' },
    ],
  },
  {
    title: 'Thông Tin & Đối Tác',
    links: [
      { to: '/about', label: 'Về Dự Án' },
      { to: '/news', label: 'Bài Viết & Sự Kiện' },
      { to: '/invest', label: 'Cơ Hội Đầu Tư' },
      { to: '/contribute', label: 'Đóng Góp Di Sản' },
    ],
  },
]
</script>
