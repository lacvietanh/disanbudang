<template>
  <section class="relative py-24 overflow-hidden" id="danh-gia-du-an">
    <!-- Background decoration -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(212,175,55,0.04),transparent)]" />
    </div>

    <div class="mx-auto max-w-4xl px-6 lg:px-10">

      <!-- Section header -->
      <div class="text-center mb-14">
        <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500/70 mb-3">Phản hồi cộng đồng</p>
        <h2 class="font-heading font-bold text-3xl md:text-4xl text-ivory mb-4">Đánh Giá Dự Án</h2>
        <p class="text-charcoal-400 text-sm leading-relaxed max-w-xl mx-auto">
          Chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện nền tảng số di sản địa phương
        </p>
      </div>

      <!-- Stats summary (only shown when there are ratings) -->
      <Transition name="fade-up">
        <div v-if="stats && stats.total > 0" class="flex flex-col sm:flex-row items-center justify-center gap-8 mb-14">
          <!-- Big average -->
          <div class="flex flex-col items-center">
            <span class="font-heading font-bold text-7xl text-ivory tabular-nums leading-none">{{ stats.avgStars?.toFixed(1) ?? '–' }}</span>
            <div class="flex gap-1 mt-3 mb-1.5">
              <Icon
                v-for="s in 5"
                :key="s"
                :name="s <= Math.round(stats.avgStars ?? 0) ? 'mdi:star' : 'mdi:star-outline'"
                class="w-5 h-5 transition-colors"
                :class="s <= Math.round(stats.avgStars ?? 0) ? 'text-gold-400' : 'text-charcoal-700'"
              />
            </div>
            <span class="text-xs text-charcoal-500">{{ stats.total }} đánh giá</span>
          </div>

          <!-- Divider -->
          <div class="hidden sm:block w-px h-24 bg-charcoal-800" />

          <!-- Breakdown bars -->
          <div class="flex flex-col gap-2 w-full sm:max-w-xs">
            <div v-for="b in breakdownFull" :key="b.stars" class="flex items-center gap-2.5">
              <span class="text-xs text-charcoal-500 w-3 shrink-0">{{ b.stars }}</span>
              <Icon name="mdi:star" class="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
              <div class="flex-1 h-1.5 rounded-full bg-charcoal-800 overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700 ease-out"
                  :style="{ width: `${b.pct}%` }"
                />
              </div>
              <span class="text-xs text-charcoal-600 w-6 text-right shrink-0">{{ b.count }}</span>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Rating form -->
      <div class="bg-charcoal-900/60 border border-charcoal-800/60 rounded-3xl p-8 md:p-10 backdrop-blur-sm mb-12">
        <h3 class="font-heading font-semibold text-ivory text-lg mb-6 text-center">
          {{ submitted ? '✨ Cảm ơn bạn đã đánh giá!' : 'Gửi Đánh Giá Của Bạn' }}
        </h3>

        <!-- Star picker -->
        <div class="flex justify-center gap-2 mb-6">
          <button
            v-for="s in 5"
            :key="s"
            class="w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
            :aria-label="`${s} sao`"
            :disabled="submitting"
            @click="selectedStars = s"
            @mouseenter="hoverStars = s"
            @mouseleave="hoverStars = 0"
          >
            <Icon
              :name="s <= (hoverStars || selectedStars) ? 'mdi:star' : 'mdi:star-outline'"
              class="w-8 h-8 transition-all duration-150"
              :class="s <= (hoverStars || selectedStars)
                ? 'text-gold-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                : 'text-charcoal-600 hover:text-charcoal-400'"
            />
          </button>
        </div>

        <!-- Star label -->
        <p class="text-center text-xs text-charcoal-500 h-4 mb-6 transition-all duration-200">
          {{ starLabel }}
        </p>

        <!-- Comment textarea -->
        <div class="mb-6">
          <label class="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-2">
            Nhận xét (tuỳ chọn · tối đa 500 ký tự)
          </label>
          <textarea
            v-model="comment"
            rows="3"
            maxlength="500"
            placeholder="Bạn thấy nền tảng này hữu ích ở điểm nào? Có thể cải thiện gì thêm?…"
            :disabled="submitting || submitted"
            class="w-full px-4 py-3 bg-charcoal-950/60 border border-charcoal-700/60 rounded-2xl text-ivory text-sm placeholder-charcoal-600 focus:outline-none focus:border-gold-500/50 resize-none transition-colors disabled:opacity-50"
          />
          <p class="text-right text-[10px] text-charcoal-700 mt-1">{{ comment.length }}/500</p>
        </div>

        <!-- Submit -->
        <div class="flex justify-center">
          <button
            class="relative flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300"
            :class="submitted
              ? 'bg-green-900/40 border border-green-700/50 text-green-400 cursor-default'
              : 'bg-gold-500 hover:bg-gold-400 text-charcoal-950 hover:shadow-lg hover:shadow-gold-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'"
            :disabled="submitting || submitted || selectedStars === 0"
            @click="submitRating"
          >
            <Icon v-if="submitting" name="mdi:loading" class="w-4 h-4 animate-spin" />
            <Icon v-else-if="submitted" name="mdi:check-circle-outline" class="w-4 h-4" />
            <Icon v-else name="mdi:send-outline" class="w-4 h-4" />
            {{ submitted ? 'Đã gửi thành công' : 'Gửi Đánh Giá' }}
          </button>
        </div>

        <!-- Error -->
        <p v-if="errorMsg" class="text-center text-red-400 text-xs mt-4">{{ errorMsg }}</p>
      </div>

      <!-- Latest comments -->
      <Transition name="fade-up">
        <div v-if="comments.length > 0">
          <h3 class="font-heading font-semibold text-ivory/80 text-base mb-5 flex items-center gap-2">
            <Icon name="mdi:comment-multiple-outline" class="w-4.5 h-4.5 text-gold-500/60" />
            Nhận xét gần đây
          </h3>
          <div class="space-y-3">
            <div
              v-for="(c, i) in comments"
              :key="i"
              class="bg-charcoal-900/40 border border-charcoal-800/40 rounded-2xl px-5 py-4 hover:border-charcoal-700/60 transition-colors"
            >
              <div class="flex items-center gap-2 mb-2">
                <div class="flex gap-0.5">
                  <Icon
                    v-for="s in 5"
                    :key="s"
                    :name="s <= c.stars ? 'mdi:star' : 'mdi:star-outline'"
                    class="w-3.5 h-3.5"
                    :class="s <= c.stars ? 'text-gold-400' : 'text-charcoal-700'"
                  />
                </div>
                <span class="text-[10px] text-charcoal-600 ml-auto">{{ formatDate(c.created_at) }}</span>
              </div>
              <p class="text-charcoal-300 text-sm leading-relaxed">{{ c.comment }}</p>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </section>
