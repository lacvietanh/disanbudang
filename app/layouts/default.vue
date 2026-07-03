<template>
  <div class="min-h-screen flex flex-col bg-charcoal-900 transition-colors duration-500">
    <TheHeader />
    <main class="flex-1 pt-[72px]">
      <Breadcrumb />
      <slot />
    </main>
    <TheFooter />
    <!-- Mini Audio Player -->
    <AudioMiniPlayer />
    <!-- Page loading bar -->
    <NuxtLoadingIndicator color="#C9922A" :height="2" />
    <!-- Global Quiz Player -->
    <QuizPlayModal />
    <!-- Scroll To Top button -->
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
import Breadcrumb from '~/components/layout/Breadcrumb.vue'
import ScrollToTop from '~/components/layout/ScrollToTop.vue'
import AudioMiniPlayer from '~/components/audio/AudioMiniPlayer.vue'
import QuizPlayModal from '~/components/base/QuizPlayModal.vue'



// Scroll reveal on route change
const { observeAll } = useScrollReveal()
const route = useRoute()
watch(
  () => route.path,
  () => nextTick(() => observeAll()),
)
</script>
