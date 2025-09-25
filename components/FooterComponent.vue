<template>
  <footer>
    <div class="footer-head">
      <div class="footer-head__container">
        <div class="footer-head__logo">
          <img :src="'/img/brand-book/Logo.svg'" alt="FunsCool" />
        </div>
      </div>
      <div class="poclicy-link">
        <a :href="$constants.policy" target="blank" class="footer-policy-link">
          Политика конфиденциальности
        </a> <br><br> 
        <a :href="$constants.agreement" target="blank" class="footer-policy-link">
          Согласие на обработку данных
        </a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom__rights">
        © {{ $constants.company_name }}, 2025
        <br>
        Все права защищены
      </div>

      <div class="footer-bottom__social-group">
        <a :href="'https://wa.me/' + $constants.wa" target="_blank" rel="noopener noreferrer"
          @click="useSendMetrika('WhatsApp')">
          <img class="lazyload icon" :src="'/img/contacts/whatsapp-white.svg'" alt="whatsapp" />
        </a>
        <a :href="'https://vk.com/' + $constants.vk_link" target="_blank" rel="noopener noreferrer"
          @click="useSendMetrika('VK')">
          <img class="lazyload icon" :src="'/img/contacts/Vk.svg'" alt="Vk" />
        </a>
        <a :href="'https://t.me/' + $constants.tg" target="_blank" rel="noopener noreferrer"
          @click="useSendMetrika('TG')">
          <img class="lazyload icon" :src="'/img/contacts/Telegram.svg'" alt="Telegram" />
        </a>
      </div>

      <div class="footer-bottom__policy">
        <a :href="$constants.policy" target="blank" rel="noopener noreferrer" class="footer-bottom__policy-link footer-policy-link">
          Политика конфиденциальности
        </a> <br><br>
        <a :href="$constants.agreement" target="blank" rel="noopener noreferrer" class="footer-bottom__policy-link footer-policy-link">
          Согласие на обработку данных
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { $constants } = useNuxtApp();
</script>

<style scoped lang="scss">
footer {
  background-color: var(--theme-dark);
  color: #fff;
  padding: 56px 24px;

  .footer-head {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .poclicy-link {
      display: none;
    }

    &__container {
      max-width: 1240px;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &__logo {
      height: 38px;
      margin-bottom: 32px;

      img {
        height: 100%;
        width: auto;
        object-fit: contain;
      }
    }

    &__text {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.2em;
      text-align: center;
      text-wrap: balance;
    }
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 32px;

    &__rights,
    &__policy {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.2em;
    }

    &__rights {
      width: 300px;
      text-align: left;
    }

    &__policy {
      width: 300px;
      text-align: right;

      a {
        color: inherit;
        text-decoration: none;
      }

      &__sved-link {
        display: none;
      }
    }

    &__social-group {
      display: flex;
      gap: 24px;

      img {
        width: 48px;
        height: 48px;
        transition: transform 0.3s ease;
      }

      a:hover img { 
        transform: scale(1.1);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 24px;

    .footer-head {
      .poclicy-link {
        display: block;
      }
    }



    .footer-head__text {
      font-size: 16px;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: center;
      row-gap: 24px;
      text-align: center;

      &__social-group {
        order: 0; // 👈 Show first on mobile

        img {
          width: 38px;
          height: 38px;
        }
      }

      &__rights {
        order: 1; // 👈 Show second on mobile
        font-size: 16px;
        text-align: center;
      }

      &__policy {
        order: 2;

        &-link {
          display: none;
        }

        &__sved-link {
          display: block;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
}

/* Эффект стрелочки как в header для ссылок политики/согласия */
.footer-policy-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0;
  transition: gap 0.4s ease;
  text-decoration: underline;
  color: #fff;


  &::before {
    content: '';
    display: block;
    width: 0;
    height: 18px;
    background: url('/img/ui-elements/arrow.svg') no-repeat left;
    background-size: contain;
    transition: width 0.4s ease;
    margin-right: 0;
  }

  &:hover {
    gap: 8px;

    &::before {
      width: 26px;
    }
  }
}
</style>
