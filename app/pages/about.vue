<template>
  <div class="bg-charcoal-950 text-ivory">
    <!-- 1. THE HOOK: Hero cinematic -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Images Slideshow -->
      <div class="absolute inset-0 z-0">
        <TransitionGroup name="fade">
          <div
            v-for="(slide, i) in slides"
            v-show="currentSlide === i"
            :key="i"
            class="absolute inset-0"
          >
            <img
              :src="slide"
              alt="Giới thiệu Di sản Bù Đăng"
              class="w-full h-full object-cover opacity-40 scale-105"
            />
          </div>
        </TransitionGroup>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-transparent z-10" />
      
      <div class="relative z-20 container-heritage text-center pb-16 pt-32">
        <span class="inline-block px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm font-bold tracking-widest uppercase mb-6 reveal">
          Dự Án Số Hóa Di Sản · Thành Phố Đồng Nai
        </span>
        <h1 class="font-heading font-bold text-ivory text-6xl md:text-8xl leading-tight mb-6 text-shadow-hero reveal">
          Giới Thiệu <span class="text-gradient-gold">Di Sản Bù Đăng</span>
        </h1>
        <p class="font-accent italic text-charcoal-300 text-2xl md:text-3xl max-w-3xl mx-auto mb-12 reveal">
          "Từ ký ức ngàn năm của vùng đất Bù Đăng — Kiến tạo Di Sản Số Thành Phố Đồng Nai"
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
          <button @click="scrollTo('problem')" class="btn-primary px-8 py-4 text-lg rounded-full">
            Bắt đầu Hành Trình
            <Icon name="mdi:arrow-down" class="w-5 h-5 ml-2 animate-bounce" />
          </button>
        </div>
      </div>
    </section>

    <!-- 2. THE PROBLEM: Nỗi Đau Thực Trạng -->
    <section id="problem" class="py-24 lg:py-32 bg-charcoal-900 border-t border-charcoal-850">
      <div class="container-heritage">
        <div class="text-center max-w-3xl mx-auto mb-16 reveal">
          <span class="eyebrow text-brick-500">THỰC TRẠNG & THÁCH THỨC</span>
          <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">Vì Sao Dự Án Này Ra Đời?</h2>
          <p class="text-charcoal-300 text-lg leading-relaxed">
            Di sản văn hóa phi vật thể của vùng đất Bù Đăng đang đối mặt nguy cơ mai một khi chưa có nền tảng số hóa xứng tầm để bảo tồn và truyền lại cho thế hệ mai sau.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(prob, i) in problems" :key="i" class="bg-charcoal-950 border border-charcoal-800 p-8 rounded-3xl relative overflow-hidden group hover:border-brick-500/50 transition-all duration-500 reveal">
            <div class="absolute top-0 left-0 w-full h-1 bg-brick-500/20 group-hover:bg-brick-500 transition-colors" />
            <Icon :name="prob.icon" class="w-12 h-12 text-brick-500 mb-6" />
            <h3 class="font-heading font-bold text-xl mb-3">{{ prob.title }}</h3>
            <p class="text-charcoal-400 leading-relaxed">{{ prob.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. THE SOLUTION: Giải Pháp Công Nghệ -->
    <section class="py-24 lg:py-32 relative overflow-hidden border-t border-charcoal-850">
      <!-- Decor -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div class="container-heritage relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20 reveal">
          <span class="eyebrow text-gold-400">GIẢI PHÁP TOÀN DIỆN</span>
          <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">4 Trụ Cột Của Nền Tảng Số</h2>
          <p class="text-charcoal-350 text-lg leading-relaxed">
            Không chỉ là một trang thông tin tĩnh — Di Sản Bù Đăng là hệ sinh thái số tương tác, bảo tồn và khai thác giá trị văn hóa phi vật thể của Xã Bù Đăng, góp phần khẳng định vị thế di sản của Thành Phố Đồng Nai trên bản đồ số quốc gia.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-x-12 gap-y-16">
          <div v-for="(goal, i) in solutions" :key="i" class="flex gap-6 reveal group">
            <div class="w-16 h-16 rounded-2xl bg-charcoal-900 border border-charcoal-800 flex items-center justify-center shrink-0 shadow-gold group-hover:scale-110 transition-transform">
              <Icon :name="goal.icon" class="w-8 h-8 text-gold-400" />
            </div>
            <div>
              <h3 class="font-heading font-bold text-2xl mb-3">{{ goal.title }}</h3>
              <p class="text-charcoal-400 leading-relaxed">{{ goal.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CORE INNOVATION: Tính Đổi Mới Sáng Tạo -->
    <section class="py-24 lg:py-32 bg-dark-earth border-y border-charcoal-850 relative">
      <div class="container-heritage">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8 reveal">
            <div>
              <span class="eyebrow text-forest-400">ĐỔI MỚI CÔNG NGHỆ</span>
              <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">Trải Nghiệm Khác Biệt</h2>
              <p class="text-charcoal-300 text-lg leading-relaxed">
                Ứng dụng công nghệ hiện đại để biến di sản lịch sử trở nên sống động và chạm được đến thế hệ trẻ — những người sẽ là chủ nhân của Thành Phố Đồng Nai trong tương lai.
              </p>
            </div>
            
            <div class="space-y-6">
              <div v-for="(inv, i) in innovations" :key="i" class="flex items-start gap-4">
                <Icon name="mdi:check-circle" class="w-6 h-6 text-forest-400 shrink-0 mt-0.5" />
                <div>
                  <h4 class="font-heading font-bold text-xl text-ivory mb-1">{{ inv.title }}</h4>
                  <p class="text-charcoal-400">{{ inv.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative reveal hidden lg:block">
            <div class="aspect-square rounded-[3rem] overflow-hidden border-2 border-charcoal-800 shadow-2xl relative">
              <img src="/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp" alt="Innovation" class="w-full h-full object-cover opacity-50" />
              <div class="absolute inset-0 bg-gradient-to-tr from-charcoal-950 via-transparent to-forest-500/20 mix-blend-overlay" />
              
              <!-- Floating UI element -->
              <div class="absolute bottom-10 left-10 right-10 bg-charcoal-900/90 backdrop-blur-md border border-charcoal-800 p-6 rounded-2xl shadow-xl transform translate-y-4 hover:translate-y-0 transition-transform">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-forest-500/20 rounded-full flex items-center justify-center">
                    <Icon name="mdi:medal" class="w-6 h-6 text-forest-400" />
                  </div>
                  <div>
                    <p class="text-sm text-charcoal-400 font-medium uppercase tracking-wider">Huy Hiệu Mới Đạt Được</p>
                    <p class="font-heading font-bold text-lg text-ivory">Chuyên Gia Văn Hóa S'tiêng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4.5 BÙ ĐĂNG TRONG LÒNG THÀNH PHỐ ĐỒNG NAI: Context block -->
    <section class="py-20 lg:py-28 bg-charcoal-950 border-y border-gold-500/10 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9922A08_0%,transparent_70%)] pointer-events-none" />
      <div class="container-heritage relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Text -->
          <div class="reveal space-y-6">
            <span class="eyebrow text-gold-400">VỊ TRÍ & VĂN HÓA BÙ ĐĂNG — THÀNH PHỐ ĐỒNG NAI</span>
            <h2 class="font-heading font-bold text-4xl lg:text-5xl text-ivory leading-tight">
              Bù Đăng<br/>
              <span class="text-gradient-gold">Trong Lòng Thành Phố Đồng Nai</span>
            </h2>
            <p class="text-charcoal-300 text-lg leading-relaxed">
              Thành Phố Đồng Nai — thành phố trực thuộc Trung ương thứ 7 của Việt Nam — là một trong những trung tâm kinh tế động lực của Đông Nam Bộ. Nằm ở phía bắc thành phố, vùng đất Bù Đăng là "viên ngọc di sản" đặc sắc nhất — nơi hội tụ căn cứ cách mạng Chiến Khu Đ huyền thoại, văn hóa bản địa S'tiêng nghìn năm và thiên nhiên nguyên sinh kỳ vĩ.
            </p>
            <p class="text-charcoal-300 text-lg leading-relaxed">
              Dự án <strong class="text-gold-400">Di Sản Bù Đăng</strong> là mô hình thí điểm được thiết kế để nhân rộng ra toàn bộ Thành Phố Đồng Nai. Bắt đầu từ Bù Đăng vì đây là nơi di sản đặc sắc nhất — nhưng tầm nhìn là kiến tạo cổng di sản số của cả thành phố.
            </p>
            <div class="grid grid-cols-2 gap-4 pt-2">
              <div class="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5">
                <p class="text-gold-400 font-heading font-bold text-3xl mb-1">7</p>
                <p class="text-charcoal-400 text-xs uppercase tracking-wider">TP trực thuộc TW của VN</p>
              </div>
              <div class="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5">
                <p class="text-gold-400 font-heading font-bold text-3xl mb-1">2024</p>
                <p class="text-charcoal-400 text-xs uppercase tracking-wider">Năm khởi động dự án</p>
              </div>
            </div>
          </div>
          <!-- Right: Visual list -->
          <div class="reveal space-y-4">
            <div v-for="point in dongNaiContext" :key="point.title" class="flex gap-4 p-5 bg-charcoal-900 border border-charcoal-800 rounded-2xl hover:border-gold-500/30 transition-colors group">
              <div class="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <Icon :name="point.icon" class="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h4 class="font-heading font-bold text-ivory mb-1">{{ point.title }}</h4>
                <p class="text-charcoal-400 text-sm leading-relaxed">{{ point.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. TRACTION & IMPACT: Kết quả thực tế & Đội ngũ -->
    <section class="py-24 lg:py-32 bg-charcoal-950">
      <div class="container-heritage">
        <div class="text-center max-w-3xl mx-auto mb-20 reveal">
          <span class="eyebrow text-gold-400">MINH CHỨNG THỰC TẾ</span>
          <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">Kết Quả Trong Giai Đoạn Thí Điểm</h2>
          <p class="text-charcoal-300 text-lg">Những con số thực tế sau quá trình xây dựng và triển khai nền tảng số hóa di sản vùng đất Bù Đăng.</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-24">
          <div v-for="stat in projectStats" :key="stat.label" class="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 text-center reveal">
            <Icon :name="stat.icon" class="w-10 h-10 text-gold-400 mx-auto mb-4" />
            <div class="font-heading font-bold text-4xl lg:text-5xl text-ivory mb-2">{{ stat.value }}</div>
            <p class="text-charcoal-400 text-sm uppercase tracking-wider font-semibold">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Team -->
        <div class="max-w-4xl mx-auto bg-charcoal-900/50 border border-charcoal-800 rounded-[2.5rem] p-8 md:p-12 reveal">
          <div class="text-center mb-10">
            <h3 class="font-heading font-bold text-3xl">Người Thực Hiện</h3>
            <p class="text-charcoal-400 text-sm mt-2">Một dự án cá nhân mang tầm nhìn cộng đồng</p>
          </div>
          <div class="flex justify-center">
            <div v-for="team in teams" :key="team.name" class="text-center group max-w-xs">
              <div class="w-20 h-20 mx-auto bg-gradient-earth rounded-2xl flex items-center justify-center mb-4 transform group-hover:-translate-y-2 transition-transform shadow-lg">
                <Icon :name="team.icon" class="w-10 h-10 text-ivory" />
              </div>
              <h4 class="font-heading font-bold text-xl text-ivory mb-1">{{ team.name }}</h4>
              <p class="text-charcoal-400 text-sm">{{ team.role }}</p>
              <p class="text-gold-400/70 text-xs mt-1 italic">Thành Phố Đồng Nai, Việt Nam</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. ROADMAP: Tầm Nhìn Tương Lai -->
    <section class="py-24 lg:py-32 border-t border-charcoal-850 bg-charcoal-900">
      <div class="container-heritage">
        <div class="text-center max-w-3xl mx-auto mb-20 reveal">
          <span class="eyebrow text-gold-400">LỘ TRÌNH PHÁT TRIỂN</span>
          <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">Định Hướng Mở Rộng</h2>
          <p class="text-charcoal-300 text-lg">Dự án bắt đầu từ vùng đất Bù Đăng — viên ngọc văn hóa đặc sắc với lịch sử cách mạng hào hùng, với tầm nhìn mở rộng phủ sóng toàn bộ bản đồ di sản của Thành Phố Đồng Nai.</p>
        </div>

        <div class="max-w-4xl mx-auto relative reveal">
          <!-- Vertical Line -->
          <div class="absolute left-1/2 top-0 bottom-0 w-px bg-charcoal-800 -translate-x-1/2 hidden md:block" />
          
          <div class="space-y-12">
            <div v-for="(phase, index) in roadmap" :key="index" class="relative flex flex-col md:flex-row items-center gap-8" :class="index % 2 !== 0 ? 'md:flex-row-reverse' : ''">
              <!-- Timeline node -->
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gold-500 rounded-full border-4 border-charcoal-900 hidden md:block z-10" />
              
              <!-- Content -->
              <div class="w-full md:w-1/2" :class="index % 2 !== 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'">
                <div class="bg-charcoal-950 border border-charcoal-800 p-6 rounded-2xl hover:border-gold-500/30 transition-colors">
                  <span class="text-gold-400 font-bold text-sm tracking-widest uppercase mb-2 block">{{ phase.time }}</span>
                  <h4 class="font-heading font-bold text-2xl text-ivory mb-3">{{ phase.title }}</h4>
                  <p class="text-charcoal-400">{{ phase.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Giới Thiệu Dự Án',
  description: 'Dự án thí điểm số hóa di sản văn hóa vùng đất Bù Đăng — nền tảng hướng tới cổng di sản số của Thành Phố Đồng Nai, thành phố trực thuộc Trung ương thứ 7 của Việt Nam.',
})

const slides = [
  '/images/heritage/Bombo/TAN08217.jpg',
  '/images/heritage/lich-su/nha-giao-truyen-thong-md.webp',
  '/images/heritage/img-disanbudang/chien-khu-D.png'
]
const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval>

const { observeAll } = useScrollReveal()
onMounted(() => {
  nextTick(() => observeAll())
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

const scrollTo = (id: string) => {
  if (import.meta.client) {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Dữ liệu đã xác minh từ nhiều nguồn lịch sử chính thống
// ─────────────────────────────────────────────────────────────────────────────

// THỰC TRẠNG — vấn đề thực tế đang diễn ra
const problems = [
  {
    icon: 'mdi:account-group-outline',
    title: 'Đứt Gãy Ký Ức Giữa Các Thế Hệ',
    desc: 'Những nghệ nhân già — người duy nhất còn nhớ cách đánh bộ cồng chiêng 11 chiếc (6 chiêng + 5 cồng) hay kỹ thuật dệt hoa văn "suối tóc" Pú Mél Sól trên thổ cẩm S\'tiêng — đang dần khuất bóng. Khi các già làng ra đi, những trang sử sống ấy sẽ vĩnh viễn mất đi nếu không được ghi chép, số hóa kịp thời.'
  },
  {
    icon: 'mdi:book-remove-multiple-outline',
    title: 'Di Sản Phi Vật Thể Không Có Không Gian Số',
    desc: 'Không gian văn hóa cồng chiêng S\'tiêng là một phần của di sản cồng chiêng Tây Nguyên — được UNESCO công nhận là Di sản Văn hóa Phi vật thể của Nhân loại. Nghề dệt thổ cẩm S\'tiêng cũng đã được Bộ VHTTDL công nhận là Di sản Văn hóa Phi vật thể Quốc gia. Tuy nhiên, các giá trị này chưa có không gian số xứng tầm để được tiếp cận rộng rãi.'
  },
  {
    icon: 'mdi:map-marker-off-outline',
    title: 'Tiềm Năng Di Sản Chưa Được Số Hóa',
    desc: 'Vùng đất Bù Đăng lưu giữ di tích Khu Bảo Tồn Văn Hóa Sóc Bom Bo — nơi năm 1965 già làng Điểu Nhếch dẫn cả sóc giã gạo nuôi quân, truyền cảm hứng cho nhạc sĩ Xuân Hồng viết nên "Tiếng Chày Trên Sóc Bom Bo". Những địa danh lịch sử oai hùng ấy chưa có công cụ số hóa tương tác để quảng bá đúng tầm.'
  }
]

// 4 TRỤ CỘT — giải pháp cụ thể, đã triển khai
const solutions = [
  {
    icon: 'mdi:archive-check',
    title: 'Hệ Thống Bảo Tàng Số Đa Phương Tiện',
    desc: 'Số hóa 11 di sản văn hóa — lịch sử — thiên nhiên với hồ sơ đầy đủ: hình ảnh chất lượng cao, thuyết minh âm thanh chuyên nghiệp, video tư liệu và câu chuyện kể theo dòng thời gian. Mỗi hiện vật và địa danh được tái hiện thành tác phẩm kỹ thuật số sống động.'
  },
  {
    icon: 'mdi:map-search',
    title: 'Bản Đồ Di Sản Tương Tác GIS',
    desc: 'Trực quan hóa toàn bộ hệ thống di tích, danh thắng và làng nghề truyền thống trên bản đồ địa lý số. Người dùng tìm kiếm, lọc theo danh mục, thời kỳ lịch sử, lên tuyến lộ trình khám phá và định vị thực địa — tất cả trên một nền tảng duy nhất.'
  },
  {
    icon: 'mdi:school-outline',
    title: 'Cổng Học Tập Số Cho Học Sinh',
    desc: 'Hệ thống học tập tương tác với hơn 35 câu hỏi trí tuệ, bài giảng lịch sử được trình bày theo từng chương, tài liệu nghiên cứu số hóa từ các trường THPT và THCS trong vùng. Học sinh trực tiếp đóng góp nghiên cứu về di sản quê hương vào kho tri thức chung.'
  },
  {
    icon: 'mdi:chart-box-outline',
    title: 'Nền Tảng Cộng Đồng Đóng Góp Mở',
    desc: 'Người dân, giáo viên, nghiên cứu sinh có thể đóng góp hình ảnh, ký ức cộng đồng, tư liệu sưu tầm vào kho di sản chung. Nền tảng mở giúp bảo tàng số liên tục phát triển và phản ánh đúng hơi thở thực của cộng đồng vùng đất Bù Đăng.'
  }
]

// ĐỔI MỚI SÁNG TẠO — điểm độc đáo của dự án
const innovations = [
  {
    title: 'Gamification Hóa Trải Nghiệm Học Lịch Sử',
    desc: 'Hơn 35 câu hỏi trí tuệ có chấm điểm theo từng di sản, tích điểm Huy Hiệu số khi hoàn thành chủ đề. Thay thế giáo trình khô cứng bằng hành trình khám phá kích thích tư duy và niềm tự hào về lịch sử quê hương trong học sinh.'
  },
  {
    title: 'Audio Guide — Thuyết Minh Âm Thanh Tự Động',
    desc: '4 bài thuyết minh âm thanh chuyên nghiệp đưa người dùng nghe lại nhịp chày giã gạo Sóc Bom Bo, tiếng cồng chiêng S\'tiêng trong lễ mừng lúa mới, hay lời kể về những đêm kháng chiến hào hùng nơi đại ngàn Bù Đăng.'
  },
  {
    title: 'Crowdsourcing Di Sản Cộng Đồng',
    desc: 'Không gian mở để cộng đồng đồng kiến tạo di sản số — giáo viên đăng tải tài liệu, học sinh nộp nghiên cứu, người dân chia sẻ ký ức. Biến di sản từ "bảo tàng tĩnh" thành "ký ức sống" do chính cộng đồng viết nên.'
  }
]

// SỐ LIỆU DỰ ÁN — chỉ dùng con số đã có trong hệ thống
const projectStats = [
  { icon: 'mdi:castle', label: 'Di sản được số hóa', value: '11' },
  { icon: 'mdi:headphones', label: 'Audio thuyết minh', value: '4' },
  { icon: 'mdi:gamepad-variant-outline', label: 'Câu hỏi trí tuệ', value: '35+' },
  { icon: 'mdi:school-outline', label: 'Trường học tham gia', value: '5+' },
  { icon: 'mdi:view-dashboard-outline', label: 'Phân hệ chức năng', value: '5' },
  { icon: 'mdi:city-variant-outline', label: 'Tầm nhìn thành phố', value: 'TP ĐN' },
]

const teams = [
  { name: 'Nguyễn Xuân Kiệt', role: 'Founder & Nhà phát triển dự án disanbudang', icon: 'mdi:account-star' }
]

// Context về quan hệ Bù Đăng — Thành Phố Đồng Nai
const dongNaiContext = [
  {
    icon: 'mdi:map-marker-radius',
    title: 'Vị Trí Chiến Lược',
    desc: 'Vùng đất Bù Đăng nằm ở phía bắc Thành Phố Đồng Nai — cửa ngõ văn hóa kết nối vùng Cao Nguyên với Đông Nam Bộ.'
  },
  {
    icon: 'mdi:shield-star',
    title: 'Mô Hình Thí Điểm Đồng Nai',
    desc: 'Những gì đã số hóa tại Bù Đăng là mẫu thử nghiệm cho mô hình cổng di sản số của toàn Thành Phố Đồng Nai.'
  },
  {
    icon: 'mdi:handshake',
    title: 'Hợp Tác Giáo Dục Địa Phương',
    desc: 'Kết nối với trường học trong thành phố để đưa lịch sử di sản Bù Đăng vào giảng dạy và nghiên cứu cấp tỉnh.'
  },
  {
    icon: 'mdi:trending-up',
    title: 'Mô Hình Nhân Rộng',
    desc: 'Công nghệ đã được kiểm chứng tại Bù Đăng sẵn sàng tích hợp dữ liệu di sản của tất cả các khu vực trong Thành Phố Đồng Nai.'
  },
]

// LỘ TRÌNH — tầm nhìn có căn cứ
const roadmap = [
  {
    time: 'Giai đoạn hiện tại',
    title: 'Thí Điểm Tại Vùng Đất Bù Đăng',
    desc: 'Số hóa 11 di sản trọng điểm của vùng đất Bù Đăng — từ Khu Bảo Tồn Văn Hóa Sóc Bom Bo, di tích Chiến Khu Đ, đến không gian cồng chiêng S\'tiêng và làng nghề dệt thổ cẩm. Xây dựng nền tảng công nghệ hoàn chỉnh làm mô hình nhân rộng.'
  },
  {
    time: 'Giai đoạn tiếp theo',
    title: 'Phủ Sóng Toàn Thành Phố Đồng Nai',
    desc: 'Nhân rộng mô hình số hóa ra toàn bộ di sản của Thành Phố Đồng Nai — thành phố trực thuộc Trung ương thứ 7 của Việt Nam, nơi hội tụ văn hóa của cả vùng Đông Nam Bộ. Kết nối mạng lưới bảo tàng số liên thông toàn thành phố.'
  },
  {
    time: 'Tầm nhìn 2027+',
    title: 'Đa Ngữ, Thực Tế Ảo & Smart Tourism',
    desc: 'Tích hợp AI đa ngữ để đón du khách quốc tế, thực tế ảo (VR) phục dựng không gian lễ hội cồng chiêng, hệ thống QR thực địa tại các điểm di tích và hợp tác với Sở VHTTDL Đồng Nai phổ cập giáo dục địa phương.'
  },
]
</script>



<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8,0,1,1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0,0,0.2,1);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
