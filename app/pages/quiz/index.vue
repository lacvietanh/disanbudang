<template>
  <div class="bg-ivory min-h-screen pt-[72px]">
    <!-- Quiz not active -->
    <div v-if="!quizStore.isQuizActive && !quizStore.isQuizCompleted">
      <!-- Header -->
      <div class="bg-dark-earth py-20 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />
        <div class="container-heritage relative z-10">
          <span class="section-label text-gold-400">Gamified Learning</span>
          <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-none mb-5">
            Quiz Khám Phá<br/> <span class="text-gradient-gold">Di Sản</span>
          </h1>
          <p class="text-charcoal-300 text-lg max-w-xl">
            Thử thách kiến thức, giành huy hiệu và trở thành Nhà Khám Phá Di Sản Bù Đăng đích thực
          </p>
        </div>
      </div>

      <div class="container-heritage py-16">
        <!-- Progress overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div
            v-for="stat in progressStats"
            :key="stat.label"
            class="bg-white rounded-2xl p-5 text-center shadow-card"
          >
            <Icon :name="stat.icon" class="w-7 h-7 mx-auto mb-2" :class="stat.colorClass" />
            <p class="font-heading font-bold text-charcoal-800 text-2xl">{{ stat.value }}</p>
            <p class="text-charcoal-400 text-xs mt-0.5">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Quiz cards -->
        <h2 class="font-heading font-bold text-charcoal-800 text-2xl mb-7">Chọn Quiz</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          <div
            v-for="(quiz, i) in quizStore.quizzes"
            :key="quiz.id"
            class="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group cursor-pointer reveal"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="h-2 w-full" :style="{ background: getQuizColor(quiz.heritageId, i) }" />
            <div class="p-6">
              <div class="flex items-center gap-4 mb-5">
                <div
                  class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  :style="{ background: `${getQuizColor(quiz.heritageId, i)}15`, border: `1px solid ${getQuizColor(quiz.heritageId, i)}25` }"
                >
                  <Icon :name="getQuizIcon(quiz.heritageId, i)" class="w-7 h-7" :style="{ color: getQuizColor(quiz.heritageId, i) }" />
                </div>
                <div>
                  <h3 class="font-heading font-bold text-charcoal-800 text-lg leading-tight">{{ quiz.title }}</h3>
                  <p class="text-charcoal-400 text-sm">{{ quiz.questions.length }} câu hỏi</p>
                </div>
              </div>

              <p class="text-charcoal-500 text-sm leading-relaxed mb-6">{{ quiz.description }}</p>

              <!-- Last result -->
              <div v-if="lastResult(quiz.id)" class="mb-4 p-3 rounded-xl bg-beige-100 flex items-center gap-3">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-600" />
                <div>
                  <p class="text-charcoal-700 text-sm font-medium">
                    Đạt {{ lastResult(quiz.id)!.score }}/{{ lastResult(quiz.id)!.total }} điểm
                  </p>
                  <p class="text-charcoal-400 text-xs">Đã hoàn thành</p>
                </div>
              </div>

              <button
                class="w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 group-hover:shadow-warm"
                :style="{ backgroundColor: getQuizColor(quiz.heritageId, i), color: '#FDFAF3' }"
                @click="startQuiz(quiz)"
              >
                {{ lastResult(quiz.id) ? 'Làm Lại' : 'Bắt Đầu Quiz' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Badges -->
        <div class="bg-charcoal-800 rounded-3xl p-8">
          <h2 class="font-heading font-bold text-ivory text-2xl mb-7">Bộ Sưu Tập Huy Hiệu</h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              v-for="badge in quizStore.badges"
              :key="badge.id"
              class="text-center p-4 rounded-2xl border transition-all duration-300"
              :class="isEarned(badge.id)
                ? 'border-gold-500/40 bg-gold-500/10'
                : 'border-charcoal-700 opacity-50 grayscale'"
            >
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                :style="{ backgroundColor: `${badge.color}20` }"
              >
                <Icon :name="badge.icon" class="w-7 h-7" :style="{ color: badge.color }" />
              </div>
              <p class="font-heading font-bold text-ivory text-sm leading-tight mb-1">{{ badge.name }}</p>
              <p class="text-charcoal-400 text-xs">{{ badge.description }}</p>
              <div class="mt-2">
                <span
                  class="text-2xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                  :style="{ color: badge.color, backgroundColor: `${badge.color}20` }"
                >{{ rarityLabels[badge.rarity] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz active -->
    <div v-else-if="quizStore.isQuizActive && quizStore.currentQuestion" class="min-h-screen bg-dark-earth flex items-center py-20">
      <div class="container-narrow">
        <!-- Progress -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <span class="text-charcoal-400 text-sm">Câu {{ quizStore.currentQuestionIndex + 1 }} / {{ quizStore.totalQuestions }}</span>
            <button class="text-charcoal-400 hover:text-ivory text-sm flex items-center gap-1 transition-colors" @click="quizStore.resetQuiz()">
              <Icon name="mdi:close" class="w-4 h-4" />
              Thoát
            </button>
          </div>
          <div class="h-2 bg-charcoal-800 rounded-full">
            <div
              class="h-full bg-gradient-gold rounded-full transition-all duration-500"
              :style="{ width: `${quizStore.progressPercent}%` }"
            />
          </div>
        </div>

        <!-- Question card -->
        <div class="bg-charcoal-800 rounded-3xl p-8 mb-6">
          <p class="text-charcoal-400 text-sm mb-4">{{ quizStore.currentQuiz?.title }}</p>
          <h2 class="font-heading font-bold text-ivory text-2xl leading-tight mb-8">
            {{ quizStore.currentQuestion.question }}
          </h2>

          <div class="space-y-3">
            <button
              v-for="(option, i) in quizStore.currentQuestion.options"
              :key="i"
              class="w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium"
              :class="getOptionClass(i)"
              @click="selectAnswer(i)"
            >
              <span class="flex items-center gap-3">
                <span
                  class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border"
                  :class="getIndexClass(i)"
                >
                  {{ String.fromCharCode(65 + i) }}
                </span>
                {{ option }}
              </span>
            </button>
          </div>

          <!-- Explanation -->
          <Transition name="fade-in-up">
            <div v-if="showExplanation && quizStore.currentQuestion.explanation" class="mt-6 p-4 rounded-xl bg-forest-900/40 border border-forest-600/30">
              <p class="text-green-300 text-sm font-medium mb-1 flex items-center gap-2">
                <Icon name="mdi:lightbulb-on" class="w-4 h-4" />
                Giải thích
              </p>
              <p class="text-charcoal-200 text-sm">{{ quizStore.currentQuestion.explanation }}</p>
            </div>
          </Transition>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between">
          <button
            v-if="quizStore.currentQuestionIndex > 0"
            class="btn-ghost text-sm"
            @click="quizStore.prevQuestion()"
          >
            <Icon name="mdi:arrow-left" class="w-4 h-4" />
            Câu trước
          </button>
          <div v-else />
          <button
            v-if="selectedAnswerIndex !== null"
            class="btn-primary"
            @click="nextQuestion"
          >
            {{ quizStore.currentQuestionIndex === quizStore.totalQuestions - 1 ? 'Xem Kết Quả' : 'Câu Tiếp' }}
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Quiz completed -->
    <div v-else-if="quizStore.isQuizCompleted" class="min-h-screen bg-dark-earth flex items-center py-20">
      <div class="container-narrow text-center">
        <div
          class="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
          :class="scorePercent >= 60 ? 'bg-gold-500' : 'bg-charcoal-700'"
        >
          <Icon
            :name="scorePercent >= 60 ? 'mdi:trophy' : 'mdi:refresh'"
            class="w-12 h-12"
            :class="scorePercent >= 60 ? 'text-charcoal-900' : 'text-charcoal-400'"
          />
        </div>
        <h1 class="font-heading font-bold text-ivory text-4xl mb-3">
          {{ scorePercent >= 80 ? 'Xuất Sắc!' : scorePercent >= 60 ? 'Tốt Lắm!' : 'Cố Gắng Hơn!' }}
        </h1>
        <p class="text-charcoal-300 text-lg mb-2">
          Bạn đạt <span class="text-gold-400 font-bold">{{ quizStore.currentScore }}</span> / {{ quizStore.totalQuestions }} điểm
        </p>
        <p class="text-charcoal-400 text-sm mb-8">{{ Math.round(scorePercent) }}% câu đúng</p>

        <!-- Earned badge -->
        <div v-if="lastQuizResult?.badgeEarned" class="mb-8 p-5 bg-gold-500/10 border border-gold-500/30 rounded-2xl inline-block">
          <p class="text-gold-400 text-sm mb-2">🎉 Bạn đã giành được huy hiệu!</p>
          <p class="font-heading font-bold text-ivory text-lg">
            {{ quizStore.badges.find(b => b.id === lastQuizResult!.badgeEarned)?.name }}
          </p>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
          <button class="btn-primary" @click="quizStore.resetQuiz()">
            Quay Lại Danh Sách
          </button>
          <NuxtLink to="/library" class="btn-ghost">
            Khám Phá Di Sản
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeritageQuiz } from '~/types'

definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Quiz Khám Phá Di Sản Bù Đăng', description: 'Kiểm tra kiến thức về di sản Bù Đăng.' })

const quizStore = useQuizStore()
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const heritageStore = useHeritageStore()

const quizColors = ['#8B3A2A', '#2D5016', '#C9922A', '#6B4C35', '#B87333']
const quizIcons = ['mdi:castle', 'mdi:music-circle', 'mdi:water']

function getQuizColor(heritageId: string, index: number): string {
  const heritage = heritageStore.getById(heritageId)
  if (!heritage) return quizColors[index % quizColors.length] || '#8B3A2A'
  const map: Record<string, string> = {
    'lich-su': '#8B3A2A',
    'danh-thang': '#2D5016',
    'van-hoa-phi-vat-the': '#C9922A',
    'doi-song-cong-dong': '#6B4C35',
    'giao-duc-truyen-thong': '#B87333',
  }
  return map[heritage.category] ?? quizColors[index % quizColors.length] ?? '#8B3A2A'
}

function getQuizIcon(heritageId: string, index: number): string {
  const heritage = heritageStore.getById(heritageId)
  if (!heritage) return quizIcons[index % quizIcons.length] || 'mdi:help-circle'
  const map: Record<string, string> = {
    'lich-su': 'mdi:shield-outline',
    'danh-thang': 'mdi:image-filter-hdr',
    'van-hoa-phi-vat-the': 'mdi:music-clef-treble',
    'doi-song-cong-dong': 'mdi:home-group',
    'giao-duc-truyen-thong': 'mdi:school',
  }
  return map[heritage.category] ?? quizIcons[index % quizIcons.length] ?? 'mdi:help-circle'
}

const selectedAnswerIndex = ref<number | null>(null)
const showExplanation = ref(false)

const scorePercent = computed(() =>
  quizStore.totalQuestions > 0 ? (quizStore.currentScore / quizStore.totalQuestions) * 100 : 0,
)
const lastQuizResult = computed(() =>
  quizStore.currentQuiz ? quizStore.getLastResult(quizStore.currentQuiz.id) : null,
)

const progressStats = computed(() => [
  { icon: 'mdi:check-circle', value: quizStore.userProgress.completedQuizzes.length, label: 'Quiz Hoàn Thành', colorClass: 'text-green-500' },
  { icon: 'mdi:trophy', value: quizStore.userProgress.totalScore, label: 'Tổng Điểm', colorClass: 'text-gold-500' },
  { icon: 'mdi:shield-star', value: quizStore.userProgress.earnedBadges.length, label: 'Huy Hiệu', colorClass: 'text-brick-500' },
  { icon: 'mdi:map-marker-check', value: quizStore.userProgress.visitedHeritages.length, label: 'Di Sản Đã Xem', colorClass: 'text-forest-500' },
])

const rarityLabels: Record<string, string> = {
  common: 'Phổ Thông', rare: 'Quý Hiếm', epic: 'Đặc Biệt', legendary: 'Huyền Thoại',
}

function startQuiz(quiz: HeritageQuiz) {
  selectedAnswerIndex.value = null
  showExplanation.value = false
  quizStore.startQuiz(quiz)
}

function selectAnswer(index: number) {
  if (selectedAnswerIndex.value !== null) return
  selectedAnswerIndex.value = index
  const q = quizStore.currentQuestion
  if (q) {
    quizStore.answerQuestion(q.id, index)
    showExplanation.value = true
  }
}

function nextQuestion() {
  selectedAnswerIndex.value = null
  showExplanation.value = false
  quizStore.nextQuestion()
}

function getOptionClass(i: number) {
  const q = quizStore.currentQuestion
  if (!q || selectedAnswerIndex.value === null) {
    return 'border-charcoal-700 bg-charcoal-800/50 text-charcoal-200 hover:border-gold-500/50 hover:bg-charcoal-800'
  }
  if (i === q.correctIndex) return 'border-green-500 bg-green-500/10 text-green-300'
  if (i === selectedAnswerIndex.value && i !== q.correctIndex) return 'border-red-500 bg-red-500/10 text-red-300'
  return 'border-charcoal-700 bg-charcoal-800/30 text-charcoal-500'
}

function getIndexClass(i: number) {
  const q = quizStore.currentQuestion
  if (!q || selectedAnswerIndex.value === null) return 'border-charcoal-600 text-charcoal-400'
  if (i === q.correctIndex) return 'border-green-500 text-green-400 bg-green-500/10'
  if (i === selectedAnswerIndex.value) return 'border-red-500 text-red-400'
  return 'border-charcoal-700 text-charcoal-600'
}

function isEarned(badgeId: string) {
  return quizStore.userProgress.earnedBadges.includes(badgeId)
}

function lastResult(quizId: string) {
  return quizStore.getLastResult(quizId)
}
</script>

<style scoped>
.fade-in-up-enter-active { transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.fade-in-up-enter-from { opacity: 0; transform: translateY(10px); }
</style>
