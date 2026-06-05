<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory">
    <!-- Hero -->
    <div class="relative py-24 overflow-hidden border-b border-charcoal-850">
      <img
        src="https://images.unsplash.com/photo-1447684808650-354ae64db5b8?w=1600&q=80"
        alt="Đóng góp tư liệu"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/60 to-transparent" />
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Không Gian Hiến Tặng Ký Ức</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-none mb-5">
          Chung Tay Kiến Tạo<br/><span class="text-gradient-gold">Bản Đồ Di Sản</span>
        </h1>
        <p class="text-charcoal-300 text-lg max-w-xl leading-relaxed">
          Mỗi hiện vật, bức ảnh cũ hay câu chuyện truyền miệng bạn hiến tặng sẽ giúp làm sâu sắc thêm chiều sâu lịch sử địa phương.
        </p>
      </div>
    </div>

    <div class="container-heritage py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Wizard Form -->
        <div class="lg:col-span-8 bg-charcoal-950/40 border border-charcoal-850 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
          <!-- Step Progress Indicators -->
          <div class="flex items-center justify-between mb-10 border-b border-charcoal-850 pb-6">
            <div
              v-for="(step, sIdx) in steps"
              :key="step.title"
              class="flex items-center gap-2.5"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                :class="[
                  currentStep === sIdx + 1
                    ? 'bg-gold-500 text-charcoal-900 shadow-gold'
                    : currentStep > sIdx + 1
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/35'
                      : 'bg-charcoal-900 text-charcoal-500 border border-charcoal-800'
                ]"
              >
                {{ sIdx + 1 }}
              </div>
              <span
                class="text-xs font-semibold uppercase tracking-wider hidden sm:inline"
                :class="currentStep === sIdx + 1 ? 'text-ivory' : 'text-charcoal-500'"
              >
                {{ step.title }}
              </span>
              <Icon
                v-if="sIdx < steps.length - 1"
                name="mdi:chevron-right"
                class="w-4 h-4 text-charcoal-700 hidden sm:block ml-2"
              />
            </div>
          </div>

          <form @submit.prevent="handleSubmit">
            <!-- STEP 1: SELECT TYPE -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h3 class="font-heading font-bold text-xl text-ivory mb-4">Bước 1: Chọn loại hình hiến tặng</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button
                  v-for="type in contributionTypes"
                  :key="type.id"
                  type="button"
                  class="flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 text-sm text-center"
                  :class="selectedType === type.id
                    ? 'bg-gold-500/10 text-gold-400 border-gold-500 shadow-gold/5'
                    : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/40 hover:text-ivory bg-charcoal-950/20'"
                  @click="selectedType = type.id"
                >
                  <Icon :name="type.icon" class="w-8 h-8 text-gold-400" />
                  <span class="font-semibold">{{ type.label }}</span>
                </button>
              </div>
              <div class="pt-6 flex justify-end">
                <button type="button" class="btn-primary" @click="currentStep = 2">
                  Tiếp Tục
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- STEP 2: AUTHOR DETAILS -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h3 class="font-heading font-bold text-xl text-ivory mb-4">Bước 2: Thông tin người hiến tặng</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="name">Họ Tên *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Nhập họ và tên đầy đủ"
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm placeholder-charcoal-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  />
                </div>
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="role">Vai Trò</label>
                  <select
                    id="role"
                    v-model="form.role"
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    <option value="resident">Người dân bản địa</option>
                    <option value="student">Học sinh / Sinh viên</option>
                    <option value="teacher">Giáo viên / Học giả</option>
                    <option value="visitor">Du khách ghé thăm</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
              <div class="pt-6 flex justify-between">
                <button type="button" class="btn-secondary text-xs" @click="currentStep = 1">Quay lại</button>
                <button type="button" class="btn-primary" @click="currentStep = 3">
                  Tiếp Tục
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- STEP 3: CONTENT & TRUST CHECKLIST -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h3 class="font-heading font-bold text-xl text-ivory mb-4">Bước 3: Chi tiết tư liệu & Lòng tin</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="title">Tiêu Đề Đóng Góp *</label>
                  <input
                    id="title"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Tiêu đề tóm tắt (ví dụ: Ảnh cưới truyền thống S'tiêng năm 1980)"
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm placeholder-charcoal-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  />
                </div>
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="content">Nội Dung / Ghi chú tư liệu *</label>
                  <textarea
                    id="content"
                    v-model="form.content"
                    required
                    rows="6"
                    placeholder="Viết câu chuyện hoặc ghi lại xuất xứ hiện vật..."
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm placeholder-charcoal-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none"
                  />
                </div>
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="heritage">Liên kết di tích cụ thể</label>
                  <select
                    id="heritage"
                    v-model="form.heritageId"
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    <option value="">-- Không liên kết / Di sản mới --</option>
                    <option v-for="h in heritages" :key="h.id" :value="h.id">{{ h.title }}</option>
                  </select>
                </div>

                <!-- Trust verification checkbox list -->
                <div class="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 space-y-3">
                  <p class="text-xs uppercase text-gold-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <Icon name="mdi:shield-check-outline" class="w-4 h-4" />
                    Cam kết chất lượng tư liệu
                  </p>
                  <label class="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-400 hover:text-ivory transition-colors">
                    <input type="checkbox" required class="mt-0.5 rounded border-charcoal-800 bg-charcoal-950 text-gold-500 focus:ring-gold-500/20" />
                    <span>Tôi xác nhận tư liệu cung cấp là chính xác, không xuyên tạc lịch sử.</span>
                  </label>
                  <label class="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-400 hover:text-ivory transition-colors">
                    <input type="checkbox" required class="mt-0.5 rounded border-charcoal-800 bg-charcoal-950 text-gold-500 focus:ring-gold-500/20" />
                    <span>Tôi đồng ý ủy quyền số hóa và trưng bày phi thương mại trên Bản đồ Di sản Bù Đăng.</span>
                  </label>
                </div>
              </div>

              <div class="pt-6 flex justify-between">
                <button type="button" class="btn-secondary text-xs" @click="currentStep = 2">Quay lại</button>
                <button
                  type="submit"
                  class="btn-primary"
                  :class="{ 'opacity-70 pointer-events-none': isSubmitting }"
                >
                  <Icon v-if="isSubmitting" name="mdi:loading" class="w-4 h-4 animate-spin" />
                  <Icon v-else name="mdi:send-outline" class="w-4 h-4" />
                  {{ isSubmitting ? 'Đang gửi lên bảo tàng...' : 'Gửi Hiến Tặng' }}
                </button>
              </div>

              <!-- Success Alert -->
              <Transition name="fade-in-up">
                <div v-if="isSubmitted" class="p-4 rounded-xl bg-green-950/30 border border-green-800/40 flex items-center gap-3.5 mt-4">
                  <Icon name="mdi:check-circle" class="w-6 h-6 text-green-500 shrink-0 animate-bounce" />
                  <div>
                    <p class="text-green-400 font-semibold text-sm">Gửi hiến tặng thành công!</p>
                    <p class="text-green-500/80 text-xs mt-0.5">Hồ sơ của bạn đã được chuyển tới Ban Quản lý Di tích Huyện Bù Đăng kiểm duyệt.</p>
                  </div>
                </div>
              </Transition>
            </div>
          </form>
        </div>

        <!-- Info Sidebar -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-charcoal-950/60 border border-charcoal-850 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
            <h3 class="font-heading font-bold text-ivory text-base mb-5">Giá trị của sự hiến tặng</h3>
            <div class="space-y-4">
              <div v-for="reason in reasons" :key="reason.title" class="flex gap-3">
                <div class="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center shrink-0 text-gold-400">
                  <Icon :name="reason.icon" class="w-5 h-5" />
                </div>
                <div>
                  <p class="font-medium text-ivory text-sm leading-snug">{{ reason.title }}</p>
                  <p class="text-charcoal-400 text-xs leading-normal mt-1">{{ reason.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-charcoal-950/60 border border-charcoal-850 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
            <h3 class="font-heading font-bold text-ivory text-base mb-4">Tiến Trình Kiểm Duyệt</h3>
            <div class="relative pl-5 border-l border-charcoal-800 ml-2.5 space-y-4 text-xs">
              <div>
                <span class="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-gold-500 shadow-gold" />
                <p class="font-semibold text-ivory">1. Ghi nhận thông tin</p>
                <p class="text-charcoal-400 mt-0.5">Tiếp nhận ký ức và thông tin ban đầu gửi về.</p>
              </div>
              <div>
                <span class="absolute -left-[25px] top-21 w-2.5 h-2.5 rounded-full bg-charcoal-600" />
                <p class="font-semibold text-charcoal-350">2. Xác minh khảo cổ</p>
                <p class="text-charcoal-550 mt-0.5">Ban quản lý di tích đối chiếu sử liệu địa phương.</p>
              </div>
              <div>
                <span class="absolute -left-[25px] top-41 w-2.5 h-2.5 rounded-full bg-charcoal-600" />
                <p class="font-semibold text-charcoal-350">3. Số hóa công khai</p>
                <p class="text-charcoal-550 mt-0.5">Trưng bày chính thức lên bản đồ di sản số.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MOCK_HERITAGES } from '~/data/mockHeritages'

definePageMeta({ layout: 'default' })
useSeoMeta({
  title: 'Hiến Tặng Tư Liệu Lịch Sử — Di Sản Bù Đăng',
  description: 'Đóng góp công sức của bạn vào cổng bảo tồn di sản số. Gửi tranh vẽ, hình ảnh, văn bản tư liệu đã qua kiểm chứng.',
})

const heritages = MOCK_HERITAGES
const selectedType = ref('story')
const currentStep = ref(1)
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const steps = [
  { title: 'Chọn Loại' },
  { title: 'Tác Giả' },
  { title: 'Nội Dung' }
]

const form = reactive({
  name: '', role: 'resident', title: '', content: '', heritageId: '',
})

const contributionTypes = [
  { id: 'story', label: 'Câu Chuyện Bản Địa', icon: 'mdi:book-open-variant' },
  { id: 'photo', label: 'Ảnh / Video Cổ', icon: 'mdi:camera' },
  { id: 'document', label: 'Hiện Vật Số Hóa', icon: 'mdi:file-document' },
  { id: 'memory', label: 'Ký Ức Truyền Miệng', icon: 'mdi:heart' },
  { id: 'artwork', label: 'Tác Phẩm Tranh Vẽ', icon: 'mdi:palette' },
  { id: 'research', label: 'Khảo Cứu Dân Gian', icon: 'mdi:magnify' },
]

const reasons = [
  { icon: 'mdi:archive', title: 'Bảo Tồn Vĩnh Cửu', desc: 'Dữ liệu được lưu trữ trên cụm đám mây an toàn, tránh mục nát theo thời gian.' },
  { icon: 'mdi:account-group', title: 'Kết Nối Thế Hệ', desc: 'Thế hệ trẻ học lịch sử sống từ chính tư liệu do gia đình bạn đóng góp.' },
  { icon: 'mdi:medal-outline', title: 'Ghi Danh Tôn Vinh', desc: 'Tên tuổi và vai trò hiến tặng của bạn được hiển thị vinh dự trên cổng thông tin.' },
]

async function handleSubmit() {
  isSubmitting.value = true
  await new Promise((r) => setTimeout(r, 1500))
  isSubmitting.value = false
  isSubmitted.value = true
  Object.assign(form, { name: '', title: '', content: '', heritageId: '' })
  setTimeout(() => {
    isSubmitted.value = false
    currentStep.value = 1
  }, 4000)
}
</script>

<style scoped>
.fade-in-up-enter-active { transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.fade-in-up-enter-from { opacity: 0; transform: translateY(10px); }
</style>

