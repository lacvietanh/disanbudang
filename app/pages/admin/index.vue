<template>
  <div class="min-h-screen bg-stone-950 flex items-center justify-center">
    <Icon name="mdi:loading" class="w-6 h-6 text-amber-500 animate-spin" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// /admin always redirects — either to login or to contributions
onMounted(() => {
  const { authReady, isAdmin, initAuthListener } = useAuth()
  initAuthListener()

  watch(authReady, (ready) => {
    if (!ready) return
    navigateTo(isAdmin.value ? '/admin/contributions' : '/admin/login')
  }, { immediate: true })
})
</script>
