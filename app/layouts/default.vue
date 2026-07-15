<template>
  <div class="min-h-screen flex flex-col bg-charcoal-900 transition-colors duration-500">
    <AppTopNav />
    <main class="flex-1 pt-[72px]">
      <Breadcrumb />
      <slot />
    </main>
    <AppFooter />
    <!-- Mini Audio Player -->
    <AudioMiniPlayer />
    <!-- Page loading bar -->
    <NuxtLoadingIndicator color="#C7A664" :height="2" />
    <!-- Global Quiz Player -->
    <QuizPlayModal />
    <!-- Scroll To Top button -->
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
// Scroll reveal on route change
const { observeAll } = useScrollReveal()
const route = useRoute()
watch(
  () => route.path,
  () => nextTick(() => observeAll()),
)

// Visitor tracking — client-only, fire-and-forget
onMounted(() => {
  useVisitorTrack()
})
</script>
