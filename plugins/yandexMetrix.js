export default defineNuxtPlugin((nuxtApp) => {
  const YID = 102155142;
  nuxtApp.provide('YID', YID);
  if (import.meta.client) {
    if (!window.ym) {
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
      window.ym(YID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        ecommerce: "dataLayer"
      });
    }
    try {
    // Глобальный метод для отправки целей
      nuxtApp.provide('yaMetrika', (event) => {
        if (typeof window !== 'undefined' && typeof window.ym === 'function') {
          window.ym(YID, 'reachGoal', event)
          console.log('reachGoal', event)
        } else {
          console.warn(`[Yandex Metrika] Цель "${event}" не отправлена: ym не определён.`)
        }
      })
    } catch (err) {
      console.error('[Yandex Metrika] Неожиданная ошибка:', err)
    }
  }
})