<template>
  <div class="min-h-screen bg-charcoal-900 text-ivory pt-[72px]">
    <!-- 404 state -->
    <div v-if="!lesson" class="container-heritage py-24 text-center space-y-4">
      <Icon name="mdi:book-off-outline" class="w-14 h-14 text-charcoal-700 mx-auto" />
      <h1 class="text-2xl font-heading font-bold text-ivory">Không tìm thấy bài học</h1>
      <p class="text-charcoal-400 text-sm">Bài học này chưa tồn tại hoặc đã được di chuyển.</p>
      <NuxtLink to="/study" class="btn-primary text-sm mt-4">Quay về Góc Học Tập</NuxtLink>
    </div>

    <template v-else>
      <!-- Header hero -->
      <div class="bg-dark-earth border-b border-charcoal-850 relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
          <div v-if="lesson.coreKnowledge.images?.[0]" class="absolute inset-0">
            <img :src="lesson.coreKnowledge.images[0].url" alt="" class="w-full h-full object-cover opacity-10" />
            <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 to-charcoal-950/60" />
          </div>
        </div>
        <div class="container-heritage relative z-10 py-10">
          <div class="flex flex-col lg:flex-row lg:items-end gap-6">
            <div class="flex-1 space-y-3">
              <div class="flex flex-wrap gap-2">
                <span class="tag-gold text-3xs">{{ lesson.subject }}</span>
                <span class="tag-earth text-3xs flex items-center gap-1">
                  <Icon name="mdi:clock-outline" class="w-3 h-3" />
                  ~{{ lesson.estimatedMinutes ?? 10 }} phút
                </span>
                <span class="tag text-3xs bg-charcoal-800/60 text-charcoal-400 border border-charcoal-700 flex items-center gap-1">
                  <Icon name="mdi:star-outline" class="w-3 h-3 text-gold-400" />
                  +{{ lesson.xpReward }} XP
                </span>
              </div>
              <h1 class="font-heading font-bold text-2xl md:text-3xl text-ivory leading-tight">
                {{ lesson.title }}
              </h1>
            </div>

            <!-- Progress tracker & XP -->
            <div class="lg:shrink-0 flex items-center gap-4">
              <div class="flex items-center gap-2 bg-charcoal-900/70 border border-charcoal-800 rounded-xl px-4 py-2.5">
                <div class="space-y-1">
                  <p class="text-3xs text-charcoal-500 uppercase tracking-wider">Tiến trình đọc</p>
                  <div class="w-32 h-1.5 bg-charcoal-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gold-500 rounded-full transition-all duration-500" :style="{ width: readProgress + '%' }" />
                  </div>
                </div>
                <span class="text-sm font-bold text-gold-400 tabular-nums">{{ readProgress }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main 2-col layout -->
      <div class="container-heritage py-10">
        <div class="flex flex-col lg:flex-row gap-10">
          <!-- LEFT: TOC sticky sidebar -->
          <aside class="lg:w-56 shrink-0">
            <div class="lg:sticky lg:top-24 space-y-2">
              <p class="text-3xs font-bold uppercase tracking-widest text-charcoal-600 mb-3">Nội dung bài học</p>
              <nav class="space-y-1" aria-label="Mục lục bài học">
                <a
                  v-for="section in toc"
                  :key="section.id"
                  :href="'#' + section.id"
                  class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 group"
                  :class="section.available
                    ? 'text-charcoal-400 hover:text-ivory hover:bg-charcoal-900'
                    : 'text-charcoal-700 cursor-default'"
                >
                  <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="section.available ? 'bg-gold-500/50' : 'bg-charcoal-800'" />
                  {{ section.label }}
                  <Icon v-if="!section.available" name="mdi:lock-outline" class="w-3 h-3 ml-auto text-charcoal-700" />
                </a>
              </nav>

              <!-- Back button -->
              <div class="pt-4 border-t border-charcoal-850">
                <NuxtLink to="/study" class="flex items-center gap-2 text-xs text-charcoal-500 hover:text-gold-400 transition-colors">
                  <Icon name="mdi:arrow-left" class="w-4 h-4" />
                  Về Góc Học Tập
                </NuxtLink>
              </div>
            </div>
          </aside>

          <!-- RIGHT: Lesson content -->
          <main class="flex-1 min-w-0" ref="mainRef">
            <LessonBlock :lesson="lesson" />
          </main>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { LessonData } from '~/components/study/LessonBlock.vue'
import { useStudySeo } from '~/composables/useMuseumSeo'

const route = useRoute()
const id = computed(() => route.params.id as string)

// ================================================================
// SAMPLE LESSON DATA — 2 bài mẫu đầy đủ (Content Light demo)
// ================================================================
const lessons: Record<string, LessonData> = {
  'chien-khu-d': {
    id: 'chien-khu-d',
    title: 'Chiến Khu Đ — Căn Cứ Địa Cách Mạng Huyền Thoại',
    subject: 'Lịch sử địa phương',
    xpReward: 80,
    estimatedMinutes: 12,
    tldr: 'Chiến Khu Đ là hệ thống căn cứ địa cách mạng nằm sâu trong rừng nguyên sinh Bù Đăng, đóng vai trò quan trọng trong cuộc kháng chiến chống Pháp và Mỹ (1945–1975). Đồng bào S\'tiêng cùng bộ đội chủ lực đã kiên cường giữ vững vùng đất này qua nhiều trận càn quét.',
    coreKnowledge: {
      text: `<p>Chiến Khu Đ (hay còn gọi là <strong>Khu chiến Đ</strong>) là hệ thống căn cứ địa cách mạng nằm trải dài trên vùng rừng già Đông Nam Bộ, chủ yếu thuộc địa phận <em>vùng đất Bù Đăng</em>.</p>
      <p>Với địa hình đồi núi trùng điệp, tán rừng già che phủ và hệ thống sông suối tự nhiên, Chiến Khu Đ trở thành "tấm khiên vô hình" bảo vệ lực lượng cách mạng trong suốt 30 năm kháng chiến.</p>
      <blockquote>"Mất Chiến Khu Đ là mất miền Đông Nam Bộ." — Câu nói của các nhà quân sự trong giai đoạn kháng chiến.</blockquote>
      <h3>Ý nghĩa chiến lược</h3>
      <ul>
        <li>Là nơi <strong>che chở và nuôi dưỡng</strong> hàng nghìn cán bộ cốt cán của Đảng và quân đội</li>
        <li>Điều phối toàn bộ hoạt động <strong>tiếp vận lương thực</strong> từ đồng bào S'tiêng cho bộ đội</li>
        <li>Là căn cứ xuất phát của nhiều <strong>chiến dịch quân sự lớn</strong> tại miền Đông Nam Bộ</li>
      </ul>`,
      images: [
        { url: '/images/heritage/lich-su/chien-khu-d-md.webp', caption: 'Rừng già nguyên sinh Bù Đăng — nơi ẩn mình của Chiến Khu Đ huyền thoại' },
        { url: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp', caption: 'Địa hình đồi núi trùng điệp tạo nên lá chắn tự nhiên vững chãi cho căn cứ địa' },
      ],
    },
    timeline: [
      { date: '1945', event: 'Thành lập căn cứ địa kháng chiến Chiến Khu Đ đầu tiên', detail: 'Ngay sau Cách mạng Tháng Tám, các chiến sĩ đã xây dựng hệ thống căn cứ trong rừng già Bù Đăng.' },
      { date: '1950–1954', event: 'Đỉnh cao kháng chiến chống Pháp', detail: 'Chiến Khu Đ trở thành trung tâm chỉ huy của toàn bộ lực lượng kháng chiến miền Đông Nam Bộ.' },
      { date: '1960–1968', event: 'Mở rộng và củng cố trong kháng chiến chống Mỹ', detail: 'Đồng bào S\'tiêng và M\'nông tích cực tham gia giã gạo nuôi quân, trinh sát dẫn đường.' },
      { date: '1975', event: 'Giải phóng hoàn toàn, Chiến Khu Đ hoàn thành sứ mệnh lịch sử', detail: 'Sau 30 năm kiên trì, Chiến Khu Đ đã góp phần quyết định vào thắng lợi của cuộc kháng chiến chống Mỹ.' },
      { date: 'Nay', event: 'Di tích lịch sử cấp quốc gia, trở thành điểm giáo dục truyền thống', detail: 'Chiến Khu Đ hiện là điểm tham quan lịch sử, giáo dục truyền thống cách mạng cho thế hệ trẻ Bù Đăng.' },
    ],
    hotspotImage: {
      url: '/images/heritage/lich-su/chien-khu-d-md.webp',
      alt: 'Bản đồ Chiến Khu Đ và các điểm di tích',
      hotspots: [
        { x: 30, y: 40, label: 'Sóc Bom Bo', desc: 'Địa điểm giã gạo nuôi quân nổi tiếng, được bất hủ hóa qua bài hát "Tiếng Chày Trên Sóc Bom Bo".' },
        { x: 60, y: 25, label: 'Trung tâm chỉ huy', desc: 'Nơi các tướng lĩnh cách mạng lên kế hoạch chiến đấu, ẩn sâu trong lòng rừng già.' },
        { x: 75, y: 65, label: 'Đường mòn tiếp tế', desc: 'Hệ thống đường mòn bí mật vận chuyển lương thực, vũ khí từ đồng bào dân tộc.' },
      ],
    },
    didYouKnow: [
      'Chiến Khu Đ có diện tích lên đến hàng trăm km², lớn hơn cả một huyện thông thường.',
      'Đồng bào S\'tiêng đã giã gạo thâu đêm suốt sáng để nuôi bộ đội — hành động được bất hủ trong bài hát "Tiếng Chày Trên Sóc Bom Bo" của nhạc sĩ Xuân Hồng.',
      'Địch đã thực hiện hơn 200 trận càn quét vào Chiến Khu Đ nhưng không lần nào thực sự tiêu diệt được căn cứ này.',
    ],
    glossary: [
      { term: 'Chiến Khu Đ', definition: 'Hệ thống căn cứ địa kháng chiến cách mạng tại Đông Nam Bộ, thuộc địa phận Bù Đăng và vùng lân cận.' },
      { term: 'Tiếp vận', definition: 'Hoạt động cung cấp lương thực, vũ khí, thuốc men cho lực lượng chiến đấu tại tiền tuyến.' },
      { term: 'Căn cứ địa', definition: 'Vùng an toàn, được bảo vệ chặt chẽ, làm nơi đứng chân của lực lượng kháng chiến.' },
    ],
    flashcards: [
      { front: 'Chiến Khu Đ tồn tại trong khoảng thời gian nào?', back: 'Từ năm 1945 đến 1975 — suốt 30 năm kháng chiến chống Pháp và chống Mỹ.' },
      { front: 'Đồng bào dân tộc nào đã đóng góp nhiều nhất cho Chiến Khu Đ?', back: 'Đồng bào S\'tiêng và M\'nông — đặc biệt qua hoạt động giã gạo nuôi quân ở Sóc Bom Bo.' },
      { front: 'Bài hát nào được lấy cảm hứng từ Chiến Khu Đ?', back: '"Tiếng Chày Trên Sóc Bom Bo" của nhạc sĩ Xuân Hồng — ca ngợi tinh thần đồng bào giã gạo nuôi quân.' },
    ],
    openQuestions: [
      'Theo bạn, điều gì đã giúp Chiến Khu Đ tồn tại suốt 30 năm mà không bị tiêu diệt hoàn toàn?',
      'Nếu bạn là học sinh Bù Đăng thập niên 1960, bạn sẽ đóng góp cho kháng chiến bằng cách nào?',
      'Bài học nào từ Chiến Khu Đ còn có ý nghĩa cho thế hệ trẻ ngày nay?',
    ],
    quiz: [
      {
        question: 'Chiến Khu Đ đóng vai trò chính là gì trong kháng chiến?',
        options: ['Khu đô thị tản cư', 'Căn cứ địa chiến lược kháng chiến', 'Vùng trồng lúa cung cấp thực phẩm', 'Địa điểm du lịch sinh thái'],
        correct: 1,
        explanation: 'Chiến Khu Đ là hệ thống căn cứ địa chiến lược, nơi điều phối toàn bộ hoạt động kháng chiến miền Đông Nam Bộ.',
      },
      {
        question: 'Bài hát "Tiếng Chày Trên Sóc Bom Bo" do ai sáng tác?',
        options: ['Trịnh Công Sơn', 'Văn Cao', 'Xuân Hồng', 'Phạm Duy'],
        correct: 2,
        explanation: 'Nhạc sĩ Xuân Hồng đã sáng tác bài hát này dựa trên hình ảnh đồng bào S\'tiêng giã gạo nuôi quân trong đêm khuya.',
      },
    ],
    essay: {
      prompt: 'Hãy mô tả ngắn gọn ý nghĩa lịch sử và văn hóa của Chiến Khu Đ đối với Xã Bù Đăng ngày nay (100–200 chữ).',
      hint: 'Hãy nghĩ đến: ý nghĩa với cộng đồng S\'tiêng, vai trò trong giáo dục truyền thống, và tiềm năng phát triển du lịch.',
    },
    relatedPlaces: [
      { name: 'Sóc Bom Bo', desc: 'Địa danh lịch sử gắn với bài hát "Tiếng Chày Trên Sóc Bom Bo"', poiId: 'site-1' },
      { name: 'Rừng nguyên sinh Bù Đăng', desc: 'Rừng già bao phủ và bảo vệ toàn bộ Chiến Khu Đ' },
    ],
    relatedEvents: [
      { name: 'Lễ hội tưởng niệm Chiến Khu Đ', year: 'Hàng năm', desc: 'Lễ hội kỷ niệm được tổ chức mỗi năm để tôn vinh các anh hùng liệt sĩ.' },
    ],
    relatedPeople: [
      { name: 'Điểu Đố', role: 'Cựu chiến binh, Đại đội 31B', desc: 'Người chứng kiến trực tiếp các trận phá càn và hoạt động giã gạo nuôi quân của đồng bào S\'tiêng.' },
    ],
    references: [
      { title: 'Lịch sử kháng chiến miền Đông Nam Bộ', source: 'Nhà xuất bản Quân đội Nhân dân, 2002' },
      { title: 'Di tích lịch sử Chiến Khu Đ', source: 'Bảo tàng tỉnh Bình Phước', url: 'https://baotangbinhphuoc.vn' },
    ],
    nextSteps: [
      { title: 'Văn Hóa Cồng Chiêng S\'tiêng', lessonId: 'cong-chieng-stieng', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Bù Đăng', type: 'map' },
      { title: 'Làm bài kiểm tra lịch sử', type: 'quiz' },
    ],
  },

  'cong-chieng-stieng': {
    id: 'cong-chieng-stieng',
    title: 'Cồng Chiêng S\'tiêng — Tiếng Nói Của Đại Ngàn',
    subject: 'Văn hóa dân tộc',
    xpReward: 75,
    estimatedMinutes: 10,
    tldr: 'Cồng chiêng là di sản văn hóa phi vật thể quan trọng nhất của đồng bào S\'tiêng Bù Đăng. Mỗi chiếc chiêng đồng mang trong mình một vị thần linh (Yang Ching), và tiếng chiêng vang lên là cầu nối giữa con người với thần linh, đã được UNESCO vinh danh năm 2005.',
    coreKnowledge: {
      text: `<p>Cồng chiêng không chỉ là nhạc cụ — đó là <strong>tiếng nói tâm linh thiêng liêng</strong> của đồng bào dân tộc thiểu số S'tiêng tại Xã Bù Đăng. Theo tín ngưỡng truyền thống, mỗi chiếc chiêng đồng đều có vị thần <strong>Yang Ching</strong> ngự trị.</p>
      <p>Dàn nhạc cồng chiêng S'tiêng thường gồm từ <strong>6 đến 12 chiếc chiêng</strong> không núm (gọi là <em>Ching</em>), được phân tầng âm thanh chặt chẽ:</p>
      <ul>
        <li><strong>Ching Mẹ (Ching u):</strong> Chiêng lớn nhất, âm trầm ấm, giữ nhịp nền</li>
        <li><strong>Ching Cha &amp; Ching Con:</strong> Chiêng nhỏ hơn, đi giai điệu chính</li>
        <li><strong>Kơ-gơr:</strong> Trống da bò gõ đệm, tạo không khí hào hùng</li>
      </ul>
      <blockquote>"Tiếng chiêng là hơi thở của đại ngàn, còn vang tiếng chiêng là buôn sóc còn trường tồn." — Cựu binh Điểu Lên, Sóc Bom Bo</blockquote>`,
      images: [
        { url: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp', caption: 'Biểu diễn cồng chiêng truyền thống trong lễ hội mừng lúa mới của người S\'tiêng Bù Đăng' },
      ],
    },
    didYouKnow: [
      'Không gian văn hóa cồng chiêng Tây Nguyên được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại vào năm 2005.',
      'Trong tín ngưỡng S\'tiêng, cồng chiêng là vật thiêng — không ai được tùy tiện đánh chiêng ngoài nghi lễ chính thức.',
      'Một bộ chiêng hoàn chỉnh của người S\'tiêng có thể trị giá cả trâu, bò, lợn — tài sản cả đời của một gia đình.',
    ],
    glossary: [
      { term: 'Yang Ching', definition: 'Linh hồn thần linh ngự trị trong cồng chiêng theo tín ngưỡng của người S\'tiêng. Chiêng là vật thiêng kết nối trời đất.' },
      { term: 'Ching', definition: 'Tên gọi chung của chiêng đồng không núm trong âm nhạc S\'tiêng, khác với chiêng có núm của một số dân tộc khác.' },
      { term: 'Xoang', definition: 'Điệu múa truyền thống của người S\'tiêng thường biểu diễn kết hợp với cồng chiêng trong các nghi lễ cộng đồng.' },
      { term: 'Kơ-gơr', definition: 'Trống da bò truyền thống, nhạc cụ gõ đệm cho dàn cồng chiêng, tạo nhịp điệu hùng hồn cho buổi trình diễn.' },
    ],
    flashcards: [
      { front: 'Yang Ching là gì?', back: 'Linh hồn thần linh ngự trị trong cồng chiêng theo tín ngưỡng S\'tiêng — mỗi chiếc chiêng có một vị thần riêng.' },
      { front: 'UNESCO công nhận không gian cồng chiêng Tây Nguyên vào năm nào?', back: 'Năm 2005 — công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại.' },
      { front: 'Ching Mẹ (Ching u) có vai trò gì?', back: 'Là chiêng lớn nhất, âm trầm ấm nhất, đóng vai trò giữ nhịp nền cho cả dàn nhạc.' },
    ],
    openQuestions: [
      'Tại sao người S\'tiêng lại coi cồng chiêng là "vật thiêng" chứ không chỉ là nhạc cụ?',
      'Làm thế nào để giới trẻ Bù Đăng ngày nay có thể tiếp tục gìn giữ nghệ thuật cồng chiêng?',
    ],
    quiz: [
      {
        question: 'Theo tín ngưỡng S\'tiêng, mỗi chiếc cồng chiêng có gì ở bên trong?',
        options: ['Tinh chất đồng quý hiếm', 'Vị thần linh Yang Ching', 'Bùa hộ mệnh của tổ tiên', 'Tro cốt của chiến binh'],
        correct: 1,
        explanation: 'Yang Ching là vị thần linh ngự trị trong mỗi chiếc chiêng đồng theo tín ngưỡng tâm linh của người S\'tiêng.',
      },
      {
        question: 'Điệu múa truyền thống thường kết hợp với cồng chiêng của người S\'tiêng là gì?',
        options: ['Múa trống Tây Nguyên', 'Điệu Xoang', 'Múa lân truyền thống', 'Vũ điệu lúa mới'],
        correct: 1,
        explanation: 'Điệu Xoang là vũ điệu truyền thống của người S\'tiêng, thường được biểu diễn quanh bếp lửa kết hợp với tiếng cồng chiêng.',
      },
    ],
    relatedEvents: [
      { name: 'Lễ hội Mừng Lúa Mới', year: 'Tháng 10–12 âm lịch', desc: 'Lễ hội lớn nhất của người S\'tiêng, nơi cồng chiêng giữ vai trò trung tâm trong nghi lễ cúng thần.' },
    ],
    relatedPlaces: [
      { name: 'Sóc Bom Bo', desc: 'Địa điểm bảo tồn nghệ thuật cồng chiêng truyền thống', poiId: 'site-1' },
    ],
    references: [
      { title: 'Không gian văn hóa cồng chiêng Tây Nguyên', source: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org' },
      { title: 'Âm nhạc dân tộc S\'tiêng và M\'nông tại Bình Phước', source: 'Viện Âm nhạc Việt Nam, 2018' },
    ],
    nextSteps: [
      { title: 'Chiến Khu Đ — Căn Cứ Địa Cách Mạng', lessonId: 'chien-khu-d', type: 'lesson' },
      { title: 'Tìm hiểu thổ cẩm S\'tiêng', type: 'resource' },
      { title: 'Khám phá bản đồ di sản', type: 'map' },
    ],
  },
}

const lesson = computed(() => lessons[id.value] ?? null)

useBreadcrumb(() => lesson.value?.title || '')

// SEO
watchEffect(() => {
  if (lesson.value) {
    useMuseumSeo({
      title: `${lesson.value.title} - Học Tập`,
      description: lesson.value.tldr,
      path: `/study/lesson/${lesson.value.id}`,
      type: 'article',
    })
  }
})

// Reading progress tracker
const mainRef = ref<HTMLElement | null>(null)
const readProgress = ref(0)

function updateReadProgress() {
  if (!mainRef.value || !import.meta.client) return
  const el = mainRef.value
  const rect = el.getBoundingClientRect()
  const scrolled = Math.max(0, -rect.top)
  const total = el.offsetHeight - window.innerHeight
  readProgress.value = total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 100
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', updateReadProgress, { passive: true })
    updateReadProgress()
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) window.removeEventListener('scroll', updateReadProgress)
})

// TOC — sections that exist in the lesson
const toc = computed(() => {
  if (!lesson.value) return []
  const l = lesson.value
  return [
    { id: 'core-heading', label: 'Kiến thức trọng tâm', available: true },
    { id: 'hotspot', label: 'Ảnh chú thích', available: !!l.hotspotImage },
    { id: 'timeline', label: 'Dòng thời gian', available: !!(l.timeline?.length) },
    { id: 'did-you-know', label: 'Bạn có biết?', available: !!(l.didYouKnow?.length) },
    { id: 'glossary', label: 'Thuật ngữ', available: !!(l.glossary?.length) },
    { id: 'flashcards', label: 'Flashcards', available: !!(l.flashcards?.length) },
    { id: 'quiz', label: 'Trắc nghiệm', available: !!(l.quiz?.length) },
    { id: 'essay', label: 'Tự luận', available: !!l.essay },
    { id: 'next-steps', label: 'Bước tiếp theo', available: true },
  ]
})
</script>
