<template>
  <div v-if="!post" class="min-h-screen flex items-center justify-center bg-charcoal-900 text-ivory pt-[72px]">
    <div class="text-center">
      <Icon name="mdi:alert-circle-outline" class="w-16 h-16 text-gold-500 mx-auto mb-4" />
      <h2 class="font-heading font-bold text-2xl mb-4">Không tìm thấy câu chuyện</h2>
      <NuxtLink to="/community" class="btn-primary inline-flex">Quay lại Cộng Đồng</NuxtLink>
    </div>
  </div>

  <div v-else class="bg-charcoal-900 min-h-screen text-ivory pb-20 pt-[72px]">
    <!-- Header/Hero -->
    <div class="relative h-[55vh] min-h-[400px] flex items-end border-b border-charcoal-850 overflow-hidden">
      <img
        :src="post.coverImage"
        :alt="post.title"
        class="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-[15000ms] ease-out-expo scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 to-transparent" />

      <div class="relative z-10 container-heritage pb-12">
        <nav class="flex items-center gap-2 text-xs text-charcoal-400 mb-6">
          <NuxtLink to="/" class="hover:text-gold-400 transition-colors">Trang Chủ</NuxtLink>
          <Icon name="mdi:chevron-right" class="w-3.5 h-3.5" />
          <NuxtLink to="/community" class="hover:text-gold-400 transition-colors">Cộng Đồng</NuxtLink>
          <Icon name="mdi:chevron-right" class="w-3.5 h-3.5 text-charcoal-550" />
          <span class="text-ivory/60 truncate max-w-[200px] sm:max-w-xs">{{ post.title }}</span>
        </nav>

        <div class="max-w-3xl">
          <BaseBadge variant="gold" class="mb-4">{{ typeLabels[post.type] }}</BaseBadge>
          <h1 class="font-heading font-bold text-ivory text-3xl md:text-4xl lg:text-5xl leading-tight mb-5 text-shadow-hero">
            {{ post.title }}
          </h1>

          <div class="flex flex-wrap gap-4 items-center text-xs text-charcoal-350 bg-charcoal-950/50 backdrop-blur-sm border border-charcoal-800/60 rounded-full px-4 py-2 w-fit">
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:calendar-range" class="w-4 h-4 text-gold-450" />
              {{ post.publishedAt }}
            </span>
            <span class="w-1 h-1 bg-charcoal-700 rounded-full" />
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:heart" class="w-4 h-4 text-brick-500" />
              {{ likesCount }} lượt thích
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-heritage py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Author Profile Sidebar (Desktop) / Header (Mobile) -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-charcoal-950/50 border border-charcoal-850 rounded-3xl p-6 lg:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div class="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-xl pointer-events-none" />
            
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-full bg-gold-500/10 border-2 border-gold-550/30 flex items-center justify-center shrink-0">
                <Icon name="mdi:account" class="w-7 h-7 text-gold-400" />
              </div>
              <div>
                <span class="text-charcoal-450 text-[10px] uppercase tracking-wider block">Người chia sẻ</span>
                <h3 class="font-heading font-bold text-ivory text-lg leading-tight">{{ post.author.name }}</h3>
                <p class="text-charcoal-400 text-xs mt-1">{{ post.author.role }}</p>
              </div>
            </div>

            <div v-if="post.author.school" class="border-t border-charcoal-800/80 pt-4 space-y-2 text-sm text-charcoal-350">
              <div class="flex items-start gap-2.5">
                <Icon name="mdi:school-outline" class="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Trường: <strong>{{ post.author.school }}</strong></span>
              </div>
              <div v-if="post.author.grade" class="flex items-start gap-2.5">
                <Icon name="mdi:google-classroom" class="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Lớp: <strong>{{ post.author.grade }}</strong></span>
              </div>
            </div>

            <!-- Tags -->
            <div class="border-t border-charcoal-800/80 pt-5 mt-5">
              <span class="text-charcoal-450 text-[10px] uppercase tracking-wider block mb-3">Từ khóa bài viết</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="bg-charcoal-900 border border-charcoal-800 text-charcoal-300 rounded-lg px-2.5 py-1 text-2xs hover:border-gold-500/30 transition-colors"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Quick link back to Community -->
          <NuxtLink
            to="/community"
            class="flex items-center justify-center gap-2 w-full py-3.5 border border-charcoal-800 rounded-2xl text-xs font-semibold uppercase tracking-wider text-charcoal-400 hover:text-ivory hover:border-gold-500/50 transition-all duration-300"
          >
            <Icon name="mdi:arrow-left" class="w-4 h-4" />
            Về trang danh sách
          </NuxtLink>
        </div>

        <!-- Essay / Story Text Column -->
        <div class="lg:col-span-8">
          <div class="bg-charcoal-950/20 border border-charcoal-850/60 rounded-3xl p-8 lg:p-12 shadow-xl">
            <!-- Story Header Label -->
            <div class="flex items-center gap-2 mb-8 text-gold-400">
              <Icon name="mdi:book-open-page-variant-outline" class="w-5 h-5" />
              <span class="text-xs uppercase tracking-widest font-semibold">Nội dung câu chuyện</span>
            </div>

            <!-- Story Body -->
            <div class="prose-heritage whitespace-pre-line text-charcoal-250 leading-relaxed text-base md:text-lg">
              {{ post.content || post.excerpt }}
            </div>

            <div class="mt-12 pt-8 border-t border-charcoal-850/80 flex items-center justify-between">
              <button
                class="flex items-center gap-2 bg-charcoal-900 border border-charcoal-800 hover:border-brick-500/50 hover:bg-brick-950/10 text-charcoal-300 hover:text-ivory rounded-full px-5 py-2.5 text-xs transition-all duration-300"
                @click="likePost"
              >
                <Icon name="mdi:heart" :class="isLiked ? 'text-brick-500' : 'text-charcoal-500'" class="w-4 h-4 transition-colors" />
                <span>{{ isLiked ? 'Đã thích' : 'Thích bài viết' }} ({{ likesCount }})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MOCK_COMMUNITY_POSTS } from '~/data/mockPosts'
import type { PostType } from '~/types'

definePageMeta({ layout: 'default' })

const route = useRoute()
const id = computed(() => route.params.id as string)

const post = computed(() => MOCK_COMMUNITY_POSTS.find(p => p.id === id.value) || null)

const isLiked = ref(false)
const likesCount = ref(0)

watchEffect(() => {
  if (post.value) {
    likesCount.value = post.value.likes
  }
})

const typeLabels: Record<PostType, string> = {
  story: 'Câu Chuyện', artwork: 'Tranh Vẽ', photo: 'Ảnh Tư Liệu', memory: 'Ký Ức', research: 'Khảo Cứu',
}

function likePost() {
  if (!post.value) return
  if (!isLiked.value) {
    likesCount.value++
    isLiked.value = true
  } else {
    likesCount.value--
    isLiked.value = false
  }
}

useSeoMeta({
  title: () => post.value ? `${post.value.title} — Ký Ức Bù Đăng` : 'Không tìm thấy câu chuyện',
  description: () => post.value ? post.value.excerpt : '',
})
</script>

<style scoped>
.prose-heritage {
  font-size: 1.1rem;
  line-height: 1.85;
}
</style>
