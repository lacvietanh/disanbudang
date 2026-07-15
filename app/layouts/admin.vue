<template>
  <!-- Admin layout: fully isolated from public chrome (no AppTopNav/AppFooter/Breadcrumb) -->
  <div class="min-h-screen flex bg-stone-950 text-stone-100 font-sans">
    <AdminSidebar />
    <main class="flex-1 overflow-auto min-h-screen">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Admin layout registers NO global listeners — nothing to clean up here.
// Individual admin pages manage their own data fetching and listeners,
// cleaned up via onUnmounted per RULE-stack-akiNuxtCf.
</script>
