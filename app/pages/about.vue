<template>
  <div class="bg-ivory">
    <!-- Hero cinematic -->
    <section class="relative min-h-[60vh] flex items-end overflow-hidden">
      <img src="/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp"
        alt="Rừng Bù Đăng" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-r from-charcoal-900/70 to-transparent" />
      <div class="relative z-10 container-heritage pb-16">
        <span class="section-label text-gold-400">Về Dự Án</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-7xl leading-none mb-4 text-shadow-hero">
          Di Sản<br/><span class="text-gradient-gold">Bù Đăng</span>
        </h1>
        <p class="font-accent italic text-ivory/80 text-2xl">"Lưu giữ để không quên — Chia sẻ để cùng lớn"</p>
      </div>
    </section>

    <div class="container-heritage py-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-12">

          <div class="reveal">
            <h2 class="font-heading font-bold text-charcoal-900 text-3xl mb-5 flex items-center gap-3">
              <span class="w-1 h-8 bg-gold-500 rounded-full" />
              Dự Án Là Gì?
            </h2>
            <div class="prose-heritage">
              <p>
                <strong>Di Sản Bù Đăng</strong> là một dự án bảo tàng số cộng đồng — nơi toàn bộ di sản văn hóa, lịch sử và thiên nhiên của Xã Bù Đăng Thành Phố Đồng Nai (Tỉnh Bình Phước cũ) được số hóa, lưu trữ và chia sẻ rộng rãi đến mọi tầng lớp nhân dân.
              </p>
              <p>
                Bù Đăng là vùng đất giàu truyền thống — từ Chiến Khu Đ anh hùng trong hai cuộc kháng chiến, đến những cánh rừng nguyên sinh hùng vĩ, từ văn hóa cồng chiêng của người S'tiêng được UNESCO vinh danh, đến những ngôi nhà dài truyền thống, làng nghề dệt thổ cẩm tinh tế. Tất cả đều xứng đáng được lưu giữ và tôn vinh.
              </p>
              <p>
                Dự án được xây dựng như một <strong>hành trình khám phá số</strong> — không phải một website thông tin khô khan, mà là một không gian trải nghiệm sống động: bạn có thể nghe tiếng kể chuyện của già làng, xem bản đồ di sản tương tác, làm quiz kiểm tra kiến thức, và đọc những câu chuyện do chính cộng đồng địa phương viết ra.
              </p>
            </div>
          </div>

          <div class="reveal">
            <h2 class="font-heading font-bold text-charcoal-900 text-3xl mb-8 flex items-center gap-3">
              <span class="w-1 h-8 bg-brick-500 rounded-full" />
              Mục Tiêu
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="goal in goals" :key="goal.title" class="p-5 rounded-2xl bg-white shadow-card">
                <div class="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" :style="{ background: `${goal.color}15` }">
                  <Icon :name="goal.icon" class="w-5 h-5" :style="{ color: goal.color }" />
                </div>
                <h4 class="font-heading font-bold text-charcoal-800 text-base mb-1.5">{{ goal.title }}</h4>
                <p class="text-charcoal-500 text-sm leading-relaxed">{{ goal.desc }}</p>
              </div>
            </div>
          </div>

          <div class="reveal">
            <h2 class="font-heading font-bold text-charcoal-900 text-3xl mb-8 flex items-center gap-3">
              <span class="w-1 h-8 bg-forest-500 rounded-full" />
              Đội Ngũ Thực Hiện
            </h2>
            <div class="space-y-4">
              <div v-for="team in teams" :key="team.name" class="flex gap-4 p-4 rounded-2xl bg-white shadow-card">
                <div class="w-12 h-12 rounded-xl bg-gradient-earth flex items-center justify-center flex-shrink-0">
                  <Icon :name="team.icon" class="w-6 h-6 text-ivory" />
                </div>
                <div>
                  <p class="font-heading font-bold text-charcoal-800 text-base">{{ team.name }}</p>
                  <p class="text-charcoal-500 text-sm">{{ team.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Stats -->
          <div class="bg-charcoal-800 rounded-2xl p-6">
            <h3 class="font-heading font-bold text-ivory text-lg mb-5">Số Liệu Dự Án</h3>
            <div class="space-y-4">
              <div v-for="stat in projectStats" :key="stat.label" class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-charcoal-300 text-sm">
                  <Icon :name="stat.icon" class="w-4 h-4 text-gold-400" />
                  {{ stat.label }}
                </div>
                <span class="font-heading font-bold text-ivory">{{ stat.value }}</span>
              </div>
            </div>
          </div>


          <!-- Timeline -->
          <div class="bg-beige-50 rounded-2xl p-6">
            <h3 class="font-heading font-bold text-charcoal-800 text-lg mb-5">Lộ Trình Dự Án</h3>
            <div class="space-y-3">
              <div v-for="milestone in milestones" :key="milestone.date" class="flex gap-3">
                <div class="flex flex-col items-center">
                  <div class="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" :class="milestone.done ? 'bg-gold-500' : 'bg-charcoal-200'" />
                  <div v-if="milestone !== milestones[milestones.length - 1]" class="w-px flex-1 bg-beige-200 my-1 min-h-[1.5rem]" />
                </div>
                <div class="pb-3">
                  <p class="text-gold-600 text-xs font-semibold">{{ milestone.date }}</p>
                  <p class="text-charcoal-700 text-sm font-medium">{{ milestone.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Giới Thiệu — Di Sản Bù Đăng', description: 'Tìm hiểu về dự án bảo tàng số Di Sản Bù Đăng.' })

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const goals = [
  { icon: 'mdi:archive', title: 'Số Hóa & Lưu Trữ', desc: 'Bảo tồn di sản dưới dạng kỹ thuật số, không để ký ức bị lãng quên.', color: '#6B4C35' },
  { icon: 'mdi:compass', title: 'Khám Phá & Giáo Dục', desc: 'Tạo trải nghiệm học tập thú vị về lịch sử và văn hóa địa phương.', color: '#2D5016' },
  { icon: 'mdi:account-group', title: 'Kết Nối Cộng Đồng', desc: 'Gắn kết người dân địa phương qua kho lưu trữ ký ức chung.', color: '#C9922A' },
  { icon: 'mdi:earth', title: 'Quảng Bá Du Lịch', desc: 'Giới thiệu vẻ đẹp Bù Đăng đến du khách trong và ngoài nước.', color: '#8B3A2A' },
]

const teams = [
  { name: 'Nguyễn Xuân Kiệt', role: 'Người thực hiện dự án (Product Designer, Frontend Engineer & SEO Specialist)', icon: 'mdi:account-star' },
  { name: 'Vũ Thị Thanh', role: 'Giáo viên hướng dẫn - Giáo viên trường THPT Lê Quý Đôn', icon: 'mdi:school' },
  { name: 'Lạc Việt Anh', role: 'Mentor - Cố vấn, hỗ trợ', icon: 'mdi:account-tie' },
]

const projectStats = [
  { icon: 'mdi:castle', label: 'Di sản số hóa', value: '8+' },
  { icon: 'mdi:headphones', label: 'Audio guide', value: '12' },
  { icon: 'mdi:help-circle', label: 'Câu hỏi quiz', value: '15+' },
  { icon: 'mdi:account-group', label: 'Người đóng góp', value: '80+' },
  { icon: 'mdi:eye', label: 'Lượt truy cập', value: '15K+' },
]

const milestones = [
  { date: 'Q1 2024', title: 'Khởi động dự án & thu thập dữ liệu', done: true },
  { date: 'Q2 2024', title: 'Xây dựng nền tảng kỹ thuật số', done: true },
  { date: 'Q3 2024', title: 'Ra mắt phiên bản beta', done: true },
  { date: 'Q4 2024', title: 'Mở rộng nội dung & cộng đồng', done: false },
  { date: '2025', title: 'Tích hợp VR/AR trải nghiệm thực địa', done: false },
]
</script>
