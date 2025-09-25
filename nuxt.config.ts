// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  vite: {
    build: { sourcemap: false },
    css: { devSourcemap: false },
  },
  sourcemap: false, // для Nuxt

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/scripts', '@pinia/nuxt'],

  plugins: ['~/plugins/yandexMaps.js', '~/plugins/constants.ts', '~/plugins/yandexMetrix.js'],

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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Preload critical fonts to avoid render-blocking chains
        { rel: 'preload', as: 'font', href: '/fonts/Montserrat-Regular.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', href: '/fonts/Montserrat-Bold.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', href: '/fonts/Montserrat-SemiBold.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
      ],
      script: [
        {
          src: 'https://widgets.mango-office.ru/site/27876',
          defer: true,
        }
      ],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('swiper-') || tag.startsWith('bvi-'),
    },
  },
});
