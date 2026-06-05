import { defineStore } from 'pinia'
import type { Heritage, MapFilter } from '~/types'
import { MOCK_HERITAGES } from '~/data/mockHeritages'

export const useHeritageStore = defineStore('heritage', () => {
  // State
  const heritages = ref<Heritage[]>(MOCK_HERITAGES)
  const selectedHeritage = ref<Heritage | null>(null)
  const isLoading = ref(false)
  const searchQuery = ref('')
  const activeCategory = ref<string>('')
  const activePeriod = ref<string>('')

  // Getters
  const filteredHeritages = computed(() => {
    let result = heritages.value

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (h) =>
          h.title.toLowerCase().includes(q) ||
          h.subtitle.toLowerCase().includes(q) ||
          h.shortDescription.toLowerCase().includes(q) ||
          h.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    if (activeCategory.value) {
      result = result.filter((h) => h.category === activeCategory.value)
    }

    if (activePeriod.value) {
      result = result.filter((h) => h.period === activePeriod.value)
    }

    return result
  })

  const featuredHeritages = computed(() =>
    heritages.value.filter((h) => h.featured && h.status === 'published'),
  )

  const publishedHeritages = computed(() =>
    heritages.value.filter((h) => h.status === 'published'),
  )

  const heritagesByCategory = computed(() => {
    const map: Record<string, Heritage[]> = {}
    heritages.value.forEach((h) => {
      if (!map[h.category]) map[h.category] = []
      map[h.category]!.push(h)
    })
    return map
  })

  const totalCount = computed(() => heritages.value.length)

  // Actions
  function selectHeritage(heritage: Heritage | null) {
    selectedHeritage.value = heritage
  }

  function getBySlug(slug: string): Heritage | undefined {
    return heritages.value.find((h) => h.slug === slug)
  }

  function getById(id: string): Heritage | undefined {
    return heritages.value.find((h) => h.id === id)
  }

  function getRelated(heritage: Heritage): Heritage[] {
    return heritage.relatedIds
      .map((id) => heritages.value.find((h) => h.id === id))
      .filter(Boolean) as Heritage[]
  }

  function setSearch(query: string) {
    searchQuery.value = query
  }

  function setCategory(category: string) {
    activeCategory.value = category
  }

  function setPeriod(period: string) {
    activePeriod.value = period
  }

  function clearFilters() {
    searchQuery.value = ''
    activeCategory.value = ''
    activePeriod.value = ''
  }

  return {
    heritages,
    selectedHeritage,
    isLoading,
    searchQuery,
    activeCategory,
    activePeriod,
    filteredHeritages,
    featuredHeritages,
    publishedHeritages,
    heritagesByCategory,
    totalCount,
    selectHeritage,
    getBySlug,
    getById,
    getRelated,
    setSearch,
    setCategory,
    setPeriod,
    clearFilters,
  }
})
