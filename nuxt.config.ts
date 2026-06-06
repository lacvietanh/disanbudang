// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-security',
  ],

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://images.unsplash.com', 'https://*.tile.openstreetmap.org', 'https://*.basemaps.cartocdn.com'],
      },
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 'hour',
      fireImmediately: true,
    },
    corsHandler: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  },

  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],


  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: true,
  },

  image: {
    quality: 85,
    format: ['webp', 'jpg'],
    domains: ['images.unsplash.com'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Di Sản Bù Đăng — Bảo Tàng Số Địa Phương',
      meta: [
        {
          name: 'description',
          content:
            'Khám phá di sản văn hóa, lịch sử và thiên nhiên huyện Bù Đăng qua không gian số hiện đại — hành trình trải nghiệm sống động dành cho mọi thế hệ.',
        },
        { name: 'theme-color', content: '#1C1A18' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'vi_VN' },
        {
          property: 'og:site_name',
          content: 'Di Sản Bù Đăng',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  experimental: {
    viewTransition: true,
  },

  typescript: {
    strict: true,
  },

  vite: {
    optimizeDeps: {
      include: ['leaflet', 'howler'],
    },
  },
})
