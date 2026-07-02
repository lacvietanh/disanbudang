<template>
  <div>
    <!-- 1. Hero cinematic -->
    <HeroSection />

    <!-- 2. Câu chuyện về Bù Đăng -->
    <StorytellingIntro />

    <!-- 3. Điểm di sản nổi bật -->
    <FeaturedHeritage />

    <!-- 4. Trải nghiệm Bản đồ -->
    <MapPreviewSection />

    <!-- 4. Ký ức cộng đồng -->
    <CommunityStoriesSection />

    <!-- 5. Tin tức mới -->
    <NewsSection />

    <!-- 6. Khám phá di sản -->
    <QuizSection />

    <!-- 7. Góc học tập -->
    <SchoolCornerSection />

    <!-- 8. Kêu gọi đóng góp di sản -->
    <ContributionCTA />

    <!-- 9. Tầm nhìn mở rộng: Bù Đăng → Thành Phố Đồng Nai -->
    <VisionRoadmapSection />

    <!-- 10. Câu hỏi thường gặp -->
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

