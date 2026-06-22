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
  description: 'Khám phá di sản văn hóa, lịch sử và thiên nhiên Xã Bù Đăng Thành Phố Đồng Nai (Tỉnh Bình Phước cũ) qua không gian số hiện đại — hành trình trải nghiệm sống động dành cho mọi thế hệ.',
  image: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
})

definePageMeta({ layout: 'default' })
</script>
