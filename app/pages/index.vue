<template>
  <div>
    <!-- 1. Hero cinematic -->
    <HeroSection />

    <!-- 2. Câu chuyện về Bù Đăng -->
    <StorytellingIntro />

    <!-- 3. Dòng thời gian văn hóa lịch sử -->
    <CulturalTimelineSection />

    <!-- 4. Điểm di sản nổi bật -->
    <FeaturedHeritage />

    <!-- 5. Khám phá theo danh mục -->
    <HeritageCategoriesSection />

    <!-- 6. Trải nghiệm Bản đồ -->
    <MapPreviewSection />

    <!-- 7. Audio guide thuyết minh -->
    <AudioGuideSection />

    <!-- 8. Ký ức cộng đồng -->
    <CommunityStoriesSection />

    <!-- 9. Tin tức mới -->
    <NewsSection />

    <!-- 10. Khám phá di sản -->
    <QuizSection />

    <!-- 11. Góc học tập -->
    <SchoolCornerSection />

    <!-- 12. Kêu gọi đóng góp di sản -->
    <ContributionCTA />

    <!-- 13. Tầm nhìn mở rộng: Bù Đăng → Thành Phố Đồng Nai -->
    <VisionRoadmapSection />

    <!-- 14. Câu hỏi thường gặp -->
    <FAQSection />
  </div>
</template>

<script setup lang="ts">
useMuseumSeo({
  description: 'Bảo tàng số di sản văn hóa, lịch sử và thiên nhiên vùng đất Bù Đăng — linh hồn đại ngàn trong lòng Thành Phố Đồng Nai. Khám phá qua không gian số hiện đại sống động.',
  image: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
})

definePageMeta({ layout: 'default' })
</script>

