import { useIntersectionObserver } from '@vueuse/core'

/**
 * Composable for scroll-triggered reveal animations
 */
export function useScrollReveal() {
  const revealElements = ref<Element[]>([])

  function observe(el: Element | null) {
    if (!el) return
    const { stop } = useIntersectionObserver(
      el as HTMLElement,
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('is-visible')
          stop()
        }
      },
      { threshold: 0.12 },
    )
  }

  function observeAll(selector = '.reveal') {
    if (import.meta.client) {
      const els = document.querySelectorAll(selector)
      els.forEach((el) => observe(el))
    }
  }

  onMounted(() => {
    nextTick(() => observeAll())
  })

  return { observe, observeAll }
}

/**
 * Composable for parallax effect
 */
export function useParallax(speed = 0.3) {
  const scrollY = ref(0)
  const offset = computed(() => scrollY.value * speed)

  if (import.meta.client) {
    useEventListener(window, 'scroll', () => {
      scrollY.value = window.scrollY
    })
  }

  return { offset }
}

/**
 * Composable for counting animation
 */
export function useCountUp(target: number, duration = 2000) {
  const count = ref(target)
  const isComplete = ref(false)

  function start() {
    if (!import.meta.client) {
      count.value = target
      isComplete.value = true
      return
    }

    const startTime = performance.now()
    const startVal = Math.max(0, Math.floor(target * 0.8))

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)

      count.value = Math.round(startVal + (target - startVal) * eased)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        count.value = target
        isComplete.value = true
      }
    }

    requestAnimationFrame(update)
  }

  function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  }

  return { count, isComplete, start }
}

/**
 * Composable for image lazy loading with blur-up
 */
export function useLazyImage() {
  const isLoaded = ref(false)
  const hasError = ref(false)

  function onLoad() {
    isLoaded.value = true
  }

  function onError() {
    hasError.value = true
  }

  return { isLoaded, hasError, onLoad, onError }
}
