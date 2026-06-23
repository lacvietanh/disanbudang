<template>
  <div v-if="!resource" class="min-h-screen flex items-center justify-center bg-ivory pt-[72px]">
    <div class="text-center">
      <Icon name="mdi:file-document-off-outline" class="w-16 h-16 text-earth-500 mx-auto mb-4" />
      <h2 class="font-heading font-bold text-charcoal-800 text-2xl mb-4">Không tìm thấy nghiên cứu</h2>
      <NuxtLink to="/school" class="btn-primary inline-flex bg-earth-600 text-ivory hover:bg-earth-700">Quay lại Góc Học Tập</NuxtLink>
    </div>
  </div>

  <div v-else class="bg-ivory min-h-screen pt-[72px]">
    <!-- Header -->
    <div class="relative py-20 border-b border-beige-200 bg-gradient-to-r from-warm-paper to-ivory overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-earth-500/5 rounded-full blur-3xl pointer-events-none" />
      <div class="container-heritage relative z-10">
        <nav class="flex items-center gap-2 text-xs text-charcoal-400 mb-6">
          <NuxtLink to="/" class="hover:text-earth-600 transition-colors">Trang Chủ</NuxtLink>
          <Icon name="mdi:chevron-right" class="w-3.5 h-3.5" />
          <NuxtLink to="/school" class="hover:text-earth-600 transition-colors">Góc Học Tập</NuxtLink>
          <Icon name="mdi:chevron-right" class="w-3.5 h-3.5" />
          <span class="text-charcoal-500/60 truncate max-w-[200px]">{{ resource.title }}</span>
        </nav>

        <div class="max-w-3xl">
          <!-- Type badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
            :style="{ background: `${typeColors[resource.type]}15`, color: typeColors[resource.type] }">
            <Icon :name="typeIcons[resource.type]" class="w-4 h-4" />
            {{ typeLabels[resource.type] }}
          </div>

          <h1 class="font-heading font-bold text-charcoal-800 text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
            {{ resource.title }}
          </h1>

          <!-- Meta bar -->
          <div class="flex flex-wrap gap-4 items-center text-sm text-charcoal-500">
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:school-outline" class="w-4 h-4 text-earth-500" />
              {{ resource.school }}
            </span>
            <span class="w-1 h-1 bg-charcoal-300 rounded-full" />
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:account-outline" class="w-4 h-4 text-earth-500" />
              {{ resource.author }}
            </span>
            <span class="w-1 h-1 bg-charcoal-300 rounded-full" />
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:bookmark-outline" class="w-4 h-4 text-earth-500" />
              {{ resource.subject }}
            </span>
            <span class="w-1 h-1 bg-charcoal-300 rounded-full" />
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:google-classroom" class="w-4 h-4 text-earth-500" />
              {{ resource.grade }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-heritage py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Main column -->
        <div class="lg:col-span-8">
          <div class="bg-white border border-beige-200 rounded-3xl p-8 lg:p-12 shadow-sm">
            <div class="flex items-center gap-2 mb-8 text-earth-600">
              <Icon name="mdi:book-open-page-variant-outline" class="w-5 h-5" />
              <span class="text-xs uppercase tracking-widest font-semibold">Tóm tắt nghiên cứu</span>
            </div>

            <div class="prose prose-stone max-w-none">
              <p class="text-charcoal-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {{ resource.description }}
              </p>
            </div>

            <!-- Placeholder notice -->
            <div class="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3.5">
              <Icon name="mdi:file-upload-outline" class="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p class="font-medium text-amber-800 text-sm">Tài liệu đang được số hóa</p>
                <p class="text-amber-700 text-xs mt-1 leading-relaxed">
                  Bản PDF đầy đủ của nghiên cứu này đang trong quá trình biên tập và xin phép tác giả.
                  Vui lòng quay lại sau. Nếu bạn là tác giả, hãy <NuxtLink to="/contribute" class="text-earth-600 font-semibold underline">gửi tài liệu</NuxtLink> để chia sẻ với cộng đồng.
                </p>
              </div>
            </div>

            <!-- Download placeholder -->
            <div class="mt-6 flex flex-wrap gap-3">
              <button class="btn-primary bg-earth-600 text-ivory hover:bg-earth-700 inline-flex opacity-60 cursor-not-allowed" disabled>
                <Icon name="mdi:download" class="w-4 h-4" />
                Tải PDF (sắp có)
              </button>
              <NuxtLink to="/contribute" class="btn-secondary border-earth-300 text-earth-600 hover:bg-earth-50 inline-flex">
                <Icon name="mdi:upload" class="w-4 h-4" />
                Gửi Nghiên Cứu Của Bạn
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white border border-beige-200 rounded-2xl p-6 shadow-sm lg:sticky lg:top-[100px]">
            <h3 class="font-heading font-bold text-charcoal-800 text-base mb-5">Thông tin xuất bản</h3>
            <div class="space-y-4 text-sm">
              <div class="flex items-start gap-2.5">
                <Icon name="mdi:calendar-range" class="w-4 h-4 text-earth-500 mt-0.5 shrink-0" />
                <div>
                  <p class="text-charcoal-500 text-xs font-medium uppercase tracking-wider">Ngày công bố</p>
                  <p class="text-charcoal-700">{{ formatDate(resource.publishedAt) }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <Icon name="mdi:download-outline" class="w-4 h-4 text-earth-500 mt-0.5 shrink-0" />
                <div>
                  <p class="text-charcoal-500 text-xs font-medium uppercase tracking-wider">Lượt tải</p>
                  <p class="text-charcoal-700">{{ resource.downloadCount }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <Icon name="mdi:tag-outline" class="w-4 h-4 text-earth-500 mt-0.5 shrink-0" />
                <div>
                  <p class="text-charcoal-500 text-xs font-medium uppercase tracking-wider">Phân loại</p>
                  <p class="text-charcoal-700">{{ resource.subject }} • {{ resource.grade }}</p>
                </div>
              </div>
            </div>

            <div class="border-t border-beige-100 mt-5 pt-5">
              <NuxtLink to="/school" class="flex items-center gap-2 text-earth-600 hover:text-earth-700 text-sm font-medium transition-colors">
                <Icon name="mdi:arrow-left" class="w-4 h-4" />
                Quay lại Góc Học Tập
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SchoolResource } from '~/types'

definePageMeta({ layout: 'default' })

const route = useRoute()
const id = computed(() => route.params.id as string)

interface ResourceTypeMap {
  research: string
  presentation: string
  artwork: string
  document: string
  video: string
}

const allResources: SchoolResource[] = [
  { id: 'r1', title: 'Lịch Sử Hình Thành Chiến Khu Đ Qua Lời Kể Người Chứng Nhân', description: 'Nghiên cứu điền dã ghi chép lại câu chuyện của 12 cựu chiến binh từng sống và chiến đấu tại Chiến Khu Đ. Nhóm học sinh 12A1 đã dành 2 tháng để gặp gỡ, ghi âm và đối chiếu tư liệu lịch sử với các nguồn tài liệu từ Bảo tàng tỉnh. Kết quả nghiên cứu đã phác dựng lại bức tranh chân thực về cuộc sống của các chiến sĩ cách mạng trong khu căn cứ địa quan trọng này.', type: 'research', subject: 'Lịch sử địa phương', grade: 'Lớp 12', school: 'THPT Bù Đăng', author: 'Nhóm HS 12A1', publishedAt: '2024-04-10', featured: true, downloadCount: 234 },
  { id: 'r2', title: 'Phân Tích Hoa Văn Thổ Cẩm S\'tiêng: Ngôn Ngữ Không Lời', description: 'Nghiên cứu 23 mẫu hoa văn thổ cẩm truyền thống của người S\'tiêng tại Bù Đăng. Nhóm học sinh lớp 9A đã đến các buôn làng gặp gỡ nghệ nhân, chụp ảnh và phân tích ý nghĩa từng hoa văn. Kết quả cho thấy hoa văn thổ cẩm S\'tiêng mang đậm dấu ấn văn hóa nông nghiệp nương rẫy và tín ngưỡng đa thần.', type: 'research', subject: 'Văn hóa dân tộc', grade: 'Lớp 9', school: 'THCS Minh Hưng', author: 'Nhóm HS 9A', publishedAt: '2024-03-20', featured: false, downloadCount: 156 },
  { id: 'r3', title: 'Âm Nhạc Cồng Chiêng — Di Sản Sống Của Người S\'tiêng', description: 'Slide trình bày về lịch sử, ý nghĩa và vai trò của cồng chiêng trong đời sống tâm linh của người S\'tiêng. Bài thuyết trình có kèm audio minh họa các giai điệu cồng chiêng cơ bản và phỏng vấn già làng Điểu Minh — nghệ nhân ưu tú cồng chiêng S\'tiêng.', type: 'presentation', subject: 'Giáo dục địa phương', grade: 'Lớp 8', school: 'THCS Bù Đăng', author: 'Điểu Thị Lan', publishedAt: '2024-05-01', featured: true, downloadCount: 312 },
  { id: 'r4', title: 'Tranh Ký Họa Rừng Chiến Khu Đ', description: 'Bộ tranh màu nước 12 bức về cảnh sắc rừng Chiến Khu Đ do học sinh Nguyễn Văn Hùng thực hiện trong chuyến đi thực tế cùng nhóm nghiên cứu lịch sử của trường. Mỗi bức tranh đi kèm chú thích ngắn gọn về địa danh và câu chuyện lịch sử gắn liền.', type: 'artwork', subject: 'Mỹ thuật', grade: 'Lớp 10', school: 'THPT Bù Đăng', author: 'Nguyễn Văn Hùng', publishedAt: '2024-02-15', featured: false, downloadCount: 89 },
  { id: 'r5', title: 'Bảo Tồn Nghề Dệt Thổ Cẩm — Từ Truyền Thống Đến Hiện Đại', description: 'Phân tích thực trạng suy giảm của nghề dệt thổ cẩm S\'tiêng tại Bù Đăng và đề xuất 5 giải pháp thiết thực: đưa vào trường học, kết hợp du lịch, xây dựng thương hiệu, ứng dụng công nghệ số và chính sách hỗ trợ nghệ nhân.', type: 'research', subject: 'Văn hóa dân tộc', grade: 'Lớp 11', school: 'THPT Bù Đăng', author: 'Trần Thị Hoa', publishedAt: '2024-04-05', featured: false, downloadCount: 178 },
  { id: 'r6', title: 'Thuyết Minh Thực Địa Tại Thác Mơ', description: 'Bài thuyết minh audio được học sinh lớp 7B soạn và thu âm tại thực địa Thác Mơ Bù Đăng. Nội dung giới thiệu về vẻ đẹp tự nhiên, truyền thuyết nàng Mơ và hệ sinh thái rừng quanh thác — đã được sử dụng làm audio guide thử nghiệm cho khách tham quan.', type: 'presentation', subject: 'Giáo dục địa phương', grade: 'Lớp 7', school: 'THCS Minh Hưng', author: 'Lớp 7B', publishedAt: '2024-03-10', featured: false, downloadCount: 204 },
]

const resource = computed(() => allResources.find(r => r.id === id.value) || null)

const typeColors: Record<keyof ResourceTypeMap, string> = {
  research: '#6B4C35', presentation: '#C9922A', artwork: '#2D5016', document: '#B87333', video: '#8B3A2A',
}
const typeIcons: Record<keyof ResourceTypeMap, string> = {
  research: 'mdi:file-search', presentation: 'mdi:presentation', artwork: 'mdi:palette', document: 'mdi:file-document', video: 'mdi:video',
}
const typeLabels: Record<keyof ResourceTypeMap, string> = {
  research: 'Nghiên Cứu', presentation: 'Thuyết Trình', artwork: 'Mỹ Thuật', document: 'Tài Liệu', video: 'Video',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
}

useSeoMeta({
  title: () => resource.value ? `${resource.value.title} — Góc Học Tập | Di Sản Bù Đăng` : 'Không tìm thấy',
  description: () => resource.value ? resource.value.description : '',
})
</script>
