<template>
  <header ref="headerRef" class="header" :class="menuOpen ? 'menu-open' : ''">
    <div class="bvi-target header-top">
      <a class="header-top__logo" href="/">
        <img :src="'/img/brand-book/Logo.svg'" alt="FunsCool" fetchpriority="high" />
      </a>
      <div class=" header-top__menu">
        <div class="header-top__menu-icons">
          <BvI />
          <a :href="'https://wa.me/' + $constants.wa" target="_blank" rel="noopener noreferrer"
            @click="useSendMetrika('WhatsApp')">
            <img :src="'/img/contacts/whatsapp-white.svg'" class="icon" alt="WhatsApp" loading="lazy" />
          </a>
          <a :href="'https://vk.com/' + $constants.vk_link" target="_blank" rel="noopener noreferrer"
            @click="useSendMetrika('Vk')">
            <img :src="'/img/contacts/Vk.svg'" class="icon" alt="Vk" loading="lazy" />
          </a>
          <a :href="'https://t.me/' + $constants.tg" target="_blank" rel="noopener noreferrer"
            @click="useSendMetrika('TG')">
            <img :src="'/img/contacts/Telegram.svg'" class="icon" alt="Telegram" loading="lazy" />
          </a>
        </div>
        <div class="header-top__menu-phone">
          <a class="phone-number" :href="'tel:' + $constants.phone_number" @click="useSendMetrika('phoneCall')">
            {{ $constants.phone_text }}
          </a>
        </div>
        <button class="header-top__menu-lines" aria-label="Меню" @click="menuOpen = !menuOpen">
          <span />
          <span />
        </button>
      </div>
    </div>
    <div class="header-bottom">
      <a class="header-bottom__logo" href="/">
        <img :src="'/img/brand-book/Sign.svg'" alt="FunsCool" fetchpriority="high" />
      </a>
      <div class="header-bottom__menu">
        <div class="header-bottom__menu-item">
          <a href="/#ageGroupSection" @click="menuOpen = false">Ступени образования</a>
        </div>
        <!-- <div class="header-bottom__menu-item">
          <a href="/#MainSlider-nuxt" @click="menuOpen = false">О школе</a>
        </div> -->
        <!-- <div class="header-bottom__menu-item">
          <a href="/#educationPath" @click="menuOpen = false">ИОМ</a>
        </div> -->
        <div class="header-bottom__menu-item">
          <a href="/#team" @click="menuOpen = false">Команда школы</a>
        </div>
        <!-- <div class="header-bottom__menu-item">
          <a href="/#future" @click="menuOpen = false">О сообществе</a>
        </div> -->
        <div class="header-bottom__menu-item">
          <a href="/#news" @click="menuOpen = false">Новости</a>
        </div>
        <div class="header-bottom__menu-item">
          <a href="/documents/" target="_blank" @click="menuOpen = false">Сведения о школе</a>
        </div>
        <div class="header-bottom__menu-item">
          <a href="/#contacts" @click="menuOpen = false">Контакты</a>
        </div>
      </div>
      <div class="header-top__menu-phone">
        <a class="phone-number" :href="'tel:' + $constants.phone_number" @click="useSendMetrika('phoneCall')">
          {{ $constants.phone_text }}
        </a>
      </div>
      <div class="header-top__menu-icons">
        <a :href="'https://vk.com/' + $constants.vk_link" target="_blank" rel="noopener noreferrer" @click="
          menuOpen = false;
        useSendMetrika('Vk');
        ">
          <img :src="'/img/contacts/Vk.svg'" class="icon" alt="Vk" loading="lazy" />
        </a>
        <a :href="'https://t.me/' + $constants.tg" target="_blank" rel="noopener noreferrer" @click="
          useSendMetrika('TG');
        menuOpen = false;
        ">
          <img :src="'/img/contacts/Telegram.svg'" class="icon" alt="Telegram" loading="lazy" />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BvI from './BvI.vue';
const { $constants } = useNuxtApp();

const headerRef: Ref<HTMLElement | null> = ref(null);
const menuOpen: Ref<boolean> = ref(false);

