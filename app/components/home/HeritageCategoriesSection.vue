<template>
  <section class="bg-dark-earth section relative overflow-hidden">
    <!-- Decorative lines -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
      <div class="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
    </div>

    <div class="container-heritage relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="section-label text-gold-400">Danh Mục Di Sản</span>
        <h2 class="text-display-sm text-ivory mb-5">Khám Phá Theo Chủ Đề</h2>
        <p class="section-desc text-charcoal-400 mx-auto">
          Năm nhóm di sản phản ánh toàn diện bức tranh văn hóa – lịch sử – thiên nhiên của Bù Đăng
        </p>
      </div>

      <!-- Category cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <NuxtLink
          v-for="(cat, i) in categories"
          :key="cat.id"
          :to="`/library?category=${cat.id}`"
          class="group relative overflow-hidden rounded-2xl p-6 cursor-pointer reveal transition-all duration-500 hover:-translate-y-1"
          :style="{
            background: `linear-gradient(135deg, ${cat.color}18, ${cat.color}08)`,
            border: `1px solid ${cat.color}25`,
            animationDelay: `${i * 0.1}s`,
          }"
        >
          <!-- Glow background -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            :style="{ background: `radial-gradient(ellipse at 30% 40%, ${cat.color}20, transparent 70%)` }"
          />

          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
            :style="{ backgroundColor: `${cat.color}20`, border: `1px solid ${cat.color}30` }"
          >
            <Icon :name="cat.icon" class="w-6 h-6" :style="{ color: cat.color }" />
          </div>

          <!-- Content -->
          <h3 class="font-heading font-bold text-ivory text-base leading-tight mb-2">
            {{ cat.label }}
          </h3>
          <p class="text-charcoal-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {{ cat.description }}
          </p>

          <!-- Count -->
          <div class="flex items-center justify-between">
            <span class="text-2xs text-charcoal-500">{{ cat.count }} di sản</span>
            <div
              class="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
              :style="{ backgroundColor: `${cat.color}25` }"
            >
              <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" :style="{ color: cat.color }" />
            </div>
          </div>

          <!-- Bottom accent bar -->
          <div
            class="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :style="{ backgroundColor: cat.color }"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/data/categories'

const categories = CATEGORIES
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))
</script>
