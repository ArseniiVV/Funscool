declare const ymaps3: any;

declare module 'nuxt/app' {
  interface RuntimeNuxtApp {
    $loadYandexMaps?: () => Promise<void>;
  }
}

export {};
