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
          Dự Án Bảo Tàng Số Cộng Đồng
        </span>
        <h1 class="font-heading font-bold text-ivory text-6xl md:text-8xl leading-tight mb-6 text-shadow-hero reveal">
          Di Sản <span class="text-gradient-gold">Bù Đăng</span>
        </h1>
        <p class="font-accent italic text-charcoal-300 text-2xl md:text-3xl max-w-3xl mx-auto mb-12 reveal">
          "Lưu giữ để không quên — Chia sẻ để cùng lớn"
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
          <span class="eyebrow text-brick-500">THỰC TRẠNG</span>
          <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">Tại sao chúng tôi bắt đầu?</h2>
          <p class="text-charcoal-300 text-lg leading-relaxed">
            Trong kỷ nguyên số, chúng ta đối mặt với nguy cơ đánh mất bản sắc địa phương trước áp lực của đô thị hóa và sự thay đổi thế hệ.
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
          <span class="eyebrow text-gold-400">GIẢI PHÁP TỔNG THỂ</span>
          <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">4 Trụ Cột Nền Tảng Số</h2>
          <p class="text-charcoal-350 text-lg leading-relaxed">
            Không chỉ là một trang thông tin tĩnh, Di Sản Bù Đăng là một hệ sinh thái tương tác nhằm số hoá, bảo tồn và tạo ra giá trị kinh tế trực tiếp cho địa phương.
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
              <span class="eyebrow text-forest-400">ĐỔI MỚI SÁNG TẠO</span>
              <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">Trải Nghiệm Khác Biệt</h2>
              <p class="text-charcoal-300 text-lg leading-relaxed">
                Ứng dụng công nghệ hiện đại để biến lịch sử trở nên "sống động" và "chạm" được đến thế hệ Z.
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

    <!-- 5. TRACTION & IMPACT: Kết quả thực tế & Đội ngũ -->
    <section class="py-24 lg:py-32 bg-charcoal-950">
      <div class="container-heritage">
        <div class="text-center max-w-3xl mx-auto mb-20 reveal">
          <span class="eyebrow text-gold-400">HIỆN TRẠNG</span>
          <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">Kết Quả Đạt Được</h2>
          <p class="text-charcoal-300 text-lg">Những con số biết nói chứng minh tính khả thi và tác động thực tiễn của dự án chỉ sau thời gian ngắn triển khai.</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          <div v-for="stat in projectStats" :key="stat.label" class="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 text-center reveal">
            <Icon :name="stat.icon" class="w-10 h-10 text-gold-400 mx-auto mb-4" />
            <div class="font-heading font-bold text-4xl lg:text-5xl text-ivory mb-2">{{ stat.value }}</div>
            <p class="text-charcoal-400 text-sm uppercase tracking-wider font-semibold">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Team -->
        <div class="max-w-4xl mx-auto bg-charcoal-900/50 border border-charcoal-800 rounded-[2.5rem] p-8 md:p-12 reveal">
          <div class="text-center mb-10">
            <h3 class="font-heading font-bold text-3xl">Đội Ngũ Thực Hiện</h3>
          </div>
          <div class="flex justify-center">
            <div v-for="team in teams" :key="team.name" class="text-center group max-w-xs">
              <div class="w-20 h-20 mx-auto bg-gradient-earth rounded-2xl flex items-center justify-center mb-4 transform group-hover:-translate-y-2 transition-transform shadow-lg">
                <Icon :name="team.icon" class="w-10 h-10 text-ivory" />
              </div>
              <h4 class="font-heading font-bold text-xl text-ivory mb-1">{{ team.name }}</h4>
              <p class="text-charcoal-400 text-sm">{{ team.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. ROADMAP: Tầm Nhìn Tương Lai -->
    <section class="py-24 lg:py-32 border-t border-charcoal-850 bg-charcoal-900">
      <div class="container-heritage">
        <div class="text-center max-w-3xl mx-auto mb-20 reveal">
          <span class="eyebrow text-gold-400">TẦM NHÌN</span>
          <h2 class="font-heading font-bold text-4xl lg:text-5xl mb-6">Định Hướng Mở Rộng</h2>
          <p class="text-charcoal-300 text-lg">Dự án không dừng lại ở ranh giới Bù Đăng, chúng tôi có tham vọng mở rộng và áp dụng công nghệ sâu hơn.</p>
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
useSeoMeta({ title: 'Giới Thiệu Dự Án — Di Sản Bù Đăng', description: 'Di Sản Bù Đăng là dự án bảo tàng số cộng đồng, số hóa và bảo tồn di sản văn hóa, lịch sử, thiên nhiên của vùng đất Bù Đăng cho thế hệ hôm nay và mai sau.' })

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

// Data Arrays for Pitch Deck
const problems = [
  { 
    icon: 'mdi:account-group-outline', 
    title: 'Đứt Gãy Dòng Chảy Di Sản Giữa Các Thế Hệ', 
    desc: 'Trong dòng chảy hối hả của kỷ nguyên số, thế hệ trẻ lớn lên mà thiếu vắng sợi dây liên kết với cội nguồn. Những câu chuyện truyền thuyết bên bếp lửa nhà dài S\'tiêng dần bị lãng quên, đẩy các giá trị văn hóa phi vật thể vào nguy cơ mai một.' 
  },
  { 
    icon: 'mdi:book-remove-multiple-outline', 
    title: 'Thất Truyền Ký Ức Lịch Sử & Nghệ Thuật Bản Địa', 
    desc: 'Những điệu cồng chiêng cổ, nghệ thuật dệt thổ cẩm tỉ mỉ hay kỹ thuật dệt hoa văn chỉ đang tồn tại trong trí nhớ của các già làng. Khi thời gian trôi đi, nếu không có giải pháp lưu trữ bền vững, những trang sử sống này sẽ vĩnh viễn biến mất.' 
  },
  { 
    icon: 'mdi:map-marker-off-outline', 
    title: 'Sự Cách Biệt Giữa Tiềm Năng & Không Gian Số', 
    desc: 'Bù Đăng sở hữu tài nguyên thiên nhiên hoang sơ với rừng nguyên sinh kỳ vĩ và bề dày lịch sử cách mạng hào hùng. Tuy nhiên, việc thiếu hụt một công cụ số hóa tương tác hiện đại làm giảm cơ hội tiếp cận và hạn chế khả năng quảng bá du lịch.' 
  }
]

const solutions = [
  { 
    icon: 'mdi:archive-check', 
    title: 'Hệ Thống Bảo Tàng Số Tương Tác Sinh Động', 
    desc: 'Không chỉ lưu trữ dữ liệu thô, chúng tôi chuyển hóa hiện vật và địa danh lịch sử thành những câu chuyện giàu cảm xúc. Số hóa đa phương tiện kết hợp âm thanh, hình ảnh giúp di sản tự nói lên tiếng nói của chính mình.' 
  },
  { 
    icon: 'mdi:map-search', 
    title: 'Bản Đồ Di Sản Hệ Thống Thông Tin Địa Lý (GIS)', 
    desc: 'Ứng dụng tọa độ số học trực quan hóa hệ thống di tích cách mạng, danh lam thắng cảnh. Du khách dễ dàng định vị, lập lộ trình cá nhân hóa và khám phá vẻ đẹp hoang sơ của Bù Đăng qua màn hình thiết bị.' 
  },
  { 
    icon: 'mdi:silverware-variant', 
    title: 'Số Hóa Chuỗi Giá Trị Du Lịch Bản Địa', 
    desc: 'Thiết lập nhịp cầu kết nối trực tiếp du khách với các dịch vụ lưu trú sinh thái, ẩm thực truyền thống và làng nghề thổ cẩm, góp phần tạo sinh kế bền vững và nâng cao thu nhập cho đồng bào thiểu số.' 
  },
  { 
    icon: 'mdi:chart-box-outline', 
    title: 'Cổng Định Hướng Phát Triển Bền Vững', 
    desc: 'Tận dụng các giá trị văn hóa nền tảng để truyền tải thông tin quy hoạch định hướng phát triển địa phương, kêu gọi đầu tư kinh tế sinh thái và giữ gìn cảnh quan thiên nhiên cho thế hệ mai sau.' 
  }
]

const innovations = [
  { 
    title: 'Phương Pháp Học Tập Qua Trải Nghiệm Số (Gamification)', 
    desc: 'Thay thế những giáo trình khô khan bằng hệ thống nhiệm vụ học tập, thử thách tương tác và hệ thống Huy hiệu số, kích thích niềm tự hào và tinh thần chủ động tìm hiểu lịch sử quê hương của học sinh.' 
  },
  { 
    title: 'Hệ Thống Thuyết Minh Âm Thanh Tự Động (Audio Guide)', 
    desc: 'Đưa nghệ thuật kể chuyện âm thanh (Podcasting) vào từng điểm di tích. Người dùng lắng nghe tiếng chày giã gạo Bom Bo hay tiếng nước đổ Thác Đứng như đang trực tiếp đắm mình trong không gian văn hóa lịch sử.' 
  },
  { 
    title: 'Nền Tảng Đồng Kiến Tạo Di Sản Cộng Đồng (Crowdsourcing)', 
    desc: 'Xây dựng không gian mở cho phép giáo viên, học sinh và người dân đóng góp hình ảnh, câu chuyện và tư liệu sưu tầm được, biến website thành một bảo tàng mở liên tục phát triển sinh động.' 
  }
]

const projectStats = [
  { icon: 'mdi:castle', label: 'Di sản được sống lại', value: '11' },
  { icon: 'mdi:headphones', label: 'Câu chuyện Audio', value: '4' },
  { icon: 'mdi:gamepad-variant-outline', label: 'Thử thách trí tuệ', value: '35+' },
  { icon: 'mdi:school-outline', label: 'Trường học đồng hành', value: '5+' },
]

const teams = [
  { name: 'Nguyễn Xuân Kiệt', role: 'Founder disanbudang', icon: 'mdi:account-star' }
]

const roadmap = [
  { 
    time: 'Tương lai gần', 
    title: 'Mở Rộng Không Gian Văn Hoá', 
    desc: 'Đưa mô hình chuyển đổi số này vượt ra khỏi ranh giới Bù Đăng, phủ sóng toàn vẹn bản đồ di sản của Thành Phố Đồng Nai.' 
  },
  { 
    time: 'Trung hạn', 
    title: 'Xóa Nhòa Rào Cản Ngôn Ngữ', 
    desc: 'Ứng dụng Trí tuệ nhân tạo (AI) tự động dịch thuật và tạo thuyết minh giọng nói (Text-to-Speech) đa ngữ, sẵn sàng đón làn sóng du khách quốc tế.' 
  },
  { 
    time: 'Tầm nhìn xa', 
    title: 'Trải Nghiệm Thực Tế Ảo (VR/AR)', 
    desc: 'Phục dựng 3D các không gian lễ hội thiêng liêng, cho phép người dùng từ bất cứ đâu trên thế giới đều có thể bước vào không gian văn hoá cồng chiêng.' 
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
