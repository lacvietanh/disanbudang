<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory pt-[72px]">
    <!-- Header -->
    <div class="bg-dark-earth border-b border-charcoal-850 py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Trải Nghiệm & Cộng Đồng</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-none mb-5">
          Khám Phá &<br/><span class="text-gradient-gold">Giao Lưu Di Sản</span>
        </h1>
        <p class="text-charcoal-350 text-base max-w-2xl leading-relaxed">
          Không gian tương tác, học hỏi và đóng góp. Nơi gìn giữ những câu chuyện vụn vặt, ký ức chân thực, những bức tranh vẽ hay ảnh tư liệu quý báu về đất và người Bù Đăng — được đóng góp bởi chính đồng bào địa phương và các thế hệ học sinh.
        </p>
      </div>
    </div>

    <div class="container-heritage py-14">
      <!-- Filter tabs -->
      <div class="flex items-center gap-2.5 overflow-x-auto scrollbar-none mb-10 border-b border-charcoal-850 pb-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border bg-charcoal-900"
          :class="activeTab === tab.id
            ? 'bg-gold-500 text-charcoal-900 border-transparent shadow-gold'
            : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/50 hover:text-ivory'"
          @click="activeTab = tab.id"
        >
          <Icon :name="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Featured post - large cinematic card -->
      <div v-if="featuredPost && activeTab === 'all'" class="mb-14 reveal">
        <NuxtLink
          :to="`/explore/${featuredPost.id}`"
          class="block group relative overflow-hidden rounded-3xl border border-charcoal-850 aspect-[21/8] min-h-[340px]"
        >
          <img :src="featuredPost.coverImage" :alt="featuredPost.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out-expo group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/60 to-transparent" />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />

          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10 max-w-3xl z-10">
            <BaseBadge variant="gold" class="mb-3.5">{{ typeLabels[featuredPost.type] }}</BaseBadge>
            <h2 class="font-heading font-bold text-ivory text-2xl lg:text-4xl leading-snug mb-3.5 text-shadow-hero group-hover:text-gold-300 transition-colors">
              {{ featuredPost.title }}
            </h2>
            <p class="text-charcoal-300 text-sm leading-relaxed mb-5 line-clamp-2">{{ featuredPost.excerpt }}</p>
            
            <div class="flex items-center gap-4 border-t border-charcoal-800/80 pt-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                  <Icon name="mdi:account-outline" class="w-4 h-4 text-gold-450" />
                </div>
                <div>
                  <span class="text-ivory text-xs font-semibold block leading-tight">{{ featuredPost.author.name }}</span>
                  <span class="text-charcoal-500 text-[10px]">{{ featuredPost.author.role }}</span>
                </div>
              </div>
              <div class="flex items-center gap-1.5 text-charcoal-400 ml-auto bg-charcoal-950/60 border border-charcoal-850 rounded-full px-3 py-1 text-xs">
                <Icon name="mdi:eye-outline" class="w-4 h-4" />
                <span>{{ featuredPost.viewCount ?? 0 }} lượt xem</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Posts grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, i) in filteredPosts"
          :key="post.id"
          :to="`/explore/${post.id}`"
          class="bg-charcoal-950/40 rounded-2xl overflow-hidden shadow-xl border border-charcoal-850 hover:border-gold-500/30 transition-all duration-500 group cursor-pointer reveal flex flex-col justify-between"
          :style="{ animationDelay: `${i * 0.05}s` }"
        >
          <div>
            <div class="aspect-[16/10] overflow-hidden relative border-b border-charcoal-850">
              <img :src="post.coverImage" :alt="post.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 to-transparent" />
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="tag tag-gold text-[9px]">
                  <Icon :name="typeIcons[post.type]" class="w-3.5 h-3.5" />
                  {{ typeLabels[post.type] }}
                </span>
                <div class="flex items-center gap-1 text-charcoal-400 text-xs bg-charcoal-900 border border-charcoal-800 px-2 py-0.5 rounded-full">
                  <Icon name="mdi:eye-outline" class="w-3.5 h-3.5" />
                  <span>{{ post.viewCount ?? 0 }}</span>
                </div>
              </div>
              <h3 class="font-heading font-bold text-ivory text-base leading-snug mb-2.5 line-clamp-2 group-hover:text-gold-300 transition-colors">{{ post.title }}</h3>
              <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-3">{{ post.excerpt }}</p>
            </div>
          </div>

          <div class="p-6 pt-0">
            <div class="border-t border-charcoal-850 pt-4 flex items-center gap-3">
              <div class="w-7 h-7 rounded-full bg-charcoal-900 border border-charcoal-800 flex items-center justify-center shrink-0">
                <Icon name="mdi:account" class="w-4 h-4 text-gold-400" />
              </div>
              <div class="min-w-0">
                <p class="text-ivory text-xs font-semibold truncate leading-tight">{{ post.author.name }}</p>
                <p class="text-charcoal-500 text-[10px] truncate">{{ post.author.role }}{{ post.author.grade ? ` • Lớp ${post.author.grade}` : '' }}</p>
              </div>
            </div>
          </div>
        </NuxtLink>
        <!-- Empty state for filtered tab -->
        <div v-if="filteredPosts.length === 0" class="col-span-full py-24 text-center">
          <Icon name="mdi:book-open-page-variant-outline" class="w-14 h-14 text-charcoal-700 mx-auto mb-4" />
          <p class="text-charcoal-400 font-heading font-semibold text-lg mb-2">Chưa có nội dung trong danh mục này</p>
          <p class="text-charcoal-500 text-sm mb-6">Hãy là người đầu tiên chia sẻ câu chuyện của bạn!</p>
          <NuxtLink to="/contribute" class="btn-primary inline-flex">
            <Icon name="mdi:upload" class="w-4 h-4" />
            Đóng Góp Ngay
          </NuxtLink>
        </div>
      </div>

      <!-- Contribute CTA -->
      <div class="mt-16 text-center reveal">
        <div class="inline-block bg-gradient-to-br from-charcoal-950 to-charcoal-900 border border-charcoal-850 rounded-3xl px-10 py-8 max-w-xl mx-auto shadow-2xl relative">
          <div class="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-xl pointer-events-none" />
          <Icon name="mdi:book-open-page-variant-outline" class="w-10 h-10 text-gold-400 mx-auto mb-3.5" />
          <h3 class="font-heading font-bold text-ivory text-xl mb-2.5">Ký Ức Của Bạn Xứng Đáng Được Kính Trọng</h3>
          <p class="text-charcoal-400 text-sm mb-5 leading-relaxed">Hãy chia sẻ hình ảnh kỷ vật xưa, những ghi chép bản địa hoặc cảm nghĩ riêng của bạn để xây dựng bức tranh di sản sống động.</p>
          <NuxtLink to="/contribute" class="btn-primary inline-flex">
            Gửi Ký Ức Đóng Góp
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MOCK_COMMUNITY_POSTS } from '~/data/mockPosts'
import type { PostType } from '~/types'

