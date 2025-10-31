export default defineNuxtPlugin((nuxtApp) => {
  const YID = nuxtApp.$constants?.yandex_metrika_id ?? 0;
  nuxtApp.provide('YID', YID);

  if (import.meta.client) {
    // Загружаем скрипт Метрики, если его ещё нет
    if (!window.ym) {
      (function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    }

    // Инициализация счётчика
    window.ym(YID, "init", {
      defer: true,
      useCookie: false,
      accurateTrackBounce: true,
      webvisor: true, // ✅ Вебвизор включён
      trackLinks: true,
      clickmap: true,
    });

    // Глобальный метод для отправки целей
    nuxtApp.provide("yaMetrika", (event) => {
      if (typeof window !== "undefined" && typeof window.ym === "function") {
        window.ym(YID, "reachGoal", event);
        console.log("reachGoal", event);
      } else {
        console.warn(`[Yandex Metrika] Цель "${event}" не отправлена: ym не определён.`);
      }
    });

    // === Отправляем цель "60+" если пользователь пробыл на странице ≥ 60 секунд ===
    let timer60;
    const trigger60 = () => {
      if (typeof window.ym === "function") {
        window.ym(YID, "reachGoal", "60+");
        console.log("reachGoal 60+");
      }
    };

    // Обнуляем и пересоздаём таймер при каждой навигации внутри Nuxt
    nuxtApp.hook("page:finish", () => {
      if (timer60) clearTimeout(timer60);
      timer60 = setTimeout(trigger60, 60000); // 60 секунд = 60000 мс
    });

    // Первый запуск при загрузке страницы
    if (!timer60) timer60 = setTimeout(trigger60, 60000);
  }
});