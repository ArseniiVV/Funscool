export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return;

  let loadPromise = null;

  const loadYandexMaps = () => {
    if (typeof window === 'undefined') return Promise.resolve();

    // Already available
    if (window.ymaps3) {
      return Promise.resolve();
    }

    // Reuse in-flight promise
    if (loadPromise) return loadPromise;

    loadPromise = new Promise((resolve, reject) => {
      // Prevent duplicate script tags
      const exist = document.querySelector('script[data-yandex-maps]');
      if (exist) {
        exist.addEventListener('load', () => resolve());
        exist.addEventListener('error', (e) => reject(e));
        return;
      }

      const script = document.createElement('script');
      script.src =
        'https://api-maps.yandex.ru/v3/?apikey=1f4f5a22-ac82-4851-9e07-98b180a7d83b&lang=ru_RU';
      script.defer = true;
      script.dataset.yandexMaps = 'true';
      script.onload = () => {
        console.info('[Yandex Maps] Скрипт успешно загружен.');
        if (window.ymaps3) nuxtApp.provide('ymaps3', window.ymaps3);
        resolve();
      };
      script.onerror = (e) => {
        console.error('[Yandex Maps] Ошибка загрузки скрипта:', e);
        reject(new Error('Не удалось загрузить Yandex Maps API'));
      };

      document.head.appendChild(script);
    });

    return loadPromise;
  };

  return {
    provide: {
      loadYandexMaps,
    },
  };
});

