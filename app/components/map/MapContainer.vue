<template>
  <div ref="mapEl" class="w-full h-full" />
</template>

<script setup lang="ts">
import type { Heritage } from '~/types'
import { CATEGORY_MAP } from '~/data/categories'
import 'leaflet/dist/leaflet.css'

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

const categoryIcons: Record<string, string> = {
  'lich-su': `<path d="M19,20H5V8H7V5H9V8H11V5H13V8H15V5H17V8H19V20M11,10H9V12H11V10M15,10H13V12H15V10M11,14H9V16H11V14M15,14H13V16H15V14Z" />`,
  'danh-thang': `<path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z" />`,
  'van-hoa-phi-vat-the': `<path d="M12,3V13.55C11.41,13.21 10.73,13 10,13C7.79,13 6,14.79 6,17C6,19.21 7.79,21 10,21C12.21,21 14,19.21 14,17V7H18V3H12Z" />`,
  'doi-song-cong-dong': `<path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />`,
  'giao-duc-truyen-thong': `<path d="M12,11.55C9.64,9.35 6.48,8 3,8V19C6.48,19 9.64,20.35 12,22.55C14.36,20.35 17.52,19 21,19V8C17.52,8 14.36,9.35 12,11.55Z" />`,
}

function addMarkers(L: any) {
  // Clear old markers first
  Object.keys(markers).forEach((key) => {
    markers[key].remove()
    delete markers[key]
  })

  props.heritages.forEach((h) => {
    const color = categoryColors[h.category] ?? '#C9922A'
    const isSelected = props.selectedId === h.id
    const iconSvgPath = categoryIcons[h.category] ?? `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`

    const icon = L.divIcon({
      html: `
        <div style="position:relative;" class="heritage-pin-wrapper group flex items-center justify-center">
          <!-- Pulse wave ring -->
          <div class="absolute rounded-full pointer-events-none ${isSelected ? 'animate-ping opacity-60' : 'animate-pulse-slow opacity-25'}" 
               style="background: ${color}; border: 1px solid ${color}; width: 38px; height: 38px; animation-duration: ${isSelected ? '1.8s' : '3.0s'}"></div>
          
          <!-- Outer gold glow ring -->
          <div class="absolute rounded-full border border-gold-500/50 pointer-events-none transition-all duration-300 ${isSelected ? 'scale-125 opacity-100' : 'scale-110 opacity-0 group-hover:opacity-100'}" 
               style="width: 38px; height: 38px; box-shadow: 0 0 15px ${color};"></div>
          
          <!-- Main marker circle -->
          <div style="
            width:38px;height:38px;border-radius:50%;background:${color};
            border:${isSelected ? '3px solid #E6C587' : '2px solid rgba(255,255,255,0.9)'};
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 0 20px ${color}70;
            cursor:pointer;transition:all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          " class="heritage-circle relative z-10 ${isSelected ? 'scale-115' : 'group-hover:scale-110'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              ${iconSvgPath}
            </svg>
          </div>
          
          <!-- Custom Tooltip -->
          <div style="z-index:9999;" class="absolute bottom-12 left-1/2 -translate-x-1/2 bg-charcoal-950/95 backdrop-blur-md text-ivory text-2xs font-heading font-medium tracking-wide py-2 px-3.5 rounded-lg border border-gold-500/30 shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-1 group-hover:translate-y-0">
            <span style="color: ${color}; font-weight: bold; margin-right: 4px;">✦</span> ${h.title}
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
  if (map && LInstance) {
    addMarkers(LInstance)
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

<style scoped>
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.25; }
  50% { transform: scale(1.2); opacity: 0.55; }
}
:deep(.animate-pulse-slow) {
  animation: pulse-slow 3s infinite ease-in-out;
}
:deep(.leaflet-div-icon) {
  background: transparent !important;
  border: none !important;
}
</style>
