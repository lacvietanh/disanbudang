<template>
  <div ref="mapEl" class="w-full h-full" />
</template>

<script setup lang="ts">
import type { Heritage } from '~/types'
import { CATEGORY_MAP } from '~/data/categories'

const props = defineProps<{
  heritages: Heritage[]
  selectedId?: string | null
}>()

const emit = defineEmits<{
  (e: 'select', heritage: Heritage): void
}>()

const mapEl = ref<HTMLElement | null>(null)
let map: any = null
let LInstance: any = null
const markers: Record<string, any> = {}

const categoryColors: Record<string, string> = {
  'lich-su': '#8B3A2A',
  'danh-thang': '#2D5016',
  'van-hoa-phi-vat-the': '#C9922A',
  'doi-song-cong-dong': '#6B4C35',
  'giao-duc-truyen-thong': '#B87333',
}

onMounted(async () => {
  if (!mapEl.value) return

  // Dynamically import Leaflet
  const L = await import('leaflet')
  await import('leaflet/dist/leaflet.css')
  LInstance = L

  // Init map centered on Bù Đăng district
  map = L.map(mapEl.value, {
    center: [11.82, 107.15],
    zoom: 11,
    zoomControl: true,
    attributionControl: false,
  })

  // Use CartoDB Dark (clean map style matching dark portal)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map)

  // Add heritage markers
  addMarkers(L)
})

function addMarkers(L: any) {
  // Clear old markers first
  Object.keys(markers).forEach((key) => {
    markers[key].remove()
    delete markers[key]
  })

  props.heritages.forEach((h) => {
    const color = categoryColors[h.category] ?? '#C9922A'

    const icon = L.divIcon({
      html: `
        <div style="position:relative;" class="heritage-pin-wrapper group">
          <div style="
            width:38px;height:38px;border-radius:50%;background:${color};
            border:3px solid rgba(255,255,255,0.95);display:flex;align-items:center;
            justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,0.5);
            cursor:pointer;transition:transform 0.2s;
          " class="heritage-circle hover:scale-110">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <!-- Custom Tooltip -->
          <div style="z-index:9999;" class="absolute bottom-11 left-1/2 -translate-x-1/2 bg-charcoal-950 text-ivory text-[10px] font-medium py-1.5 px-3 rounded-lg border border-charcoal-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            ${h.title}
          </div>
        </div>`,
      className: '',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
    })

    const marker = L.marker([h.coordinates.lat, h.coordinates.lng], { icon })
      .addTo(map)
      .on('click', () => emit('select', h))

    markers[h.id] = marker
  })
}

// Watch selected heritage to pan map
watch(() => props.selectedId, (id) => {
  if (!map || !id) return
  const h = props.heritages.find((x) => x.id === id)
  if (h) {
    map.flyTo([h.coordinates.lat, h.coordinates.lng], 13, { duration: 1.2 })
  }
})

// Update markers when filtered heritages change
watch(() => props.heritages, () => {
  if (map && LInstance) {
    addMarkers(LInstance)
  }
}, { deep: true })

onUnmounted(() => {
  map?.remove()
})
</script>
