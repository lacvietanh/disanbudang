<template>
  <div class="bg-ivory min-h-screen">
    <!-- Hero -->
    <div class="bg-dark-earth py-20 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gold-500/6 rounded-full blur-3xl" />
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Liên Hệ</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-none mb-4">
          Kết Nối<br/><span class="text-gradient-gold">Với Chúng Tôi</span>
        </h1>
        <p class="text-charcoal-300 text-lg max-w-xl">
          Có thắc mắc, đề xuất hoặc muốn hợp tác? Chúng tôi luôn sẵn lòng lắng nghe
        </p>
      </div>
    </div>

    <div class="container-heritage py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact info -->
        <div class="space-y-6">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="flex gap-4 p-5 bg-white rounded-2xl shadow-card reveal"
          >
            <div class="w-11 h-11 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
              <Icon :name="info.icon" class="w-5 h-5 text-gold-500" />
            </div>
            <div>
              <p class="text-charcoal-400 text-xs uppercase tracking-wider mb-1">{{ info.label }}</p>
              <p class="font-medium text-charcoal-800 text-sm">{{ info.value }}</p>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="bg-charcoal-800 rounded-2xl aspect-video flex items-center justify-center reveal">
            <div class="text-center">
              <Icon name="mdi:map-marker" class="w-10 h-10 text-gold-400 mx-auto mb-2" />
              <h3 class="text-white text-lg font-bold font-heading">Địa Chỉ</h3>
              <p class="text-charcoal-300 text-sm">Huyện Bù Đăng, Tỉnh Bình Phước</p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="lg:col-span-2">
          <form class="space-y-6 bg-white rounded-3xl p-8 shadow-card reveal" @submit.prevent="handleSubmit">
            <h2 class="font-heading font-bold text-charcoal-800 text-2xl mb-2">Gửi Tin Nhắn</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-charcoal-600 text-sm font-medium mb-2" for="c-name">Họ Tên *</label>
                <input id="c-name" v-model="form.name" type="text" required placeholder="Nguyễn Văn A"
                  class="w-full px-4 py-3 border border-beige-200 rounded-xl text-charcoal-800 focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
              <div>
                <label class="block text-charcoal-600 text-sm font-medium mb-2" for="c-email">Email *</label>
                <input id="c-email" v-model="form.email" type="email" required placeholder="email@example.com"
                  class="w-full px-4 py-3 border border-beige-200 rounded-xl text-charcoal-800 focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
            </div>

            <div>
              <label class="block text-charcoal-600 text-sm font-medium mb-2" for="c-subject">Chủ Đề</label>
              <select id="c-subject" v-model="form.subject"
                class="w-full px-4 py-3 border border-beige-200 rounded-xl text-charcoal-800 focus:outline-none focus:border-gold-500 transition-colors bg-white">
                <option value="general">Thắc mắc chung</option>
                <option value="contribute">Đóng góp tư liệu</option>
                <option value="partnership">Hợp tác</option>
                <option value="media">Truyền thông</option>
                <option value="bug">Báo lỗi kỹ thuật</option>
              </select>
            </div>

            <div>
              <label class="block text-charcoal-600 text-sm font-medium mb-2" for="c-message">Nội Dung *</label>
              <textarea id="c-message" v-model="form.message" required rows="5" placeholder="Nội dung tin nhắn..."
                class="w-full px-4 py-3 border border-beige-200 rounded-xl text-charcoal-800 focus:outline-none focus:border-gold-500 transition-colors resize-none" />
            </div>

            <button type="submit" class="btn-primary w-full justify-center py-4 text-base" :disabled="isSubmitting">
              <Icon :name="isSubmitting ? 'mdi:loading' : 'mdi:send'" class="w-5 h-5" :class="{ 'animate-spin': isSubmitting }" />
              {{ isSubmitting ? 'Đang Gửi...' : 'Gửi Tin Nhắn' }}
            </button>

            <Transition name="fade">
              <div v-if="submitted" class="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                <Icon name="mdi:check-circle" class="w-6 h-6 text-green-600 flex-shrink-0" />
                <p class="text-green-700 text-sm font-medium">Cảm ơn! Chúng tôi sẽ phản hồi trong 1–3 ngày làm việc.</p>
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Liên Hệ — Di Sản Bù Đăng', description: 'Liên hệ với dự án Di Sản Bù Đăng.' })

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const form = reactive({ name: '', email: '', subject: 'general', message: '' })
const isSubmitting = ref(false)
const submitted = ref(false)

const contactInfo = [
  { icon: 'mdi:map-marker-outline', label: 'Địa Chỉ', value: 'Huyện Bù Đăng, Tỉnh Bình Phước' },
  { icon: 'mdi:email-outline', label: 'Email', value: 'nguyenxuankiet294@gmail.com' },
]

async function handleSubmit() {
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 1500))
  isSubmitting.value = false
  submitted.value = true
  Object.assign(form, { name: '', email: '', message: '' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
