<template>
  <section class="section bg-warm-paper relative">
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-forest-500/5 rounded-full blur-3xl pointer-events-none" />

    <div class="container-heritage relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-label">Di Sản Trong Tôi</span>
        <h2 class="section-title">Ký Ức Cộng Đồng</h2>
        <p class="section-desc mx-auto">
          Những câu chuyện, tranh vẽ và hình ảnh được chia sẻ bởi học sinh, người dân và du khách — kho lưu trữ sống động của cộng đồng
        </p>
      </div>

      <!-- Magazine Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Main story -->
        <div v-if="posts[0]" class="lg:col-span-7 reveal">
          <NuxtLink :to="`/explore`" class="group block">
            <div class="relative overflow-hidden rounded-3xl aspect-[16/10]">
              <img
                :src="posts[0].coverImage"
                :alt="posts[0].title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-cinematic" />

              <!-- Tag -->
              <div class="absolute top-5 left-5">
                <span class="tag tag-gold">
                  <Icon :name="typeIcons[posts[0].type]" class="w-3 h-3" />
                  {{ typeLabels[posts[0].type] }}
                </span>
              </div>

              <div class="absolute bottom-0 left-0 right-0 p-7">
                <p class="font-accent italic text-gold-300 text-sm mb-2">{{ posts[0].author.name }} • {{ posts[0].author.role }}</p>
                <h3 class="font-heading font-bold text-ivory text-2xl lg:text-3xl leading-tight mb-3 text-shadow-hero">
                  {{ posts[0].title }}
                </h3>
                <p class="text-ivory/70 text-sm leading-relaxed line-clamp-2">{{ posts[0].excerpt }}</p>

                <div class="flex items-center gap-4 mt-4">
                  <div class="flex items-center gap-1.5 text-gold-400 text-sm">
                    <Icon name="mdi:heart" class="w-4 h-4" />
                    <span>{{ posts[0].likes }}</span>
                  </div>
                  <div class="flex gap-1.5">
                    <span v-for="tag in posts[0].tags.slice(0,2)" :key="tag"
                      class="text-2xs text-ivory/50 bg-ivory/10 px-2 py-0.5 rounded-full">#{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Side stories -->
        <div class="lg:col-span-5 space-y-5">
          <NuxtLink
            v-for="post in posts.slice(1, 4)"
            :key="post.id"
            to="/explore"
            class="group flex gap-4 p-4 rounded-2xl border border-transparent hover:bg-earth-50 hover:border-earth-200/80 hover:shadow-sm transition-all duration-200 reveal"
          >
            <div class="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img
                :src="post.coverImage"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div class="flex-1 min-w-0">
              <span class="tag tag-earth mb-2 inline-flex">
                <Icon :name="typeIcons[post.type]" class="w-3 h-3" />
                {{ typeLabels[post.type] }}
              </span>
              <h4 class="font-heading font-semibold text-charcoal-800 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-earth-600 transition-colors">
                {{ post.title }}
              </h4>
              <p class="text-charcoal-500 text-xs">{{ post.author.name }} • {{ post.author.role }}</p>
            </div>
          </NuxtLink>

          <!-- CTA -->
          <div class="pt-2">
            <NuxtLink
              to="/explore"
              class="flex items-center justify-center gap-2 py-4 border border-earth-200 rounded-2xl text-earth-600 font-medium text-sm hover:bg-earth-50 hover:border-earth-300 transition-all duration-300"
            >
              <Icon name="mdi:account-group-outline" class="w-4 h-4" />
              Xem Tất Cả Câu Chuyện
              <Icon name="mdi:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Contribution prompt -->
      <div class="mt-10 p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-earth-800 to-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-6 reveal relative overflow-hidden">
        <!-- Glow decor -->
        <div class="absolute top-0 right-0 w-48 h-48 bg-gold-500/8 rounded-full blur-2xl pointer-events-none" />
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-earth-600/10 rounded-full blur-xl pointer-events-none" />
        <div class="relative text-center md:text-left">
          <h3 class="font-heading font-bold text-ivory text-xl mb-1">Bạn có câu chuyện muốn chia sẻ?</h3>
          <p class="text-charcoal-300 text-sm">Ký ức của bạn là một phần không thể thiếu của di sản cộng đồng</p>
        </div>
        <NuxtLink to="/contribute" class="btn-primary flex-shrink-0 relative">
          <Icon name="mdi:plus" class="w-4 h-4" />
          Chia Sẻ Ký Ức
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MOCK_COMMUNITY_POSTS } from '~/data/mockPosts'
import type { PostType } from '~/types'

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const posts = MOCK_COMMUNITY_POSTS.filter((p) => p.featured || true).slice(0, 4)

const typeLabels: Record<PostType, string> = {
  story: 'Câu Chuyện',
  artwork: 'Tranh Vẽ',
  photo: 'Ảnh',
  memory: 'Ký Ức',
  research: 'Nghiên Cứu',
}

const typeIcons: Record<PostType, string> = {
  story: 'mdi:book-open-variant',
  artwork: 'mdi:palette',
  photo: 'mdi:camera',
  memory: 'mdi:heart',
  research: 'mdi:magnify',
}
</script>
