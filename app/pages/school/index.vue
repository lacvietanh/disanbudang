<template>
  <div class="bg-charcoal-900 min-h-screen pt-[72px]">
    <div class="bg-dark-earth py-20 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Góc Học Tập</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-none mb-5">
          Nghiên Cứu<br/><span class="text-gradient-gold">Di Sản Địa Phương</span>
        </h1>
        <p class="text-charcoal-300 text-lg max-w-xl">Kho học liệu — bài nghiên cứu, thuyết trình và dự án học tập của học sinh các trường trên địa bàn huyện Bù Đăng</p>
      </div>
    </div>

    <div class="container-heritage py-14">
      <!-- Subjects filter -->
      <div class="flex flex-wrap gap-3 mb-10">
        <button
          v-for="subj in subjects"
          :key="subj"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-all border"
          :class="activeSubject === subj ? 'bg-gold-500 text-charcoal-900 border-transparent' : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory bg-charcoal-950/40'"
          @click="activeSubject = subj"
        >{{ subj }}</button>
      </div>

      <!-- Resources grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(res, i) in filteredResources"
          :key="res.id"
          :to="`/school/${res.id}`"
          class="bg-charcoal-950 border border-charcoal-850 rounded-2xl overflow-hidden shadow-lg hover:border-gold-500/30 transition-all duration-500 group cursor-pointer reveal block"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <div class="h-1.5 w-full" :style="{ background: typeColors[res.type] }" />
          <div class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ background: `${typeColors[res.type]}15` }">
                <Icon :name="typeIcons[res.type]" class="w-5 h-5" :style="{ color: typeColors[res.type] }" />
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider" :style="{ color: typeColors[res.type] }">{{ typeLabels[res.type] }}</p>
                <p class="text-charcoal-400 text-xs">{{ res.subject }}</p>
              </div>
              <span class="ml-auto text-charcoal-400 text-xs">{{ res.grade }}</span>
            </div>
            <h2 class="font-heading font-bold text-ivory text-base leading-tight mb-2 line-clamp-2 group-hover:text-gold-300 transition-colors">{{ res.title }}</h2>
            <p class="text-charcoal-400 text-sm line-clamp-2 mb-4">{{ res.description }}</p>
            <div class="border-t border-charcoal-800 pt-3 flex items-center justify-between">
              <div>
                <p class="text-charcoal-300 text-xs font-medium">{{ res.author }}</p>
                <p class="text-charcoal-400 text-xs">{{ res.school }}</p>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-1 text-charcoal-400 text-xs">
                  <Icon name="mdi:download-outline" class="w-3.5 h-3.5" />{{ res.downloadCount }}
                </div>
                <button class="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-200">
                  <Icon name="mdi:download" class="w-4 h-4 text-gold-400" />
                </button>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- CTA submit -->
      <div class="mt-14 bg-gradient-to-r from-earth-700 to-charcoal-800 rounded-2xl p-8 text-center">
        <Icon name="mdi:school" class="w-10 h-10 text-gold-400 mx-auto mb-4" />
        <h2 class="font-heading font-bold text-ivory text-2xl mb-3">Gửi Nghiên Cứu Của Bạn</h2>
        <p class="text-charcoal-300 mb-6 max-w-md mx-auto">Bạn là học sinh đã có bài nghiên cứu về di sản địa phương? Chia sẻ để cùng học hỏi!</p>
        <NuxtLink to="/contribute" class="btn-primary">
          <Icon name="mdi:upload" class="w-4 h-4" />
          Nộp Nghiên Cứu
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SchoolResource } from '~/types'

definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Góc Học Tập — Di Sản Bù Đăng', description: 'Kho bài nghiên cứu của học sinh về di sản Bù Đăng.' })

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const activeSubject = ref('Tất Cả')
const subjects = ['Tất Cả', 'Lịch sử địa phương', 'Văn hóa dân tộc', 'Giáo dục địa phương', 'Mỹ thuật']

type ResourceType = SchoolResource['type']

const allResources: SchoolResource[] = [
  { id: 'r1', title: 'Lịch Sử Hình Thành Chiến Khu Đ Qua Lời Kể Người Chứng Nhân', description: 'Nghiên cứu điền dã ghi chép lại câu chuyện của 12 cựu chiến binh.', type: 'research', subject: 'Lịch sử địa phương', grade: 'Lớp 12', school: 'THPT Bù Đăng', author: 'Nhóm HS 12A1', publishedAt: '2024-04-10', featured: true, downloadCount: 234 },
  { id: 'r2', title: 'Phân Tích Hoa Văn Thổ Cẩm S\'tiêng: Ngôn Ngữ Không Lời', description: 'Nghiên cứu 23 mẫu hoa văn thổ cẩm truyền thống.', type: 'research', subject: 'Văn hóa dân tộc', grade: 'Lớp 9', school: 'THCS Minh Hưng', author: 'Nhóm HS 9A', publishedAt: '2024-03-20', featured: false, downloadCount: 156 },
  { id: 'r3', title: 'Âm Nhạc Cồng Chiêng — Di Sản Sống Của Người S\'tiêng', description: 'Slide trình bày về lịch sử, ý nghĩa và vai trò cồng chiêng.', type: 'presentation', subject: 'Giáo dục địa phương', grade: 'Lớp 8', school: 'THCS Bù Đăng', author: 'Điểu Thị Lan', publishedAt: '2024-05-01', featured: true, downloadCount: 312 },
  { id: 'r4', title: 'Tranh Ký Họa Rừng Chiến Khu Đ', description: 'Bộ tranh màu nước 12 bức về cảnh sắc rừng Chiến Khu Đ.', type: 'artwork', subject: 'Mỹ thuật', grade: 'Lớp 10', school: 'THPT Bù Đăng', author: 'Nguyễn Văn Hùng', publishedAt: '2024-02-15', featured: false, downloadCount: 89 },
  { id: 'r5', title: 'Bảo Tồn Nghề Dệt Thổ Cẩm — Từ Truyền Thống Đến Hiện Đại', description: 'Phân tích thực trạng và đề xuất giải pháp bảo tồn nghề dệt.', type: 'research', subject: 'Văn hóa dân tộc', grade: 'Lớp 11', school: 'THPT Bù Đăng', author: 'Trần Thị Hoa', publishedAt: '2024-04-05', featured: false, downloadCount: 178 },
  { id: 'r6', title: 'Thuyết Minh Thực Địa Tại Thác Mơ', description: 'Bài thuyết minh audio được học sinh soạn và thu âm tại thực địa.', type: 'presentation', subject: 'Giáo dục địa phương', grade: 'Lớp 7', school: 'THCS Minh Hưng', author: 'Lớp 7B', publishedAt: '2024-03-10', featured: false, downloadCount: 204 },
]

const filteredResources = computed(() =>
  activeSubject.value === 'Tất Cả' ? allResources : allResources.filter((r) => r.subject === activeSubject.value),
)

const typeColors: Record<ResourceType, string> = {
  research: '#6B4C35', presentation: '#C9922A', artwork: '#2D5016', document: '#B87333', video: '#8B3A2A',
}
const typeIcons: Record<ResourceType, string> = {
  research: 'mdi:file-search', presentation: 'mdi:presentation', artwork: 'mdi:palette', document: 'mdi:file-document', video: 'mdi:video',
}
const typeLabels: Record<ResourceType, string> = {
  research: 'Nghiên Cứu', presentation: 'Thuyết Trình', artwork: 'Mỹ Thuật', document: 'Tài Liệu', video: 'Video',
}
</script>
