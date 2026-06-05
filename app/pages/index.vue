<template>
  <div>
    <!-- 1. Giới thiệu -->
    <HeroSection />
    <StorytellingIntro />

    <!-- 2. Điểm nổi bật -->
    <FeaturedHeritage />
    <CulturalTimelineSection />

    <!-- 3. Trải nghiệm -->
    <MapPreviewSection />
    <AudioGuideSection />

    <!-- 4. Di sản -->
    <HeritageCategoriesSection />

    <!-- 5. Cộng đồng -->
    <CommunityStoriesSection />

    <!-- 6. Khám phá thêm -->
    <QuizSection />
    <SchoolCornerSection />
    <NewsSection />
    <FAQSection />
    <ContributionCTA />
  </div>
</template>

<script setup lang="ts">
useMuseumSeo({
  description: 'Khám phá di sản văn hóa, lịch sử và thiên nhiên huyện Bù Đăng qua không gian số hiện đại — hành trình trải nghiệm sống động dành cho mọi thế hệ.',
  image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85',
})

definePageMeta({ layout: 'default' })
</script>
