<template>
  <section class="main-block about-section">
    <div class="about-section__inner">
      <div class="about-section__content">
        <div class="about-section__title">О нас</div>
        <p class="about-section__lead">
          Сеть Фанскул – это комьюнити профессиональных и опытных педагогов, а также вовлеченных родителей, которые уже
          более 15 лет создают уникальную образовательную среду для счастливого детства. Мы – это 18 филиалов в России
          (Москва, Уфа, Казань) и на Кипре, включающих центры раннего развития, детские сады и лицензированные частные
          школы.
        </p>
        <p class="about-section__lead">
          ДНК нашей компании – это воспитание общечеловеческих ценностей, индивидуальный маршрут развития для каждого
          ребенка, качественное обучение и теплая душевная атмосфера.
        </p>
        <p class="about-section__subtitle">Детский сад Фанскул – это особенное место, где:</p>
        <ul class="about-section__list">
          <li>
            <strong>Заботятся о каждом малыше:</strong> бережная адаптация для детей от 1 года и 2 месяцев.
          </li>
          <li>
            <strong>Обеспечивают комфортную среду:</strong> полный день с 08:00 до 20:00 и сбалансированное
            6-разовое питание.
          </li>
          <li>
            <strong>Гарантируют безопасность:</strong> медработник, круглосуточное онлайн видеонаблюдение.
          </li>
          <li>
            <strong>Развивают гармонично:</strong> всестороннее развитие – от творчества до логики, с погружением в
            русский и английский языки. Авторская программа Фанскул.
          </li>
          <li>
            <strong>Раскрывают таланты:</strong> профессиональная поддержка психолога и логопеда.
          </li>
        </ul>
        <p class="about-section__cta-text">Мы всегда на связи и готовы ответить на ваши вопросы.</p>
        <div class="about-section__phone">
          <span>Тел.:</span>
          <a :href="'tel:' + $constants.phone_number">{{ $constants.phone_text }}</a>
        </div>
        <button type="button" class="the-button themed about-section__button" @click="
          useModalStore().openLidModal({
            title: 'Записаться на экскурсию',
            text: 'Оставьте свои контакты, и мы подберём удобное время экскурсии по саду, познакомим вас с пространством и ответим на все вопросы.',
            buttonText: 'Записаться на экскурсию',
            group: '',
            community: '',
            motive: 'О нас: записаться на экскурсию',
          })
          ">
          Записаться на экскурсию
        </button>
      </div>
      <div class="about-section__media">
        <img :src="'/img/persons/Mary_openDoor.webp'" alt="Герой Фанскул" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $constants } = useNuxtApp();
</script>

<style scoped lang="scss">
.about-section {
  text-align: left;
  background-color: var(--theme-light);

  &__inner {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: 48px;
    align-items: center;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__title {
    font-size: 48px;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 32px;
  }

  &__lead {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 18px;
  }

  &__subtitle {
    font-size: 20px;
    font-weight: 600;
    margin: 28px 0 16px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-left: 20px;
    margin: 0 0 24px;

    li {
      font-size: 17px;
      line-height: 1.6;
    }

    strong {
      font-weight: 600;
    }
  }

  &__cta-text {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__phone {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 18px;
    font-weight: 600;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  &__button {
    margin-top: 24px;
  }

  &__media {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: min(100%, 420px);
      height: auto;
      object-fit: contain;
    }
  }
}

@media (max-width: 1024px) {
  .about-section {
    &__inner {
      grid-template-columns: 1fr;
    }

    &__media {
      order: -1;
    }
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 40px 0;

    &__title {
      font-size: 32px;
    }

    &__lead,
    &__list li,
    &__cta-text,
    &__phone {
      font-size: 16px;
    }

    &__subtitle {
      font-size: 18px;
    }
  }
}
</style>
