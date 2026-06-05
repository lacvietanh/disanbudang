import type { Heritage, NewsArticle } from '~/types'

const SITE_NAME = 'Di Sản Bù Đăng'
const SITE_DESCRIPTION = 'Bảo tàng số địa phương về lịch sử, văn hóa, thiên nhiên và ký ức cộng đồng huyện Bù Đăng.'
const SITE_URL = 'https://disanbudang.com'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=85'

interface MuseumSeoInput {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
}

export function useMuseumSeo(input: MuseumSeoInput = {}) {
  const title = input.title ? `${input.title} — ${SITE_NAME}` : `${SITE_NAME} — Bảo Tàng Số Địa Phương`
  const description = input.description ?? SITE_DESCRIPTION
  const image = input.image ?? DEFAULT_IMAGE
  const canonical = `${SITE_URL}${input.path ?? useRoute().path}`

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

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
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
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }
}
