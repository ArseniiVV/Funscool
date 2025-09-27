<template>
  <div id="app">
    <NuxtPage />
    <ClientOnly>
      <CookieAgreement loading="lazy" />
      <WidgetContact loading="lazy" />
      <YaMetrika loading="lazy" />
      <LidModal loading="lazy" />
      <VideoModal loading="lazy" />
      <InfoModal v-if="infoModalVisible" />
    </ClientOnly>

  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const { infoModalVisible } = useInfoModal();

const WidgetContact = defineAsyncComponent({
  loader: () => import('~/components/WidgetContact.vue'),
  suspensible: false,
});

const LidModal = defineAsyncComponent({
  loader: () => import('~/components/LidModal.vue'),
  suspensible: false,
});

const VideoModal = defineAsyncComponent({
  loader: () => import('~/components/VideoModal.vue'),
  suspensible: false,
});

const InfoModal = defineAsyncComponent({
  loader: () => import('~/components/InfoModal.vue'),
  suspensible: false,
});

const CookieAgreement = defineAsyncComponent({
  loader: () => import('~/components/CookieAgreement.vue'),
  suspensible: false,
});
</script>

<style lang="scss">
:root {
  --theme-dark: #ff6600;
  --theme-strong: #ffb380;
  --theme-middle: #ffd9bf;
  --theme-light: #ffe8d9;
  --yellow: #feb200;
  --yellow-light: #fed880;
  --aqua: #80e5e5;
  --green: #33cc66;
  --lime: #99e5b3;
  --purple: #b280e5;
  --beige-middle: #FFB280;
  --beige-light: #ffecbf;
}

body {
  font-family: 'Montserrat';
  background-color: var(--theme-light);
  margin: 0;
}

.main-section {
  padding: 0 24px;

  @media (min-width: 1500px) {
    padding-left: 0;
    padding-right: 0;
    padding-top: 95px;
    padding-bottom: 95px;
    margin: 0 auto;
    max-width: 1440px;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 40px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    padding: 40px 20px;
  }
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 24px;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background-image: url('/img/close.svg');
  background-size: contain;
}

// Button
.the-button {
  z-index: 599;
  padding: 22px 30px;
  margin-top: 20px;
  font-weight: 600;
  font-size: 17px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  // opacity: 0;

  &.themed {
    background-color: var(--theme-dark);
    color: #FFFFFF;
  }

  &:hover {
    // background-color: #dddddd;
    transform: scale(1.05); // Slight zoom on hover
  }
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

[inert] {
  pointer-events: none;
  user-select: none;
}


.bvi-panel *,
html:not(.bvi-panel) ::after,
html:not(.bvi-panel) ::before {
  box-sizing: border-box;
}


/*!
 * Button visually impaired v1.0.0 (https://bvi.isvek.ru/)
 * Copyright 2014-2021 <bvi@isvek.ru>
 * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
 */

html:not(.bvi-panel) *,
html:not(.bvi-panel) ::after,
html:not(.bvi-panel) ::before {
  box-sizing: border-box;
}
</style>
