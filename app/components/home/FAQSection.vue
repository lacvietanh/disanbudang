<template>
  <section class="section bg-charcoal-900 relative overflow-hidden border-t border-charcoal-800" aria-label="Những câu hỏi thường gặp">
    <div class="noise-overlay" />
    <div class="container-heritage relative z-10">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16 reveal">
          <span class="section-label">Giải Đáp</span>
          <h2 class="section-title">Câu Hỏi Thường Gặp</h2>
          <p class="text-charcoal-400 text-base max-w-xl mx-auto mt-4">
            Tìm hiểu thêm về văn hóa S'tiêng, di tích lịch sử Bom Bo, cồng chiêng và các điểm đến trải nghiệm đặc sắc tại Bù Đăng.
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
              <div class="p-6 pt-0 text-charcoal-300 text-sm leading-relaxed border-t border-charcoal-800/40">
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
    question: "Di sản nổi bật nhất của huyện Bù Đăng gồm những gì?",
    answer: "Bù Đăng nổi tiếng với các di tích lịch sử và danh thắng thiên nhiên kỳ vĩ như Chiến khu Đ Bù Đăng, Thác Mơ, sóc Bom Bo lịch sử gắn liền với bài ca 'Tiếng chày trên sóc Bom Bo', cùng không gian văn hóa cồng chiêng và dệt thổ cẩm độc đáo của đồng bào S'tiêng."
  },
  {
    question: "Văn hóa S'tiêng có những nét đặc trưng đặc sắc nào?",
    answer: "Người S'tiêng tại Bù Đăng sở hữu kho tàng di sản phong phú bao gồm tiếng nói, chữ viết truyền thống, nhà dài cổ truyền, nghề dệt thổ cẩm thủ công mỹ nghệ tinh xảo, và đặc biệt là nghệ thuật diễn xướng cồng chiêng đã được UNESCO vinh danh là Di sản văn hóa phi vật thể của nhân loại."
  },
  {
    question: "Sóc Bom Bo lịch sử nằm ở đâu và có thể tham quan như thế nào?",
    answer: "Sóc Bom Bo thuộc xã Bình Minh, huyện Bù Đăng, tỉnh Bình Phước. Đây là địa danh lịch sử anh hùng nơi đồng bào S'tiêng ngày đêm giã gạo nuôi quân kháng chiến. Ngày nay, du khách có thể đến tham quan Khu bảo tồn văn hóa dân tộc S'tiêng sóc Bom Bo để trực tiếp trải nghiệm giã gạo, nghe cồng chiêng và thưởng thức rượu cần."
  },
  {
    question: "Cổng thông tin Di sản Bù Đăng do ai thực hiện?",
    answer: "Cổng thông tin Di sản Bù Đăng (disanbudang.com) là dự án bảo tồn di sản số do nhà thiết kế và phát triển Nguyễn Xuân Kiệt thực hiện nhằm số hóa, quảng bá các giá trị lịch sử, văn hóa và thiên nhiên của huyện Bù Đăng đến với độc giả toàn quốc."
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
