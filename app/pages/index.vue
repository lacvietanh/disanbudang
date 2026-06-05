<template>
  <div>
    <HeroSection />
    <StorytellingIntro />
    <CulturalTimelineSection />
    <FeaturedHeritage />
    <HeritageCategoriesSection />
    <MapPreviewSection />
    <AudioGuideSection />
    <CommunityStoriesSection />
    <QuizSection />
    <SchoolCornerSection />
    <NewsSection />
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
