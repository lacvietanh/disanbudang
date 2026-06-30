<template>
  <div class="min-h-screen bg-charcoal-900 flex flex-col lg:flex-row relative text-ivory pt-[72px]">
    <!-- Hidden h1 for SEO (heading hierarchy) -->
    <h1 class="sr-only">Cổng Học Tập Số — Di Sản Bù Đăng</h1>

    <!-- Global Background Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-earth-500/5 rounded-full blur-3xl" />
    </div>

    <!-- Cmd+K Search Overlay -->
    <SearchOverlay
      v-model:open="searchOverlayOpen"
      :resources="resources"
      :glossary="glossary"
      :landmarks="mapLandmarks"
      :lessons="lessonCatalog"
      @select-tab="(tab: string) => { activeTab = tab }"
      @select-landmark="(id: string) => { activeTab = 'map'; activeLandmark = mapLandmarks.find((l: { id: string }) => l.id === id) ?? null }"
      @filter-research="(q: string) => { paperSearchQuery = q }"
    />

    <!-- 1. LEFT SIDEBAR: Student Profile & Navigation Hub (Arc Browser / Notion Style) -->
    <!-- Mobile sidebar backdrop -->
    <div
      v-if="mobileSidebarOpen"
      class="lg:hidden fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm z-40"
      @click="mobileSidebarOpen = false"
    />
    <aside
      class="w-full lg:w-80 bg-charcoal-950 border-b lg:border-b-0 lg:border-r border-charcoal-850 flex flex-col shrink-0 z-30 relative"
      :class="mobileSidebarOpen ? 'fixed inset-0 z-50 overflow-y-auto' : ''"
    >
      <!-- Sidebar Header / Brand Logo -->
      <div class="p-6 border-b border-charcoal-850 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="/favicon/icon-192.png" alt="Logo" class="h-9 w-auto object-contain" />
          <div>
            <span class="font-heading font-bold text-sm tracking-tight block">Học Tập Số</span>
            <span class="text-gold-400 text-3xs uppercase font-bold tracking-widest block">Di Sản Bù Đăng</span>
          </div>
        </NuxtLink>
        <span class="text-charcoal-500 text-3xs font-semibold uppercase tracking-wider bg-charcoal-900 border border-charcoal-850 px-2 py-0.5 rounded">v2.0</span>
      </div>

      <!-- Student Profile Card (Google Education & Gamification) -->
      <div class="p-6 border-b border-charcoal-850 bg-charcoal-900/40 relative">
        <div class="flex items-center gap-3.5">
          <div class="relative">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-earth-700 to-gold-500 flex items-center justify-center font-heading font-bold text-charcoal-900 text-lg shadow-lg">
              HS
            </div>
            <!-- Streak Flame indicator -->
            <div class="absolute -bottom-1.5 -right-1.5 bg-charcoal-950 border border-charcoal-850 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md" title="Số ngày học liên tục (Streak)">
              <Icon name="mdi:fire" class="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span class="text-3xs font-bold text-orange-400">{{ streakDays }}</span>
            </div>
          </div>
          <div>
            <h4 class="font-heading font-bold text-sm text-ivory">Điểu Học Học</h4>
            <div class="flex items-center gap-1.5 mt-0.5">
              <span class="text-3xs bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold px-1.5 py-0.5 rounded uppercase">Cấp độ 3</span>
              <span class="text-3xs text-charcoal-400 font-semibold">Đại sứ Sơ cấp</span>
            </div>
          </div>
        </div>

        <!-- Experience Points (XP) Bar -->
        <div class="mt-4 space-y-1.5">
          <div class="flex justify-between text-3xs text-charcoal-400">
            <span>Tiến trình cấp</span>
            <span class="font-bold text-ivory">{{ userXP }} / 500 XP</span>
          </div>
          <div class="w-full h-1.5 bg-charcoal-850 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-earth-600 to-gold-500 rounded-full transition-all duration-500" :style="{ width: (userXP / 500 * 100) + '%' }" />
          </div>
        </div>
      </div>

      <!-- Navigation Tabs (Sidebar style) -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-none">
        <span class="px-3 text-3xs font-bold text-charcoal-500 uppercase tracking-widest block mb-2">MODULES HỌC TẬP</span>
        <button
          v-for="item in navItems"
          :key="item.id"
          class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-300 group"
          :class="activeTab === item.id ? 'bg-gold-500/10 text-gold-400 border-l-4 border-gold-500 pl-2' : 'text-charcoal-350 hover:text-ivory hover:bg-charcoal-900'"
          @click="activeTab = item.id"
        >
          <span class="flex items-center gap-2.5">
            <Icon :name="item.icon" class="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
            {{ item.label }}
          </span>
          <!-- Bullet/Notification counter if any -->
          <span v-if="item.badge" class="px-1.5 py-0.5 rounded-full text-3xs font-bold bg-charcoal-800 text-charcoal-400">
            {{ item.badge }}
          </span>
        </button>
      </nav>


    </aside>

    <!-- 2. MAIN WORKSPACE AREA: Dynamic Content Container -->
    <div class="flex-1 flex flex-col min-w-0 z-10 relative">
      <!-- Top header bar of workspace -->
      <header class="h-[72px] border-b border-charcoal-850 bg-charcoal-950/40 backdrop-blur-xl px-6 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-4">
          <h2 class="font-heading font-bold text-base md:text-lg flex items-center gap-2">
            <Icon v-if="activeTabInfo" :name="activeTabInfo.icon" class="w-5 h-5 text-gold-400" />
            {{ activeTabInfo?.label }}
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <!-- Active Fire Streak Animation -->
          <div class="hidden sm:flex items-center gap-2 bg-charcoal-950 border border-charcoal-850 px-3.5 py-1.5 rounded-full">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span class="text-3xs font-bold text-orange-400 uppercase tracking-wider">Lửa học tập đang cháy</span>
          </div>

          <!-- Omni Search Button (Cmd+K style) -->
          <button
            class="px-3.5 py-1.5 rounded-full border border-charcoal-850 bg-charcoal-900/60 hover:border-gold-500/40 hover:text-gold-400 text-xs flex items-center gap-2 text-charcoal-400 transition-all duration-300"
            @click="searchOverlayOpen = true"
            aria-label="Mở tìm kiếm (Cmd+K)"
          >
            <Icon name="mdi:magnify" class="w-4 h-4" />
            <span class="hidden md:inline">Tìm kiếm... (Cmd+K)</span>
          </button>

          <!-- Mobile sidebar toggle -->
          <button
            class="lg:hidden w-8 h-8 rounded-full border border-charcoal-850 bg-charcoal-900/60 flex items-center justify-center text-charcoal-400 hover:text-gold-400 transition-colors"
            @click="mobileSidebarOpen = !mobileSidebarOpen"
            aria-label="Mở menu điều hướng"
          >
            <Icon name="mdi:menu" class="w-4 h-4" />
          </button>
        </div>
      </header>

      <!-- WORKSPACE PANELS -->
      <div class="flex-1 p-6 overflow-y-auto">
        <!-- ============================================ -->
        <!-- MODULE 1: TRUNG TÂM TÀI LIỆU (Research Library) -->
        <!-- ============================================ -->
        <div v-if="activeTab === 'research'" class="space-y-6 max-w-6xl mx-auto animate-fade-in">

          <!-- Hero Stats Banner -->
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 border border-gold-500/15 p-6 md:p-8 shadow-xl">
            <!-- Background texture -->
            <div class="absolute inset-0 bg-[radial-gradient(rgba(201,146,42,0.04)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            <div class="absolute -top-20 -right-20 w-64 h-64 bg-gold-500/6 rounded-full blur-3xl pointer-events-none" />

            <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div class="space-y-1.5">
                <span class="text-gold-400 text-3xs font-bold uppercase tracking-widest">Trung Tâm Tư Liệu Số</span>
                <h3 class="font-heading text-xl md:text-2xl font-bold text-ivory leading-tight">Kho Nghiên Cứu<br class="hidden md:block" /> Lịch Sử & Văn Hóa Bù Đăng</h3>
                <p class="text-charcoal-400 text-xs max-w-sm leading-relaxed">Tải tài liệu, đọc trực tuyến và làm quiz ôn tập từ các đề tài nghiên cứu khoa học học sinh cấp tỉnh.</p>
              </div>

              <!-- Quick stats row -->
              <div class="flex items-center gap-3 shrink-0">
                <div class="text-center p-4 bg-charcoal-950/60 border border-charcoal-850 rounded-2xl min-w-[76px]">
                  <span class="block text-2xl font-bold text-gold-400 font-heading">{{ resources.length }}</span>
                  <span class="block text-3xs text-charcoal-450 uppercase tracking-wider mt-0.5">Tài liệu</span>
                </div>
                <div class="text-center p-4 bg-charcoal-950/60 border border-charcoal-850 rounded-2xl min-w-[76px]">
                  <span class="block text-2xl font-bold text-gold-400 font-heading">{{ resources.reduce((s, r) => s + r.downloadCount, 0) }}</span>
                  <span class="block text-3xs text-charcoal-450 uppercase tracking-wider mt-0.5">Lượt tải</span>
                </div>
                <div class="text-center p-4 bg-charcoal-950/60 border border-charcoal-850 rounded-2xl min-w-[76px]">
                  <span class="block text-2xl font-bold text-gold-400 font-heading">{{ resources.filter(r => r.quizId).length }}</span>
                  <span class="block text-3xs text-charcoal-450 uppercase tracking-wider mt-0.5">Có Quiz</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Academic Papers Empty & Grid State -->
          <EmptyState
            v-if="resources.length === 0"
            tab="research"
            :userXP="userXP"
            :streakDays="streakDays"
            @action="handleEmptyStateAction"
          />
          <template v-else>
            <!-- Featured Spotlight Paper -->
            <div
              v-if="resources.find(r => r.featured)"
              class="relative overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-r from-charcoal-950 to-charcoal-900 cursor-pointer hover:border-gold-500/50 transition-all duration-500 group shadow-gold/5 hover:shadow-xl"
              @click="openResource(resources.find(r => r.featured)!)"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-gold-500/3 to-transparent pointer-events-none group-hover:from-gold-500/6 transition-all duration-500" />
              <div class="flex flex-col md:flex-row gap-0">
                <!-- Cover image -->
                <div class="h-44 md:h-auto md:w-72 relative overflow-hidden bg-charcoal-900 shrink-0">
                  <img :src="resources.find(r => r.featured)!.coverImage" :alt="resources.find(r => r.featured)!.title" class="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal-950/60" />
                  <div class="absolute top-3 left-3">
                    <span class="px-2.5 py-1 bg-gold-500 text-charcoal-950 text-3xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                      <Icon name="mdi:star" class="w-3 h-3" />
                      Nổi Bật
                    </span>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider">{{ resources.find(r => r.featured)!.subject }}</span>
                      <span class="text-charcoal-600">•</span>
                      <span class="text-charcoal-450 text-3xs">{{ resources.find(r => r.featured)!.school }}</span>
                    </div>
                    <h4 class="font-heading font-bold text-ivory text-lg leading-snug group-hover:text-gold-300 transition-colors">{{ resources.find(r => r.featured)!.title }}</h4>
                    <p class="text-charcoal-350 text-xs leading-relaxed line-clamp-2">{{ resources.find(r => r.featured)!.description }}</p>
                  </div>

                  <!-- Key findings preview -->
                  <ul v-if="resources.find(r => r.featured)!.keyFindings?.length" class="space-y-1.5">
                    <li v-for="(finding, i) in resources.find(r => r.featured)!.keyFindings!.slice(0, 2)" :key="i"
                      class="flex items-start gap-2 text-2xs text-charcoal-350">
                      <Icon name="mdi:check-circle" class="w-3.5 h-3.5 text-gold-500/60 shrink-0 mt-0.5" />
                      <span class="line-clamp-1">{{ finding }}</span>
                    </li>
                  </ul>

                  <div class="flex items-center justify-between pt-2 border-t border-charcoal-850/60">
                    <div class="flex items-center gap-3 text-3xs text-charcoal-450">
                      <span class="flex items-center gap-1"><Icon name="mdi:account" class="w-3.5 h-3.5" />{{ resources.find(r => r.featured)!.author }}</span>
                      <span class="flex items-center gap-1"><Icon name="mdi:download" class="w-3.5 h-3.5" />{{ resources.find(r => r.featured)!.downloadCount }} lượt</span>
                    </div>
                    <span class="text-gold-400 text-3xs font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Đọc & Nghiên Cứu <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Filter bar + Search -->
            <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <!-- Type filter chips -->
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="typeFilter in ['all', ...Object.keys(typeLabels)]"
                  :key="typeFilter"
                  class="px-3.5 py-1.5 rounded-full text-3xs font-semibold uppercase tracking-wider transition-all duration-300"
                  :class="activeTypeFilter === typeFilter ? 'bg-gold-500 text-charcoal-950 shadow-gold/20 shadow' : 'bg-charcoal-950 border border-charcoal-800 text-charcoal-450 hover:text-ivory hover:border-charcoal-700'"
                  @click="activeTypeFilter = typeFilter"
                >
                  {{ typeFilter === 'all' ? 'Tất cả' : typeLabels[typeFilter] }}
                </button>
              </div>
              <!-- Search -->
              <div class="relative w-full md:w-72 shrink-0">
                <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  v-model="paperSearchQuery"
                  type="text"
                  placeholder="Tìm đề tài, tác giả, lĩnh vực..."
                  class="w-full pl-9 pr-4 py-2 bg-charcoal-950 border border-charcoal-800 rounded-xl text-xs text-ivory focus:outline-none focus:border-gold-500/60"
                />
              </div>
            </div>

            <div v-if="filteredPapers.length === 0" class="text-center py-12 border border-dashed border-charcoal-800 rounded-2xl">
              <Icon name="mdi:magnify-minus" class="w-10 h-10 text-charcoal-700 mx-auto mb-3" />
              <p class="text-charcoal-500 text-sm font-semibold">Không tìm thấy tài liệu phù hợp</p>
              <p class="text-charcoal-600 text-xs mt-1">Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc</p>
              <button class="mt-4 px-4 py-2 bg-charcoal-900 border border-charcoal-800 text-gold-400 hover:text-gold-300 text-xs font-bold rounded-xl" @click="paperSearchQuery = ''; activeTypeFilter = 'all'">
                Xóa bộ lọc
              </button>
            </div>

            <!-- Academic Papers Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="res in filteredPapers"
                :key="res.id"
                class="book-container flex flex-col h-[390px]"
              >
                <div
                  class="book-card flex-1 bg-charcoal-950 border border-charcoal-800 rounded-2xl overflow-hidden flex flex-col cursor-pointer relative"
                  @click="openResource(res)"
                >
                  <!-- Book spine 3D visual -->
                  <div class="book-spine" />
                  
                  <!-- Book Image Header -->
                  <div class="h-32 relative overflow-hidden bg-charcoal-900 pl-4">
                    <img :src="res.coverImage" :alt="res.title" class="w-full h-full object-cover opacity-80" />
                    <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 to-transparent" />
                    <span
                      class="absolute top-4 right-4 text-3xs font-semibold px-2 py-0.5 rounded border uppercase tracking-wider bg-charcoal-950/95"
                      :style="{ color: typeColors[res.type], borderColor: typeColors[res.type] + '40' }"
                    >
                      {{ typeLabels[res.type] }}
                    </span>
                    <span v-if="res.featured" class="absolute top-4 left-8 text-3xs font-bold px-2 py-0.5 rounded bg-gold-500 text-charcoal-950 uppercase">
                      ⭐ Nổi Bật
                    </span>
                  </div>

                  <!-- Book Body -->
                  <div class="p-5 pl-8 flex-1 flex flex-col justify-between">
                    <div class="space-y-1.5">
                      <div class="flex items-center justify-between">
                        <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider">{{ res.subject }}</span>
                        <button
                          class="p-1 text-charcoal-450 hover:text-gold-400 transition-colors"
                          @click.stop="toggleBookmark(res.id)"
                          title="Bookmark đề tài"
                        >
                          <Icon :name="savedBooks.includes(res.id) ? 'mdi:bookmark' : 'mdi:bookmark-outline'" class="w-4 h-4" />
                        </button>
                      </div>
                      <h4 class="font-heading font-bold text-ivory text-sm leading-snug line-clamp-2 hover:text-gold-300 transition-colors">
                        {{ res.title }}
                      </h4>
                      <p class="text-charcoal-400 text-2xs line-clamp-2 leading-relaxed">
                        {{ res.description }}
                      </p>
                    </div>

                    <!-- Metadata -->
                    <div class="pt-3 border-t border-charcoal-850 flex items-center justify-between text-3xs text-charcoal-400">
                      <div class="flex flex-col">
                        <span class="font-bold text-ivory">{{ res.author }}</span>
                        <span>{{ res.school }} • Lớp {{ res.grade }}</span>
                      </div>
                      <div class="text-right">
                        <span class="block">Tải về: {{ res.downloadCount }}</span>
                        <span>{{ res.fileSize }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- ============================================ -->
        <!-- MODULE 2: TRỢ LÝ AI KHẢO CỨU DI SẢN (AI Bot) -->
        <!-- ============================================ -->
        <div v-if="activeTab === 'ai'" class="max-w-4xl mx-auto space-y-6 animate-fade-in flex flex-col h-[calc(100vh-160px)]">
          <div class="border-b border-charcoal-850 pb-4 flex items-center justify-between">
            <div>
              <h3 class="font-heading text-lg font-bold text-ivory">Trợ Lý AI Khảo Cứu Di Sản</h3>
              <p class="text-charcoal-400 text-xs mt-0.5">Đặt câu hỏi để tìm hiểu nhanh lịch sử, văn hóa Xã Bù Đăng, Thành Phố Đồng Nai từ kho dữ liệu số của trang web.</p>
            </div>
            <button class="text-3xs uppercase tracking-wider font-semibold text-charcoal-400 hover:text-gold-400 transition-colors" @click="clearChat">
              Xóa cuộc trò chuyện
            </button>
          </div>

          <!-- Conversation Box -->
          <div class="flex-1 bg-charcoal-950 border border-charcoal-800 rounded-2xl p-5 overflow-y-auto space-y-4 min-h-[300px] flex flex-col">
            <!-- If history is empty/welcome message only, show premium EmptyState context -->
            <template v-if="aiMessages.length <= 1">
              <div class="flex gap-4 p-4 rounded-xl text-sm bg-gold-500/5 border border-gold-500/10 mr-12 shrink-0">
                <div class="w-8 h-8 rounded-lg bg-gold-500 text-charcoal-950 flex items-center justify-center shrink-0">
                  <Icon name="mdi:robot" class="w-4 h-4" />
                </div>
                <div class="space-y-1.5 text-left">
                  <span class="block text-3xs font-bold uppercase tracking-wider text-charcoal-450">Trợ lý AI di sản</span>
                  <p class="leading-relaxed text-charcoal-200 select-text whitespace-pre-wrap">{{ aiMessages[0]?.text || 'Xin chào! Tôi là trợ lý AI di sản Bù Đăng. Bạn muốn tìm hiểu lịch sử nào hôm nay?' }}</p>
                </div>
              </div>
              
              <EmptyState
                tab="ai"
                :userXP="userXP"
                :streakDays="streakDays"
                @action="handleEmptyStateAction"
                class="my-auto"
              />
            </template>

            <template v-else>
              <div
                v-for="(msg, idx) in aiMessages"
                :key="idx"
                class="flex gap-4 p-4 rounded-xl text-sm"
                :class="msg.role === 'user' ? 'bg-charcoal-900 border border-charcoal-800 self-end ml-12' : 'bg-gold-500/5 border border-gold-500/10 mr-12'"
              >
                <!-- Avatar icon -->
                <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="msg.role === 'user' ? 'bg-gradient-to-tr from-earth-700 to-gold-600 text-charcoal-900 font-bold' : 'bg-gold-500 text-charcoal-950'">
                  <Icon :name="msg.role === 'user' ? 'mdi:account' : 'mdi:robot'" class="w-4 h-4" />
                </div>
                <div class="space-y-1.5 text-left font-body">
                  <span class="block text-3xs font-bold uppercase tracking-wider text-charcoal-450">{{ msg.role === 'user' ? 'Học sinh' : 'Trợ lý AI di sản' }}</span>
                  <p class="leading-relaxed text-charcoal-200 select-text whitespace-pre-wrap">{{ msg.text }}</p>
                </div>
              </div>
            </template>

            <!-- Thinking state -->
            <div v-if="isAiThinking" class="flex gap-4 p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 mr-12 text-sm animate-pulse">
              <div class="w-8 h-8 rounded-lg bg-gold-500 text-charcoal-950 flex items-center justify-center shrink-0">
                <Icon name="mdi:robot" class="w-4 h-4" />
              </div>
              <div class="space-y-2 text-left">
                <span class="block text-3xs font-bold uppercase tracking-wider text-charcoal-450">Trợ lý AI di sản</span>
                <p class="text-charcoal-400 text-xs">AI đang đọc hiểu cơ sở dữ liệu di sản địa phương...</p>
              </div>
            </div>
          </div>

          <!-- Pre-configured prompt chips -->
          <div v-if="aiMessages.length > 1" class="space-y-2">
            <span class="text-3xs uppercase tracking-widest font-bold text-charcoal-500">CÂU HỎI GỢI Ý HỌC TẬP:</span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="chip in aiChips"
                :key="chip"
                class="px-3 py-1.5 bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/40 rounded-lg text-2xs text-charcoal-300 hover:text-gold-400 text-left transition-all duration-300"
                @click="sendAiMessage(chip)"
              >
                {{ chip }}
              </button>
            </div>
          </div>

          <!-- User input area -->
          <div class="relative flex items-center gap-3">
            <input
              v-model="aiInput"
              type="text"
              placeholder="Hỏi AI về cồng chiêng Bom Bo, Chiến khu Đ, trảng cỏ Bù Lạch..."
              class="flex-1 bg-charcoal-950 border border-charcoal-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500/60 pr-12 text-ivory"
              @keydown.enter="sendAiMessage(aiInput)"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gold-500 text-charcoal-950 hover:bg-gold-400 flex items-center justify-center transition-all duration-300"
              @click="sendAiMessage(aiInput)"
              title="Gửi câu hỏi"
            >
              <Icon name="mdi:send" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- MODULE 3: BẢN ĐỒ HỌC TẬP DI TÍCH (Interactive Map Route) -->
        <!-- ============================================ -->
        <div v-if="activeTab === 'map'" class="max-w-5xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h3 class="font-heading text-lg font-bold text-ivory">Bản Đồ Học Tập Di Tích</h3>
            <p class="text-charcoal-400 text-xs mt-0.5">Click chọn các điểm dừng học tập khảo cứu di sản để xem tư liệu thực địa và trả lời câu hỏi ôn tập tại chỗ.</p>
          </div>

          <!-- Map catalog Empty & Map State -->
          <EmptyState
            v-if="mapLandmarks.length === 0"
            tab="map"
            :userXP="userXP"
            :streakDays="streakDays"
            @action="handleEmptyStateAction"
          />
          <template v-else>
            <!-- Custom Interactive Vector Map Representation -->
            <div class="relative w-full h-[320px] bg-charcoal-950 border border-charcoal-850 rounded-2xl overflow-hidden flex items-center justify-center p-8">
              <!-- Simulated grid paths -->
              <div class="absolute inset-0 bg-[radial-gradient(rgba(201,146,42,0.04)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
              
              <!-- Styled trail path line svg -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 120 180 Q 250 80 450 180 T 780 120" fill="none" stroke="#C9922A" stroke-width="2" stroke-dasharray="6,6" opacity="0.3" />
              </svg>

              <!-- Learning Landmarks markers -->
              <div
                v-for="landmark in mapLandmarks"
                :key="landmark.id"
                class="absolute flex flex-col items-center group cursor-pointer transition-all duration-350"
                :style="{ left: landmark.x + '%', top: landmark.y + '%' }"
                @click="activeLandmark = landmark"
              >
                <!-- Pin circle with glow -->
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-xl transition-all duration-300 relative"
                  :class="activeLandmark?.id === landmark.id ? 'bg-gold-500 border-gold-300 scale-115 shadow-gold-500/20' : 'bg-charcoal-900 border-gold-500/60 hover:scale-110 hover:border-gold-400'"
                >
                  <!-- Pulse animation if active -->
                  <div v-if="activeLandmark?.id === landmark.id" class="absolute inset-0 bg-gold-400 rounded-full animate-ping opacity-50" />
                  <Icon :name="landmark.icon" class="w-5 h-5 text-ivory" :class="activeLandmark?.id === landmark.id ? 'text-charcoal-950' : 'text-gold-400'" />
                </div>
                <span class="mt-2 text-3xs font-heading font-bold uppercase tracking-wider bg-charcoal-950/90 border border-charcoal-800 px-2 py-0.5 rounded shadow whitespace-nowrap text-ivory">
                  {{ landmark.name }}
                </span>
              </div>
            </div>

            <!-- Slide Open Landmark Detail Panel -->
            <div v-if="activeLandmark" class="bg-charcoal-950 border border-charcoal-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <!-- Left: Description and Media Player -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gold-400 text-3xs font-bold uppercase tracking-widest bg-gold-500/10 px-2.5 py-1 rounded">Điểm khảo cứu</span>
                  <span class="text-charcoal-450 text-3xs font-semibold flex items-center gap-1">
                    <Icon name="mdi:map-marker" class="w-3.5 h-3.5 text-gold-500" />
                    Bù Đăng, Đồng Nai
                  </span>
                </div>
                <h4 class="font-heading font-bold text-ivory text-lg">{{ activeLandmark.name }}</h4>
                <p class="text-charcoal-300 text-xs leading-relaxed text-justify">{{ activeLandmark.desc }}</p>
                
                <!-- Video preview / Audio player combo -->
                <div class="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                      <Icon :name="activeLandmark.audioGuide ? 'mdi:volume-high' : 'mdi:video'" class="w-5 h-5" />
                    </div>
                    <div>
                      <span class="block text-xs font-semibold text-ivory">{{ activeLandmark.audioGuide ? 'Audio Guide Thuyết Minh' : 'Flycam Trực Địa' }}</span>
                      <span class="text-charcoal-450 text-3xs">Thời lượng: 2:15 • Tiếng Việt</span>
                    </div>
                  </div>
                  <button
                    class="btn-primary text-3xs py-1.5 px-3 uppercase tracking-wider font-bold"
                    @click="playLandmarkAudio(activeLandmark.name, activeLandmark.desc)"
                  >
                    Nghe Thuyết Minh
                  </button>
                </div>
              </div>

              <!-- Right: Linked Papers & Quizzes -->
              <div class="space-y-4 border-t md:border-t-0 md:border-l border-charcoal-850 pt-4 md:pt-0 md:pl-6">
                <h5 class="text-xs font-bold uppercase tracking-wider text-charcoal-450">Tài liệu &amp; Bài tập ôn tập</h5>
                
                <!-- Linked Paper -->
                <div
                  v-if="activeLandmark.paper"
                  class="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/30 transition-colors cursor-pointer"
                  @click="openResource(activeLandmark.paper)"
                >
                  <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider block mb-1">Nghiên cứu học sinh</span>
                  <span class="block text-xs font-bold text-ivory line-clamp-1 mb-1">{{ activeLandmark.paper.title }}</span>
                  <span class="text-charcoal-450 text-3xs">{{ activeLandmark.paper.school }} • Lớp {{ activeLandmark.paper.grade }}</span>
                </div>

                <!-- Linked Quiz -->
                <div class="p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 flex justify-between items-center">
                  <div>
                    <span class="block text-xs font-bold text-gold-400">Câu Hỏi Ôn Tập Địa Điểm</span>
                    <span class="text-charcoal-450 text-3xs">Tải kiến thức để nhận ngay huy hiệu di tích.</span>
                  </div>
                  <button
                    class="btn-ghost border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 text-3xs py-1.5 px-4 font-bold"
                    @click="startLandmarkQuiz"
                  >
                    Làm Quiz
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- ============================================ -->
        <!-- MODULE 4: TỪ ĐIỂN S'TIÊNG (Glossary) -->
        <!-- ============================================ -->
        <div v-if="activeTab === 'glossary'" class="space-y-6 max-w-6xl mx-auto animate-fade-in">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-charcoal-850 pb-4">
            <div>
              <h3 class="font-heading text-lg font-bold text-ivory">Từ Điển Thuật Ngữ S'tiêng Tương Tác</h3>
              <p class="text-charcoal-400 text-xs mt-0.5">Tìm hiểu, học phát âm bằng máy nói (TTS) kết hợp thẻ lật tự học.</p>
            </div>
            
            <!-- Selector to toggle between dictionary and flashcards -->
            <div class="flex bg-charcoal-950 p-1 border border-charcoal-800 rounded-xl">
              <button
                class="px-4 py-1.5 rounded-lg text-2xs font-bold transition-all duration-300"
                :class="glossaryMode === 'list' ? 'bg-gold-500 text-charcoal-950' : 'text-charcoal-400 hover:text-ivory'"
                @click="glossaryMode = 'list'"
              >
                Tra cứu từ điển
              </button>
              <button
                class="px-4 py-1.5 rounded-lg text-2xs font-bold transition-all duration-300"
                :class="glossaryMode === 'flashcards' ? 'bg-gold-500 text-charcoal-950' : 'text-charcoal-400 hover:text-ivory'"
                @click="glossaryMode = 'flashcards'"
              >
                Flashcards (3D Flip)
              </button>
            </div>
          </div>

          <!-- Glossary Empty & List/Flashcard State -->
          <EmptyState
            v-if="glossary.length === 0"
            tab="glossary"
            :userXP="userXP"
            :streakDays="streakDays"
            @action="handleEmptyStateAction"
          />
          <template v-else>
            <!-- SUB-VIEW 1: TRACING LIST -->
            <div v-if="glossaryMode === 'list'" class="space-y-6">
              <!-- Search & Cat filters combo -->
              <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="cat in glossaryCategories"
                    :key="cat"
                    class="px-3.5 py-1 rounded-full text-3xs font-semibold uppercase tracking-wider transition-all duration-300"
                    :class="activeGlossaryCat === cat ? 'bg-gold-500 text-charcoal-950' : 'bg-charcoal-950 border border-charcoal-800 text-charcoal-450 hover:text-ivory hover:border-charcoal-700'"
                    @click="activeGlossaryCat = cat"
                  >
                    {{ cat === 'all' ? 'Tất cả từ' : cat }}
                  </button>
                </div>

                <div class="relative w-full md:w-80 shrink-0">
                  <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                  <input
                    v-model="glossarySearchQuery"
                    type="text"
                    placeholder="Tra nghĩa từ, phiên âm tiếng S'tiêng..."
                    class="w-full pl-9 pr-4 py-2 bg-charcoal-950 border border-charcoal-800 rounded-xl text-xs text-ivory focus:outline-none focus:border-gold-500/60"
                  />
                </div>
              </div>

              <!-- List Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="(word, idx) in filteredGlossary"
                  :key="idx"
                  class="bg-charcoal-950 border border-charcoal-800 hover:border-gold-500/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
                >
                  <div class="flex items-start justify-between">
                    <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                      {{ word.category }}
                    </span>
                    
                    <button
                      class="w-7 h-7 rounded-full bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-950 flex items-center justify-center transition-all duration-300 text-gold-400"
                      title="Nghe phát âm"
                      @click="pronounceTerm(word.term, word.pronunciation)"
                    >
                      <Icon name="mdi:volume-high" class="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div class="mt-3">
                    <h4 class="font-heading font-bold text-ivory text-base">{{ word.term }}</h4>
                    <p class="text-charcoal-450 text-3xs italic">Phiên âm: {{ word.pronunciation }}</p>
                  </div>

                  <p class="text-charcoal-300 text-xs leading-relaxed pt-2 border-t border-charcoal-850 mt-3 select-text font-body">
                    {{ word.definition }}
                  </p>
                </div>
              </div>
            </div>

            <!-- SUB-VIEW 2: 3D FLASHCARDS -->
            <div v-else class="max-w-4xl mx-auto space-y-8 text-center">
              <p class="text-charcoal-400 text-xs">Nhấn vào thẻ để lật ngược mặt xem định nghĩa thuật ngữ S'tiêng bản địa.</p>

              <!-- Cards Deck Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                <div
                  v-for="(card, idx) in glossary"
                  :key="idx"
                  class="flashcard-container cursor-pointer perspective h-48 group"
                  @click="card.isFlipped = !card.isFlipped"
                >
                  <div
                    class="w-full h-full relative transition-transform duration-500 transform-style-3d shadow-md rounded-2xl"
                    :class="{ 'rotate-y-180': card.isFlipped }"
                  >
                    <!-- Front card face -->
                    <div class="absolute inset-0 backface-hidden bg-charcoal-950 border border-charcoal-800 rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <span class="text-charcoal-500 text-3xs font-bold uppercase tracking-wider block">Thuật ngữ bản địa</span>
                        <h4 class="font-heading font-bold text-gold-400 text-lg mt-2">{{ card.term }}</h4>
                        <p class="text-charcoal-350 text-2xs mt-0.5 italic">Phát âm: {{ card.pronunciation }}</p>
                      </div>
                      <div class="flex items-center justify-between text-charcoal-500 text-3xs font-bold uppercase">
                        <span>{{ card.category }}</span>
                        <span class="text-gold-400 flex items-center gap-1">Lật thẻ <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5" /></span>
                      </div>
                    </div>

                    <!-- Back card face -->
                    <div class="absolute inset-0 backface-hidden bg-earth-900 border border-earth-800 rounded-2xl p-6 flex flex-col justify-between rotate-y-180">
                      <div>
                        <span class="text-gold-300 text-3xs font-bold uppercase tracking-wider block">Ý nghĩa chi tiết</span>
                        <p class="text-xs text-charcoal-200 leading-relaxed mt-2 line-clamp-4 font-body">{{ card.definition }}</p>
                      </div>
                      <div class="flex items-center justify-between text-charcoal-300 text-3xs font-bold uppercase">
                        <span>{{ card.category }}</span>
                        <span class="text-gold-300 flex items-center gap-1">Lật lại <Icon name="mdi:rotate-3d-variant" class="w-3.5 h-3.5" /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- ============================================ -->
        <!-- MODULE 5: KHO ĐA PHƯƠNG TIỆN (Media Archive) -->
        <!-- ============================================ -->
        <div v-if="activeTab === 'media'" class="space-y-6 max-w-6xl mx-auto animate-fade-in">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-charcoal-850 pb-4">
            <div>
              <h3 class="font-heading text-lg font-bold text-ivory">Kho Lưu Trữ Đa Phương Tiện Di Sản</h3>
              <p class="text-charcoal-400 text-xs mt-0.5">Kho tàng lưu trữ hình ảnh cổ truyền, video flycam nghiên cứu, và tệp âm thanh bản sắc nhạc cụ Bù Đăng.</p>
            </div>

            <!-- Media Sub-tab Switcher -->
            <div class="flex bg-charcoal-950 p-1 border border-charcoal-800 rounded-xl">
              <button
                v-for="sub in mediaSubtabs"
                :key="sub.id"
                class="px-4 py-1.5 rounded-lg text-2xs font-bold transition-all duration-300 flex items-center gap-1"
                :class="activeMediaSubtab === sub.id ? 'bg-gold-500 text-charcoal-950' : 'text-charcoal-400 hover:text-ivory'"
                @click="activeMediaSubtab = sub.id"
              >
                <Icon :name="sub.icon" class="w-3.5 h-3.5" />
                {{ sub.label }}
              </button>
            </div>
          </div>

          <!-- Media Empty & Content States -->
          <EmptyState
            v-if="imageStories.length === 0"
            tab="media"
            :userXP="userXP"
            :streakDays="streakDays"
            @action="handleEmptyStateAction"
          />
          <template v-else>
            <!-- SUB-VIEW 1: IMAGES GALLERY -->
            <div v-if="activeMediaSubtab === 'photos'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="(item, idx) in imageStories"
                :key="idx"
                class="group relative h-76 rounded-2xl overflow-hidden border border-charcoal-850 bg-charcoal-950 cursor-pointer shadow-lg"
                @click="openImageModal(item)"
              >
                <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-transparent" />

                <div class="absolute bottom-0 inset-x-0 p-5 space-y-1.5">
                  <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider">{{ item.tag }}</span>
                  <h4 class="font-heading font-bold text-ivory text-sm leading-snug">{{ item.title }}</h4>
                  <p class="text-charcoal-350 text-2xs line-clamp-2 leading-relaxed font-body">{{ item.story }}</p>
                  <div class="flex items-center gap-1 text-gold-400 text-3xs font-bold uppercase pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Đọc ký ức di sản <Icon name="mdi:chevron-right" class="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <!-- SUB-VIEW 2: VIDEOS WITH TRANSCRIPTS -->
            <div v-else-if="activeMediaSubtab === 'videos'" class="space-y-6">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Video List -->
                <div class="lg:col-span-2 space-y-4">
                  <div class="aspect-video bg-charcoal-950 rounded-2xl overflow-hidden border border-charcoal-800 relative flex items-center justify-center group shadow-xl">
                    <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent pointer-events-none" />
                    <!-- Placeholder preview image -->
                    <img src="/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp" alt="Video cover" class="absolute inset-0 w-full h-full object-cover opacity-60" />
                    
                    <!-- Play icon overlay -->
                    <div class="w-16 h-16 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center scale-100 group-hover:scale-110 shadow-lg shadow-gold-500/20 transition-all duration-300 cursor-pointer relative z-10" @click="startVideoPlayback">
                      <Icon name="mdi:play" class="w-8 h-8 ml-1" />
                    </div>
                    
                    <div class="absolute bottom-6 left-6 right-6 text-left relative z-10 pointer-events-none">
                      <span class="text-gold-400 text-3xs font-bold uppercase tracking-widest block mb-1">Phim tư liệu điền dã</span>
                      <h4 class="font-heading font-bold text-ivory text-base md:text-lg font-heading">Ký ức giã gạo nuôi quân sóc Bom Bo kháng chiến chống Mỹ cứu nước</h4>
                    </div>
                  </div>
                </div>

                <!-- Sidebar: Video Transcript (UX feature) -->
                <div class="bg-charcoal-950 border border-charcoal-800 rounded-2xl p-5 flex flex-col h-full max-h-[360px]">
                  <span class="text-xs font-bold uppercase tracking-wider text-charcoal-400 pb-3 border-b border-charcoal-850 flex items-center gap-1.5">
                    <Icon name="mdi:text-box-search-outline" class="w-4 h-4 text-gold-400" />
                    Lời thoại tư liệu (Transcript)
                  </span>
                  <div class="flex-1 overflow-y-auto space-y-3 pt-3 text-xs leading-relaxed text-charcoal-350 pr-1 select-text scrollbar-none font-body">
                    <p><span class="font-bold text-gold-400 mr-2">[00:15]</span>"...Tiếng chày giã gạo sóc Bom Bo đã vang vọng khắp núi rừng Bù Đăng, khơi dậy tinh thần cách mạng quật khởi..."</p>
                    <p><span class="font-bold text-gold-400 mr-2">[01:10]</span>"...Các nghệ nhân kể lại rằng, đồng bào S'tiêng đã làm việc thâu đêm suốt sáng, đốt đuốc lồ ô dệt vải, giã gạo nuôi chí sĩ quân giải phóng..."</p>
                    <p><span class="font-bold text-gold-400 mr-2">[02:05]</span>"...Bài hát Tiếng Chày Trên Sóc Bom Bo ra đời từ chính không khí chiến đấu hăng say hào hùng thực tế đó..."</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- SUB-VIEW 3: AUDIO / PODCASTS LIST -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div
                v-for="audio in mockAudios"
                :key="audio.title"
                class="p-5 rounded-2xl bg-charcoal-950 border border-charcoal-800 flex justify-between items-center hover:border-gold-500/25 transition-colors group"
              >
                <div class="flex items-center gap-4 text-left">
                  <div class="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon :name="audio.icon" class="w-6 h-6" />
                  </div>
                  <div>
                    <span class="block text-xs font-bold text-ivory">{{ audio.title }}</span>
                    <span class="text-charcoal-450 text-3xs font-body">{{ audio.cat }} • {{ audio.duration }}</span>
                  </div>
                </div>
                <button
                  class="w-8 h-8 rounded-full bg-charcoal-900 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 flex items-center justify-center transition-all duration-300 shrink-0"
                  @click="playLandmarkAudio(audio.title, 'Bản nhạc di sản ' + audio.title)"
                  title="Phát âm thanh"
                >
                  <Icon name="mdi:play" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- ============================================ -->
        <!-- MODULE 6: THÀNH TỰU & BỘ SƯU TẬP (User Space) -->
        <!-- ============================================ -->
        <div v-if="activeTab === 'achievements'" class="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <EmptyState
            v-if="userBadges.length === 0"
            tab="achievements"
            :userXP="userXP"
            :streakDays="streakDays"
            @action="handleEmptyStateAction"
          />
          <template v-else>
            <!-- User Streaks & Badges grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Streak summary card -->
              <div class="p-6 rounded-2xl bg-charcoal-950 border border-charcoal-800 space-y-4">
                <span class="text-gold-400 text-3xs font-bold uppercase tracking-widest block">Thành tựu học tập</span>
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Icon name="mdi:fire" class="w-7 h-7" />
                  </div>
                  <div>
                    <span class="block text-2xl font-bold text-ivory">{{ streakDays }} ngày</span>
                    <span class="text-charcoal-400 text-3xs">Chuỗi ngày tự học liên tục</span>
                  </div>
                </div>
                <p class="text-charcoal-400 text-3xs leading-relaxed pt-2 border-t border-charcoal-850">
                  Hãy duy trì truy cập và trả lời ít nhất 1 câu trắc nghiệm di sản mỗi ngày để giữ lửa đống lửa học tập Bù Đăng bập bùng!
                </p>
              </div>

              <!-- Badges Unlocked -->
              <div class="p-6 rounded-2xl bg-charcoal-950 border border-charcoal-800 md:col-span-2 space-y-4">
                <span class="text-gold-400 text-3xs font-bold uppercase tracking-widest block">Huy hiệu đạt được ({{ userBadges.length }})</span>
                <div class="flex flex-wrap gap-4">
                  <div
                    v-for="badge in userBadges"
                    :key="badge.name"
                    class="flex items-center gap-2.5 px-3 py-2 bg-charcoal-900 border border-charcoal-850 rounded-xl"
                    :title="badge.desc"
                  >
                    <div class="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400">
                      <Icon name="mdi:trophy-outline" class="w-4 h-4" />
                    </div>
                    <div>
                      <span class="block text-2xs font-bold text-ivory">{{ badge.name }}</span>
                      <span class="text-charcoal-500 text-3xs">{{ badge.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Saved Collections Space -->
            <div class="space-y-4">
              <div class="flex items-center justify-between border-b border-charcoal-850 pb-2">
                <h4 class="font-heading font-bold text-base text-ivory">Bộ Sưu Tập Của Tôi</h4>
                <button class="btn-ghost border border-charcoal-800 hover:border-gold-500/40 text-gold-400 text-3xs py-1 px-3 rounded-lg" @click="createNewCollection">
                  + Tạo bộ sưu tập
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  v-for="col in collections"
                  :key="col.name"
                  class="p-5 rounded-2xl bg-charcoal-950 border border-charcoal-800 hover:border-gold-500/25 transition-colors relative group"
                >
                  <span class="text-gold-400 text-3xs font-bold uppercase tracking-wider block mb-1">Thư mục</span>
                  <span class="block font-heading font-bold text-sm text-ivory mb-1">{{ col.name }}</span>
                  <span class="text-charcoal-450 text-3xs font-body">{{ col.count }} tài liệu lưu trữ</span>
                  
                  <div class="mt-4 flex items-center gap-1.5 text-3xs text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer" @click="activeTab = 'research'">
                    Mở xem chi tiết
                    <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- ============================================ -->
        <!-- MODULE 7: GÓC GIÁO VIÊN (Teacher Workspace) -->
        <!-- ============================================ -->
        <div v-if="activeTab === 'teacher'" class="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h3 class="font-heading text-lg font-bold text-ivory">Góc Giáo Viên Địa Phương</h3>
            <p class="text-charcoal-400 text-xs mt-0.5">Không gian chia sẻ giáo án giáo dục địa phương, thiết kế slide bài giảng, đề ôn tập và tài liệu học thuật.</p>
          </div>

          <!-- Document Upload Dropzone (Mockup) -->
          <div class="p-8 rounded-2xl bg-charcoal-950 border-2 border-dashed border-charcoal-800 hover:border-gold-500/40 flex flex-col items-center justify-center gap-3 text-center transition-colors cursor-pointer" @click="mockUploadDocument">
            <div class="w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-400 flex items-center justify-center shadow-inner">
              <Icon name="mdi:cloud-upload-outline" class="w-8 h-8" />
            </div>
            <div>
              <span class="block text-sm font-bold text-ivory">Tải tài liệu giáo án của giáo viên</span>
              <span class="text-charcoal-450 text-xs mt-0.5">Chấp nhận định dạng tệp .pdf, .pptx, .docx (Dung lượng tối đa 15MB)</span>
            </div>
            <button class="btn-primary text-xs py-2 px-6 mt-2">
              Chọn tệp tin tải lên
            </button>
          </div>

          <!-- List of uploaded items Empty & List States -->
          <div class="space-y-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-charcoal-400">Giáo án đóng góp gần đây</h4>
            
            <EmptyState
              v-if="teacherUploadedFiles.length === 0"
              tab="teacher"
              :userXP="userXP"
              :streakDays="streakDays"
              @action="handleEmptyStateAction"
            />
            
            <div v-else class="space-y-3">
              <div
                v-for="file in teacherUploadedFiles"
                :key="file"
                class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-850 flex justify-between items-center text-xs"
              >
                <div class="flex items-center gap-3">
                  <Icon name="mdi:file-document-outline" class="w-5 h-5 text-gold-400" />
                  <span class="font-semibold text-ivory">{{ file }}</span>
                </div>
                <div class="flex items-center gap-4 text-3xs text-charcoal-450">
                  <span>Trạng thái: <span class="text-green-500 font-bold">Đã kiểm duyệt</span></span>
                  <button class="hover:text-gold-400 transition-colors" title="Tải giáo án"><Icon name="mdi:download-outline" class="w-4.5 h-4.5" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        <!-- ============================================ -->
        <!-- MODULE 8: HÀNH TRÌNH BÀI HỌC (Content Light Experience Heavy) -->
        <!-- ============================================ -->
        <div v-if="activeTab === 'lessons'" class="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <div>
            <span class="section-label">Hành Trình Học Tập</span>
            <h3 class="font-heading text-lg font-bold text-ivory">Bài Học Mô-đun Di Sản</h3>
            <p class="text-charcoal-400 text-xs mt-0.5">Mỗi bài học được thiết kế theo nguyên tắc "Ít dữ liệu — Nhiều trải nghiệm". Chọn bài để bắt đầu hành trình khám phá.</p>
          </div>

          <!-- Lesson catalog Empty & Grid State -->
          <EmptyState
            v-if="lessonCatalog.length === 0"
            tab="lessons"
            :userXP="userXP"
            :streakDays="streakDays"
            @action="handleEmptyStateAction"
          />
          <template v-else>
            <!-- Lesson catalog grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <NuxtLink
                v-for="lesson in lessonCatalog"
                :key="lesson.id"
                :to="`/study/lesson/${lesson.id}`"
                class="group block bg-charcoal-950 border border-charcoal-800 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <!-- Cover image area -->
                <div class="h-36 relative overflow-hidden bg-charcoal-900">
                  <img v-if="lesson.coverImage" :src="lesson.coverImage" :alt="lesson.title" class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" loading="lazy" />
                  <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />
                  <div class="absolute top-3 right-3 flex items-center gap-1.5 bg-charcoal-950/80 border border-charcoal-800 px-2 py-1 rounded-full text-3xs">
                    <Icon name="mdi:clock-outline" class="w-3 h-3 text-charcoal-400" />
                    <span class="text-charcoal-400">~{{ lesson.estimatedMinutes }} phút</span>
                  </div>
                  <div class="absolute bottom-3 left-4">
                    <span class="text-3xs font-bold uppercase tracking-wider text-gold-400">{{ lesson.subject }}</span>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-5 space-y-3">
                  <h4 class="font-heading font-bold text-sm text-ivory group-hover:text-gold-300 transition-colors leading-snug">{{ lesson.title }}</h4>
                  <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-2">{{ lesson.tldr }}</p>

                  <!-- Block indicators -->
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    <span v-for="block in lesson.availableBlocks" :key="block"
                      class="text-3xs px-2 py-0.5 bg-charcoal-900 border border-charcoal-800 text-charcoal-400 rounded-full">
                      {{ block }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-charcoal-850">
                    <span class="text-gold-400 text-3xs font-bold flex items-center gap-1">
                      <Icon name="mdi:star-outline" class="w-3.5 h-3.5" />
                      +{{ lesson.xpReward }} XP
                    </span>
                    <span class="text-charcoal-400 text-3xs flex items-center gap-1 group-hover:text-gold-400 transition-colors">
                      Bắt đầu học <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- Coming soon notice -->
            <div class="text-center py-8 border border-dashed border-charcoal-800 rounded-2xl">
              <Icon name="mdi:book-plus-outline" class="w-10 h-10 text-charcoal-700 mx-auto mb-3" />
              <p class="text-charcoal-500 text-sm font-semibold">Thêm bài học đang được biên soạn</p>
              <p class="text-charcoal-600 text-xs mt-1">Dữ liệu di sản sẽ được số hóa và đưa vào từng module bài học</p>
            </div>
          </template>
        </div>

    <!-- 3. FULL-TEXT DOCUMENT READER MODAL (Highly Interactive PDF Simulator) -->

    <Transition name="fade">
      <div v-if="selectedResource" class="fixed inset-0 z-80 flex items-center justify-center p-4">
        <!-- Backdrop overlay -->
        <div class="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm animate-fade-in" @click="selectedResource = null" />

        <!-- Modal Wrapper Content -->
        <div class="relative w-full max-w-4xl bg-charcoal-950 border border-charcoal-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh] animate-fade-in">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm relative z-10 shrink-0">
            <span class="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Icon :name="typeIcons[selectedResource.type] || 'mdi:file-document-outline'" class="w-4 h-4" />
              Đọc Trực Tuyến &amp; Nghiên Cứu
            </span>
            <button class="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 transition-colors" @click="selectedResource = null">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <!-- Tab Selector inside PDF Reader -->
          <div class="flex border-b border-charcoal-800 bg-charcoal-950/50 relative z-10 shrink-0">
            <button
              class="flex-1 py-3 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
              :class="activeModalTab === 'overview' ? 'border-gold-500 text-gold-400 bg-charcoal-900/40' : 'border-transparent text-charcoal-450 hover:text-ivory'"
              @click="activeModalTab = 'overview'"
            >
              <Icon name="mdi:information-outline" class="w-4 h-4 text-gold-500" />
              Tổng Quan Tài Liệu
            </button>
            <button
              class="flex-1 py-3 text-2xs uppercase tracking-widest font-bold text-center border-b-2 transition-all duration-300 flex items-center justify-center gap-2"
              :class="activeModalTab === 'document' ? 'border-gold-500 text-gold-400 bg-charcoal-900/40' : 'border-transparent text-charcoal-450 hover:text-ivory'"
              @click="activeModalTab = 'document'"
            >
              <Icon name="mdi:book-open-page-variant" class="w-4 h-4 text-gold-500" />
              Đọc Toàn Văn &amp; Ghi Chú
            </button>
          </div>

          <!-- Modal Body Content -->
          <div class="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
            <!-- TAB 1: OVERVIEW -->
            <div v-if="activeModalTab === 'overview'" class="space-y-6 max-w-2xl mx-auto">
              <!-- Author Info Box -->
              <div class="bg-charcoal-900 border border-charcoal-850 p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p class="text-charcoal-450 text-3xs uppercase tracking-wider font-semibold">Biên soạn</p>
                  <p class="font-heading font-bold text-ivory text-sm mt-0.5">{{ selectedResource.author }}</p>
                  <p class="text-charcoal-400 text-3xs mt-0.5">{{ selectedResource.school }} • {{ selectedResource.grade }}</p>
                </div>
                <div class="text-right">
                  <p class="text-charcoal-450 text-3xs uppercase tracking-wider font-semibold">Môn học liên quan</p>
                  <p class="text-gold-400 font-bold text-sm mt-0.5">{{ selectedResource.subject }}</p>
                  <p class="text-charcoal-400 text-3xs mt-0.5">Xuất bản: {{ selectedResource.publishedAt }}</p>
                </div>
              </div>

              <!-- Title -->
              <h3 class="font-heading font-bold text-ivory text-xl md:text-2xl leading-snug">{{ selectedResource.title }}</h3>

              <!-- Motivation -->
              <div class="space-y-1.5">
                <span class="text-gold-400 text-3xs uppercase tracking-widest font-bold block">Ý tưởng nghiên cứu</span>
                <p class="text-charcoal-200 text-xs md:text-sm leading-relaxed italic">"{{ selectedResource.motivation }}"</p>
              </div>

              <!-- Key findings -->
              <div class="space-y-3">
                <span class="text-gold-400 text-3xs uppercase tracking-widest font-bold block">Kết quả điền dã nổi bật</span>
                <ul class="space-y-2">
                  <li v-for="(finding, idx) in selectedResource.keyFindings" :key="idx" class="flex items-start gap-2.5 text-xs text-charcoal-300 leading-relaxed">
                    <div class="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="mdi:check" class="w-3 h-3 text-gold-400" />
                    </div>
                    <span>{{ finding }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- TAB 2: INTERACTIVE READ SHEET & ANNOTATION SIDEBAR -->
            <div v-else-if="activeModalTab === 'document'" class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <!-- Left: Document paper (A4 size layout) -->
              <div class="lg:col-span-2 space-y-4 flex flex-col items-center">
                <!-- Mini PDF Toolbar -->
                <div class="w-full flex items-center justify-between bg-charcoal-900 border border-charcoal-800 px-4 py-2 rounded-xl text-xs text-charcoal-400 shadow-inner">
                  <span class="font-semibold flex items-center gap-1.5 text-2xs">
                    <Icon name="mdi:file-pdf-box" class="w-4 h-4 text-red-500" />
                    {{ selectedResource.id }}_science_report.pdf
                  </span>
                  <div class="flex items-center gap-3">
                    <button class="hover:text-gold-400 transition-colors" title="Bút highlight dòng" @click="activeHighlightPen = !activeHighlightPen" :class="activeHighlightPen ? 'text-gold-400' : 'text-charcoal-450'">
                      <Icon name="mdi:pencil-outline" class="w-4.5 h-4.5" />
                    </button>
                    <span class="w-px h-3.5 bg-charcoal-850" />
                    <span class="text-3xs px-1.5 py-0.5 bg-charcoal-950 border border-charcoal-800 rounded font-bold">100%</span>
                  </div>
                  <button class="hover:text-gold-400 transition-colors" @click="downloadFile(selectedResource)">
                    <Icon name="mdi:download-outline" class="w-4 h-4" />
                  </button>
                </div>

                <!-- Academic Paper design -->
                <div class="w-full min-h-[440px] bg-[#FAF8F5] text-charcoal-900 p-8 rounded-2xl shadow-2xl border border-beige-300 relative overflow-hidden transition-all duration-300 select-text">
                  <!-- Watermark -->
                  <div class="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none select-none">
                    <img src="/favicon/icon-192.png" alt="Watermark logo" class="w-56 h-56 object-contain" />
                  </div>

                  <div class="border-b border-beige-300 pb-2 mb-6 flex justify-between items-center text-[9px] text-charcoal-500 uppercase tracking-widest font-semibold">
                    <span>{{ selectedResource.school }} — Tài liệu điền dã địa phương</span>
                    <span>Trang {{ currentDocPage + 1 }} / {{ selectedResource.pages ? selectedResource.pages.length : 1 }}</span>
                  </div>

                  <!-- Page Content HTML rendering -->
                  <div 
                    class="prose prose-sm max-w-none text-charcoal-800 leading-relaxed text-justify prose-headings:font-heading prose-headings:text-earth-900 prose-headings:mt-4 prose-headings:mb-2 prose-p:mb-3 prose-blockquote:border-l-earth-500 prose-blockquote:bg-earth-50/50 prose-blockquote:p-4 prose-blockquote:my-4 prose-blockquote:italic prose-strong:text-earth-900 prose-ol:list-decimal prose-ol:pl-4 prose-ul:list-disc prose-ul:pl-4"
                    v-html="selectedResource.pages ? selectedResource.pages[currentDocPage] : '<p>Không tìm thấy toàn văn tài liệu.</p>'"
                    @mouseup="handleTextSelection"
                  />
                </div>

                <!-- Page changer controls -->
                <div class="w-full flex items-center justify-between border-t border-charcoal-850 pt-4 mt-2">
                  <button class="btn-secondary text-xs py-2 px-4 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none" :disabled="currentDocPage === 0" @click="currentDocPage--">
                    <Icon name="mdi:arrow-left" class="w-4 h-4" />
                    Trang Trước
                  </button>
                  <span class="text-charcoal-400 text-xs font-semibold">
                    Trang {{ currentDocPage + 1 }} / {{ selectedResource.pages ? selectedResource.pages.length : 1 }}
                  </span>
                  <button class="btn-secondary text-xs py-2 px-4 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none" :disabled="currentDocPage === (selectedResource.pages ? selectedResource.pages.length - 1 : 0)" @click="currentDocPage++">
                    Trang Sau
                    <Icon name="mdi:arrow-right" class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Right Sidebar: Interactive Annotation, Notes & Highlights -->
              <div class="space-y-4 bg-charcoal-900 border border-charcoal-850 rounded-2xl p-5 h-full max-h-[500px] overflow-y-auto flex flex-col justify-between">
                <div class="space-y-4">
                  <span class="text-2xs font-bold uppercase tracking-wider text-charcoal-450 pb-2 border-b border-charcoal-850 block">Ghi chú &amp; Highlights ({{ bookHighlights.length }})</span>
                  
                  <!-- Display active highlights -->
                  <div class="space-y-3 flex-1 overflow-y-auto pr-1">
                    <div
                      v-for="hl in bookHighlights"
                      :key="hl.id"
                      class="p-3 bg-charcoal-950 border border-charcoal-850 rounded-xl space-y-1.5 relative group"
                    >
                      <button class="absolute top-2 right-2 text-charcoal-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" title="Xóa ghi chú" @click="deleteHighlight(hl.id)">
                        <Icon name="mdi:close-circle" class="w-4 h-4" />
                      </button>
                      <span class="text-[9px] font-bold text-gold-400 uppercase">Trang {{ hl.page }}</span>
                      <p class="text-2xs italic leading-relaxed text-charcoal-300 border-l border-gold-500/40 pl-2">
                        "{{ hl.text }}"
                      </p>
                      <p v-if="hl.note" class="text-xs font-medium text-ivory">
                        👉 {{ hl.note }}
                      </p>
                    </div>

                    <!-- Empty Annotation state -->
                    <div v-if="bookHighlights.length === 0" class="py-10 text-center text-charcoal-500 text-xs">
                      <Icon name="mdi:pencil-outline" class="w-8 h-8 mx-auto mb-2 text-charcoal-600" />
                      Hãy bôi đen chữ trên trang giấy bên cạnh để tạo highlight và ghi chú cá nhân!
                    </div>
                  </div>
                </div>

                <!-- Input area to manually add note for selected text -->
                <div v-if="selectedText" class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-850 space-y-3 mt-4">
                  <span class="text-[9px] font-bold uppercase tracking-wider text-gold-400 block">Đang chọn bôi đen</span>
                  <p class="text-3xs italic line-clamp-2 text-charcoal-400">"{{ selectedText }}"</p>
                  <input
                    v-model="activeNoteInput"
                    type="text"
                    placeholder="Viết ghi chú ngắn cho dòng này..."
                    class="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-800 rounded-lg text-xs placeholder-charcoal-600 text-ivory focus:outline-none"
                    @keydown.enter="saveActiveNote"
                  />
                  <div class="flex justify-end gap-2 text-3xs">
                    <button class="px-2 py-1 text-charcoal-400" @click="selectedText = ''">Hủy</button>
                    <button class="px-3 py-1 bg-gold-500 text-charcoal-950 rounded font-bold" @click="saveActiveNote">Lưu Note</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-6 py-4 border-t border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-between shrink-0">
            <span class="text-charcoal-500 text-xs font-semibold">Dung lượng: {{ selectedResource.fileSize }}</span>
            <div class="flex items-center gap-3">
              <button class="btn-ghost text-xs md:text-sm py-2.5" @click="selectedResource = null">Đóng lại</button>
              <button v-if="selectedResource.quizId" class="btn-secondary text-xs md:text-sm py-2.5 px-4 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 transition-colors flex items-center gap-1.5" @click="startResourceQuiz(selectedResource)">
                <Icon name="mdi:play-circle-outline" class="w-4 h-4" />
                Làm Quiz Ôn Tập
              </button>
              <button class="btn-primary text-xs md:text-sm py-2.5 bg-gold-500 text-charcoal-950 border-transparent shadow-gold flex items-center gap-1.5 animate-pulse" @click="downloadFile(selectedResource)">
                <Icon name="mdi:download" class="w-4 h-4" />
                Tải Báo Cáo PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- FULL-SIZE IMAGE & STORY MODAL -->
    <Transition name="fade">
      <div v-if="selectedImageItem" class="fixed inset-0 z-80 flex items-center justify-center p-4">
        <!-- Backdrop overlay -->
        <div class="absolute inset-0 bg-charcoal-950/85 backdrop-blur-sm" @click="selectedImageItem = null" />

        <!-- Content card -->
        <div class="relative w-full max-w-3xl bg-charcoal-950 border border-charcoal-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[85vh] md:h-[450px]">
          <!-- Left photo -->
          <div class="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden bg-charcoal-900 shrink-0">
            <img :src="selectedImageItem.image" :alt="selectedImageItem.title" class="w-full h-full object-cover" />
          </div>

          <!-- Right story text details -->
          <div class="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between text-3xs">
                <span class="text-gold-400 font-bold uppercase tracking-wider">{{ selectedImageItem.tag }}</span>
                <span class="text-charcoal-450 font-semibold flex items-center gap-1">
                  <Icon name="mdi:map-marker" class="w-3.5 h-3.5 text-gold-500" />
                  Xã Bù Đăng, Đồng Nai
                </span>
              </div>
              <h3 class="font-heading font-bold text-ivory text-lg md:text-xl leading-tight">
                {{ selectedImageItem.title }}
              </h3>
              <p class="text-charcoal-300 text-xs md:text-sm leading-relaxed text-justify pt-3 border-t border-charcoal-850 select-text">
                {{ selectedImageItem.story }}
              </p>
            </div>

            <div class="pt-6 flex justify-end">
              <button class="btn-primary text-xs py-2 px-6" @click="selectedImageItem = null">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useStudySeo } from '~/composables/useMuseumSeo'
import { useSwal } from '~/composables/useSwal'
import { useQuizStore } from '~/stores/quiz'
import EmptyState from '~/components/study/EmptyState.vue'

// Inject EducationalOrganization + LearningResource schema for SEO
useStudySeo()

const route = useRoute()
const { observeAll } = useScrollReveal()

onMounted(() => {
  nextTick(() => observeAll())
  
  // Sync tab from query parameter on mount
  if (route.query.tab && navItems.some(i => i.id === route.query.tab)) {
    activeTab.value = route.query.tab as string
  }
})

// Sync tab dynamically if query parameter changes
watch(() => route.query.tab, (newTab) => {
  if (newTab && navItems.some(i => i.id === newTab)) {
    activeTab.value = newTab as string
  }
})

const swal = useSwal()
const quizStore = useQuizStore()

const typeColors: Record<string, string> = {
  research: '#B87333', // copper
  presentation: '#2D5016', // forest
  artwork: '#C9922A', // gold
  document: '#6B4C35', // earth
  video: '#8B3A2A' // brick
}

const typeLabels: Record<string, string> = {
  research: 'Nghiên cứu',
  presentation: 'Slide bài giảng',
  artwork: 'Dự án nghệ thuật',
  document: 'Tài liệu giáo án',
  video: 'Video phóng sự'
}

const typeIcons: Record<string, string> = {
  research: 'mdi:file-document-outline',
  presentation: 'mdi:presentation-play',
  artwork: 'mdi:palette-outline',
  document: 'mdi:folder-open-outline',
  video: 'mdi:video-outline'
}

// State management
const activeTab = ref('research')
const streakDays = ref(5)
const userXP = ref(380)
const searchOverlayOpen = ref(false)
const mobileSidebarOpen = ref(false)

// Lesson catalog for tab display and SearchOverlay
const lessonCatalog = ref([
  {
    id: 'chien-khu-d',
    title: 'Chiến Khu Đ — Căn Cứ Địa Cách Mạng Huyền Thoại',
    subject: 'Lịch sử địa phương',
    tldr: 'Hệ thống căn cứ địa cách mạng nằm sâu trong rừng nguyên sinh Bù Đăng, đóng vai trò quyết định trong káng chiến chống Pháp và Mỹ.',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    xpReward: 80,
    estimatedMinutes: 12,
    availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận', 'Hotspot'],
  },
  {
    id: 'cong-chieng-stieng',
    title: 'Cồng Chiêng S\'tiêng — Tiếng Nói Của Đại Ngàn',
    subject: 'Văn hóa dân tộc',
    tldr: 'Di sản văn hóa phi vật thể UNESCO — cồng chiêng là tiếng nói tâm linh của đồng bào S\'tiêng Bù Đăng.',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    xpReward: 75,
    estimatedMinutes: 10,
    availableBlocks: ['Flashcards', 'Quiz', 'Thuật ngữ', 'Gợi mở'],
  },
  {
    id: 'soc-bom-bo',
    title: 'Sóc Bom Bo — Tiếng Chày Giã Gạo Kháng Chiến',
    subject: 'Lịch sử cách mạng',
    tldr: 'Nơi khởi nguồn bài ca bất hủ, ghi dấu sự đồng lòng kiên trung giã gạo thâu đêm nuôi quân của đồng bào S\'tiêng.',
    coverImage: '/images/heritage/lich-su/soc-bom-bo-md.webp',
    xpReward: 90,
    estimatedMinutes: 15,
    availableBlocks: ['Timeline', 'Quiz', 'Audio', 'Văn bản'],
  },
  {
    id: 'trang-co-bu-lach',
    title: 'Danh Thắng Trảng Cỏ Bù Lạch — Kỳ Quan Thiên Nhiên',
    subject: 'Địa lý địa phương',
    tldr: 'Khám phá thung lũng trảng cỏ xanh mướt tự nhiên bao quanh hồ nước trong veo giữa lòng rừng già Bù Đăng.',
    coverImage: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png',
    xpReward: 70,
    estimatedMinutes: 8,
    availableBlocks: ['Hotspot', 'Quiz', 'Gallery'],
  }
])

const userBadges = ref([
  { name: 'Đại sứ Bù Đăng', desc: 'Bắt đầu hành trình nghiên cứu di sản địa phương', date: '2026-06-15' },
  { name: 'Chiến sĩ Điền dã', desc: 'Đọc hết 3 báo cáo khoa học học sinh', date: '2026-06-25' }
])

const collections = ref([
  { name: 'Tài liệu Ôn thi Địa phương', count: 3 },
  { name: 'Văn hóa cổ truyền S\'tiêng', count: 5 }
])

const navItems = [
  { id: 'research', label: 'Trung Tâm Tư Liệu', icon: 'mdi:file-document-outline', badge: '3' },
  { id: 'lessons', label: 'Hành Trình Bài Học', icon: 'mdi:book-open-variant', badge: 'Mới' },
  { id: 'ai', label: 'AI Tra Cứu Di Sản', icon: 'mdi:robot' },
  { id: 'map', label: 'Bản Đồ Học Tập', icon: 'mdi:map-outline' },
  { id: 'glossary', label: 'Từ Điển S\'tiêng', icon: 'mdi:translate' },
  { id: 'media', label: 'Kho Đa Phương Tiện', icon: 'mdi:image-multiple-outline' },
  { id: 'achievements', label: 'Hồ Sơ & Thành Tích', icon: 'mdi:trophy-outline' },
  { id: 'teacher', label: 'Góc Giáo Viên', icon: 'mdi:school-outline' }
]

const activeTabInfo = computed(() => {
  return navItems.find(i => i.id === activeTab.value) || navItems[0]
})

// Search filters
const paperSearchQuery = ref('')
const activeTypeFilter = ref('all')
const glossarySearchQuery = ref('')
const activeGlossaryCat = ref('all')
const glossaryMode = ref('list')
const activeHighlightPen = ref(false)

const glossaryCategories = ['all', 'Tâm Linh', 'Ẩm Thực', 'Địa Danh', 'Vật Dụng']

// Modal Document Reader View State
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
const activeModalTab = ref<'overview' | 'document'>('overview')
const currentDocPage = ref(0)
const selectedText = ref('')
const activeNoteInput = ref('')

// Local Storage simulation of user notes and highlights
interface TextAnnotation {
  id: string
  bookId: string
  page: number
  text: string
  note?: string
}

const userAnnotations = ref<TextAnnotation[]>([])

const bookHighlights = computed(() => {
  if (!selectedResource.value) return []
  return userAnnotations.value.filter(hl => hl.bookId === selectedResource.value?.id)
})

// Text selection highlight logic
function handleTextSelection() {
  if (!activeHighlightPen.value) return
  const selection = window.getSelection()
  if (selection && selection.toString().trim().length > 3) {
    selectedText.value = selection.toString().trim()
  }
}

function saveActiveNote() {
  if (!selectedResource.value || !selectedText.value) return
  
  userAnnotations.value.push({
    id: 'note-' + Date.now(),
    bookId: selectedResource.value.id,
    page: currentDocPage.value + 1,
    text: selectedText.value,
    note: activeNoteInput.value.trim() || undefined
  })
  
  // Award XP for taking notes
  userXP.value += 15
  if (userXP.value >= 500) {
    userXP.value = 500
  }

  // Clear inputs
  selectedText.value = ''
  activeNoteInput.value = ''

  swal.fire({
    title: 'Đã lưu ghi chú!',
    text: 'Bạn được cộng +15 XP vì tinh thần tự học tự ghi chép.',
    icon: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    background: '#1C1A18',
    color: '#FDFAF3'
  })
}

function deleteHighlight(id: string) {
  userAnnotations.value = userAnnotations.value.filter(hl => hl.id !== id)
}

// Pre-defined resources data
const resources = ref<SchoolResourceExtended[]>([
  {
    id: 'res-001',
    title: 'Lịch Sử Hình Thành Chiến Khu Đ Qua Lời Kể Nhân Chứng Lịch Sử',
    description: 'Nghiên cứu điền dã ghi chép lại câu chuyện chiến đấu kiên cường của các cựu chiến binh Chiến khu Đ năm xưa.',
    type: 'research',
    subject: 'Lịch sử địa phương',
    grade: '12',
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
            <td class="border border-charcoal-350 p-2 font-semibold">Thị B'Rông</td>
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
    grade: '9',
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
    grade: '11',
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
        <li><strong>Ching Cha &amp; Ching Con:</strong> Các chiêng nhỏ hơn có cao độ thanh thoát, phụ trách đi giai điệu chính bay bổng và các đoạn đối thoại âm nhạc phức tạp.</li>
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
  {
    id: 'res-004',
    title: 'Nghi Thức Lễ Hội Mừng Lúa Mới Của Người S\'tiêng',
    description: 'Báo cáo điền dã chi tiết về các bước tế lễ thần Yang lúa và cộng đồng trong dịp tết lớn nhất năm của buôn sóc.',
    type: 'document',
    subject: 'Giáo dục địa phương',
    grade: '10',
    school: 'THPT Lê Quý Đôn',
    author: 'Trần Thị Mai',
    coverImage: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    publishedAt: '2024-05-15',
    featured: false,
    downloadCount: 198,
    fileSize: '1.9 MB',
    motivation: 'Nhằm xây dựng tài liệu tham khảo giảng dạy chính thống cho phân môn Giáo dục địa phương tại tỉnh, chúng tôi tiến hành ghi chép hệ thống toàn bộ nghi trình lễ hội.',
    keyFindings: [
      'Ghi chép và hệ thống hóa 5 bước tế lễ chính thức của lễ hội Mừng lúa mới.',
      'Sưu tầm và biên dịch 3 bài khấn cầu thần Yang lúa cổ truyền bằng tiếng S\'tiêng.',
      'Lập danh mục 8 lễ vật bắt buộc phải chuẩn bị trong mâm cúng cộng đồng.'
    ],
    pages: [
      `<h2>CHƯƠNG I: Ý NGHĨA TÂM LINH CỦA LỄ MỪNG LÚA MỚI</h2>
      <p>Lễ hội Mừng lúa mới (trong tiếng S'tiêng gọi là Lễ cúng tạ ơn Yang Sri) là một nét đẹp văn hóa tâm linh đặc sắc và quan trọng bậc nhất của đồng bào dân tộc thiểu số S'tiêng tại Xã Bù Đăng, Thành Phố Đồng Nai. Lễ hội được tổ chức hàng năm sau khi kết thúc vụ gặt cuối cùng, thường vào khoảng cuối năm âm lịch.</p>
      <p>Nghi lễ nhằm bày tỏ lòng biết ơn sâu sắc đối với Thần Lúa (Yang Sri) và các vị thần linh đã che chở, mang lại mùa màng bội thu, buôn làng no ấm không gặp dịch bệnh thiên tai.</p>`,
      `<h2>CHƯƠNG II: TIẾN TRÌNH VÀ CÁC NGHI THỨC CHÍNH</h2>
      <p>Lễ hội diễn ra trong không khí trang nghiêm và rộn rã với 2 phần chính: Phần lễ cúng tạ ơn thần linh và phần hội cộng đồng.</p>
      <ul>
        <li><strong>Phần Lễ:</strong> Già làng hoặc người có uy tín cao sẽ thực hiện các bài khấn cúng tại bếp lửa hoặc bàn cúng trung tâm. Các lễ vật như gà trống thiến, cơm lam dẻo thơm dâng lên ban thờ.</li>
        <li><strong>Phần Hội:</strong> Mọi người tụ tập ca hát xung quanh bếp lửa lớn, cùng uống rượu cần, nhảy múa điệu múa xoang cổ truyền dưới tiếng nhạc cồng chiêng vang động núi rừng.</li>
      </ul>`
    ]
  },
  {
    id: 'res-005',
    title: 'Kỹ Thuật Chế Tác Đàn Đá & Nhạc Cụ Tre Nứa Bản Địa Bù Đăng',
    description: 'Nghiên cứu khảo sát khảo cổ học học sinh về cách chọn đá, ghè đẽo đá rực rỡ sắc thái âm thanh tự nhiên Đông Nam Bộ.',
    type: 'artwork',
    subject: 'Nghệ thuật cổ truyền',
    grade: '11',
    school: 'THPT Chuyên Quang Trung',
    author: 'Nhóm học sinh năng khiếu Vật lý - Lịch sử',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/dan-da-khao-co.webp',
    publishedAt: '2024-06-10',
    featured: false,
    downloadCount: 145,
    fileSize: '5.2 MB',
    motivation: 'Đàn đá là một trong những nhạc cụ cổ xưa nhất của nhân loại được phát hiện tại Việt Nam. Chúng em muốn phân tích vật lý kết hợp lịch sử chế tác đàn để giữ gìn âm thanh ngàn năm.',
    keyFindings: [
      'Khảo sát và chụp ảnh chi tiết 3 bộ đàn đá cổ được gìn giữ bởi các dòng họ lâu đời.',
      'Đo đạc tần số âm thanh của từng thanh đá bằng phần mềm chuyên dụng và so sánh âm giai phương Tây.',
      'Tái dựng quy trình ghè đẽo cân chỉnh âm thanh thanh đá truyền thống từ đá sừng.'
    ],
    pages: [
      `<h2>CHƯƠNG I: ĐÀN ĐÁ - ÂM VANG TỪ LÒNG ĐẤT CỔ XƯA</h2>
      <p>Đàn đá không chỉ là hiện vật khảo cổ học mà còn là biểu tượng nghệ thuật âm nhạc đỉnh cao của cư dân bản địa tiền sử sinh sống dọc theo hệ thống sông Đồng Nai. Tại Bù Đăng, những bộ đàn đá cổ được người dân phát hiện sâu dưới các tầng đất đỏ bazan nứt nẻ.</p>
      <p>Âm thanh thanh thoát, vang vọng xa xăm của đàn đá biểu hiện cho sự giao hòa giữa con người và thế giới thiên nhiên kỳ vĩ xung quanh.</p>`,
      `<h2>CHƯƠNG II: CHỌN ĐÁ VÀ KỸ THUẬT GHÈ ĐẼO</h2>
      <p>Để tạo ra một thanh đá phát ra âm thanh chuẩn xác, các nghệ nhân xưa phải tìm kiếm loại đá sừng (andesite) hoặc đá silic cực kỳ quý hiếm trên các sườn núi cao. Đá phải có độ đặc ruột tuyệt đối và không bị rạn nứt ngầm bên trong.</p>
      <p>Quy trình ghè đẽo đòi hỏi sự khéo léo tỉ mỉ tuyệt đối: ghè rìa ngoài để hạ cao độ, mài mỏng ở giữa để tăng cao độ thanh âm đá.</p>`
    ]
  }
])

const filteredPapers = computed(() => {
  const q = paperSearchQuery.value.trim().toLowerCase()
  const type = activeTypeFilter.value
  
  return resources.value.filter(res => {
    const matchesType = type === 'all' || res.type === type
    const matchesQuery = !q || 
      res.title.toLowerCase().includes(q) ||
      res.author.toLowerCase().includes(q) ||
      res.school.toLowerCase().includes(q) ||
      res.subject.toLowerCase().includes(q)
    return matchesType && matchesQuery
  })
})

// Glossary & Dictionary Data
interface GlossaryTerm {
  term: string
  pronunciation: string
  definition: string
  category: 'Tâm Linh' | 'Ẩm Thực' | 'Địa Danh' | 'Vật Dụng'
  isFlipped?: boolean
}

const glossary = ref<GlossaryTerm[]>([
  { term: 'Yang Ching', pronunciation: '/Giàng Chinh/', definition: 'Linh hồn ngự trị trong cồng chiêng theo tâm linh S\'tiêng. Cồng chiêng là vật thiêng kết nối trời đất.', category: 'Tâm Linh', isFlipped: false },
  { term: 'Đ\'rắp S\'lung', pronunciation: '/Đơ-rắp Sơ-lung/', definition: 'Rượu cần lên men gạo hoặc ngô truyền thống từ các loại men lá rừng tự nhiên.', category: 'Ẩm Thực', isFlipped: false },
  { term: 'Dak Mơ', pronunciation: '/Đác Mơ/', definition: 'Trong tiếng S\'tiêng là nguồn nước của ước mơ, nguồn gốc tên gọi của Thác Mơ.', category: 'Địa Danh', isFlipped: false },
  { term: 'Yang Bri', pronunciation: '/Giàng Bri/', definition: 'Thần rừng vĩ đại, vị thần bảo vệ buôn làng khỏi thiên tai và thú dữ.', category: 'Tâm Linh', isFlipped: false },
  { term: 'Bro', pronunciation: '/Brô/', definition: 'Đàn tre truyền thống làm từ thân cây tre khô, phát ra âm thanh mộc mạc.', category: 'Vật Dụng', isFlipped: false }
])

const filteredGlossary = computed(() => {
  return glossary.value.filter(word => {
    let matchesCat = activeGlossaryCat.value === 'all' || word.category === activeGlossaryCat.value
    let matchesSearch = !glossarySearchQuery.value.trim()
    if (glossarySearchQuery.value.trim()) {
      const q = glossarySearchQuery.value.toLowerCase().trim()
      matchesSearch = word.term.toLowerCase().includes(q) || word.pronunciation.toLowerCase().includes(q)
    }
    return matchesCat && matchesSearch
  })
})

// Interactive Map Landmarks setup
interface MapLandmark {
  id: string
  name: string
  desc: string
  icon: string
  x: number // percent left
  y: number // percent top
  audioGuide?: boolean
  paper?: SchoolResourceExtended
}

const mapLandmarks = ref<MapLandmark[]>([
  { id: 'site-1', name: 'Sóc Bom Bo', desc: 'Địa danh lịch sử hào hùng, nơi đồng bào dân tộc S\'tiêng đốt đuốc giã gạo thâu đêm suốt sáng để nuôi quân kháng chiến cứu nước.', icon: 'mdi:fire', x: 25, y: 35, audioGuide: true, paper: resources.value[2] },
  { id: 'site-2', name: 'Trảng Cỏ Bù Lạch', desc: 'Tuyệt tác thiên nhiên hoang sơ rộng gần 140 ha ôm trọn lòng hồ nước ngọt trong lành nằm giữa rừng già nguyên sinh Bù Đăng.', icon: 'mdi:nature', x: 50, y: 20, paper: resources.value[1] },
  { id: 'site-3', name: 'Thác Mơ Bù Đăng', desc: 'Ngọn thác hùng vĩ, biểu tượng của sự sống và ước mơ, cội nguồn dòng nước Dak Mơ trong huyền thoại S\'tiêng bản địa.', icon: 'mdi:water', x: 70, y: 55, audioGuide: true },
  { id: 'site-4', name: 'Căn Cứ Chiến Khu Đ', desc: 'Căn cứ quân sự kháng chiến bảo đảm an toàn cho lực lượng cách mạng nằm ẩn sâu trong lòng rừng nguyên sinh Xã Bù Đăng.', icon: 'mdi:shield-outline', x: 15, y: 70, paper: resources.value[0] }
])

const activeLandmark = ref<MapLandmark | null>(mapLandmarks.value[0] ?? null)

// Image stories
interface ImageStory {
  title: string
  tag: string
  image: string
  story: string
}

const imageStories = ref<ImageStory[]>([
  {
    title: 'Thác Mơ Bù Đăng Hùng Vĩ',
    tag: 'Thiên Nhiên',
    image: '/images/heritage/danh-thang/thac-mo-dong-nai.webp',
    story: 'Ngọn thác biểu tượng nằm nép mình giữa rừng già nguyên sinh Bù Đăng. Dòng nước trắng xóa như dải lụa đổ từ trên cao, tạo nên cảnh sắc huyền ảo thơ mộng và gắn liền với thần thoại cội nguồn Dak Mơ xa xưa của người S\'tiêng bản địa.'
  },
  {
    title: 'Trảng Cỏ Bù Lạch Xanh Mướt',
    tag: 'Thiên Nhiên',
    image: '/images/heritage/danh-thang/trang-co-bu-lach-lg.webp',
    story: 'Tuyệt tác thiên nhiên hoang sơ rộng gần 140 hecta bao bọc lấy một lòng hồ nước ngọt trong mát quanh năm. Trảng cỏ là không gian sinh hoạt lễ hội cộng đồng độc đáo và là bài học thực địa địa lý sinh động bậc nhất của học sinh địa phương.'
  },
  {
    title: 'Cồng Chiêng & Vũ Điệu Xoang',
    tag: 'Văn Hóa',
    image: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    story: 'Âm thanh cồng chiêng ngân vang kết nối buôn làng, là linh hồn sinh hoạt tâm linh và nghệ thuật biểu diễn của đồng bào dân tộc thiểu số Bù Đăng đã được UNESCO vinh danh.'
  }
])

const selectedImageItem = ref<ImageStory | null>(null)

// AI Chatbot messages setup
interface AIMessage {
  role: 'user' | 'assistant'
  text: string
}

const aiMessages = ref<AIMessage[]>([
  { role: 'assistant', text: 'Xin chào Điểu Học Học! Tôi là trợ lý AI di sản Bù Đăng. Bạn muốn tìm hiểu thông tin lịch sử nào hôm nay?' }
])

const aiChips = [
  'Chiến khu Đ là gì?',
  'Lễ hội Mừng Lúa Mới diễn ra khi nào?',
  'So sánh người S\'tiêng với M\'nông.',
  'Từ Dak Mơ nghĩa là gì?'
]

const aiInput = ref('')
const isAiThinking = ref(false)

// Mock AI RAG Response Generation based on local data keywords
function generateAiResponse(inputVal: string): string {
  const query = inputVal.toLowerCase().trim()
  if (query.includes('chiến khu') || query.includes('chien khu')) {
    return 'Chiến Khu Đ là hệ thống căn cứ địa cách mạng vô cùng hiểm yếu nằm sâu trong lòng rừng nguyên sinh Xã Bù Đăng, Thành Phố Đồng Nai (Tỉnh Bình Phước cũ). Nơi đây được bảo vệ bởi địa thế hiểm trở và tinh thần đoàn kết kiên cường phá càn của đồng bào du kích dân tộc S\'tiêng cùng bộ đội chủ lực.'
  }
  if (query.includes('lúa mới') || query.includes('lua moi')) {
    return 'Lễ hội Mừng Lúa Mới (Lễ hội cúng máng nước) của đồng bào S\'tiêng thường diễn ra vào cuối vụ mùa thu hoạch (khoảng tháng 10 - tháng 12 âm lịch hàng năm). Đây là dịp người dân tạ ơn thần linh (Yang) đã cho mưa thuận gió hòa, hạt lúa đầy bồ và thắt chặt tình đoàn kết buôn làng bằng cồng chiêng và rượu cần Đ\'rắp S\'lung.'
  }
  if (query.includes('cồng chiêng') || query.includes('cong chieng')) {
    return 'Dàn nhạc cồng chiêng S\'tiêng là di sản quý báu thường bao gồm từ 6 đến 12 chiếc chiêng bằng đồng không có núm (gọi là Ching). Dàn nhạc có cấu trúc âm thanh chặt chẽ từ Ching Mẹ (Ching u) trầm ấm làm nền, đến các chiêng nhỏ hơn đi giai điệu giai điệu mượt mà reo vui quanh bếp lửa.'
  }
  if (query.includes('s\'tiêng') || query.includes('tieng') || query.includes('m\'nông')) {
    return 'Đồng bào S\'tiêng và M\'nông đều là các dân tộc thiểu số lâu đời tại Bù Đăng, Đông Nam Bộ. Người S\'tiêng nổi tiếng với nghề dệt thổ cẩm Rơ-let tinh xảo sử dụng sợi dệt tự nhiên nhuộm từ lá cây Krông rừng sâu, trong khi người M\'nông có kiến trúc nhà sàn gỗ kiên cố đặc thù bảo vệ khỏi mùa mưa lạnh cao nguyên.'
  }
  if (query.includes('dak mơ') || query.includes('thác mơ') || query.includes('dak mo')) {
    return 'Trong ngôn ngữ S\'tiêng, "Dak" có nghĩa là nước, "Dak Mơ" tức là "nguồn nước của ước mơ và sự sống". Đây chính là cội nguồn của danh thắng Thác Mơ hùng vĩ hôm nay, biểu trưng cho sinh khí dạt dào nuôi dưỡng đất rừng Bù Đăng.'
  }
  return 'Tôi đã ghi nhận câu hỏi của bạn. Dữ liệu khảo cứu cho thấy Xã Bù Đăng, Thành Phố Đồng Nai (Bình Phước cũ) là vùng đất giàu lịch sử cách mạng, có danh thắng trảng cỏ Bù Lạch tuyệt đẹp và nét dệt thổ cẩm, cồng chiêng S\'tiêng lâu đời. Bạn có muốn hỏi chi tiết hơn về các chủ đề này không?'
}

function sendAiMessage(msgText: string) {
  if (!msgText.trim() || isAiThinking.value) return
  
  aiMessages.value.push({ role: 'user', text: msgText })
  aiInput.value = ''
  isAiThinking.value = true

  setTimeout(() => {
    isAiThinking.value = false
    const reply = generateAiResponse(msgText)
    aiMessages.value.push({ role: 'assistant', text: reply })
    
    // Award learning XP for interacting with AI
    userXP.value += 10
    if (userXP.value >= 500) userXP.value = 500
  }, 1200)
}

function clearChat() {
  aiMessages.value = [
    { role: 'assistant', text: 'Tôi đã làm sạch lịch sử hội thoại. Bạn có câu hỏi nghiên cứu mới nào không?' }
  ]
}

// Media view settings
const mediaSubtabs = [
  { id: 'photos', label: 'Kho Ảnh Di Sản', icon: 'mdi:image-multiple-outline' },
  { id: 'videos', label: 'Phim Tư Liệu', icon: 'mdi:video' },
  { id: 'audios', label: 'Audio & Cồng Chiêng', icon: 'mdi:volume-high' }
]
const activeMediaSubtab = ref('photos')

const mockAudios = [
  { title: 'Tiếng cồng chiêng sóc Bom Bo cổ', cat: 'Âm nhạc bản địa', duration: '3:45', icon: 'mdi:music-note' },
  { title: 'Phiên âm dạy nói tiếng S\'tiêng cơ bản', cat: 'Ngôn ngữ học', duration: '5:20', icon: 'mdi:microphone' },
  { title: 'Truyền thuyết nguồn nước thần kỳ Dak Mơ', cat: 'Podcast truyện kể', duration: '7:15', icon: 'mdi:headphones' }
]

// Teacher hub mock upload files
const teacherUploadedFiles = ref([
  'giao_an_mon_lich_su_dia_phuong_lop_12.pdf',
  'slide_bai_giang_cong_chieng_tay_nguyen_tieng_viet.pptx'
])

function mockUploadDocument() {
  swal.fire({
    title: 'Chọn tệp tin tải lên',
    text: 'Trình giả lập upload: Đã nhận giáo án đóng góp thành công từ máy tính giáo viên!',
    icon: 'success',
    confirmButtonColor: '#C9922A'
  })
  teacherUploadedFiles.value.push('giao_an_tu_hoc_flashcard_tieng_stieng_' + Date.now() + '.docx')
}

// Bookmark storage simulation
const savedBooks = ref<string[]>(['res-001'])

function toggleBookmark(id: string) {
  if (savedBooks.value.includes(id)) {
    savedBooks.value = savedBooks.value.filter(b => b !== id)
  } else {
    savedBooks.value.push(id)
  }
}

// Create new folders collections
function createNewCollection() {
  swal.fire({
    title: 'Tạo bộ sưu tập học tập',
    input: 'text',
    inputPlaceholder: 'Nhập tên bộ sưu tập (ví dụ: Ôn thi học kỳ II)...',
    showCancelButton: true,
    confirmButtonText: 'Tạo thư mục',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#C9922A'
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      collections.value.push({ name: result.value, count: 0 })
    }
  })
}

// Media player events
function startVideoPlayback() {
  swal.fire({
    title: 'Phát phim tư liệu',
    text: 'Đang khởi chạy trình phát video tư liệu của di tích...',
    icon: 'info',
    confirmButtonColor: '#C9922A'
  })
}

// Play Audio guide helper
function playLandmarkAudio(title: string, desc: string) {
  if (import.meta.client && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel() // stop any current speech
    const utterance = new SpeechSynthesisUtterance(desc.slice(0, 150))
    utterance.lang = 'vi-VN'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }
  
  swal.fire({
    title: `Đang phát thuyết minh: "${title}"`,
    text: 'Giọng đọc máy thuyết minh địa danh đang được phát. Bấm Đóng để ngắt.',
    icon: 'success',
    background: '#1C1A18',
    color: '#FDFAF3',
    confirmButtonColor: '#C9922A',
    confirmButtonText: 'Đóng phát âm'
  }).then(() => {
    if (import.meta.client && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  })
}

function pronounceTerm(term: string, pronunciation: string) {
  if (import.meta.client && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(term)
    utterance.lang = 'vi-VN'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }
  
  swal.fire({
    title: `Phát âm: "${term}"`,
    text: `Phiên âm tiếng S'tiêng: ${pronunciation}`,
    icon: 'info',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    background: '#1C1A18',
    color: '#FDFAF3'
  })
}

function startLandmarkQuiz() {
  const targetQuiz = quizStore.quizzes[0]
  if (targetQuiz) {
    quizStore.startQuiz(targetQuiz)
  }
}

function openResource(res: SchoolResourceExtended) {
  selectedResource.value = res
}

function downloadFile(resource: SchoolResourceExtended) {
  resource.downloadCount++
  swal.fire({
    title: 'Tải tài liệu thành công!',
    html: `Hệ thống đang chuẩn bị tải tệp PDF <strong>"${resource.title}"</strong> (${resource.fileSize ?? '2.4 MB'}).<br/><br/>Lượt tải đề tài này đã được ghi nhận trên cổng thông tin di sản.`,
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

function openImageModal(item: ImageStory) {
  selectedImageItem.value = item
}



function handleEmptyStateAction(actionType: string, payload?: any) {
  if (actionType === 'explore-heritage') {
    searchOverlayOpen.value = true
  } else if (actionType === 'ask-ai') {
    activeTab.value = 'ai'
  } else if (actionType === 'open-map' || actionType === 'explore-map' || actionType === 'explore-roadmap') {
    activeTab.value = 'map'
  } else if (actionType === 'ask-ai-topic') {
    activeTab.value = 'ai'
    if (payload) {
      sendAiMessage(payload)
    }
  } else if (actionType === 'send-prompt') {
    if (payload) {
      sendAiMessage(payload)
    }
  } else if (actionType === 'start-learning') {
    if (lessonCatalog.value.length > 0) {
      navigateTo(`/study/lesson/${lessonCatalog.value[0]!.id}`)
    } else {
      swal.fire({
        title: 'Thông báo',
        text: 'Nội dung bài học đang được biên soạn và sẽ sớm ra mắt.',
        icon: 'info',
        background: '#1C1A18',
        color: '#FDFAF3',
        confirmButtonColor: '#C9922A'
      })
    }
  } else if (actionType === 'pronounce-word') {
    if (payload) {
      pronounceTerm(payload, '')
    }
  } else if (actionType === 'show-landmark-toast') {
    swal.fire({
      title: payload || 'Điểm mốc',
      text: 'Mốc lộ trình tự học trên bản đồ di sản Bù Đăng.',
      icon: 'info',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      background: '#1C1A18',
      color: '#FDFAF3'
    })
  } else if (actionType === 'teacher-activity') {
    swal.fire({
      title: payload || 'Hoạt động giáo viên',
      text: `Tính năng "${payload}" dành cho giáo viên đang được phát triển nâng cao.`,
      icon: 'info',
      background: '#1C1A18',
      color: '#FDFAF3',
      confirmButtonColor: '#C9922A'
    })
  }
}

// Search overlay is handled by StudySearchOverlay component + Cmd+K shortcut above
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

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 3D Book Layout */
.book-container {
  perspective: 1200px;
}

.book-card {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s;
}

.book-card:hover {
  transform: rotateY(-14deg) rotateX(4deg) translateY(-6px);
  box-shadow: -15px 20px 30px rgba(15, 14, 12, 0.35), 0 10px 20px rgba(201, 146, 42, 0.08);
  border-color: rgba(201, 146, 42, 0.45);
}

.book-spine {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(255, 255, 255, 0.1) 100%);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.1);
  z-index: 10;
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
