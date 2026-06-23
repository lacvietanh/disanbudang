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

    <!-- 9. Câu hỏi thường gặp -->
    <FAQSection />
  </div>
</template>

<script setup lang="ts">
useMuseumSeo({
  description: 'Khám phá di sản văn hóa, lịch sử và thiên nhiên Xã Bù Đăng Thành Phố Đồng Nai (Tỉnh Bình Phước cũ) qua không gian số hiện đại — hành trình trải nghiệm sống động dành cho mọi thế hệ.',
  image: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
})

definePageMeta({ layout: 'default' })
</script>

