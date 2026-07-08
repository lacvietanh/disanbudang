<script setup lang="ts">
// /library is now consolidated into /explore
// Redirect permanently to keep old links working
await navigateTo('/explore/', { redirectCode: 301, replace: true })
</script>
