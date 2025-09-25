// plugins/bvi.client.ts
export function isMobile(): boolean {
  return (
    window.matchMedia?.('(max-width: 748px)')?.matches ??
    window.innerWidth <= 748
  )
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load: ${src}`))
    document.head.appendChild(s)
  })
}

let bviLoadPromise: Promise<void> | null = null
let initialized = false

// async function ensureBviCss(href = '/bvi-plugin/bvi.min.css') {
//   if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return
//   const l = document.createElement('link')
//   l.rel = 'stylesheet'
//   l.href = href
//   document.head.appendChild(l)
// }

export async function loadBviOnDemand(autoInit = true): Promise<boolean> {
  if (isMobile()) {
    // На мобильных не грузим тяжёлые скрипты
    return false
  }

  if (!bviLoadPromise) {
    bviLoadPromise = (async () => {
      // 1) jQuery
      if (!(window as any).jQuery) {
        await loadScript('https://code.jquery.com/jquery-3.6.0.min.js')
      }
      // 2) bvi.js (локальный)
      await loadScript('/bvi-plugin/bvi.js')
    })()
  }

  await bviLoadPromise

  if (autoInit && !initialized) {
    const w = window as any
    if (w.isvek?.Bvi) {
      // ensureBviCss()
      new w.isvek.Bvi({
        bvi: true,
        bviFontSize: 1.2,
        bviFontFamily: 'Arial',
        bviLineHeight: 1.5,
        bviTextAlign: 'left',
        bviTextColor: '#000000',
        bviBackgroundColor: '#ffffff',
        bviLinkColor: '#0000ff',
        bviLinkHoverColor: '#ff0000'
      })

      // 3) Имитация клика по .bvi-open (ставит cookie и включает панель)
      const trigger = document.createElement('a')
      trigger.href = '#'
      trigger.className = 'bvi-open'
      trigger.style.position = 'absolute'
      trigger.style.left = '-9999px'
      document.body.appendChild(trigger)
      trigger.click()
      setTimeout(() => trigger.remove(), 0)

      initialized = true
      
    } else {
      console.warn('[BVI] isvek.Bvi не найден, fallback: .bvi-active')
      document.body.classList.add('bvi-active')
    }
  }

  return true
}

// ✅ Default export чтобы Nuxt не ругался
export default defineNuxtPlugin(() => {
  return {
    provide: {
      bviLoader: loadBviOnDemand
    }
  }
})
