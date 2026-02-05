import { getTrackingParams } from '~/composables/useTrackingParams';

export default defineNuxtPlugin((nuxtApp) => {
  const YID = nuxtApp.$constants?.yandex_metrika_id ?? 0;
  nuxtApp.provide('YID', YID);
  if (import.meta.client) {
    if (!window.ym) {
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
      window.ym(YID, 'init', {
        useCookie: false,
        accurateTrackBounce: true,
        webvisor: true,
        trustedDomains:["moscow.funscool.ru"],
      });
    }
    try {
    // Глобальный метод для отправки целей
      const sendGoal = (event, extraParams) => {
        if (typeof window === 'undefined' || typeof window.ym !== 'function') {
          console.warn(`[Yandex Metrika] Цель "${event}" не отправлена: ym не определён.`)
          return;
        }

        const tracking = getTrackingParams();
        const normalizedExtra =
          extraParams && typeof extraParams === 'object' ? extraParams : {};
        const mergedParams =
          Object.keys(tracking).length || Object.keys(normalizedExtra).length
            ? { ...tracking, ...normalizedExtra }
            : null;

        if (mergedParams) {
          window.ym(YID, 'reachGoal', event, mergedParams);
        } else {
          window.ym(YID, 'reachGoal', event);
        }
        console.log('reachGoal', event, mergedParams);
      };

      nuxtApp.provide('yaMetrika', sendGoal);
    } catch (err) {
      console.error('[Yandex Metrika] Неожиданная ошибка:', err)
    }
  }
})
