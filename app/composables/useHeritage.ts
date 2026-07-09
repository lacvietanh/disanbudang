import { useHeritageStore } from '~/stores/heritage'
import type { Heritage } from '~/types'

export function useHeritage() {
  const store = useHeritageStore()
  const router = useRouter()

  function navigateToHeritage(heritage: Heritage) {
    router.push(`/heritage/${heritage.slug}`)
  }

  function getImageUrl(path: string, width = 800): string {
    // If it's already a full URL (Unsplash etc), return as-is
    if (path.startsWith('http')) return path
    return path
  }

  function formatPublishedAt(dateStr: string): string {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'lich-su': '#C4552A',
      'danh-thang': '#2D5016',
      'van-hoa-phi-vat-the': '#D4952B',
      'doi-song-cong-dong': '#7A5235',
      'giao-duc-truyen-thong': '#B87845',
    }
    return colors[category] ?? '#7A5235'
  }

  function getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'lich-su': 'Lịch Sử',
      'danh-thang': 'Danh Thắng',
      'van-hoa-phi-vat-the': 'Văn Hóa',
      'doi-song-cong-dong': 'Cộng Đồng',
      'giao-duc-truyen-thong': 'Giáo Dục',
    }
    return labels[category] ?? category
  }

  return {
    navigateToHeritage,
    getImageUrl,
    formatPublishedAt,
    getCategoryColor,
    getCategoryLabel,
  }
}
