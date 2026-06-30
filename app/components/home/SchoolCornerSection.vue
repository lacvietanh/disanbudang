<template>
  <section id="school-corner" class="section bg-beige-200 relative overflow-hidden scroll-mt-20">
    <!-- Fine grid background illustration (extremely subtle 2% opacity to avoid overlapping readability issues with text) -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.02] shadow-inset-warm bg-[radial-gradient(#6B4C35_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
    <div class="absolute top-0 right-0 w-[450px] h-[450px] bg-copper-500/5 rounded-full blur-3xl pointer-events-none" />

    <div class="container-heritage relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <span class="section-label">Góc Học Tập</span>
          <h2 class="section-title">Học Sinh Nghiên Cứu Di Sản</h2>
          <p class="section-desc max-w-xl mt-2 text-charcoal-800 text-sm leading-relaxed">
            Các dự án học tập, nghiên cứu và thuyết minh di sản số hóa xuất sắc thực hiện bởi thế hệ học sinh trường THPT Lê Quý Đôn và THCS Nguyễn Trường Tộ.
          </p>
        </div>
        <NuxtLink to="/explore?tab=research" class="btn-dark flex-shrink-0">
          Xem Tất Cả Nghiên Cứu
          <Icon name="mdi:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Stats board -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-5xl mx-auto text-center">
        <div class="bg-white/40 backdrop-blur-sm border border-beige-300/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 reveal" style="animation-delay: 0.05s">
          <Icon name="mdi:school-outline" class="w-7 h-7 text-earth-600 mx-auto mb-2" />
          <p class="font-heading font-bold text-charcoal-900 text-3xl leading-none">
            {{ schoolsCount.count }}
          </p>
          <p class="text-charcoal-800 text-2xs uppercase tracking-wider font-bold mt-2">Trường Đồng Hành</p>
        </div>
        <div class="bg-white/40 backdrop-blur-sm border border-beige-300/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 reveal" style="animation-delay: 0.1s">
          <Icon name="mdi:file-document-multiple-outline" class="w-7 h-7 text-earth-600 mx-auto mb-2" />
          <p class="font-heading font-bold text-charcoal-900 text-3xl leading-none">
            {{ researchesCount.count }}+
          </p>
          <p class="text-charcoal-800 text-2xs uppercase tracking-wider font-bold mt-2">Nghiên Cứu Số Hóa</p>
        </div>
        <div class="bg-white/40 backdrop-blur-sm border border-beige-300/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 reveal" style="animation-delay: 0.15s">
          <Icon name="mdi:download-circle-outline" class="w-7 h-7 text-earth-600 mx-auto mb-2" />
          <p class="font-heading font-bold text-charcoal-900 text-3xl leading-none">
            {{ downloadsCount.count }}+
          </p>
          <p class="text-charcoal-800 text-2xs uppercase tracking-wider font-bold mt-2">Lượt Tải Học Tập</p>
        </div>
        <div class="bg-white/40 backdrop-blur-sm border border-beige-300/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 reveal" style="animation-delay: 0.2s">
          <Icon name="mdi:trophy-outline" class="w-7 h-7 text-earth-600 mx-auto mb-2" />
          <p class="font-heading font-bold text-charcoal-900 text-3xl leading-none">
            {{ awardsCount.count }}
          </p>
          <p class="text-charcoal-800 text-2xs uppercase tracking-wider font-bold mt-2">Đề Tài Đạt Giải</p>
        </div>
      </div>

      <!-- Interactive Controls (Search and Filter) for School Corner -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 max-w-5xl mx-auto reveal" style="animation-delay: 0.15s">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="sub in schoolSubjects"
            :key="sub.id"
            class="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border"
            :class="activeSubject === sub.id
              ? 'bg-earth-600 text-ivory border-transparent shadow-sm'
              : 'border-beige-300 text-charcoal-600 bg-white/50 hover:bg-white hover:border-earth-600/30'"
            @click="activeSubject = sub.id"
          >
            {{ sub.label }}
          </button>
        </div>
        
        <!-- Search bar -->
        <div class="relative w-full md:w-80">
          <input
            v-model="schoolSearchQuery"
            type="text"
            placeholder="Tìm đề tài, tác giả, trường học..."
            class="w-full bg-white/70 hover:bg-white focus:bg-white border border-beige-300 rounded-full px-5 py-2.5 pl-11 text-xs text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:border-earth-500 focus:ring-1 focus:ring-earth-500 transition-all duration-300"
          />
          <Icon name="mdi:magnify" class="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            v-if="schoolSearchQuery"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-800"
            @click="schoolSearchQuery = ''"
          >
            <Icon name="mdi:close" class="w-4 h-4" />
          </button>
        </div>
      </div>
        <!-- Skeleton Cards when isLoading -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div
          v-for="i in 3"
          :key="i"
          class="bg-white/60 border border-beige-300 rounded-r-2xl p-6 pl-9 h-[380px] relative animate-pulse flex flex-col justify-between"
        >
          <div class="book-spine bg-beige-200/50" />
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div class="h-5 bg-beige-300 rounded-full w-24" />
              <div class="h-4 bg-beige-300 rounded w-10" />
            </div>
            <div class="h-6 bg-beige-300 rounded w-3/4" />
            <div class="space-y-2">
              <div class="h-4 bg-beige-300 rounded w-full" />
              <div class="h-4 bg-beige-300 rounded w-5/6" />
              <div class="h-4 bg-beige-300 rounded w-2/3" />
            </div>
          </div>
          <div class="border-t border-beige-200 pt-4 flex justify-between items-center">
            <div class="space-y-2 w-1/2">
              <div class="h-3 bg-beige-300 rounded w-2/3" />
              <div class="h-2 bg-beige-300 rounded w-1/2" />
            </div>
            <div class="h-4 bg-beige-300 rounded w-8" />
          </div>
        </div>
      </div>

      <!-- 3D Book Covers grid -->
      <div v-else-if="filteredResources.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 book-container mb-12">
        <div
          v-for="(resource, i) in filteredResources"
          :key="resource.id"
          class="book-card bg-white border border-beige-300 rounded-r-2xl shadow-card duration-500 group reveal cursor-pointer flex flex-col justify-between"
          :style="{ animationDelay: `${i * 0.1}s`, minHeight: '380px' }"
          @click="selectedResource = resource"
        >
          <!-- Book Spine Simulation -->
          <div class="book-spine" />

          <!-- Card Content -->
          <div class="p-6 pl-9 flex flex-col justify-between h-full relative">
            <div>
              <!-- Header tags -->
              <div class="flex items-center justify-between mb-5">
                <div
                  class="flex items-center gap-1.5 px-3 py-1 rounded-full text-3xs font-bold uppercase tracking-wider"
                  :style="{ background: `${typeColors[resource.type]}15`, color: typeColors[resource.type] }"
                >
                  <Icon :name="typeIcons[resource.type]" class="w-3 h-3" />
                  {{ typeLabels[resource.type] }}
                </div>
                <span class="text-charcoal-600 text-xs font-semibold">{{ resource.grade }}</span>
              </div>

              <!-- Title (Book style typography) -->
              <h3 class="font-heading font-bold text-charcoal-800 text-lg leading-tight mb-3 group-hover:text-earth-600 transition-colors line-clamp-3">
                {{ resource.title }}
              </h3>
              <!-- Description excerpt -->
              <p class="text-charcoal-600 text-sm leading-relaxed line-clamp-3 mb-5">
                {{ resource.description }}
              </p>
            </div>

            <!-- Footer Meta -->
            <div>
              <div class="border-t border-beige-200/80 pt-4 flex items-center justify-between">
                <div>
                  <p class="text-charcoal-700 text-xs font-bold">{{ resource.author }}</p>
                  <p class="text-charcoal-600 text-[10px] uppercase font-semibold tracking-wide mt-0.5">{{ resource.school }}</p>
                </div>
                <div class="flex items-center gap-1 text-charcoal-600 text-xs font-medium">
                  <Icon name="mdi:download-outline" class="w-4 h-4 text-gold-500" />
                  <span>{{ resource.downloadCount }}</span>
                </div>
              </div>

              <!-- Quick read hover prompt -->
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 pb-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl">
                <span class="inline-flex items-center gap-1.5 text-earth-600 text-xs font-bold uppercase tracking-wider bg-earth-50 border border-earth-100 px-4 py-2 rounded-full shadow-sm">
                  <Icon name="mdi:book-open-page-variant" class="w-3.5 h-3.5" />
                  Đọc Nhanh Tóm Tắt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state when no resources found -->
      <div v-else class="col-span-full py-16 text-center bg-white/40 backdrop-blur-sm border border-beige-300/80 rounded-3xl p-8 max-w-lg mx-auto mb-12">
        <Icon name="mdi:file-search-outline" class="w-10 h-10 text-charcoal-500 mx-auto mb-3" />
        <p class="text-charcoal-800 font-heading font-semibold text-base">Không tìm thấy tài liệu học tập phù hợp</p>
        <p class="text-charcoal-600 text-xs mt-1">Vui lòng thử từ khóa khác hoặc chuyển sang lĩnh vực khác để tìm kiếm.</p>
      </div>

      <!-- S'tiêng Cultural Glossary Flashcards Widget -->
      <div class="mt-16 bg-white/40 backdrop-blur-sm border border-beige-300 rounded-3xl p-8 max-w-5xl mx-auto reveal mb-16" style="animation-delay: 0.2s">
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-earth-100 text-earth-700">
            <Icon name="mdi:card-bulleted-outline" class="w-3.5 h-3.5" />
            Tra Cứu Thuật Ngữ Bản Địa
          </span>
          <h3 class="font-heading font-bold text-charcoal-900 text-2xl mt-2">Học Nhanh Thuật Ngữ S'tiêng</h3>
          <p class="text-charcoal-700 text-xs mt-1 max-w-lg mx-auto">
            Nhấn lật các thẻ bên dưới để ghi nhớ nhanh các khái niệm văn hóa, lịch sử đặc trưng của đồng bào Xã Bù Đăng, Thành Phố Đồng Nai.
          </p>
        </div>

        <!-- Flashcards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(card, idx) in flashcards"
            :key="idx"
            class="flashcard-container cursor-pointer perspective h-48 group"
            @click="card.isFlipped = !card.isFlipped"
          >
            <!-- Card Wrapper for 3D flip effect -->
            <div
              class="w-full h-full relative transition-transform duration-500 transform-style-3d shadow-sm hover:shadow-md rounded-2xl"
              :class="{ 'rotate-y-180': card.isFlipped }"
            >
              <!-- Front Side -->
              <div class="absolute inset-0 backface-hidden bg-white border border-beige-200 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span class="text-charcoal-400 text-[10px] font-bold uppercase tracking-wider">Từ Vựng</span>
                  <h4 class="font-heading font-bold text-earth-700 text-xl mt-2">{{ card.term }}</h4>
                  <p class="text-charcoal-800 text-xs mt-1 italic">Phát âm: {{ card.pronunciation }}</p>
                </div>
                <div class="flex items-center justify-between text-charcoal-400 text-[10px] font-semibold uppercase">
                  <span>{{ card.category }}</span>
                  <span class="flex items-center gap-1 text-gold-600">
                    Xem nghĩa
                    <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5 animate-spin-slow" />
                  </span>
                </div>
              </div>

              <!-- Back Side -->
              <div class="absolute inset-0 backface-hidden bg-earth-900 text-ivory border border-earth-800 rounded-2xl p-6 flex flex-col justify-between rotate-y-180">
                <div>
                  <span class="text-gold-400 text-[10px] font-bold uppercase tracking-wider">Ý Nghĩa Bản Địa</span>
                  <p class="text-xs leading-relaxed mt-2 text-charcoal-200">{{ card.definition }}</p>
                </div>
                <div class="flex items-center justify-between text-charcoal-400 text-[10px] font-semibold uppercase">
                  <span>{{ card.category }}</span>
                  <span class="flex items-center gap-1 text-gold-400">
                    Lật lại
                    <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- School Project Invitation Banner -->
      <div class="mt-14 p-8 rounded-3xl bg-gradient-to-r from-earth-800 via-earth-700 to-charcoal-850 border border-gold-500/25 flex flex-col md:flex-row items-center gap-6 shadow-xl reveal relative overflow-hidden">
        <div class="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
        <div class="w-14 h-14 rounded-2xl bg-ivory/15 flex items-center justify-center flex-shrink-0 border border-ivory/20 shadow-inner">
          <Icon name="mdi:school" class="w-7 h-7 text-gold-300" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h3 class="font-heading font-bold text-ivory text-xl mb-1">Hành Trình Số Hóa Di Sản Trường Học</h3>
          <p class="text-ivory/80 text-sm">Học sinh các trường THPT Lê Quý Đôn và THCS Nguyễn Trường Tộ cùng tham gia khai phá, phục dựng tư liệu lịch sử quê hương.</p>
        </div>
        <NuxtLink to="/contribute" class="btn-ghost flex-shrink-0 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300">
          Gửi Bài Đóng Góp
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Read Modal -->
    <Transition name="fade">
      <div
        v-if="selectedResource"
        class="fixed inset-0 z-80 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-charcoal-950/80 backdrop-blur-md"
          @click="selectedResource = null"
        />

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-2xl bg-charcoal-900 border border-charcoal-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          <!-- Background accents -->
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm relative z-10">
            <span class="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Icon :name="typeIcons[selectedResource.type]" class="w-4 h-4" />
              Khảo Cứu Học Sinh
            </span>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 transition-colors"
              @click="selectedResource = null"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <!-- Tab Switcher -->
          <div class="flex border-b border-charcoal-800/80 bg-charcoal-900/40 relative z-10">
            <button
              class="flex-1 py-3 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
              :class="activeModalTab === 'overview' ? 'border-gold-500 text-gold-400 bg-charcoal-950/40' : 'border-transparent text-charcoal-400 hover:text-ivory'"
              @click="activeModalTab = 'overview'"
            >
              <Icon name="mdi:information-outline" class="w-4 h-4 text-gold-500" />
              Tổng Quan &amp; Kết Quả
            </button>
            <button
              class="flex-1 py-3 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
              :class="activeModalTab === 'document' ? 'border-gold-500 text-gold-400 bg-charcoal-950/40' : 'border-transparent text-charcoal-400 hover:text-ivory'"
              @click="activeModalTab = 'document'"
            >
              <Icon name="mdi:book-open-page-variant" class="w-4 h-4 text-gold-500" />
              Đọc Báo Cáo Toàn Văn
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
            <!-- TAB 1: OVERVIEW -->
            <div v-if="activeModalTab === 'overview'" class="space-y-6">
              <!-- Author & Metadata info block -->
              <div class="bg-charcoal-950/60 border border-charcoal-850 p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p class="text-charcoal-400 text-2xs uppercase tracking-wider font-semibold">Tác giả thực hiện</p>
                  <p class="font-heading font-bold text-ivory text-base mt-0.5">{{ selectedResource.author }}</p>
                  <p class="text-charcoal-400 text-2xs uppercase font-medium mt-0.5">{{ selectedResource.school }} • {{ selectedResource.grade }}</p>
                </div>
                <div class="text-right">
                  <p class="text-charcoal-400 text-2xs uppercase tracking-wider font-semibold">Lĩnh vực đề tài</p>
                  <p class="text-gold-400 font-semibold text-sm mt-0.5">{{ selectedResource.subject }}</p>
                  <p class="text-charcoal-400 text-2xs mt-0.5">Xuất bản: {{ selectedResource.publishedAt }}</p>
                </div>
              </div>

              <!-- Title -->
              <h3 class="font-heading font-bold text-ivory text-xl md:text-2xl leading-snug">
                {{ selectedResource.title }}
              </h3>

              <!-- Motivation -->
              <div v-if="selectedResource.motivation" class="space-y-1.5">
                <span class="text-gold-400 text-2xs uppercase tracking-widest font-bold block">Ý tưởng &amp; Động lực thực hiện</span>
                <p class="text-charcoal-200 text-sm leading-relaxed italic">
                  "{{ selectedResource.motivation }}"
                </p>
              </div>

              <!-- Key findings -->
              <div v-if="selectedResource.keyFindings && selectedResource.keyFindings.length > 0" class="space-y-3">
                <span class="text-gold-400 text-2xs uppercase tracking-widest font-bold block">Kết quả nghiên cứu thực tế nổi bật</span>
                <ul class="space-y-2.5">
                  <li
                    v-for="(finding, idx) in selectedResource.keyFindings"
                    :key="idx"
                    class="flex items-start gap-2.5 text-sm text-charcoal-300 leading-relaxed"
                  >
                    <div class="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="mdi:check" class="w-3 h-3 text-gold-400" />
                    </div>
                    <span>{{ finding }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- TAB 2: INTERACTIVE DOCUMENT READER -->
            <div v-else-if="activeModalTab === 'document'" class="space-y-6 flex flex-col items-center">
              <!-- Mock PDF Viewer Toolbar -->
              <div class="w-full flex items-center justify-between bg-charcoal-950 border border-charcoal-850 px-4 py-2 rounded-xl text-xs text-charcoal-400">
                <span class="font-semibold flex items-center gap-1">
                  <Icon name="mdi:file-pdf-box" class="w-4 h-4 text-red-500" />
                  {{ selectedResource.id }}_report.pdf
                </span>
                <div class="flex items-center gap-3">
                  <button class="hover:text-gold-400 transition-colors" title="Phóng to" aria-label="Phóng to"><Icon name="mdi:magnify-plus-outline" class="w-4 h-4" /></button>
                  <span class="px-1.5 py-0.5 bg-charcoal-900 rounded border border-charcoal-850 text-3xs font-semibold">100%</span>
                  <button class="hover:text-gold-400 transition-colors" title="Thu nhỏ" aria-label="Thu nhỏ"><Icon name="mdi:magnify-minus-outline" class="w-4 h-4" /></button>
                </div>
                <div class="flex items-center gap-2">
                  <button class="hover:text-gold-400 transition-colors" title="In tài liệu" aria-label="In tài liệu"><Icon name="mdi:printer-outline" class="w-4 h-4" /></button>
                  <button class="hover:text-gold-400 transition-colors" title="Tải báo cáo" aria-label="Tải báo cáo" @click="downloadFile(selectedResource)"><Icon name="mdi:download-outline" class="w-4 h-4" /></button>
                </div>
              </div>

              <!-- Styled Sheet of Academic Paper -->
              <div class="w-full min-h-[420px] bg-[#FAF8F5] text-charcoal-900 p-8 rounded-xl shadow-inner border border-beige-300 relative overflow-hidden transition-all duration-300">
                <!-- Watermark logo back in paper -->
                <div class="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none select-none">
                  <img src="/favicon/icon-192.png" alt="watermark" class="w-64 h-64 object-contain" />
                </div>
                
                <!-- Document Header -->
                <div class="border-b border-beige-300 pb-2 mb-6 flex justify-between items-center text-[10px] text-charcoal-500 uppercase tracking-widest font-semibold">
                  <span>{{ selectedResource.school }} — Nghiên Cứu Di Sản</span>
                  <span>Trang {{ currentDocPage + 1 }} / {{ selectedResource.pages ? selectedResource.pages.length : 1 }}</span>
                </div>

                <!-- Page Content rendered via v-html -->
                <div 
                  class="prose prose-sm max-w-none text-charcoal-800 leading-relaxed text-justify prose-headings:font-heading prose-headings:text-earth-900 prose-headings:mt-4 prose-headings:mb-2 prose-p:mb-4 prose-blockquote:border-l-earth-500 prose-blockquote:bg-earth-50/50 prose-blockquote:p-4 prose-blockquote:my-4 prose-blockquote:italic prose-strong:text-earth-900 prose-ol:list-decimal prose-ol:pl-5 prose-ul:list-disc prose-ul:pl-5 select-text"
                  v-html="selectedResource.pages ? selectedResource.pages[currentDocPage] : '<p>Chưa cập nhật nội dung toàn văn.</p>'"
                />
              </div>

              <!-- Page Navigation Panel -->
              <div class="w-full flex items-center justify-between border-t border-charcoal-800/80 pt-4 mt-2">
                <button
                  class="btn-secondary text-xs py-2 px-4 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
                  :disabled="currentDocPage === 0"
                  @click="currentDocPage--"
                >
                  <Icon name="mdi:arrow-left" class="w-4 h-4" />
                  Trang Trước
                </button>
                <span class="text-charcoal-400 text-xs font-semibold uppercase tracking-wider">
                  Trang {{ currentDocPage + 1 }} / {{ selectedResource.pages ? selectedResource.pages.length : 1 }}
                </span>
                <button
                  class="btn-secondary text-xs py-2 px-4 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
                  :disabled="currentDocPage === (selectedResource.pages ? selectedResource.pages.length - 1 : 0)"
                  @click="currentDocPage++"
                >
                  Trang Sau
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-6 py-4 border-t border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-between">
            <span class="text-charcoal-500 text-xs font-semibold">Dung lượng file: {{ selectedResource.fileSize ?? '2.4 MB' }}</span>
            <div class="flex items-center gap-3">
              <button
                class="btn-ghost text-xs md:text-sm py-2.5"
                @click="selectedResource = null"
              >
                Đóng lại
              </button>
              <button
                v-if="selectedResource.quizId"
                class="btn-secondary text-xs md:text-sm py-2.5 px-4 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300 flex items-center gap-1.5"
                @click="startResourceQuiz(selectedResource)"
              >
                <Icon name="mdi:play-circle-outline" class="w-4 h-4" />
                Ôn Tập Trắc Nghiệm
              </button>
              <button
                class="btn-primary text-xs md:text-sm py-2.5 bg-gold-500 text-charcoal-900 border-transparent shadow-gold flex items-center gap-1.5"
                @click="downloadFile(selectedResource)"
              >
                <Icon name="mdi:download" class="w-4 h-4" />
                Tải Báo Cáo PDF ({{ selectedResource.downloadCount }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { useCountUp } from '~/composables/useAnimations'
import { useSwal } from '~/composables/useSwal'
import { useQuizStore } from '~/stores/quiz'

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const swal = useSwal()
const quizStore = useQuizStore()

// Interactive counters
const schoolsCount = useCountUp(2)
const researchesCount = useCountUp(52)
const downloadsCount = useCountUp(1280)
const awardsCount = useCountUp(12)

onMounted(() => {
  schoolsCount.start()
  researchesCount.start()
  downloadsCount.start()
  awardsCount.start()
  
  setTimeout(() => {
    isLoading.value = false
  }, 1200)
})

interface SchoolResourceExtended {
  id: string
  title: string
  description: string
  type: 'research' | 'presentation' | 'artwork' | 'document' | 'video'
  subject: string
  grade: string
  school: string
  author: string
  coverImage?: string
  publishedAt: string
  featured: boolean
  downloadCount: number
  motivation?: string
  keyFindings?: string[]
  fileSize?: string
  quizId?: string
  pages?: string[]
}

const selectedResource = ref<SchoolResourceExtended | null>(null)

// Modal Interactive Tabs & Pages State
const activeModalTab = ref<'overview' | 'document'>('overview')
const currentDocPage = ref(0)

// Reset state when another resource is opened/closed
watch(selectedResource, (newVal) => {
  if (newVal) {
    activeModalTab.value = 'overview'
    currentDocPage.value = 0
  }
})

// Interactive study search & filter state
const activeSubject = ref('all')
const schoolSearchQuery = ref('')
const isLoading = ref(true)

const schoolSubjects = [
  { id: 'all', label: 'Tất cả lĩnh vực' },
  { id: 'history', label: 'Lịch sử địa phương' },
  { id: 'culture', label: 'Văn hóa dân tộc' },
  { id: 'geography', label: 'Địa lý & Thiên nhiên' }
]

const resources = ref<SchoolResourceExtended[]>([
  {
    id: 'res-001',
    title: 'Lịch Sử Hình Thành Chiến Khu Đ Qua Lời Kể Nhân Chứng Lịch Sử',
    description: 'Nghiên cứu điền dã ghi chép lại câu chuyện chiến đấu kiên cường của các cựu chiến binh Chiến khu Đ năm xưa.',
    type: 'research',
    subject: 'Lịch sử địa phương',
    grade: 'Lớp 12',
    school: 'THPT Lê Quý Đôn',
    author: 'Nhóm học sinh 12A1',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2024-04-10',
    featured: true,
    downloadCount: 234,
    fileSize: '3.6 MB',
    motivation: 'Thế hệ cựu chiến binh Chiến khu Đ nay đều đã tuổi cao sức yếu. Chúng em muốn chạy đua với thời gian để lưu giữ lại những câu chuyện hào hùng chân thực nhất từ lời kể của họ.',
    keyFindings: [
      'Ghi âm và chép lại hơn 30 giờ phỏng vấn trực tiếp từ 12 nhân chứng lịch sử tại buôn sóc Bù Đăng.',
      'Phác thảo và số hóa thành công sơ đồ hoạt động quân sự của 3 điểm đóng quân cũ sâu trong lòng rừng nguyên sinh.',
      'Sưu tầm hình ảnh tư liệu của 15 loại hiện vật, vũ khí tự chế thời chiến được lưu trữ gia đình.'
    ],
    quizId: 'quiz-001',
    pages: [
      `<h2>CHƯƠNG I: BỐI CẢNH LỊCH SỬ & LÝ DO CHỌN ĐỀ TÀI</h2>
      <p>Chiến Khu Đ là một trong những hệ thống căn cứ địa quan trọng bậc nhất của lực lượng kháng chiến tại khu vực miền Đông Nam Bộ trong giai đoạn từ năm 1945 đến năm 1975. Nằm ẩn sâu giữa đại ngàn xanh của Xã Bù Đăng, Thành Phố Đồng Nai (Tỉnh Bình Phước cũ), vùng đất này không chỉ sở hữu địa hình đồi núi trùng điệp mà còn được che chở bởi những tán rừng già nguyên sinh dày đặc. Đó chính là những tấm khiên tự nhiên vững chãi nhất bảo vệ tính mạng cho hàng ngàn cán bộ cách mạng cốt cán.</p>
      <p>Với lòng tự hào sâu sắc về quê hương Bù Đăng anh hùng, nhóm học sinh lớp 12A1 đã quyết định thực hiện đề tài điền dã lịch sử này nhằm thu thập, số hóa và lưu giữ những ký ức quý giá còn sót lại trước khi thời gian xóa nhòa tất cả.</p>
      <blockquote>"Nếu không ghi chép lại ngay hôm nay, những trang sử sống động từ lời kể của thế hệ đi trước sẽ vĩnh viễn nằm lại dưới lòng đất mẹ." <br/>— Lời mở đầu đề tài nghiên cứu khoa học.</blockquote>`,
      
      `<h2>CHƯƠNG II: PHƯƠNG PHÁP KHẢO CỨU ĐIỀN DÃ & PHÁT HIỆN THỰC TẾ</h2>
      <p>Trong quá trình thực hiện từ tháng 9 năm 2023 đến tháng 3 năm 2024, nhóm chúng em đã tiến hành 12 đợt điền dã thực tế vào sâu các buôn sóc bản địa của đồng bào dân tộc thiểu số S'tiêng và M'nông. Nhóm đã may mắn phỏng vấn và ghi âm được hơn 30 giờ chia sẻ từ các cựu chiến binh, nhân chứng sống từng tham gia mở đường tiếp tế và giã gạo nuôi quân.</p>
      <p><strong>Bảng số liệu tổng hợp khảo sát nhân chứng:</strong></p>
      <table class="w-full text-xs my-4 border-collapse border border-charcoal-350" style="color: #302D2A;">
        <thead>
          <tr class="bg-earth-100 text-charcoal-900">
            <th class="border border-charcoal-350 p-2 text-left">STT</th>
            <th class="border border-charcoal-350 p-2 text-left">Nhân chứng</th>
            <th class="border border-charcoal-350 p-2 text-left">Đơn vị / Vai trò</th>
            <th class="border border-charcoal-350 p-2 text-left">Nội dung ghi chép chính</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-charcoal-350 p-2 text-center">1</td>
            <td class="border border-charcoal-350 p-2 font-semibold">Điểu Đố</td>
            <td class="border border-charcoal-350 p-2">Đại đội 31B Bù Đăng</td>
            <td class="border border-charcoal-350 p-2">Sự phối hợp giữa bộ đội chủ lực và dân quân du kích S'tiêng phá càn.</td>
          </tr>
          <tr>
            <td class="border border-charcoal-350 p-2 text-center">2</td>
            <td class="border border-charcoal-350 p-2 font-semibold">Thị B’Rông</td>
            <td class="border border-charcoal-350 p-2">Dân công hỏa tuyến Sóc Bom Bo</td>
            <td class="border border-charcoal-350 p-2">Ký ức giã gạo thâu đêm nuôi quân giải phóng và lễ hội mừng chiến thắng.</td>
          </tr>
        </tbody>
      </table>
      <p>Kết quả nổi bật là chúng em đã định vị tọa độ GPS và số hóa sơ đồ phân bố của 3 căn cứ phụ đóng quân sâu trong lòng rừng nguyên sinh Bù Đăng mà trước đây chưa từng được đưa lên bản đồ số của khu vực.</p>`,
      
      `<h2>CHƯƠNG III: ĐỀ XUẤT GIẢI PHÁP BẢO TỒN DI SẢN SỐ</h2>
      <p>Để di sản Chiến Khu Đ mãi trường tồn và tiếp cận gần hơn với thế hệ học sinh Gen Z, nhóm nghiên cứu đề xuất ba giải pháp thực tế:</p>
      <ol>
        <li><strong>Xây dựng cổng thông tin số di sản:</strong> Đưa toàn bộ bản đồ di tích, audio thuyết minh tích hợp vào website để học sinh có thể tự học mọi lúc mọi nơi.</li>
        <li><strong>Thiết lập tour học tập ảo:</strong> Kết hợp công nghệ chụp ảnh 360 độ tại thực địa Chiến Khu Đ để học sinh có trải nghiệm nhập vai ảo.</li>
        <li><strong>Lồng ghép giáo dục địa phương:</strong> Đề xuất nhà trường bổ sung các tiết học trải nghiệm thực tế điền dã kết hợp làm bài trắc nghiệm nhanh trên app để tăng tính chủ động cho học sinh.</li>
      </ol>
      <p>Đề tài nghiên cứu của nhóm hy vọng đóng góp một phần nhỏ bé vào công cuộc gìn giữ ngọn lửa truyền thống cách mạng của Xã Bù Đăng, Thành Phố Đồng Nai.</p>`
    ]
  },
  {
    id: 'res-002',
    title: 'Phân Tích Hoa Văn Thổ Cẩm S\'tiêng: Ngôn Ngữ Không Lời',
    description: 'Nghiên cứu 23 mẫu hoa văn thổ cẩm truyền thống, giải mã ý nghĩa biểu tượng hạt gạo, dãy núi và chim rừng.',
    type: 'research',
    subject: 'Văn hóa dân tộc',
    grade: 'Lớp 9',
    school: 'THCS Nguyễn Trường Tộ',
    author: 'Nhóm học sinh 9A',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-md.webp',
    publishedAt: '2024-03-20',
    featured: false,
    downloadCount: 156,
    fileSize: '2.8 MB',
    motivation: 'Khi quan sát những tấm vải dệt của người S\'tiêng, chúng em nhận thấy mỗi họa tiết đều đối xứng tuyệt đối và mang sắc màu núi rừng. Em muốn hiểu sâu về ý nghĩa tâm linh và câu chuyện đằng sau mỗi sợi chỉ màu.',
    keyFindings: [
      'Gặp gỡ nghệ nhân gạo cội Thị Rét tại sóc Đắk Nhau để số hóa hình vẽ của 23 mẫu hoa văn thêu tay truyền thống.',
      'Giải mã thành công ý nghĩa xã hội: Họa tiết hình thoi chéo biểu thị hạt gạo no ấm, răng cưa biểu thị dãy núi che chắn.',
      'Hồ sơ hóa quy trình pha nhuộm màu tự nhiên từ lá cây rừng, vỏ cây Krông và củ nghệ cổ truyền.'
    ],
    quizId: 'quiz-002',
    pages: [
      `<h2>CHƯƠNG I: HOA VĂN THỔ CẨM - BẢN SẮC CỦA ĐỒNG BÀO S'TIÊNG</h2>
      <p>Nghề dệt thổ cẩm cổ truyền là biểu tượng văn hóa rực rỡ nhất thể hiện óc sáng tạo nghệ thuật và thế giới quan sâu sắc của đồng bào dân tộc thiểu số S'tiêng định cư lâu đời tại Xã Bù Đăng, Thành Phố Đồng Nai (Tỉnh Bình Phước cũ). Mỗi tấm thổ cẩm không chỉ dùng làm trang phục, chăn đắp mà còn là tiếng lòng thầm kín, là trang ký sự lưu trữ ký ức lịch sử buôn làng qua từng đường tơ kẽ chỉ.</p>
      <p>Hiện nay, trước làn sóng đô thị hóa mạnh mẽ, thế hệ trẻ người S'tiêng dần không còn mặn mà với khung cửi. Đề tài này được thực hiện nhằm mục đích giải mã ngôn ngữ nghệ thuật ẩn sau các hoa văn để hiểu sâu hơn về văn hóa bản địa quê hương Bù Đăng.</p>
      <blockquote>"Học hoa văn dệt là học cách người xưa trò chuyện với núi rừng, trời đất." <br/>— Trích lời nghệ nhân Thị Rét (Sóc Đắk Nhau).</blockquote>`,
      
      `<h2>CHƯƠNG II: GIẢI MÃ Ý NGHĨA BIỂU TƯỢNG HOA VĂN</h2>
      <p>Sau nhiều tháng nghiên cứu điền dã tại các sóc dệt lâu đời, nhóm chúng em đã chụp ảnh và số hóa được 23 loại họa tiết thêu tay truyền thống đặc trưng. Chúng được phân nhóm rõ rệt dựa trên đời sống tinh thần của đồng bào:</p>
      <ul>
        <li><strong>Họa tiết hình thoi chéo:</strong> Tượng trưng cho hạt thóc, hạt ngô rừng, biểu thị khát vọng về một mùa màng ấm no, buôn làng sung túc không còn đói nghèo.</li>
        <li><strong>Họa tiết răng cưa / ziczac chéo:</strong> Mô phỏng những dãy núi cao hiểm trở trập trùng bao quanh thung lũng, là bức tường thành vững chãi bảo vệ buôn làng khỏi thú dữ và thiên tai.</li>
        <li><strong>Họa tiết chim muông và lá cây:</strong> Thể hiện sự gắn bó hòa hợp tuyệt đối giữa con người và thiên nhiên đại ngàn Đông Nam Bộ.</li>
      </ul>
      <p>Các nghệ nhân S'tiêng phối sắc vô cùng tinh tế, chủ yếu dùng màu đen của đất rừng làm nền, điểm xuyết các màu đỏ của lửa cách mạng, màu vàng của hạt thóc chín rộ tạo nên một bảng màu cực kỳ hài hòa và giàu sức sống.</p>`,
      
      `<h2>CHƯƠNG III: CÔNG NGHỆ PHA NHUỘM MÀU CỔ TRUYỀN</h2>
      <p>Điểm độc đáo tạo nên giá trị bất hủ của thổ cẩm S'tiêng chính là quy trình pha màu hoàn toàn tự nhiên từ cây cỏ bản địa rừng Bù Đăng:</p>
      <table class="w-full text-xs my-4 border-collapse border border-charcoal-350" style="color: #302D2A;">
        <thead>
          <tr class="bg-earth-100 text-charcoal-900">
            <th class="border border-charcoal-350 p-2 text-left">Màu sắc sắc tố</th>
            <th class="border border-charcoal-350 p-2 text-left">Nguyên liệu tự nhiên</th>
            <th class="border border-charcoal-350 p-2 text-left">Quy trình pha nhuộm chắt lọc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-charcoal-350 p-2 text-center font-bold">Đen tuyền</td>
            <td class="border border-charcoal-350 p-2">Lá cây Krông rừng sâu</td>
            <td class="border border-charcoal-350 p-2">Giã nát lá cây ngâm với bùn non suối tự nhiên trong 3 ngày đêm.</td>
          </tr>
          <tr>
            <td class="border border-charcoal-350 p-2 text-center font-bold text-brick-600">Đỏ gạch</td>
            <td class="border border-charcoal-350 p-2">Vỏ cây xà cừ cổ thụ</td>
            <td class="border border-charcoal-350 p-2">Nấu vỏ cây cô đặc lấy nước cốt rồi ngâm sợi bông trước khi dệt.</td>
          </tr>
          <tr>
            <td class="border border-charcoal-350 p-2 text-center font-bold text-gold-600">Vàng rơm</td>
            <td class="border border-charcoal-350 p-2">Củ nghệ rừng hoang dã</td>
            <td class="border border-charcoal-350 p-2">Nghiền nghệ tươi chắt nước cốt, đun sôi cùng sợi bông để bền màu.</td>
          </tr>
        </tbody>
      </table>
      <p>Phương pháp này giúp sợi nhuộm có mùi thơm dịu nhẹ của đại ngàn rừng già và giữ được độ tươi sáng hàng chục năm không phai màu.</p>`
    ]
  },
  {
    id: 'res-003',
    title: 'Âm Nhạc Cồng Chiêng - Di Sản Sống Của Người S\'tiêng',
    description: 'Tài liệu thuyết trình đa phương tiện về lịch sử, ý nghĩa tâm linh và vai trò của cồng chiêng trong đời sống cộng đồng.',
    type: 'presentation',
    subject: 'Giáo dục địa phương',
    grade: 'Lớp 11',
    school: 'THPT Lê Quý Đôn',
    author: 'Vũ Quang Huy',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    publishedAt: '2024-05-01',
    featured: true,
    downloadCount: 312,
    fileSize: '4.8 MB',
    motivation: 'Tiếng cồng chiêng là linh hồn kết nối con người với thế giới thần linh của người bản địa. Em thực hiện đề tài này để giúp các bạn trẻ hiểu và trân trọng hơn di sản văn hóa phi vật thể quý giá này.',
    keyFindings: [
      'Số hóa 6 bản thu âm cồng chiêng cổ tiêu biểu sử dụng trong Lễ hội mừng lúa mới của sóc Bom Bo.',
      'Xây dựng sơ đồ bố trí không gian trình diễn cồng chiêng và vũ điệu xoang truyền thống quanh bếp lửa.',
      'Tổng hợp thành công 12 tài liệu nghiên cứu chuyên sâu về nguồn gốc nhạc cụ đồng tại Đông Nam Bộ.'
    ],
    quizId: 'quiz-002',
    pages: [
      `<h2>CHƯƠNG I: CỒNG CHIÊNG TRONG ĐỜI SỐNG TÂM LINH S'TIÊNG</h2>
      <p>Cồng chiêng không đơn thuần là một loại nhạc cụ gõ bằng đồng, mà là tiếng nói tâm linh thiêng liêng nhất của đồng bào dân tộc thiểu số S'tiêng tại Xã Bù Đăng, Thành Phố Đồng Nai (Tỉnh Bình Phước cũ). Theo truyền thuyết cổ truyền, mỗi chiếc cồng, chiếc chiêng đều có một vị thần linh (gọi là Yang Ching) ngự trị. Tiếng cồng chiêng vang lên là phương tiện độc nhất vô nhị giúp con người đối thoại với thần linh, cầu mong trời đất phù hộ cho mùa màng bội thu, buôn sóc ấm no.</p>
      <p>Dự án đa phương tiện này được thực hiện nhằm ghi âm lại các bản nhạc chiêng cổ, số hóa quy trình trình diễn để lưu trữ làm giáo án số giáo dục truyền thống địa phương cho các thế hệ học sinh.</p>
      <blockquote>"Tiếng chiêng là hơi thở của đại ngàn, còn vang tiếng chiêng là buôn sóc còn trường tồn." <br/>— Trích lời cựu binh Điểu Lên (Sóc Bom Bo).</blockquote>`,
      
      `<h2>CHƯƠNG II: HỆ THỐNG DÀN NHẠC CỔ TRUYỀN S'TIÊNG</h2>
      <p>Dàn cồng chiêng S'tiêng có cấu trúc phân tầng vô cùng chặt chẽ, thông thường gồm từ 6 đến 12 chiếc chiêng đồng không núm (gọi là Ching) phối hợp nhịp nhàng với nhau:</p>
      <ul>
        <li><strong>Ching Mẹ (Ching u):</strong> Chiếc chiêng có kích thước lớn nhất, âm thanh trầm ấm vững chãi nhất, đóng vai trò giữ nhịp điệu và làm nền chính cho toàn bản nhạc.</li>
        <li><strong>Ching Cha & Ching Con:</strong> Các chiêng nhỏ hơn có cao độ thanh thoát, phụ trách đi giai điệu chính bay bổng và các đoạn đối thoại âm nhạc phức tạp.</li>
        <li><strong>Chống gõ đệm (Kơ-gơr):</strong> Trống da bò gõ nhịp đi kèm tạo không khí hào hùng sôi động cho buổi trình diễn quanh đống lửa.</li>
      </ul>
      <p>Nghệ thuật diễn xướng cồng chiêng Tây Nguyên đã được UNESCO vinh danh là Di sản văn hóa phi vật thể đại diện của nhân loại năm 2005. Việc hiểu về kết cấu dàn nhạc sẽ giúp các học sinh có cái nhìn khoa học, trân trọng tài năng phối khí độc đáo của người xưa.</p>
      <p>Giai điệu chiêng lan tỏa qua từng thung lũng Bù Đăng như một chất keo sơn gắn kết cộng đồng đoàn kết bền chặt.</p>`,
      
      `<h2>CHƯƠNG III: ĐỀ XUẤT PHÁT HUY GIÁ TRỊ DI SẢN</h2>
      <p>Để âm vang cồng chiêng sóc Bom Bo tiếp tục ngân vang trong đời sống hiện đại, đề tài nghiên cứu đề xuất ba hướng giáo dục cụ thể:</p>
      <ol>
        <li><strong>Thành lập Câu lạc bộ cồng chiêng học sinh:</strong> Tổ chức các lớp truyền dạy gõ chiêng và múa xoang truyền thống do nghệ nhân địa phương trực tiếp hướng dẫn tại các trường THPT Lê Quý Đôn.</li>
        <li><strong>Tích hợp công nghệ âm thanh đa phương tiện:</strong> Số hóa các giai điệu chiêng cổ đưa lên thư viện số trực tuyến giúp mọi người dễ dàng tiếp cận và học tập.</li>
        <li><strong>Tổ chức Ngày hội văn hóa địa phương:</strong> Đưa nội dung trình diễn cồng chiêng vào các hội diễn văn nghệ học đường thường niên để tôn vinh bản sắc dân tộc.</li>
      </ol>
      <p>Sự kết hợp giữa bảo tồn truyền thống và sức sáng tạo của tuổi trẻ chính là chìa khóa vàng mở ra tương lai rực rỡ cho di sản văn hóa phi vật thể Bù Đăng.</p>`
    ]
  },
])

const filteredResources = computed(() => {
  return resources.value.filter(res => {
    // Subject filter
    let matchesSubject = true
    if (activeSubject.value !== 'all') {
      if (activeSubject.value === 'history') {
        matchesSubject = res.subject.toLowerCase().includes('lịch sử')
      } else if (activeSubject.value === 'culture') {
        matchesSubject = res.subject.toLowerCase().includes('văn hóa') || res.subject.toLowerCase().includes('dân tộc') || res.subject.toLowerCase().includes('địa phương')
      } else if (activeSubject.value === 'geography') {
        matchesSubject = res.subject.toLowerCase().includes('địa lý') || res.subject.toLowerCase().includes('thiên nhiên') || res.subject.toLowerCase().includes('suối') || res.subject.toLowerCase().includes('thác')
      }
    }

    // Search query
    let matchesSearch = true
    if (schoolSearchQuery.value.trim()) {
      const q = schoolSearchQuery.value.toLowerCase().trim()
      matchesSearch = res.title.toLowerCase().includes(q) ||
                      res.description.toLowerCase().includes(q) ||
                      res.author.toLowerCase().includes(q) ||
                      res.school.toLowerCase().includes(q) ||
                      res.subject.toLowerCase().includes(q)
    }

    return matchesSubject && matchesSearch
  })
})

// Flashcards local data
interface Flashcard {
  term: string
  pronunciation: string
  definition: string
  category: string
  isFlipped: boolean
}

const flashcards = ref<Flashcard[]>([
  {
    term: 'Yang Ching',
    pronunciation: '/Giàng Chinh/',
    definition: 'Linh hồn trú ngụ trong bộ cồng chiêng theo quan niệm tâm linh của người S\'tiêng. Người S\'tiêng coi cồng chiêng là vật thiêng kết nối thần linh.',
    category: 'Tâm Linh',
    isFlipped: false,
  },
  {
    term: 'Đ\'rắp S\'lung',
    pronunciation: '/Đơ-rắp Sơ-lung/',
    definition: 'Nghĩa là "Rượu cần". Đây là thức uống truyền thống lên men từ hạt gạo/ngô rừng, tượng trưng cho sự hiếu khách và lòng tôn kính thần linh.',
    category: 'Ẩm Thực',
    isFlipped: false,
  },
  {
    term: 'Dak Mơ',
    pronunciation: '/Đác Mơ/',
    definition: 'Trong ngôn ngữ S\'tiêng, Dak nghĩa là nước. Dak Mơ có nghĩa là "nguồn nước của ước mơ và sự sống", là tên gốc của địa danh Thác Mơ.',
    category: 'Địa Danh',
    isFlipped: false,
  },
])

type ResourceType = SchoolResourceExtended['type']

const typeColors: Record<ResourceType, string> = {
  research: '#6B4C35',
  presentation: '#C9922A',
  artwork: '#2D5016',
  document: '#B87333',
  video: '#8B3A2A',
}

const typeIcons: Record<ResourceType, string> = {
  research: 'mdi:file-search',
  presentation: 'mdi:presentation',
  artwork: 'mdi:palette',
  document: 'mdi:file-document',
  video: 'mdi:video',
}

const typeLabels: Record<ResourceType, string> = {
  research: 'Nghiên Cứu',
  presentation: 'Thuyết Trình',
  artwork: 'Mỹ Thuật',
  document: 'Tài Liệu',
  video: 'Video',
}

function downloadFile(resource: SchoolResourceExtended) {
  resource.downloadCount++
  swal.fire({
    title: 'Tải tài liệu thành công!',
    html: `Hệ thống đang chuẩn bị tải tệp PDF <strong>"${resource.title}"</strong> (${resource.fileSize}).<br/><br/>Lượt tải đề tài này đã được ghi nhận trên cổng thông tin di sản.`,
    icon: 'success',
    background: '#1C1A18',
    color: '#FDFAF3',
    confirmButtonColor: '#C9922A',
    confirmButtonText: 'Đóng lại'
  })
}

function startResourceQuiz(resource: SchoolResourceExtended) {
  if (!resource.quizId) return
  
  const targetQuiz = quizStore.quizzes.find(q => q.id === resource.quizId)
  if (targetQuiz) {
    selectedResource.value = null // Close reading modal
    nextTick(() => {
      quizStore.startQuiz(targetQuiz)
    })
  } else {
    swal.fire({
      title: 'Thông báo',
      text: 'Hiện tại chưa có bộ câu hỏi trắc nghiệm riêng cho đề tài này.',
      icon: 'info',
      background: '#1C1A18',
      color: '#FDFAF3',
      confirmButtonColor: '#C9922A',
      confirmButtonText: 'Đóng lại'
    })
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 3D Flashcards Styles */
.perspective {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
  transition: transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

.flashcard-container:hover .transform-style-3d {
  box-shadow: 0 0 20px rgba(201, 146, 42, 0.45);
}
</style>
