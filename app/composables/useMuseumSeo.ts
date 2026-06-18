import type { Ref } from 'vue'
import type { Heritage, NewsArticle } from '~/types'

const SITE_NAME = 'Di Sản Bù Đăng'
const SITE_DESCRIPTION = 'Bảo tàng số địa phương về lịch sử, văn hóa, thiên nhiên và ký ức cộng đồng huyện Bù Đăng.'
const SITE_URL = 'https://disanbudang.com'
const DEFAULT_IMAGE = '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp'

interface MuseumSeoInput {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
}

export function buildBreadcrumbSchema(path: string, pageTitle?: string) {
  const parts = path.split('/').filter(Boolean)
  if (parts.length === 0) return null

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Trang chủ',
      item: SITE_URL,
    }
  ]

  let currentPath = ''
  parts.forEach((part, index) => {
    currentPath += `/${part}`
    let name = part.charAt(0).toUpperCase() + part.slice(1)
    if (part === 'library') name = 'Thư viện di sản'
    if (part === 'map') name = 'Bản đồ di sản'
    if (part === 'community') name = 'Cộng đồng'
    if (part === 'quiz') name = 'Trò chơi khám phá'
    if (part === 'school') name = 'Góc học tập'
    if (part === 'news') name = 'Tin tức & Sự kiện'
    if (part === 'about') name = 'Giới thiệu'
    
    if (index === parts.length - 1 && pageTitle) {
      name = pageTitle.split(' — ')[0] || pageTitle
    }

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: `${SITE_URL}${currentPath}`,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

export function useMuseumSeo(input: MuseumSeoInput = {}) {
  const route = useRoute()
  const title = input.title ? `${input.title} — ${SITE_NAME}` : `${SITE_NAME} — Bảo Tàng Số Địa Phương`
  const description = input.description ?? SITE_DESCRIPTION
  const image = input.image ?? DEFAULT_IMAGE
  const canonical = `${SITE_URL}${input.path ?? route.path}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogType: input.type ?? 'website',
    ogSiteName: SITE_NAME,
    twitterCard: 'summary_large_image',
  })

  // Build scripts array
  const scripts: any[] = []

  // Global Organization Schema (only on homepage)
  if (route.path === '/') {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL,
        'logo': `${SITE_URL}/favicon.svg`,
        'description': SITE_DESCRIPTION,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Huyện Bù Đăng',
          'addressRegion': 'Xã Bù Đăng Thành Phố Đồng Nai (Bình Phước Cũ)',
          'addressCountry': 'VN'
        }
      })
    })
  }

  // Dynamic Breadcrumb Schema
  const breadcrumb = buildBreadcrumbSchema(route.path, input.title)
  if (breadcrumb) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumb)
    })
  }

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: scripts
  })
}

export function useHeritageSeo(heritage: Ref<Heritage | null>) {
  watchEffect(() => {
    if (!heritage.value) return

    useMuseumSeo({
      title: heritage.value.title,
      description: heritage.value.shortDescription,
      image: heritage.value.coverImage,
      path: `/heritage/${heritage.value.slug}`,
      type: 'article',
    })

    // Inject enhanced Place/TouristAttraction schema
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristAttraction',
            name: heritage.value.title,
            description: heritage.value.shortDescription,
            image: heritage.value.coverImage,
            url: `${SITE_URL}/heritage/${heritage.value.slug}`,
            address: {
              '@type': 'PostalAddress',
              'addressLocality': 'Huyện Bù Đăng',
              'addressRegion': 'Xã Bù Đăng Thành Phố Đồng Nai (Bình Phước Cũ)',
              'addressCountry': 'VN'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: heritage.value.coordinates.lat,
              longitude: heritage.value.coordinates.lng,
            },
            isPartOf: {
              '@type': 'WebSite',
              name: SITE_NAME,
              url: SITE_URL,
            },
          }),
        },
      ],
    })
  })
}

export function buildArticleSchema(article: NewsArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    author: article.author ? { '@type': 'Person', name: article.author } : undefined,
    publisher: { 
      '@type': 'Organization', 
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`
      }
    },
  }
}
