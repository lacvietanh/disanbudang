/**
 * useVisitorTrack — auto-tracks page visits on every route change.
 * Fire-and-forget: analytics failures never block UX.
 * Call from default.vue layout inside onMounted to ensure client-only execution.
 *
 * Side-effect: saves totalVisits into useState('siteVisitCount')
 * so any component (e.g. AppTopNav) can read it reactively without extra API calls.
 */

// Global state — shared across all components in the same Nuxt app instance
const siteVisitCount = () => useState<number | null>('siteVisitCount', () => null)

export function useVisitorTrack() {
  const route = useRoute()
  const { getIdToken } = useAuth()
  const visitCount = siteVisitCount()

  async function track(path: string) {
    try {
      const idToken = await getIdToken()
      const res = await $fetch<{ ok: boolean; totalVisits?: number }>('/api/analytics/visit', {
        method: 'POST',
        body: { path, idToken: idToken ?? undefined },
      })
      // Update global counter if the server returned a total
      if (res.ok && typeof res.totalVisits === 'number') {
        visitCount.value = res.totalVisits
      }
    } catch {
      // Silent — analytics must not impact UX
    }
  }

  onMounted(() => {
    // Track initial page
    track(route.path)

    // Track on subsequent route changes; stop on unmount
    const stop = watch(() => route.path, (p) => track(p))
    onUnmounted(stop)
  })
}

/** Read-only composable for components that only want to display the count */
export function useSiteVisitCount() {
  return siteVisitCount()
}

