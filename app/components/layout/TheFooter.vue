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
            <NuxtImg src="/favicon/icon-192.png" alt="Logo Di Sản Bù Đăng" class="h-14 lg:h-16 w-auto object-contain" />
            <div class="flex flex-col justify-center text-left">
              <span class="font-heading font-bold text-ivory text-sm lg:text-base leading-tight">
                Di Sản
              </span>
              <span class="font-heading font-bold text-gold-400 text-sm lg:text-base leading-tight -mt-0.5">
                Bù Đăng
              </span>
            </div>
          </div>
          <p class="text-charcoal-300 text-sm leading-relaxed">
            Dự án bảo tồn và tôn vinh di sản văn hóa, lịch sử và thiên nhiên vùng đất Bù Đăng.
            Linh hồn đại ngàn trong lòng Thành Phố Đồng Nai.
          </p>

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
              Vùng đất Bù Đăng, Thành Phố Đồng Nai
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:phone-outline" class="w-4 h-4 text-gold-500 shrink-0" />
              <span class="sr-only">Số điện thoại:</span>
              <a href="tel:0355356294" class="hover:text-gold-400 transition-colors">0355 356 294</a>
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:email-outline" class="w-4 h-4 text-gold-500 shrink-0" />
              <span class="sr-only">Email:</span>
              <a href="mailto:nguyenxuankiet294@gmail.com" class="hover:text-gold-400 transition-colors">nguyenxuankiet294@gmail.com</a>
            </p>
          </div>


        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-14 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
        <p>© {{ currentYear }} Nguyễn Xuân Kiệt. Bảo lưu mọi quyền.</p>
          <div class="flex items-center gap-1">
            <span>Người thực hiện:</span>
            <span class="text-gold-400 font-medium mx-1">Nguyễn Xuân Kiệt</span>
            <span>• Cổng di sản Bù Đăng, Thành Phố Đồng Nai</span>
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
      { to: '/#school-corner', label: 'Góc Học Tập Học Sinh' },
    ],
  },
  {
    title: 'Thông Tin & Đối Tác',
    links: [
      { to: '/about', label: 'Về Di Sản Bù Đăng' },
      { to: '/news', label: 'Bài Viết & Sự Kiện' },
      { to: '/invest', label: 'Cơ Hội Đầu Tư' },
      { to: '/contribute', label: 'Đóng Góp Di Sản' },
    ],
  },
]
</script>
