<template>
  <div class="cookie-agreement" v-show="isShown" :class="{ 'show': !agreedToCookie }">
    Сайт использует cookie-файлы.
    Продолжая использовать сайт, вы соглашаетесь на обработку ваших статистиченских данных с использованием
    метрических программ.
    <button class="cookie-btn" @click="agree">Принимаю</button>
  </div>
</template>

<script setup lang="ts">
import type { CookieRef } from '#app';
const isShown: Ref<boolean> = ref(true);
const agreedToCookie: CookieRef<boolean> = useCookie('cookie-agreement', {
  default: () => false,
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

if (agreedToCookie.value) {
  isShown.value = false;
}
const agree = () => {
  agreedToCookie.value = true;
  setTimeout(() => {
    isShown.value = false;
  }, 750)
}
</script>

<style scoped lang="scss">
.cookie-agreement {
  padding: 24px 16px;
  position: fixed;
  right: 0;
  bottom: 10%;
  display: flex;
  gap: 12px;
  align-items: center;
  width: 600px;
  max-width: 100%;
  font-size: 14px;
  text-wrap: balance;
  transform: translateX(100%);
  transition: transform 750ms ease, opacity 750ms ease;
  border-radius: 8px 0 0 8px;
  background-color: #FFFFFF;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  z-index: 10000;

  &.show {
    opacity: 1;
    pointer-events: all;
    transform: translateX(0%);
  }

  .cookie-btn {
    color: #FFFFFF;
    background-color: var(--green);
    border-color: #FFFFFF;
    column-gap: 10px;
    font-size: 14px;
    padding: 16px 24px;
  }
}

@media (max-width: 600px) {
  .cookie-agreement {
    width: calc(100% - 32px);
    right: 16px;
    font-size: 13px;
    border-radius: 8px;
    flex-direction: column;

    .cookie-btn {
      width: 100%;
      padding: 10px 20px;
    }
  }
}
</style>