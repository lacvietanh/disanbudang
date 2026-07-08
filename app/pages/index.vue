<template>
  <div>
    <!-- 1. Hero cinematic slideshow -->
    <HeroSection />

    <!-- 2. Lời dẫn — linh hồn đại ngàn, thiết lập bối cảnh cảm xúc -->
    <StorytellingIntro />

    <!-- 3. Di sản nổi bật — editorial magazine -->
    <FeaturedHeritage />

    <!-- 4. Khám phá qua công nghệ — bento grid: bản đồ, thư viện, audio, học tập -->
    <ExperiencesSection />

    <!-- 5. Dòng chảy lịch sử — timeline tương tác theo thời kỳ -->
    <CulturalTimelineSection />

    <!-- 6. Audio Guide — trình phát thật, nghe ngay tại trang chủ -->
    <AudioGuideSection />

    <!-- 7. Quiz thật + sưu tập huy hiệu -->
    <QuizSection />

    <!-- 8. Ký ức cộng đồng — dark editorial -->
    <CommunityStoriesSection />

    <!-- 9. Bài viết & sự kiện mới nhất -->
    <NewsSection />

    <!-- 10. FAQ — SEO -->
    <FAQSection />

    <!-- 11. Closing CTA — cinematic -->
    <ClosingCTASection />
  </div>
</template>

<script setup lang="ts">
useMuseumSeo({
  description: 'Bảo tàng số di sản văn hóa, lịch sử và thiên nhiên Thành Phố Đồng Nai. Bản đồ tương tác, audio guide và góc học tập.',
  image: '/images/og-default.jpg',
})

definePageMeta({ layout: 'default' })
</script>
