<template>
  <a href="#" class="bvi-open" @click.prevent="loadBviOnDemand">
    <img class="g-icon" src="/img/eye.svg" alt="ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ" title="ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ" loading="lazy"
      fetchpriority="low" />
  </a>
</template>

<script setup lang="ts">
const { $bviLoader } = useNuxtApp()
const CSS_HREF = '/bvi-plugin/bvi.min.css' // т.к. файл лежит в /public

function ensureBviCss(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${CSS_HREF}"]`)) return resolve()
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = CSS_HREF
    link.onload = () => resolve()
    link.onerror = () => reject(new Error('Failed to load BVI CSS'))
    document.head.appendChild(link)
  })
}

async function loadBviOnDemand() {
  await ensureBviCss()     // сначала стили...
  await $bviLoader()       // ...потом инициализация плагина
}
</script>

<style scoped lang="scss">
.g-icon {
  height: 30px;
  object-fit: contain;
  width: 50px;
  object-fit: fill;
  cursor: pointer;
}
</style>
