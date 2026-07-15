import type { HeritageCluster_Meta, HeritageCluster } from '~/types'

export const CLUSTERS: HeritageCluster_Meta[] = [
  {
    id: 'bu-dang',
    label: 'Bù Đăng',
    description: 'Nơi khởi nguồn của dự án — căn cứ kháng chiến, rừng nguyên sinh, làng nghề và lễ hội bản địa.',
    icon: 'mdi:map-marker-star',
    color: '#C4552A',
  },
  {
    id: 'bom-bo',
    label: 'Sóc Bom Bo',
    description: 'Khu bảo tồn văn hóa S\'tiêng — cồng chiêng, nhà dài, huyền thoại nhịp chày giã gạo.',
    icon: 'mdi:music-circle-outline',
    color: '#D4952B',
  },
  {
    id: 'phuoc-long',
    label: 'Phước Long',
    description: 'Núi Bà Rá, hồ Thác Mơ và chứng tích Chiến thắng Phước Long 06/01/1975.',
    icon: 'mdi:terrain',
    color: '#2D5016',
  },
  {
    id: 'loc-ninh',
    label: 'Lộc Ninh',
    description: 'Căn cứ Tà Thiết và Nhà Giao Tế — trung tâm chỉ huy và ngoại giao cách mạng miền Nam.',
    icon: 'mdi:flag-variant',
    color: '#7A5235',
  },
]

export const CLUSTER_MAP: Record<HeritageCluster, HeritageCluster_Meta> = Object.fromEntries(
  CLUSTERS.map((c) => [c.id, c]),
) as Record<HeritageCluster, HeritageCluster_Meta>
