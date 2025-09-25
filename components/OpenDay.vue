<template>
  <section id="open-door">
    <div class="container">
      <div class="open-door__wrap">
        <div class="title">
          Индивидуальный день открытых дверей
          <img
            :src="'/img/ui-elements/open-door-underline.svg'"
            alt="Подчеркивание"
            loading="lazy"
          />
        </div>
        <div class="open-door__wrap-text">
          С нами комфортно не только маленьким, но и большим, поэтому все экскурсии по школе мы
          проводим лично, в удобное для Вас время. После встречи Вы будете знать всё про про условия
          учёбы, режим дня и учебный план, а если захотите, то познакомитесь с педагогами. Останется
          только задуматься, ну почему такой школы не было в наше время!
        </div>
        <div class="open-door__wrap-btn__inline">
          <button
            class="open-door__wrap-btn the-button themed"
            data-title="Записаться на индивидуальный день открытых дверей"
          >
            Записаться на экскурсию
          </button>
        </div>
        <div class="open-door__images">
          <img
            ref="openDayImage1"
            class="open-door__image image-1"
            :src="'/img/open-day/frog.webp'"
            alt="Преподаватель"
            loading="lazy"
          />
          <img
            ref="openDayImage2"
            class="open-door__image image-2"
            :src="'/img/open-day/boy.webp'"
            alt="Ученики"
            loading="lazy"
          />
        </div>
        <img
          class="open-door__sun"
          :src="'/img/ui-elements/open-door-sun.svg'"
          alt="Солнце"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const openDayImage1: Ref<HTMLImageElement | null> = ref(null);
const openDayImage2: Ref<HTMLImageElement | null> = ref(null);

onMounted(() => {
  gsap.to([openDayImage1.value, openDayImage2.value], {
    scrollTrigger: {
      trigger: '#open-door',
      start: 'bottom bottom',
    },
    duration: 1,
    x: 0,
  });
});
</script>

<style lang="scss" scoped>
#open-door {
  position: relative;
  padding-top: 100px;
  margin-bottom: 72px;
  max-width: 100vw;
  overflow: hidden;

  .container {
    padding: 0 20px;

    @media (min-width: 1480px) {
      max-width: 1440px;
      padding: 0;
      margin: 0 auto;
    }
  }

  .title {
    text-wrap: balance;
    margin-bottom: 0;

    img {
      margin-top: 20px;
    }
  }

  .open-door {
    &__wrap {
      margin: 0 auto;
      text-align: center;

      @media (min-width: 1200px) {
        max-width: 80%;
      }

      @media (min-width: 1400px) {
        max-width: 66%;
      }

      &-text {
        font-size: 18px;
        font-weight: 500;
        line-height: 1.1em;
        margin-top: 40px;
        margin-bottom: 45px;
        text-align: center;
        text-wrap: balance;
        color: #000;
      }

      &-btn {
        display: inline-block;
        margin-bottom: 40px;
      }
    }

    &__image {
      &.image-1 {
        transform: translateX(-300%);
      }

      &.image-2 {
        transform: translateX(100%);
      }
    }
  }

  .open-door__sun {
    position: absolute;
    left: 5%;
    top: 0;
    width: 175px;
    height: 160px;

    @media (max-width: 1200px) {
      left: 20px;
      width: 120px;
      height: 120px;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .open-door__images {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    column-gap: 20px;

    img {
      width: 420px;
      height: 200px;
      max-width: 70%;
      object-fit: contain;
      object-position: bottom;

      &.image-1 {
        width: 98px;
        max-width: 20%;
        aspect-ratio: 1/1;
      }
    }
  }
}

@media (max-width: 768px) {
  #open-door {
    .open-door__wrap {
      .title {
        display: flex;
        justify-content: center;
        font-size: 32px;
        line-height: 1.2em;
        padding: 0;

        img {
          display: none;
        }
      }
    }

    .open-door__images {
      align-items: flex-end;

      img {
        &.image-1 {
          transform: translateX(-200%);
          width: 60px;
          max-width: 12%;
        }

        &.image-2 {
          max-width: 60%;
          height: auto;
        }
      }
    }
  }
}
</style>
`
