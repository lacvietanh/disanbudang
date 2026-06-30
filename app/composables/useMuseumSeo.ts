import type { Ref } from 'vue'
import type { Heritage, NewsArticle } from '~/types'

const SITE_NAME = 'Di Sản Bù Đăng'
const SITE_DESCRIPTION = 'Bảo tàng số địa phương về lịch sử, văn hóa, thiên nhiên và ký ức cộng đồng Xã Bù Đăng Thành Phố Đồng Nai (Tỉnh Bình Phước cũ).'
const SITE_URL = 'https://disanbudang.com'
const DEFAULT_IMAGE = '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp'

interface MuseumSeoInput {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
}

export function ensureTrailingSlash(path: string): string {
  if (!path || path === '/') return '/'
  const parts = path.split('?')
  const base = parts[0] || ''
  const query = parts[1]
  const hasExtension = /\.[a-z5-9]+$/i.test(base)
  const cleanPath = base.endsWith('/') || hasExtension ? base : `${base}/`
  return query ? `${cleanPath}?${query}` : cleanPath
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
      item: `${SITE_URL}${ensureTrailingSlash(currentPath)}`,
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
  const canonical = `${SITE_URL}${ensureTrailingSlash(input.path ?? route.path)}`

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

  // Geo position meta tag (homepage only)
  if (route.path === '/') {
    useHead({
      meta: [
        { name: 'geo.position', content: '11.8281;107.0937' },
        { name: 'geo.placename', content: 'Xã Bù Đăng, Thành Phố Đồng Nai' },
        { name: 'geo.region', content: 'VN-ĐN' },
      ],
    })
  }

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
        'logo': `${SITE_URL}/favicon/icon-192.png`,
        'description': SITE_DESCRIPTION,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Xã Bù Đăng',
          'addressRegion': 'Thành Phố Đồng Nai (Tỉnh Bình Phước cũ)',
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

    // Inject enhanced LandmarkFeature schema
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LandmarkFeature',
            name: heritage.value.title,
            description: heritage.value.shortDescription,
            image: heritage.value.coverImage,
            url: `${SITE_URL}${ensureTrailingSlash(`/heritage/${heritage.value.slug}`)}`,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: heritage.value.coordinates.lat,
              longitude: heritage.value.coordinates.lng,
            },
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: 'Xã Bù Đăng, Thành Phố Đồng Nai (nguyên Tỉnh Bình Phước)',
            },
            isPartOf: {
              '@type': 'WebSite',
              name: SITE_NAME,
              url: `${SITE_URL}/`,
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
    mainEntityOfPage: `${SITE_URL}${ensureTrailingSlash(`/news/${article.slug}`)}`,
    url: `${SITE_URL}${ensureTrailingSlash(`/news/${article.slug}`)}`,
    publisher: { 
      '@type': 'Organization', 
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon/icon-192.png`
      }
    },
  }
}

export function useStudySeo() {
  useMuseumSeo({
    title: 'Cổng Học Tập Số Di Sản',
    description: 'Nền tảng học tập di sản số hóa tương tác: flashcards, quiz, AI tra cứu, thư viện tài liệu và hành trình khám phá văn hóa Xã Bù Đăng dành cho học sinh, giáo viên địa phương.',
    image: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
    path: '/study',
  })

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'Góc Học Tập Di Sản Bù Đăng',
          url: `${SITE_URL}/study/`,
          description: 'Không gian học tập số về di sản văn hóa, lịch sử và thiên nhiên Xã Bù Đăng',
          provider: {
            '@type': 'Organization',
            name: 'Di Sản Bù Đăng',
            url: SITE_URL,
          },
          teaches: ['Lịch sử địa phương', 'Văn hóa dân tộc thiểu số S\'tiêng', 'Di sản thiên nhiên Bù Đăng'],
          educationalLevel: ['Trung học cơ sở', 'Trung học phổ thông'],
          inLanguage: 'vi',
          availableLanguage: 'Vietnamese',
          hasCourse: [
            {
              '@type': 'Course',
              name: 'Lịch Sử Chiến Khu Đ',
              description: 'Khám phá lịch sử hào hùng của căn cứ địa cách mạng Chiến Khu Đ tại Bù Đăng',
              courseCode: 'DSB-HIST-001',
              provider: { '@type': 'Organization', name: 'Di Sản Bù Đăng' },
            },
            {
              '@type': 'Course',
              name: 'Văn Hóa S\'tiêng Bản Địa',
              description: 'Tìm hiểu thổ cẩm, cồng chiêng và ngôn ngữ S\'tiêng của đồng bào dân tộc Bù Đăng',
              courseCode: 'DSB-CULT-001',
              provider: { '@type': 'Organization', name: 'Di Sản Bù Đăng' },
            },
          ],
        }),
      },
    ],
  })
}

export function useNewsSeo(article: Ref<NewsArticle | null>) {
  watchEffect(() => {
    if (!article.value) return

    useMuseumSeo({
      title: article.value.title,
      description: article.value.excerpt,
      image: article.value.coverImage,
      path: `/news/${article.value.slug}`,
      type: 'article',
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(buildArticleSchema(article.value)),
        },
      ],
    })
  })
}

