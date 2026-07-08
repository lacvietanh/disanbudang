<template>
  <div>
    <!-- 1. Hero cinematic slideshow -->
    <HeroSection />

    <!-- 2. Di sản nổi bật — editorial magazine -->
    <FeaturedHeritage />

    <!-- 3. Khám phá qua công nghệ — bento grid -->
    <ExperiencesSection />

    <!-- 4. Ký ức cộng đồng — dark editorial -->
    <CommunityStoriesSection />

    <!-- 5. FAQ — SEO -->
    <FAQSection />

    <!-- 6. Closing CTA — cinematic -->
    <ClosingCTASection />
  </div>
</template>

<script setup lang="ts">
useMuseumSeo({
  description: 'Bảo tàng số di sản văn hóa, lịch sử và thiên nhiên vùng đất Bù Đăng — linh hồn đại ngàn trong lòng Thành Phố Đồng Nai. Khám phá qua không gian số hiện đại sống động.',
  image: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
})

definePageMeta({ layout: 'default' })
</script>
