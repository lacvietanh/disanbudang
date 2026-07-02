<template>
  <div class="relative w-full h-full">
    <div ref="mapEl" class="w-full h-full" />
    <button
      class="absolute bottom-6 right-6 z-[400] w-12 h-12 bg-charcoal-900 border border-charcoal-700 hover:border-gold-500 rounded-full flex items-center justify-center text-gold-400 hover:text-gold-300 shadow-lg shadow-charcoal-950/50 transition-all duration-300 group"
      @click="locateMe"
      aria-label="Vị trí của tôi"
      title="Định vị trí hiện tại"
    >
      <Icon name="mdi:crosshairs-gps" class="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from '~/types'
import { CATEGORY_MAP } from '~/data/categories'
import { useHeritageStore } from '~/stores/heritage'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  heritages: Heritage[]
  selectedId?: string | null
  selectedRoute?: any | null
}>()

const emit = defineEmits<{
  (e: 'select', heritage: Heritage): void
}>()

const mapEl = ref<HTMLElement | null>(null)
let map: any = null
let LInstance: any = null
const activeMarkers: any[] = []
let routePolyline: any = null

const categoryColors: Record<string, string> = {
  'lich-su': '#8B3A2A',
  'danh-thang': '#2D5016',
  'van-hoa-phi-vat-the': '#C9922A',
  'doi-song-cong-dong': '#6B4C35',
  'giao-duc-truyen-thong': '#B87333',
}

// Global user marker
let userMarker: any = null

const locateMe = () => {
  const swal = useSwal()
  if (!navigator.geolocation) {
    swal.fire({
      title: 'Không hỗ trợ',
      text: 'Trình duyệt của bạn không hỗ trợ định vị GPS.',
      icon: 'error',
      confirmButtonColor: '#C9922A'
    })
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      
      if (map) {
        map.flyTo([lat, lng], 13, { duration: 1.5 })
        
        if (LInstance) {
          if (userMarker) {
            userMarker.setLatLng([lat, lng])
          } else {
            const userIcon = LInstance.divIcon({
              html: `
                <div class="relative flex items-center justify-center w-6 h-6">
                  <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  <div class="relative w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md"></div>
                </div>`,
              className: '',
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })
            userMarker = LInstance.marker([lat, lng], { icon: userIcon }).addTo(map)
              .bindPopup('<span class="text-xs font-semibold text-charcoal-900">Vị trí của bạn</span>')
          }
        }
      }
    },
    (error) => {
      swal.fire({
        title: 'Lỗi định vị',
        text: 'Không thể lấy vị trí của bạn. Vui lòng cấp quyền truy cập vị trí.',
        icon: 'warning',
        confirmButtonColor: '#C9922A'
      })
    }
  )
}

