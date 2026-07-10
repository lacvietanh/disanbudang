// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  site: {
    url: 'https://disanbudang.com',
    name: 'Di Sản Đồng Nai',
    trailingSlash: true,
  },

  routeRules: {
    '/community': { redirect: { to: '/explore/', statusCode: 301 } },
    '/quiz': { redirect: { to: '/#quiz', statusCode: 301 } },
    '/school': { redirect: { to: '/study/', statusCode: 301 } },
    '/library': { redirect: { to: '/explore/', statusCode: 301 } },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-security',
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    strictNuxtContentPaths: false,
    exclude: ['/404'],
    sources: [],
    zeroRuntime: true,
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'https://images.unsplash.com',
          'https://*.tile.openstreetmap.org',
          'https://tile.openstreetmap.org',
          'https://*.basemaps.cartocdn.com',
          'https://basemaps.cartocdn.com'
        ],
      },
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 'hour',
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
      title: 'Di Sản Đồng Nai - Bảo Tàng Số Địa Phương',
      meta: [
        {
          name: 'description',
          content:
            'Bảo tàng số di sản văn hóa, lịch sử và thiên nhiên Thành Phố Đồng Nai - từ Biên Hòa, Sóc Bom Bo đến Chiến Khu Đ, núi Bà Rá. Khám phá và bảo tồn di sản qua không gian số tương tác.',
        },
        { name: 'theme-color', content: '#FBF8F2' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'vi_VN' },
        {
          property: 'og:site_name',
          content: 'Di Sản Đồng Nai',
        },
      ],
      link: [
        { rel: 'icon', href: '/favicon/favicon.ico', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon/icon-48.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/icon-96.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/icon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/manifest.json' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap',
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
      include: ['leaflet'],
    },
  },
})
