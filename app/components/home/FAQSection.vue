<template>
  <section class="section bg-charcoal-900 relative overflow-hidden border-t border-charcoal-800" aria-label="Những câu hỏi thường gặp">
    <div class="noise-overlay" />
    <div class="container-heritage relative z-10">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16 reveal">
          <span class="section-label">Giải Đáp</span>
          <h2 class="section-title">Câu Hỏi Thường Gặp</h2>
          <p class="text-charcoal-400 text-base max-w-xl mx-auto mt-4">
            Tìm hiểu thêm về văn hóa S'tiêng, di tích lịch sử Bom Bo, cồng chiêng và các điểm đến trải nghiệm đặc sắc tại vùng đất Bù Đăng — Thành Phố Đồng Nai.
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="border border-charcoal-800 rounded-2xl bg-charcoal-800/40 overflow-hidden transition-all duration-300 hover:border-gold-500/30"
          >
            <button
              class="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              @click="toggleFaq(index)"
            >
              <span class="font-heading font-semibold text-ivory text-base md:text-lg pr-4">
                {{ faq.question }}
              </span>
              <Icon
                name="mdi:chevron-down"
                class="w-5 h-5 text-gold-400 transition-transform duration-300 shrink-0"
                :class="{ 'rotate-180': openIndex === index }"
              />
            </button>

            <div
              class="transition-all duration-300 ease-in-out"
              :style="{ maxHeight: openIndex === index ? '300px' : '0px' }"
            >
              <div class="p-6 pt-0 text-charcoal-200 text-sm leading-relaxed border-t border-charcoal-800/40">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(null)

const faqs = [
  {
    question: "Di sản nổi bật nhất của Xã Bù Đăng gồm những gì?",
    answer: "Di sản nổi bật nhất của Xã Bù Đăng gồm Chiến khu Đ Bù Đăng, Trảng cỏ Bù Lạch, sóc Bom Bo lịch sử, không gian văn hóa cồng chiêng và nghề dệt thổ cẩm của đồng bào dân tộc S'tiêng."
  },
  {
    question: "Văn hóa S'tiêng có những nét đặc trưng đặc sắc nào?",
    answer: "Văn hóa S'tiêng đặc trưng bởi nghệ thuật diễn xướng cồng chiêng, nghề dệt thổ cẩm thủ công, tiếng nói chữ viết riêng, cùng truyền thống sinh hoạt trong những ngôi nhà dài cổ truyền."
  },
  {
    question: "Sóc Bom Bo lịch sử nằm ở đâu và có thể tham quan như thế nào?",
    answer: "Sóc Bom Bo nằm tại vùng đất Bù Đăng, Thành Phố Đồng Nai. Bạn có thể tham quan Khu bảo tồn văn hóa dân tộc S'tiêng sóc Bom Bo để trải nghiệm giã gạo, nghe tiếng cồng chiêng và giao lưu văn hóa."
  },
  {
    question: "Bù Đăng có vai trò gì với Thành Phố Đồng Nai?",
    answer: "Bù Đăng là viên ngọc di sản đặc sắc nhất của Thành Phố Đồng Nai — nơi hội tụ căn cứ cách mạng Chiến Khu Đ huyền thoại, văn hóa bản địa S'tiêng hàng ngàn năm và thiên nhiên nguyên sinh kỳ vĩ. Thành Phố Đồng Nai hôm nay là người kế thừa, bảo hộ và tôn vinh kho báu di sản này — dự án Di Sản Bù Đăng là nỗ lực số hóa để cả thành phố cùng tự hào."
  },
  {
    question: "Cổng thông tin Di sản Bù Đăng do ai thực hiện?",
    answer: "Cổng thông tin Di sản Bù Đăng do Nguyễn Xuân Kiệt thực hiện nhằm mục tiêu số hóa, lưu trữ và quảng bá các giá trị lịch sử, văn hóa và thiên nhiên của Xã Bù Đăng đến với mọi thế hệ."
  }
]

function toggleFaq(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

// Inject FAQ Schema for SEO optimization
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      })
    }
  ]
})
</script>
