<template>
  <section id="school-corner" class="section bg-beige-200 relative overflow-hidden scroll-mt-20">
    <div class="absolute top-0 right-0 w-80 h-80 bg-copper-500/8 rounded-full blur-3xl pointer-events-none" />

    <div class="container-heritage relative z-10">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <span class="section-label">Góc Học Tập</span>
          <h2 class="section-title">Học Sinh Nghiên Cứu Di Sản</h2>
        </div>
        <NuxtLink to="/explore" class="btn-dark flex-shrink-0">
          Xem Tất Cả Nghiên Cứu
          <Icon name="mdi:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(resource, i) in resources"
          :key="resource.id"
          class="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group reveal cursor-pointer"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <!-- Type banner -->
          <div class="h-1 w-full" :style="{ background: typeColors[resource.type] }" />

          <div class="p-6">
            <!-- Type badge + icon -->
            <div class="flex items-center justify-between mb-4">
              <div
                class="flex items-center gap-2 px-3 py-1.5 rounded-full"
                :style="{ background: `${typeColors[resource.type]}15` }"
              >
                <Icon :name="typeIcons[resource.type]" class="w-3.5 h-3.5" :style="{ color: typeColors[resource.type] }" />
                <span class="text-2xs font-semibold uppercase tracking-wider" :style="{ color: typeColors[resource.type] }">
                  {{ typeLabels[resource.type] }}
                </span>
              </div>
              <span class="text-charcoal-400 text-xs">{{ resource.grade }}</span>
            </div>

            <h3 class="font-heading font-bold text-charcoal-800 text-base leading-tight mb-2 group-hover:text-earth-600 transition-colors line-clamp-2">
              {{ resource.title }}
            </h3>
            <p class="text-charcoal-500 text-sm leading-relaxed line-clamp-2 mb-4">
              {{ resource.description }}
            </p>

            <!-- Meta -->
            <div class="border-t border-beige-200 pt-4 flex items-center justify-between">
              <div>
                <p class="text-charcoal-700 text-sm font-medium">{{ resource.author }}</p>
                <p class="text-charcoal-400 text-xs">{{ resource.school }}</p>
              </div>
              <div class="flex items-center gap-1 text-charcoal-400 text-xs">
                <Icon name="mdi:download-outline" class="w-3.5 h-3.5" />
                {{ resource.downloadCount }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievement banner -->
      <div class="mt-10 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-copper-600 to-earth-600 flex flex-col md:flex-row items-center gap-6 reveal">
        <div class="w-14 h-14 rounded-2xl bg-ivory/20 flex items-center justify-center flex-shrink-0">
          <Icon name="mdi:school" class="w-7 h-7 text-ivory" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h3 class="font-heading font-bold text-ivory text-xl mb-1">Dự Án Di Sản Trường Học</h3>
          <p class="text-ivory/80 text-sm">Hơn 50 bài nghiên cứu từ học sinh các trường THCS & THPT Bù Đăng được lưu giữ trên hệ thống</p>
        </div>
        <NuxtLink to="/explore" class="btn-ghost flex-shrink-0">
          Tham Gia Dự Án
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SchoolResource } from '~/types'

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const resources: SchoolResource[] = [
  {
    id: 'res-001',
    title: 'Lịch Sử Hình Thành Chiến Khu Đ Qua Lời Kể Người Chứng Nhân',
    description: 'Nghiên cứu điền dã ghi chép lại câu chuyện của 12 cựu chiến binh Chiến Khu Đ còn sống.',
    type: 'research',
    subject: 'Lịch sử địa phương',
    grade: 'Lớp 12',
    school: 'THPT Bù Đăng',
    author: 'Nhóm HS 12A1',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2024-04-10',
    featured: true,
    downloadCount: 234,
  },
  {
    id: 'res-002',
    title: 'Phân Tích Hoa Văn Thổ Cẩm S\'tiêng: Ngôn Ngữ Không Lời',
    description: 'Nghiên cứu 23 mẫu hoa văn thổ cẩm truyền thống, giải mã ý nghĩa biểu tượng.',
    type: 'research',
    subject: 'Văn hóa dân tộc',
    grade: 'Lớp 9',
    school: 'THCS Minh Hưng',
    author: 'Nhóm HS 9A',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-md.webp',
    publishedAt: '2024-03-20',
    featured: false,
    downloadCount: 156,
  },
  {
    id: 'res-003',
    title: 'Bài Thuyết Trình: Âm Nhạc Cồng Chiêng — Di Sản Sống Của Người S\'tiêng',
    description: 'Slide trình bày đa phương tiện về lịch sử, ý nghĩa và vai trò cồng chiêng trong đời sống cộng đồng.',
    type: 'presentation',
    subject: 'Giáo dục địa phương',
    grade: 'Lớp 8',
    school: 'THCS Bù Đăng',
    author: 'Điểu Thị Lan',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    publishedAt: '2024-05-01',
    featured: true,
    downloadCount: 312,
  },
]

type ResourceType = SchoolResource['type']

const typeColors: Record<ResourceType, string> = {
  research: '#6B4C35',
  presentation: '#C9922A',
  artwork: '#2D5016',
  document: '#B87333',
  video: '#8B3A2A',
}

const typeIcons: Record<ResourceType, string> = {
  research: 'mdi:file-search',
  presentation: 'mdi:presentation',
  artwork: 'mdi:palette',
  document: 'mdi:file-document',
  video: 'mdi:video',
}

const typeLabels: Record<ResourceType, string> = {
  research: 'Nghiên Cứu',
  presentation: 'Thuyết Trình',
  artwork: 'Mỹ Thuật',
  document: 'Tài Liệu',
  video: 'Video',
}
</script>