definePageMeta({ layout: 'default' })
useSeoMeta({
  title: 'Trải Nghiệm & Cộng Đồng — Di Sản Bù Đăng',
  description: 'Không gian học hỏi, tương tác và lưu giữ các tác phẩm tranh vẽ, ghi chép ký ức chân thực về di sản do người dân Bù Đăng cùng đóng góp.',
})

const route = useRoute()
const activeTab = ref('all')

const { observeAll } = useScrollReveal()
onMounted(() => {
  const tabParam = route.query.tab as string
  if (tabParam && tabs.some((t) => t.id === tabParam)) {
    activeTab.value = tabParam
  }
  nextTick(() => observeAll())
})

const tabs = [
  { id: 'all', label: 'Tất Cả Ký Ức', icon: 'mdi:apps' },
  { id: 'story', label: 'Câu Chuyện', icon: 'mdi:book-open-variant' },
  { id: 'artwork', label: 'Tranh Vẽ', icon: 'mdi:palette' },
  { id: 'photo', label: 'Ảnh Tư Liệu', icon: 'mdi:camera' },
  { id: 'memory', label: 'Ký Ức', icon: 'mdi:heart' },
  { id: 'research', label: 'Khảo Cứu', icon: 'mdi:magnify' },
]

const featuredPost = computed(() => MOCK_COMMUNITY_POSTS.find((p) => p.featured))

const filteredPosts = computed(() => {
  if (activeTab.value === 'all') {
    return MOCK_COMMUNITY_POSTS.filter((p) => !p.featured)
  }
  return MOCK_COMMUNITY_POSTS.filter((p) => p.type === activeTab.value)
})

const typeLabels: Record<PostType, string> = {
  story: 'Câu Chuyện', artwork: 'Tranh Vẽ', photo: 'Ảnh Tư Liệu', memory: 'Ký Ức', research: 'Khảo Cứu',
}
const typeIcons: Record<PostType, string> = {
  story: 'mdi:book-open-variant', artwork: 'mdi:palette', photo: 'mdi:camera', memory: 'mdi:heart', research: 'mdi:magnify',
}
</script>