</template>

<script setup lang="ts">
interface RatingStats {
  avgStars: number | null
  total: number
  breakdown: Array<{ stars: number; count: number }>
  comments: Array<{ stars: number; comment: string; created_at: string }>
}

// ── State ──
const selectedStars = ref(0)
const hoverStars = ref(0)
const comment = ref('')
const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

// ── Data ──
const { data } = await useFetch<RatingStats>('/api/ratings')
const stats = computed(() => data.value)

const comments = computed(() => data.value?.comments ?? [])

// Breakdown with percentages (5 → 1 order)
const breakdownFull = computed(() => {
  const total = stats.value?.total ?? 0
  const map = new Map((stats.value?.breakdown ?? []).map(b => [b.stars, b.count]))
  return [5, 4, 3, 2, 1].map(s => ({
    stars: s,
    count: map.get(s) ?? 0,
    pct: total > 0 ? Math.round(((map.get(s) ?? 0) / total) * 100) : 0,
  }))
})

// ── Star labels ──
const STAR_LABELS = ['', 'Không hài lòng', 'Tạm được', 'Khá tốt', 'Rất tốt', 'Xuất sắc!']
const starLabel = computed(() =>
  STAR_LABELS[hoverStars.value || selectedStars.value] ?? ''
)

// ── Submit ──
async function submitRating() {
  if (selectedStars.value === 0 || submitting.value || submitted.value) return
  submitting.value = true
  errorMsg.value = ''

  try {
    await $fetch('/api/ratings', {
      method: 'POST',
      body: {
        stars: selectedStars.value,
        comment: comment.value.trim() || undefined,
      },
    })
    submitted.value = true
    // Refresh stats
    await refreshNuxtData()
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string } }
    errorMsg.value = err?.data?.statusMessage ?? 'Có lỗi xảy ra, vui lòng thử lại.'
  }
  finally {
    submitting.value = false
  }
}

// ── Format date ──
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}
</script>

<style scoped>
.fade-up-enter-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up-enter-from  { opacity: 0; transform: translateY(16px); }
</style>
