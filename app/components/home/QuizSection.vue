<template>
  <section id="quiz" class="section bg-warm-paper relative overflow-hidden scroll-mt-20">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/4 rounded-full blur-3xl pointer-events-none" />

    <div class="container-heritage relative z-10">
      <!-- Header -->
      <div class="text-center mb-14">
        <span class="section-label">Quiz Khám Phá</span>
        <h2 class="section-title">Thử Thách Hiểu Biết Di Sản</h2>
        <p class="section-desc mx-auto">
          Kiểm tra kiến thức, giành huy hiệu và trở thành Nhà Khám Phá Di Sản Bù Đăng
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <!-- Quiz cards -->
        <div
          v-for="(quiz, i) in quizzes"
          :key="quiz.id"
          class="relative overflow-hidden rounded-2xl bg-ivory border border-beige-200/80 shadow-warm-sm hover:shadow-warm-md transition-all duration-500 group cursor-pointer reveal"
          :style="{ animationDelay: `${i * 0.15}s` }"
          @click="quizStore.startQuiz(quiz)"
        >
          <!-- Color accent top -->
          <div class="h-1.5 w-full" :style="{ background: quizColors[i] ?? '#C9922A' }" />

          <div class="p-6">
            <!-- Badge preview -->
            <div class="flex items-center justify-between mb-5">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center"
                :style="{ background: `${quizColors[i]}18`, border: `1px solid ${quizColors[i]}30` }"
              >
                <Icon :name="quizIcons[i] ?? 'mdi:help-circle'" class="w-6 h-6" :style="{ color: quizColors[i] }" />
              </div>
              <BaseBadge :variant="quizVariants[i]" size="sm">
                {{ quiz.questions.length }} câu hỏi
              </BaseBadge>
            </div>

            <h3 class="font-heading font-bold text-charcoal-800 text-lg leading-tight mb-2 group-hover:text-earth-600 transition-colors">
              {{ quiz.title }}
            </h3>
            <p class="text-charcoal-600 text-sm leading-relaxed mb-5 line-clamp-2">
              {{ quiz.description }}
            </p>

            <!-- Badge earned indicator -->
            <div class="flex items-center justify-between">
              <div v-if="earnedBadge(quiz.badgeId)" class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center">
                  <Icon name="mdi:check" class="w-3.5 h-3.5 text-charcoal-900" />
                </div>
                <span class="text-gold-600 text-xs font-medium">Đã hoàn thành</span>
              </div>
              <div v-else class="text-charcoal-600 text-xs">Chưa làm</div>

              <button
                class="flex items-center gap-1 text-gold-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-gold-500/20 bg-gold-500/5 group-hover:bg-gold-500 group-hover:text-charcoal-900 group-hover:border-transparent transition-all duration-300"
                aria-label="Bắt đầu trả lời câu hỏi"
              >
                Bắt đầu
                <Icon name="mdi:arrow-right" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievement showcase -->
      <div class="bg-charcoal-800 rounded-3xl p-7 lg:p-10 reveal">
        <div class="flex flex-col lg:flex-row items-center gap-8">
          <!-- Badges display -->
          <div class="flex gap-3 flex-wrap justify-center">
            <div
              v-for="badge in badges"
              :key="badge.id"
              class="relative group/badge"
            >
              <div
                class="w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 hover:scale-110"
                :style="{
                  background: `${badge.color}15`,
                  borderColor: `${badge.color}40`,
                  boxShadow: earned(badge.id) ? `0 0 20px ${badge.color}40` : 'none',
                }"
                :class="{ 'opacity-40 grayscale': !earned(badge.id) }"
              >
                <Icon :name="badge.icon" class="w-8 h-8" :style="{ color: badge.color }" />
              </div>
              <!-- Tooltip -->
              <div class="absolute -top-9 left-1/2 -translate-x-1/2 bg-charcoal-950 text-ivory text-[10px] sm:text-xs px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-all duration-300 scale-95 group-hover/badge:scale-100 pointer-events-none z-30 shadow-lg border border-charcoal-700/50">
                {{ badge.name }}
              </div>
            </div>
          </div>

          <!-- Text -->
          <div class="flex-1 text-center lg:text-left">
            <h3 class="font-heading font-bold text-ivory text-2xl mb-3">
              Sưu Tập Huy Hiệu Di Sản
            </h3>
            <p class="text-charcoal-300 text-sm leading-relaxed mb-6 max-w-md">
              Hoàn thành các quiz để giành huy hiệu độc đáo. Mỗi huy hiệu là bằng chứng
              về hành trình khám phá di sản Bù Đăng của bạn.
            </p>
            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button class="btn-primary" @click="quizzes[0] && quizStore.startQuiz(quizzes[0])">
                <Icon name="mdi:play-circle" class="w-4 h-4" />
                Bắt Đầu Quiz
              </button>
              <div class="glass-dark rounded-full px-4 py-2.5 flex items-center gap-2">
                <Icon name="mdi:trophy" class="w-4 h-4 text-gold-400" />
                <span class="text-ivory text-sm font-medium">{{ quizStore.userProgress.totalScore }} điểm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MOCK_QUIZZES, MOCK_BADGES } from '~/data/mockQuiz'

const quizStore = useQuizStore()
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const quizzes = MOCK_QUIZZES.slice(0, 3)
const badges = MOCK_BADGES

const quizColors = ['#8B3A2A', '#2D5016', '#C9922A']
const quizIcons = ['mdi:castle', 'mdi:music-circle', 'mdi:water']
const quizVariants: ('brick' | 'forest' | 'gold')[] = ['brick', 'forest', 'gold']

function earned(badgeId: string) {
  return quizStore.userProgress.earnedBadges.includes(badgeId)
}

function earnedBadge(badgeId?: string) {
  return badgeId && earned(badgeId)
}
</script>
