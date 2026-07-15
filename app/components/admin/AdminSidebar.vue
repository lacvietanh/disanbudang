<template>
  <aside class="w-60 min-h-screen flex flex-col bg-stone-900 border-r border-stone-800 shrink-0">
    <!-- Brand -->
    <div class="px-5 py-5 border-b border-stone-800">
      <p class="text-xs font-bold uppercase tracking-widest text-amber-500">Di Sản Bù Đăng</p>
      <p class="text-[11px] text-stone-500 mt-0.5">Admin Panel</p>
    </div>

    <!-- Nav -->
    <nav class="flex-1 p-3 space-y-1">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(link.to)
          ? 'bg-amber-500/15 text-amber-400'
          : 'text-stone-400 hover:bg-stone-800 hover:text-stone-100'"
        :aria-label="link.label"
      >
        <Icon :name="link.icon" class="w-4 h-4 shrink-0" />
        {{ link.label }}
        <span
          v-if="link.badge && link.badge > 0"
          class="ml-auto bg-amber-500 text-stone-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
        >
          {{ link.badge > 99 ? '99+' : link.badge }}
        </span>
      </NuxtLink>
    </nav>

    <!-- User info + logout -->
    <div class="p-4 border-t border-stone-800">
      <div v-if="user" class="flex items-center gap-2.5 mb-3">
        <img
          v-if="user.photoURL"
          :src="user.photoURL"
          :alt="user.displayName ?? 'Admin'"
          class="w-8 h-8 rounded-full object-cover border border-stone-700"
        />
        <div v-else class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Icon name="mdi:account" class="w-4 h-4 text-amber-400" />
        </div>
        <div class="min-w-0">
          <p class="text-xs font-semibold text-stone-200 truncate">{{ user.displayName ?? 'Admin' }}</p>
          <p class="text-[10px] text-stone-500 truncate">{{ user.email }}</p>
        </div>
      </div>
      <button
        class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-stone-400 hover:bg-red-950/40 hover:text-red-400 transition-colors"
        aria-label="Sign out"
        @click="handleSignOut"
      >
        <Icon name="mdi:logout" class="w-4 h-4" />
        Sign out
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const { user, signOut } = useAuth()

// Pending count placeholder — contributions.vue page will update this via useState
const pendingCount = useState<number>('admin.pending_count', () => 0)

const navLinks = computed(() => [
  {
    to: '/admin/contributions',
    label: 'Contributions',
    icon: 'mdi:inbox-multiple',
    badge: pendingCount.value,
  },
  {
    to: '/admin/visitors',
    label: 'Visitors',
    icon: 'mdi:account-eye',
    badge: 0,
  },
])

function isActive(to: string) {
  return route.path.startsWith(to)
}

async function handleSignOut() {
  await signOut()
  await navigateTo('/admin/login')
}
</script>
