import type { HeritageCategory_Meta, HeritageCategory } from '~/types'

export const CATEGORIES: HeritageCategory_Meta[] = [
  {
    id: 'lich-su',
    label: 'Di Tích Lịch Sử',
    labelShort: 'Lịch Sử',
    description: 'Những chứng nhân lịch sử — di tích kháng chiến, chiến trường xưa, công trình thời kỳ đấu tranh giải phóng dân tộc.',
    icon: 'mdi:castle',
    color: '#8B3A2A',
    textColor: '#FDFAF3',
    bgClass: 'bg-brick-500',
    count: 7,
  },
  {
    id: 'danh-thang',
    label: 'Danh Thắng Thiên Nhiên',
    labelShort: 'Danh Thắng',
    description: 'Cảnh quan thiên nhiên hùng vĩ — thác, hồ, rừng nguyên sinh, núi non đại ngàn.',
    icon: 'mdi:mountain',
    color: '#2D5016',
    textColor: '#FDFAF3',
    bgClass: 'bg-forest-500',
    count: 4,
  },
  {
    id: 'van-hoa-phi-vat-the',
    label: 'Văn Hóa Phi Vật Thể',
    labelShort: 'Văn Hóa',
    description: 'Lễ hội, âm nhạc cồng chiêng, ngôn ngữ, tri thức dân gian của cộng đồng S\'tiêng, M\'nông.',
    icon: 'mdi:music-note',
    color: '#C9922A',
    textColor: '#1C1A18',
    bgClass: 'bg-gold-500',
    count: 2,
  },
  {
    id: 'doi-song-cong-dong',
    label: 'Đời Sống Cộng Đồng',
    labelShort: 'Cộng Đồng',
    description: 'Kiến trúc nhà ở truyền thống, làng nghề, phong tục, sinh hoạt văn hóa hằng ngày.',
    icon: 'mdi:home-group',
    color: '#6B4C35',
    textColor: '#FDFAF3',
    bgClass: 'bg-earth-500',
    count: 2,
  },
  {
    id: 'giao-duc-truyen-thong',
    label: 'Giáo Dục Truyền Thống',
    labelShort: 'Giáo Dục',
    description: 'Tri thức bản địa, cách thức truyền dạy kỹ năng, phương pháp giáo dục cộng đồng truyền thống.',
    icon: 'mdi:book-open-page-variant',
    color: '#B87333',
    textColor: '#FDFAF3',
    bgClass: 'bg-copper-500',
    count: 1,
  },
]

export const CATEGORY_MAP: Record<HeritageCategory, HeritageCategory_Meta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<HeritageCategory, HeritageCategory_Meta>

export const PERIODS = [
  { id: 'tien-su', label: 'Tiền Sử' },
  { id: 'phong-kien', label: 'Phong Kiến' },
  { id: 'phap-thuoc', label: 'Pháp Thuộc' },
  { id: 'khang-chien', label: 'Kháng Chiến' },
  { id: 'hien-dai', label: 'Hiện Đại' },
]
