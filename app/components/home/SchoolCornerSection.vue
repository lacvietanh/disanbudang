<template>
  <section id="school-corner" class="section bg-beige-200 relative overflow-hidden scroll-mt-20">
    <!-- Fine grid background illustration (extremely subtle 2% opacity to avoid overlapping readability issues with text) -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.02] shadow-inset-warm bg-[radial-gradient(#6B4C35_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
    <div class="absolute top-0 right-0 w-[450px] h-[450px] bg-copper-500/5 rounded-full blur-3xl pointer-events-none" />

    <div class="container-heritage relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <span class="section-label">Góc Học Tập</span>
          <h2 class="section-title">Học Sinh Nghiên Cứu Di Sản</h2>
          <p class="section-desc max-w-xl mt-2 text-charcoal-800 text-sm leading-relaxed">
            Các dự án học tập, nghiên cứu và thuyết minh di sản số hóa xuất sắc thực hiện bởi thế hệ học sinh trường THPT Lê Quý Đôn và THCS Nguyễn Trường Tộ.
          </p>
        </div>
        <NuxtLink to="/explore?tab=research" class="btn-dark flex-shrink-0">
          Xem Tất Cả Nghiên Cứu
          <Icon name="mdi:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Stats board -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-5xl mx-auto text-center">
        <div class="bg-white/40 backdrop-blur-sm border border-beige-300/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 reveal" style="animation-delay: 0.05s">
          <Icon name="mdi:school-outline" class="w-7 h-7 text-earth-600 mx-auto mb-2" />
          <p class="font-heading font-bold text-charcoal-900 text-3xl leading-none">
            {{ schoolsCount.count }}
          </p>
          <p class="text-charcoal-800 text-2xs uppercase tracking-wider font-bold mt-2">Trường Đồng Hành</p>
        </div>
        <div class="bg-white/40 backdrop-blur-sm border border-beige-300/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 reveal" style="animation-delay: 0.1s">
          <Icon name="mdi:file-document-multiple-outline" class="w-7 h-7 text-earth-600 mx-auto mb-2" />
          <p class="font-heading font-bold text-charcoal-900 text-3xl leading-none">
            {{ researchesCount.count }}+
          </p>
          <p class="text-charcoal-800 text-2xs uppercase tracking-wider font-bold mt-2">Nghiên Cứu Số Hóa</p>
        </div>
        <div class="bg-white/40 backdrop-blur-sm border border-beige-300/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 reveal" style="animation-delay: 0.15s">
          <Icon name="mdi:download-circle-outline" class="w-7 h-7 text-earth-600 mx-auto mb-2" />
          <p class="font-heading font-bold text-charcoal-900 text-3xl leading-none">
            {{ downloadsCount.count }}+
          </p>
          <p class="text-charcoal-800 text-2xs uppercase tracking-wider font-bold mt-2">Lượt Tải Học Tập</p>
        </div>
        <div class="bg-white/40 backdrop-blur-sm border border-beige-300/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 reveal" style="animation-delay: 0.2s">
          <Icon name="mdi:trophy-outline" class="w-7 h-7 text-earth-600 mx-auto mb-2" />
          <p class="font-heading font-bold text-charcoal-900 text-3xl leading-none">
            {{ awardsCount.count }}
          </p>
          <p class="text-charcoal-800 text-2xs uppercase tracking-wider font-bold mt-2">Đề Tài Đạt Giải</p>
        </div>
      </div>

      <!-- 3D Book Covers grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 book-container mb-12">
        <div
          v-for="(resource, i) in resources"
          :key="resource.id"
          class="book-card bg-white border border-beige-300 rounded-r-2xl shadow-card duration-500 group reveal cursor-pointer flex flex-col justify-between"
          :style="{ animationDelay: `${i * 0.1}s`, minHeight: '380px' }"
          @click="selectedResource = resource"
        >
          <!-- Book Spine Simulation -->
          <div class="book-spine" />

          <!-- Card Content -->
          <div class="p-6 pl-9 flex flex-col justify-between h-full relative">
            <div>
              <!-- Header tags -->
              <div class="flex items-center justify-between mb-5">
                <div
                  class="flex items-center gap-1.5 px-3 py-1 rounded-full text-3xs font-bold uppercase tracking-wider"
                  :style="{ background: `${typeColors[resource.type]}15`, color: typeColors[resource.type] }"
                >
                  <Icon :name="typeIcons[resource.type]" class="w-3 h-3" />
                  {{ typeLabels[resource.type] }}
                </div>
                <span class="text-charcoal-600 text-xs font-semibold">{{ resource.grade }}</span>
              </div>

              <!-- Title (Book style typography) -->
              <h3 class="font-heading font-bold text-charcoal-800 text-lg leading-tight mb-3 group-hover:text-earth-600 transition-colors line-clamp-3">
                {{ resource.title }}
              </h3>
              <!-- Description excerpt -->
              <p class="text-charcoal-600 text-sm leading-relaxed line-clamp-3 mb-5">
                {{ resource.description }}
              </p>
            </div>

            <!-- Footer Meta -->
            <div>
              <div class="border-t border-beige-200/80 pt-4 flex items-center justify-between">
                <div>
                  <p class="text-charcoal-700 text-xs font-bold">{{ resource.author }}</p>
                  <p class="text-charcoal-600 text-[10px] uppercase font-semibold tracking-wide mt-0.5">{{ resource.school }}</p>
                </div>
                <div class="flex items-center gap-1 text-charcoal-600 text-xs font-medium">
                  <Icon name="mdi:download-outline" class="w-4 h-4 text-gold-500" />
                  <span>{{ resource.downloadCount }}</span>
                </div>
              </div>

              <!-- Quick read hover prompt -->
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 pb-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl">
                <span class="inline-flex items-center gap-1.5 text-earth-600 text-xs font-bold uppercase tracking-wider bg-earth-50 border border-earth-100 px-4 py-2 rounded-full shadow-sm">
                  <Icon name="mdi:book-open-page-variant" class="w-3.5 h-3.5" />
                  Đọc Nhanh Tóm Tắt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- School Project Invitation Banner -->
      <div class="mt-14 p-8 rounded-3xl bg-gradient-to-r from-earth-800 via-earth-700 to-charcoal-850 border border-gold-500/25 flex flex-col md:flex-row items-center gap-6 shadow-xl reveal relative overflow-hidden">
        <div class="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
        <div class="w-14 h-14 rounded-2xl bg-ivory/15 flex items-center justify-center flex-shrink-0 border border-ivory/20 shadow-inner">
          <Icon name="mdi:school" class="w-7 h-7 text-gold-300" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h3 class="font-heading font-bold text-ivory text-xl mb-1">Hành Trình Số Hóa Di Sản Trường Học</h3>
          <p class="text-ivory/80 text-sm">Học sinh các trường THPT Lê Quý Đôn và THCS Nguyễn Trường Tộ cùng tham gia khai phá, phục dựng tư liệu lịch sử quê hương.</p>
        </div>
        <NuxtLink to="/contribute" class="btn-ghost flex-shrink-0 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300">
          Gửi Bài Đóng Góp
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Read Modal -->
    <Transition name="fade">
      <div
        v-if="selectedResource"
        class="fixed inset-0 z-80 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-charcoal-950/80 backdrop-blur-md"
          @click="selectedResource = null"
        />

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-2xl bg-charcoal-900 border border-charcoal-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          <!-- Background accents -->
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm">
            <span class="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Icon :name="typeIcons[selectedResource.type]" class="w-4 h-4" />
              Tóm Tắt Khảo Cứu Học Sinh
            </span>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 transition-colors"
              @click="selectedResource = null"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <!-- Author & Metadata info block -->
            <div class="bg-charcoal-950/60 border border-charcoal-850 p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
              <div>
                <p class="text-charcoal-400 text-2xs uppercase tracking-wider font-semibold">Tác giả thực hiện</p>
                <p class="font-heading font-bold text-ivory text-base mt-0.5">{{ selectedResource.author }}</p>
                <p class="text-charcoal-400 text-2xs uppercase font-medium mt-0.5">{{ selectedResource.school }} • {{ selectedResource.grade }}</p>
              </div>
              <div class="text-right">
                <p class="text-charcoal-400 text-2xs uppercase tracking-wider font-semibold">Lĩnh vực đề tài</p>
                <p class="text-gold-400 font-semibold text-sm mt-0.5">{{ selectedResource.subject }}</p>
                <p class="text-charcoal-400 text-2xs mt-0.5">Xuất bản: {{ selectedResource.publishedAt }}</p>
              </div>
            </div>

            <!-- Title -->
            <h3 class="font-heading font-bold text-ivory text-xl md:text-2xl leading-snug">
              {{ selectedResource.title }}
            </h3>

            <!-- Motivation -->
            <div v-if="selectedResource.motivation" class="space-y-1.5">
              <span class="text-gold-400 text-2xs uppercase tracking-widest font-bold block">Ý tưởng & Động lực thực hiện</span>
              <p class="text-charcoal-200 text-sm leading-relaxed italic">
                "{{ selectedResource.motivation }}"
              </p>
            </div>

            <!-- Key findings -->
            <div v-if="selectedResource.keyFindings && selectedResource.keyFindings.length > 0" class="space-y-3">
              <span class="text-gold-400 text-2xs uppercase tracking-widest font-bold block">Kết quả nghiên cứu thực tế nổi bật</span>
              <ul class="space-y-2.5">
                <li
                  v-for="(finding, idx) in selectedResource.keyFindings"
                  :key="idx"
                  class="flex items-start gap-2.5 text-sm text-charcoal-300 leading-relaxed"
                >
                  <div class="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="mdi:check" class="w-3 h-3 text-gold-400" />
                  </div>
                  <span>{{ finding }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-6 py-4 border-t border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-between">
            <span class="text-charcoal-500 text-xs font-semibold">Dung lượng file: {{ selectedResource.fileSize ?? '2.4 MB' }}</span>
            <div class="flex items-center gap-3">
              <button
                class="btn-ghost text-xs md:text-sm py-2.5"
                @click="selectedResource = null"
              >
                Đóng lại
              </button>
              <button
                class="btn-primary text-xs md:text-sm py-2.5 bg-gold-500 text-charcoal-900 border-transparent shadow-gold flex items-center gap-1.5"
                @click="downloadFile(selectedResource)"
              >
                <Icon name="mdi:download" class="w-4 h-4" />
                Tải Báo Cáo PDF ({{ selectedResource.downloadCount }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { useCountUp } from '~/composables/useAnimations'
import { useSwal } from '~/composables/useSwal'

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const swal = useSwal()

// Interactive counters
const schoolsCount = useCountUp(2)
const researchesCount = useCountUp(52)
const downloadsCount = useCountUp(1280)
const awardsCount = useCountUp(12)

onMounted(() => {
  schoolsCount.start()
  researchesCount.start()
  downloadsCount.start()
  awardsCount.start()
})

interface SchoolResourceExtended {
  id: string
  title: string
  description: string
  type: 'research' | 'presentation' | 'artwork' | 'document' | 'video'
  subject: string
  grade: string
  school: string
  author: string
  coverImage?: string
  publishedAt: string
  featured: boolean
  downloadCount: number
  motivation?: string
  keyFindings?: string[]
  fileSize?: string
}

const selectedResource = ref<SchoolResourceExtended | null>(null)

const resources = ref<SchoolResourceExtended[]>([
  {
    id: 'res-001',
    title: 'Lịch Sử Hình Thành Chiến Khu Đ Qua Lời Kể Nhân Chứng Lịch Sử',
    description: 'Nghiên cứu điền dã ghi chép lại câu chuyện chiến đấu kiên cường của các cựu chiến binh Chiến khu Đ năm xưa.',
    type: 'research',
    subject: 'Lịch sử địa phương',
    grade: 'Lớp 12',
    school: 'THPT Lê Quý Đôn',
    author: 'Nhóm học sinh 12A1',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2024-04-10',
    featured: true,
    downloadCount: 234,
    fileSize: '3.6 MB',
    motivation: 'Thế hệ cựu chiến binh Chiến khu Đ nay đều đã tuổi cao sức yếu. Chúng em muốn chạy đua với thời gian để lưu giữ lại những câu chuyện hào hùng chân thực nhất từ lời kể của họ.',
    keyFindings: [
      'Ghi âm và chép lại hơn 30 giờ phỏng vấn trực tiếp từ 12 nhân chứng lịch sử tại buôn sóc Bù Đăng.',
      'Phác thảo và số hóa thành công sơ đồ hoạt động quân sự của 3 điểm đóng quân cũ sâu trong lòng rừng nguyên sinh.',
      'Sưu tầm hình ảnh tư liệu của 15 loại hiện vật, vũ khí tự chế thời chiến được lưu trữ gia đình.'
    ]
  },
  {
    id: 'res-002',
    title: 'Phân Tích Hoa Văn Thổ Cẩm S\'tiêng: Ngôn Ngữ Không Lời',
    description: 'Nghiên cứu 23 mẫu hoa văn thổ cẩm truyền thống, giải mã ý nghĩa biểu tượng hạt gạo, dãy núi và chim rừng.',
    type: 'research',
    subject: 'Văn hóa dân tộc',
    grade: 'Lớp 9',
    school: 'THCS Nguyễn Trường Tộ',
    author: 'Nhóm học sinh 9A',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-md.webp',
    publishedAt: '2024-03-20',
    featured: false,
    downloadCount: 156,
    fileSize: '2.8 MB',
    motivation: 'Khi quan sát những tấm vải dệt của người S\'tiêng, chúng em nhận thấy mỗi họa tiết đều đối xứng tuyệt đối và mang sắc màu núi rừng. Em muốn hiểu sâu về ý nghĩa tâm linh và câu chuyện đằng sau mỗi sợi chỉ màu.',
    keyFindings: [
      'Gặp gỡ nghệ nhân gạo cội Thị Rét tại sóc Đắk Nhau để số hóa hình vẽ của 23 mẫu hoa văn thêu tay truyền thống.',
      'Giải mã thành công ý nghĩa xã hội: Họa tiết hình thoi chéo biểu thị hạt gạo no ấm, răng cưa biểu thị dãy núi che chắn.',
      'Hồ sơ hóa quy trình pha nhuộm màu tự nhiên từ lá cây rừng, vỏ cây Krông và củ nghệ cổ truyền.'
    ]
  },
  {
    id: 'res-003',
    title: 'Âm Nhạc Cồng Chiêng - Di Sản Sống Của Người S\'tiêng',
    description: 'Tài liệu thuyết trình đa phương tiện về lịch sử, ý nghĩa tâm linh và vai trò của cồng chiêng trong đời sống cộng đồng.',
    type: 'presentation',
    subject: 'Giáo dục địa phương',
    grade: 'Lớp 11',
    school: 'THPT Lê Quý Đôn',
    author: 'Vũ Quang Huy',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    publishedAt: '2024-05-01',
    featured: true,
    downloadCount: 312,
    fileSize: '4.8 MB',
    motivation: 'Tiếng cồng chiêng là linh hồn kết nối con người với thế giới thần linh của người bản địa. Em thực hiện đề tài này để giúp các bạn trẻ hiểu và trân trọng hơn di sản văn hóa phi vật thể quý giá này.',
    keyFindings: [
      'Số hóa 6 bản thu âm cồng chiêng cổ tiêu biểu sử dụng trong Lễ hội mừng lúa mới của sóc Bom Bo.',
      'Xây dựng sơ đồ bố trí không gian trình diễn cồng chiêng và vũ điệu xoang truyền thống quanh bếp lửa.',
      'Tổng hợp thành công 12 tài liệu nghiên cứu chuyên sâu về nguồn gốc nhạc cụ đồng tại Đông Nam Bộ.'
    ]
  },
])

type ResourceType = SchoolResourceExtended['type']

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

function downloadFile(resource: SchoolResourceExtended) {
  resource.downloadCount++
  swal.fire({
    title: 'Tải tài liệu thành công!',
    html: `Hệ thống đang chuẩn bị tải tệp PDF <strong>"${resource.title}"</strong> (${resource.fileSize}).<br/><br/>Lượt tải đề tài này đã được ghi nhận trên cổng thông tin di sản.`,
    icon: 'success',
    background: '#1C1A18',
    color: '#FDFAF3',
    confirmButtonColor: '#C9922A',
    confirmButtonText: 'Đóng lại'
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