onMounted(async () => {
  if (!mapEl.value) return

  // Dynamically import Leaflet with error guard
  let L: any
  try {
    L = await import('leaflet')
    LInstance = L
  } catch (err) {
    console.error('[MapContainer] Failed to load Leaflet:', err)
    return
  }

  // Init map centered on vùng đất Bù Đăng
  map = L.map(mapEl.value, {
    center: [11.82, 107.15],
    zoom: 11,
    zoomControl: true,
    attributionControl: false,
  })

  // Use CartoDB Positron — clean, light map with high contrast
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map)

  // Listen to zoom changes to update clusters dynamically
  map.on('zoomend', () => {
    if (LInstance && map) {
      addMarkers(LInstance)
    }
  })

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

interface HeritageCluster {
  heritages: Heritage[]
  lat: number
  lng: number
  id: string
}

function addMarkers(L: any) {
  // Clear old markers first
  activeMarkers.forEach((m) => m.remove())
  activeMarkers.length = 0

  const zoom = map.getZoom()
  const clusters: HeritageCluster[] = []

  // Basic distance threshold in degrees depending on zoom
  const threshold = zoom < 10 ? 0.08 : zoom === 10 ? 0.05 : zoom === 11 ? 0.025 : zoom === 12 ? 0.012 : 0.0

  if (threshold > 0) {
    props.heritages.forEach((h) => {
      let found = false
      for (const c of clusters) {
        const dist = Math.sqrt(Math.pow(c.lat - h.coordinates.lat, 2) + Math.pow(c.lng - h.coordinates.lng, 2))
        if (dist < threshold) {
          c.heritages.push(h)
          // Recalculate average center
          c.lat = c.heritages.reduce((sum, item) => sum + item.coordinates.lat, 0) / c.heritages.length
          c.lng = c.heritages.reduce((sum, item) => sum + item.coordinates.lng, 0) / c.heritages.length
          found = true
          break
        }
      }
      if (!found) {
        clusters.push({ heritages: [h], lat: h.coordinates.lat, lng: h.coordinates.lng, id: `cluster-${h.id}` })
      }
    })
  } else {
    props.heritages.forEach((h) => {
      clusters.push({ heritages: [h], lat: h.coordinates.lat, lng: h.coordinates.lng, id: h.id })
    })
  }

  // Draw clusters/markers
  clusters.forEach((c) => {
    const isSingle = c.heritages.length === 1

    if (isSingle) {
      const h = c.heritages[0]
      if (!h) return
      const color = categoryColors[h.category] ?? '#C9922A'
      const isSelected = props.selectedId === h.id
      const iconSvgPath = categoryIcons[h.category] ?? `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`

      const icon = L.divIcon({
        html: `
          <div style="position:relative;" class="heritage-pin-wrapper group flex items-center justify-center" tabindex="0" aria-label="Di sản: ${h.title}, danh mục: ${h.category}">
            <!-- Pulse wave ring -->
            <div class="absolute rounded-full pointer-events-none ${isSelected ? 'animate-ping opacity-60' : 'animate-pulse-slow opacity-25'}" 
                 style="background: ${color}; border: 1px solid ${color}; width: 38px; height: 38px; animation-duration: ${isSelected ? '1.8s' : '3.0s'}"></div>
            
            <!-- Outer gold glow ring -->
            <div class="absolute rounded-full border border-gold-500/50 pointer-events-none transition-all duration-300 ${isSelected ? 'scale-125 opacity-100' : 'scale-110 opacity-0 group-hover:opacity-100'}" 
                 style="width: 38px; height: 38px; box-shadow: 0 0 15px ${color};"></div>
            
            <!-- Main marker circle -->
            <div style="
              width:38px;height:38px;border-radius:50%;background:${color};
              border:${isSelected ? '3px solid #C9922A' : '2px solid rgba(255,255,255,0.9)'};
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 2px 10px rgba(0,0,0,0.15), 0 0 20px ${color}50;
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

      // Accessibility key press
      marker.on('keypress', (e: any) => {
        if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') {
          emit('select', h)
        }
      })

      activeMarkers.push(marker)
    } else {
      // Cluster marker
      const count = c.heritages.length
      const containsSelected = c.heritages.some((h) => props.selectedId === h.id)
      const titlesList = c.heritages.map((h) => `• ${h.title}`).join('<br>')

      const icon = L.divIcon({
        html: `
          <div style="position:relative;" class="heritage-cluster-wrapper group flex items-center justify-center" tabindex="0" aria-label="Nhóm di sản: ${count} địa điểm. Nhấp để phóng to.">
            <!-- Pulsing outer ring -->
            <div class="absolute rounded-full pointer-events-none animate-pulse-slow opacity-30" 
                 style="background: #C9922A; border: 1px solid #C9922A; width: 44px; height: 44px;"></div>
            
            <!-- Outer gold glow ring -->
            <div class="absolute rounded-full border border-gold-500/50 pointer-events-none transition-all duration-300 ${containsSelected ? 'scale-125 opacity-100' : 'scale-110 opacity-0 group-hover:opacity-100'}" 
                 style="width: 44px; height: 44px; box-shadow: 0 0 15px #C9922A;"></div>
            
            <!-- Main cluster circle -->
            <div style="
              width:40px;height:40px;border-radius:50%;background:#1C1A18;
              border:${containsSelected ? '3px solid #C9922A' : '2px solid #E6C587'};
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 4px 15px rgba(0,0,0,0.3);
              cursor:pointer;transition:all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
            " class="heritage-cluster-circle relative z-10 font-bold text-xs text-gold-400 group-hover:scale-105">
              ${count}
            </div>
            
            <!-- Custom Tooltip for Cluster -->
            <div style="z-index:9999;" class="absolute bottom-13 left-1/2 -translate-x-1/2 bg-charcoal-950/95 backdrop-blur-md text-ivory text-3xs font-heading font-medium py-2.5 px-3.5 rounded-lg border border-gold-500/30 shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-1 group-hover:translate-y-0 text-left">
              <span class="text-gold-400 font-bold block mb-1">✦ Nhóm di sản (${count})</span>
              <div class="text-charcoal-300 leading-relaxed font-sans">${titlesList}</div>
              <span class="text-gold-500/80 block mt-1.5 text-4xs uppercase tracking-wider">Nhấp để phóng to</span>
            </div>
          </div>`,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      const marker = L.marker([c.lat, c.lng], { icon })
        .addTo(map)
        .on('click', () => {
          map.flyTo([c.lat, c.lng], zoom + 2, { duration: 0.8 })
        })

      marker.on('keypress', (e: any) => {
        if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') {
          map.flyTo([c.lat, c.lng], zoom + 2, { duration: 0.8 })
        }
      })

      activeMarkers.push(marker)
    }
  })
}
// Watch selected heritage to pan map
watch(() => props.selectedId, (id) => {
  if (!map || !id) return
  const h = props.heritages.find((x) => x.id === id)
  if (h) {
    // Zoom in deeper (14) if selected, to auto-declustered view
    map.flyTo([h.coordinates.lat, h.coordinates.lng], 14, { duration: 1.2 })
  }
  if (map && LInstance) {
    addMarkers(LInstance)
  }
})

// Update markers when filtered heritages change
watch(() => props.heritages, () => {
  if (map && LInstance) {
    addMarkers(LInstance)
    updateRouteLine()
  }
}, { deep: true })

const store = useHeritageStore()

watch(() => store.mapGesturesEnabled, (enabled) => {
  if (!map) return
  if (enabled) {
    map.dragging.enable()
    map.touchZoom.enable()
    map.doubleClickZoom.enable()
    map.scrollWheelZoom.enable()
    if (map.boxZoom) map.boxZoom.enable()
    if (map.keyboard) map.keyboard.enable()
  } else {
    map.dragging.disable()
    map.touchZoom.disable()
    map.doubleClickZoom.disable()
    map.scrollWheelZoom.disable()
    if (map.boxZoom) map.boxZoom.disable()
    if (map.keyboard) map.keyboard.disable()
  }
})

function updateRouteLine() {
  if (!map || !LInstance) return
  if (routePolyline) {
    routePolyline.remove()
    routePolyline = null
  }
  const route = props.selectedRoute
  if (!route || !route.stops) return

  const latlngs = route.stops.map((stop: any) => {
    const heritage = props.heritages.find((x) => x.id === stop.id)
    if (heritage && heritage.coordinates) {
      return [heritage.coordinates.lat, heritage.coordinates.lng]
    }
    return null
  }).filter((c: any) => c !== null)

  if (latlngs.length < 2) return

  routePolyline = LInstance.polyline(latlngs, {
    color: route.color || '#C9922A',
    weight: 4,
    opacity: 0.9,
    dashArray: '10, 15',
    className: 'route-line-animated'
  }).addTo(map)

  // Zoom map to fit route bounds
  const bounds = LInstance.latLngBounds(latlngs)
  map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, duration: 1.2 })
}

watch(() => props.selectedRoute, () => {
  updateRouteLine()
}, { deep: true })

onUnmounted(() => {
  if (routePolyline) {
    routePolyline.remove()
  }
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
@keyframes dash {
  to {
    stroke-dashoffset: -40;
  }
}
:deep(.route-line-animated) {
  animation: dash 2.5s linear infinite;
}
</style>
