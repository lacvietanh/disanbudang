<template>
  <div>
    <!-- 1. Giới thiệu -->
    <HeroSection />
    <StorytellingIntro />

    <!-- 2. Điểm nổi bật -->
    <FeaturedHeritage />

    <!-- 3. Trải nghiệm Bản đồ -->
    <MapPreviewSection />

    <!-- 4. Kêu gọi đóng góp di sản -->
    <ContributionCTA />
  </div>
</template>

<script setup lang="ts">
useMuseumSeo({
  description: 'Khám phá di sản văn hóa, lịch sử và thiên nhiên Huyện Bù Đăng, Tỉnh Bình Phước qua không gian số hiện đại — hành trình trải nghiệm sống động dành cho mọi thế hệ.',
  image: '/images/og/home-og.jpg',
})

definePageMeta({ layout: 'default' })
</script>
