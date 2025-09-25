// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',
  ssr: true,
  devtools: { enabled: false },

  // === СТАТИКА / КЭШИРОВАНИЕ ЧЕРЕЗ ROUTE RULES ===
  // Глобальные правила для кэша и ISR (revalidate) там, где есть динамика.
  routeRules: {
    // Бандлы и IPX — год, immutable
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },

    // 🔧 ИМЕННО /img/** (а не /images/**)
    '/img/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/favicon.ico': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },

    // SEO-файлы (их разумно кэшировать короче)
    '/robots.txt': { headers: { 'cache-control': 'public, max-age=86400' } }, // 1 день
    '/sitemap.xml': { headers: { 'cache-control': 'public, max-age=86400' } },

    // Страницы — кэш CDN + быстрая ревалидация
    '/**': {
      headers: { 'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
    },

    // Если есть «полудинамика»
    // '/news/**': { isr: 300 }, // пересборка раз в 5 минут
  },

  nitro: {
    // Сжимать публичные ассеты заранее (.gz/.br), чтобы сервер/CDN раздавал мгновенно
    compressPublicAssets: true,
    prerender: {
      // Если проект в целом статический: ползём по ссылкам и заранее рендерим страницы
      crawlLinks: true,
      // routes: ['/', '/about', '/contacts'] // можно явно дописать критичные роуты
    },
  },

  // === ИЗОБРАЖЕНИЯ ===
  modules: ['@nuxt/image', '@pinia/nuxt', '@nuxt/scripts', '@nuxt/eslint'],

  image: {
    // AVIF/WebP по умолчанию + responsive
    format: ['avif', 'webp'],
    quality: 70, // Часто золотая середина
    densities: [1, 2], // retina спрайты
    screens: {
      // свои брейкпоинты под проект
      xs: 360,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    provider: 'ipx', // локальный быстрый провайдер
    // domains: ['static.ccrosby.ru'] // если грузите с внешнего домена
  },

  // === HEAD: ШРИФТЫ / PRELOAD / PRECONNECT ===
  app: {
    head: {
      title: 'Фанскул - инновационная образовательная школа в Уфе', // todo: Устанавливаем заголовок страницы
      htmlAttrs: {
        lang: 'ru', // Устанавливаем язык страницы
      },
      meta: [
        { name: 'description', content: 'Фанскул - инновационная образовательная школа в Уфе' }, //todo: добавить описание
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ff6600' },
      ],
      link: [
        // Иконка
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

        // Предварительные соединения к CDN/статике (поставьте свои хосты)

        // { rel: 'preconnect', as: 'image', href: '/img/brand-book/Logo.svg' },

        // Критичные шрифты — preload (woff2 только)
        {
          rel: 'preload',
          as: 'font',
          href: '/fonts/Montserrat-Regular.woff2',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          href: '/fonts/Montserrat-SemiBold.woff2',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
      // Скрипты подключайте через @nuxt/scripts или здесь, ТОЛЬКО defer
      script: [
        {
          src: 'https://widgets.mango-office.ru/site/27876',
          defer: true,
        },
      ],
    },
  },

  // === VITE/ROLLUP: МЕНЬШЕ КАРТ, СИЛЬНЕЕ МИНИФИКАЦИЯ, ВНУТРЕННИЕ СПЛИТЫ ===
  vite: {
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      minify: 'esbuild',
      modulePreload: { polyfill: false },
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          // ❗ Без прямых ссылок на "nuxt/..." и "#app"
          // Разбиваем только по node_modules, это стабильно для Nuxt 4
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, '/');
            if (!normalizedId.includes('node_modules/')) return;

            if (/node_modules\/(?:vue\/|@vue\/)/.test(normalizedId)) return 'vue';
            if (normalizedId.includes('node_modules/vue-router/')) return 'router';
            if (normalizedId.includes('node_modules/pinia/')) return 'pinia';
            if (normalizedId.includes('node_modules/axios/')) return 'vendor-axios';
            // всё остальное крупное попадёт в общий vendor
            return 'vendor';
          },
        },
      },
    },
    css: { devSourcemap: false },
  },

  sourcemap: false, // дубль для Nuxt-уровня

  // === Vue: кастомные элементы, чтобы не ломать рендер ===
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('swiper-') || tag.startsWith('bvi-'),
    },
  },
});
