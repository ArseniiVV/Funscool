<template>
  <div id="app">
    <NuxtPage />
    <ClientOnly>
      <YaMetrika />
    </ClientOnly>
    <widget-contact />
    <lid-modal />
    <video-modal />
    <InfoModal v-if="infoModalVisible" />

    <CookieAgreement />
  </div>
</template>

<script setup lang="ts">
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
const { infoModalVisible } = useInfoModal();
</script>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