function handleScroll() {
  // Применяем логику только на десктопе
  if (window.innerWidth > 991) {
    if (window.scrollY > 50) {
      headerRef.value?.classList.add('active');
    } else {
      headerRef.value?.classList.remove('active');
    }
  } else {
    if (window.scrollY > 50) {
      headerRef.value!.style.boxShadow = '0 4px 6px -2px rgba(0, 0, 0, 0.2)';
    } else {
      headerRef.value!.style.boxShadow = 'none';
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
header {
  padding: 20px 24px;
  background-color: var(--theme-dark);
  color: #fff;
  position: fixed;
  width: 100%;
  z-index: 900;
  box-shadow: none;

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;

    &__logo {
      img {
        width: 100%;
        // height: 38px;
      }
    }

    &__menu {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-translate {
        display: none;
      }

      &-phone {
        a {
          border: 2px solid #fff;
          border-radius: 16px;
          padding: 10px 16px;
          transition: all 0.3s;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          line-height: 1em;
          text-decoration: none;

          &:hover {
            color: var(--theme-dark) !important;
            background-color: #fff;
            text-decoration: none;
          }
        }
      }

      &-icons {
        display: flex;
        margin-left: 29px;
        margin-right: 24px;
        gap: 14px;

        .icon {
          width: 30px;
          height: 30px;
          object-fit: contain;
        }
      }
    }
  }

  .header-bottom {
    display: flex;
    justify-content: end;
    padding-right: 24px;
    max-width: 1400px;
    margin: 20px auto;

    .header-top__menu-phone,
    .header-top__menu-icons {
      display: none;
    }

    &__logo {
      height: 38px;
      width: 38px;
      display: none;
    }

    &__menu {
      display: flex;
      display: flex;
      align-items: center;
      gap: 20px;

      &-item {
        a {
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          line-height: 1em;
          column-gap: 0;
          display: flex;
          transition: 0.4s ease;
          text-decoration: none;

          &::before {
            text-decoration: none;
            content: '';
            display: block;
            height: 20px;
            background: url('/img/ui-elements/arrow.svg') no-repeat left;
            background-size: contain;
            transition: 0.4s;
            width: 0px;
          }

          &:hover {
            column-gap: 8px;
            text-decoration: none;

            &::before {
              width: 30px;
            }
          }
        }
      }
    }
  }
}

.header-top__lng {
  display: none;
}

.header-top__menu-lines {
  display: none;
}

.header.active {
  box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.2);

  .header-top {
    display: none;
  }

  .header-bottom {
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0;
    margin: 0 auto;

    &__logo {
      display: block;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media (max-width: 1440px) {
  header {
    .header-bottom {
      &__menu-item {
        a {
          font-size: 1.3vw;
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .header {
    padding: 20px;
    transition: background-color 0.3s ease;

    &.active {
      .header-top {
        display: flex;
      }

      .header-bottom {
        padding: 24px 24px 50px 24px;
        justify-content: flex-start;
      }
    }

    &.menu-open {
      background-color: var(--aqua);

      .header-bottom {
        transform: translateY(0);
        pointer-events: all;
        opacity: 1;
      }

      .header-top__menu-lines {
        span {
          &:nth-child(1) {
            transform: rotate(45deg);
            top: 15px;
          }

          &:nth-child(2) {
            transform: rotate(-45deg);
            bottom: 15px;
          }
        }
      }

      .header-top__lng {
        display: block;
      }
    }

    .header-top {
      margin-bottom: 0;

      .header-top__menu-phone {
        // display: none;

        a {
          border: none;

          @media (max-width: 400px) {
            font-size: 14px;
          }
        }
      }

      .header-top__menu-icons,
      .header-top__menu-translate {
        display: none;
      }
    }

    .header-top__logo {
      position: relative;
      z-index: 20;
      width: 120px;
      height: 26px;
    }

    .header-top__lng {
      display: block;
    }

    .header-top__menu-lines {
      position: relative;
      z-index: 20;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      background-color: transparent;
      border: 0;
      outline: none;

      span {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #fff;
        border-radius: 1px;
        transition: all 0.3s ease;

        &:nth-child(1) {
          top: 10px;
        }

        &:nth-child(2) {
          bottom: 10px;
        }
      }
    }

    .header-bottom__logo {
      display: none !important;
    }

    .header-bottom {
      padding: 24px 24px 50px 24px;
      position: fixed;
      left: 0;
      // top: 72px;
      z-index: 10;
      transform: translateY(-100%);
      pointer-events: none;
      opacity: 0;
      transition: all 0.3s ease;
      width: 100%;
      height: calc(100vh - 72px);
      background-color: var(--aqua);
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .header-top__menu-phone {
        display: block;
        margin-top: auto;
        margin-bottom: 32px;

        a {
          display: block;
        }
      }

      .header-top__menu-icons {
        display: flex;
        column-gap: 16px;

        .icon {
          height: 32px;
          width: 32px;
        }
      }
    }

    .header-bottom__menu {
      margin-top: auto;
      margin-bottom: clamp(40px, 8dvh, 100px);
      flex-direction: column;
      justify-content: center;
      row-gap: 32px;

      .header-bottom__menu-item a {
        font-size: 20px;

        &::before {
          display: none;
        }
      }
    }
  }
}

/* Стили для активной кнопки */
#glazd {
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    img {
      filter: invert(1) brightness(2);
    }
  }
}

/* Кастомизация панели bvi */
.bvi-panel {
  left: auto !important;
  right: 20px !important;
  bottom: 80px !important;
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;

  &-button {
    // font-family: 'Open Sans', sans-serif !important;
    font-weight: 600 !important;
    color: #333 !important;

    &:hover {
      background: #f0f0f0 !important;
    }
  }
}

/* Глобальные изменения в режиме доступности */
.bvi-active {
  .header {
    background: #fff !important;
    color: #000 !important;

    a {
      color: #000 !important;
    }

    .header-top__menu-phone a {
      border-color: #000;
    }
  }

  .widget-img {
    filter: contrast(2);
  }
}
</style>
