<template>
  <section id="educationPath" :style="{ '--steps-color': slides[activeSlideIndex].color || '#00CCCC' }">
    <!-- Верхние шаги (статичная часть) -->
    <div class="main-education-path__steps" style="margin-top: 90px">
      <div class="main-education-path__step">
        <img class="main-education-path__step-img-1" :src="'/img/ui-elements/education-path-img1.webp'" alt=""
          loading="lazy" />
      </div>
      <div class="main-education-path__step" :class="{ active: 0 === activeSlideIndex }">
        <img class="main-education-path__step-img-2" :src="'/img/ui-elements/education-path-img2.webp'" alt=""
          loading="lazy" />
        <button @click="goToSlide(0)">
          Личные качества
          <img :src="'/img/ui-elements/education-path-svg-1.svg'" alt="" loading="lazy" />
        </button>
      </div>
      <div class="main-education-path__step" :class="{ active: 1 === activeSlideIndex }">
        <img class="main-education-path__step-img-2" :src="'/img/ui-elements/education-path-img2.webp'" alt=""
          loading="lazy" />
        <button @click="goToSlide(1)">
          Академические грамотности
          <img :src="'/img/ui-elements/education-path-svg-2.svg'" alt="" loading="lazy" />
        </button>
      </div>
      <div class="main-education-path__step" :class="{ active: 2 === activeSlideIndex }">
        <img class="main-education-path__step-img-2" :src="'/img/ui-elements/education-path-img2.webp'" alt=""
          loading="lazy" />
        <button @click="goToSlide(2)">
          Когнитивные навыки
          <img :src="'/img/ui-elements/education-path-svg-3.svg'" alt="" loading="lazy" />
        </button>
      </div>
      <div class="main-education-path__step" :class="{ active: 3 === activeSlideIndex }">
        <img class="main-education-path__step-img-2" :src="'/img/ui-elements/education-path-img2.webp'" alt=""
          loading="lazy" />
        <button @click="goToSlide(3)">
          Эмоциональный и социальный интеллект
          <img :src="'/img/ui-elements/education-path-svg-4.svg'" alt="" loading="lazy" />
        </button>
      </div>
      <div class="main-education-path__step">
        <!-- Пустой шаг -->
      </div>
    </div>

    <!-- Нижняя часть – слайдер с информацией -->
    <div class="main-education-path__bottom">
      <div class="main-education-path__swiper-navigation">
        <button class="main-education-path__swiper-navigation-prev" aria-label="Назад">
          <img :src="'/img/ui-elements/arrow-swiper.svg'" alt="" loading="lazy" />
        </button>
        <button class="main-education-path__swiper-navigation-next" aria-label="Вперёд">
          <img :src="'/img/ui-elements/arrow-swiper.svg'" alt="" loading="lazy" />
        </button>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-12 col-center mx-auto">
            <Swiper ref="educationSwiper" :modules="[Autoplay]" :loop="true" :navigation="{
              nextEl: '.main-education-path__swiper-navigation-next',
              prevEl: '.main-education-path__swiper-navigation-prev',
            }" :autoplay="{ delay: 5000, disableOnInteraction: true }" class="swiper-path"
              @slide-change="onSlideChange">
              <SwiperSlide v-for="slide in slides" :key="slide.id" :data-color="slide.color">
                <div class="main-education-path__bottom-head">
                  {{ slide.head }}
                  <img :src="slide.headIcon" alt="" loading="lazy" />
                </div>
                <div class="main-education-path__bottom-text" v-html="slide.text" />
                <button class="the-button" type="button" @click="
                  useModalStore().openLidModal({
                    title: slide.buttonText,
                    text: 'Оставьте ваши контактные данные, мы свяжемся с вами в течение дня!',
                    buttonText: 'Присоединиться к обучению',
                    group: '',
                    community: '',
                    motive: 'ИОМ: ' + slide.head,
                  })
                  ">
                  {{ slide.buttonText }}
                </button>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Слайды для нижнего слайдера
const slides = ref([
  {
    id: 1,
    head: 'Личные качества',
    headIcon: '/img/ui-elements/education-path-svg-1.svg',
    text: `<b>Мы уделяем особое внимание формированию фундаментальных личных качеств у каждого ребёнка. Мы учим детей быть ответственными, смелыми и благодарными.</b><br/><br/>
           Это помогает ребёнку стать уверенным в себе, принимать правильные решения и уважительно относиться к другим. Интеллигентность улучшает социальную адаптацию и развивает этические и моральные нормы, а объективность позволяет делать обоснованные выводы и осознавать последствия своих поступков.`,
    buttonText: 'Присоединиться к обучению',
    color: 'rgba(0, 204, 204, 1)',
  },
  {
    id: 2,
    head: 'Академические грамотности',
    headIcon: '/img/ui-elements/education-path-svg-2.svg',
    text: `<b>Мы предлагаем углубленные программы по математике, литературе, информатике и языкам. Подготовка к ОГЭ и ЕГЭ с опытными преподавателями помогает детям успешно сдавать экзамены.</b><br/><br/>
           Математика включает олимпиадные задачи и наглядную геометрию, а литература развивает образное мышление и навыки написания эссе. Дополнительная программа по экономике и предпринимательству знакомит детей с микро и макроэкономикой, а также включает практику в компаниях и проектную деятельность.`,
    buttonText: 'Присоединиться к обучению',
    color: 'rgba(254, 178, 0, 1)',
  },
  {
    id: 3,
    head: 'Когнитивные навыки',
    headIcon: '/img/ui-elements/education-path-svg-5.svg',
    text: `<b>В современном мире важны не только академические грамотности, но и умение работать с источниками информации, анализировать, применять полученные знания на практике.</b><br/><br/>
           Развитие навыков внимания, памяти, творческого и критического мышления, коммуникации позволяет детям эффективно решать задачи, работать в коллективе и адаптироваться к быстро меняющимся условиям.`,
    buttonText: 'Присоединиться к обучению',
    color: 'rgba(255, 102, 0, 1)',
  },
  {
    id: 4,
    head: 'Эмоциональный и социальный интеллект',
    headIcon: '/img/ui-elements/education-path-svg-4.svg',
    text: `Умения управлять эмоциями и строить здоровые отношения с другими людьми способствуют созданию благоприятной среды для обучения и жизни, а также помогают детям справляться с жизненными трудностями.`,
    buttonText: 'Присоединиться к обучению',
    color: 'rgba(102, 0, 204, 1)',
  },
]);

// Цвет фона, используемый через CSS-переменную
const currentBgColor = ref(slides.value[0].color);

// Текущий индекс активного слайда
const activeSlideIndex = ref(0);

// Обработчик смены слайда для нижнего слайдера
function onSlideChange(swiper: SwiperType) {
  activeSlideIndex.value = swiper.realIndex;
  currentBgColor.value = slides.value[swiper.realIndex].color;
}

// Функция для переключения слайда при клике на шаг
function goToSlide(index: number) {
  activeSlideIndex.value = index;

  const sw = document.querySelector('.swiper-path') as HTMLElement & { swiper?: SwiperType };
  const swiper = sw?.swiper;
  if (swiper) {
    swiper.slideToLoop(index, 500, false);
  }
}
</script>

<style lang="scss" scoped>
.film-image-container {
  height: 300px; // фиксированная высота контейнера
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
    width: auto; // авто-ширина
    object-fit: cover;
    border-radius: 20px;
  }
}

@media (max-width: 568px) {
  .main-education-path__bottom-text {
    text-align: left;
    max-width: 90% !important;
  }
}

#educationPath {
  max-width: 100vw;
  overflow: hidden;

  .swiper-path {
    width: 100%;
  }

  .main-education-path__top {
    position: relative;
    padding: 20px 0 100px 0 !important;
  }

  .main-education-title {
    position: relative;
    margin-bottom: 64px;
    font-size: 48px;
    font-weight: 600;
    line-height: 1.2em;

    &::after {
      content: '';
      position: absolute;
      right: calc(100% + 18px);
      top: 50%;
      transform: translateY(-50%);
      width: 100px;
      height: 56px;
      background-image: url('/img/ui-elements/education-title-svg.svg');
      background-size: contain;
      background-repeat: repeat;
    }
  }

  .main-education-description {
    font-size: 18px;
    line-height: 1.25em;

    b {
      display: block;
      margin-top: 32px;
    }
  }

  .main-education-arrow {
    position: absolute;
    bottom: -45px;
    left: 50%;
    transform: translateX(-50%);
    width: 145px;
    height: 100px;
  }

  .main-education-path__steps {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: flex-end;
    row-gap: 20px;

    .main-education-path__step:nth-child(1) {
      border-top-left-radius: 0;
      height: calc(72px * 1);
    }

    .main-education-path__step:nth-child(2) {
      border-top-left-radius: 15px;
      height: calc(72px * 2);

      button img {
        top: calc(100% - 4px);
      }
    }

    .main-education-path__step:nth-child(3) {
      border-top-left-radius: 15px;
      height: calc(72px * 3);

      button img {
        top: calc(100% - 4px);
      }
    }

    .main-education-path__step:nth-child(4) {
      border-top-left-radius: 15px;
      height: calc(72px * 4);

      button img {
        height: 68px;
        top: calc(50%);
        transform: translateX(-50%) translateY(-40%);
      }
    }

    .main-education-path__step:nth-child(5) {
      border-top-left-radius: 15px;
      height: calc(72px * 5);
    }

    .main-education-path__step:nth-child(6) {
      border-top-left-radius: 15px;
      height: calc(72px * 6);

      .main-education-path__step-img-2,
      &::after,
      &::before {
        display: none !important;
      }
    }
  }

  .main-education-path__step {
    position: relative;
    padding: 16px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: var(--steps-color);
    transition: background-color 0.25s;
    z-index: 20;

    svg .step-svg {
      transition: fill 0.25s;
      fill: var(--steps-color);
    }

    &::before {
      content: '';
      position: absolute;
      height: 20px;
      width: 100%;
      bottom: 100%;
      right: -1px;
      width: 50%;
      background-color: var(--steps-color);
      transition: background-color 0.25s;
      z-index: 5;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      right: -1px;
      height: 21px;
      width: 51%;
      border-top-left-radius: 20px;
      transform: rotate(180deg);
      background-color: var(--theme-light);

      z-index: 5;
    }

    button {
      position: relative;
      padding: 0 22px;
      width: 100%;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.7em;
      color: #ffffff;
      background-color: transparent;
      border: 0;
      cursor: pointer;

      img {
        position: absolute;
        left: 50%;
        top: calc(100%);
        transform: translateX(-50%);
        width: 0;
        height: 0;
        opacity: 0;
        object-fit: contain;
        transition:
          opacity 0.25s,
          width 0.25s,
          height 0.25s;
      }

      &:hover {
        img {
          opacity: 1;
          width: 100%;
          height: 18px;
        }
      }
    }

    &.active {
      .main-education-path__step-img-2 {
        display: inline;
      }

      button img {
        opacity: 1;
        width: 100%;
        height: 18px;
      }
    }
  }

  .main-education-path__step-img-1 {
    position: absolute;
    left: 0;
    bottom: calc(100%);
    object-fit: contain;
    z-index: 10;
    width: 264px;

    @media (max-width: 1400px) {
      width: 210px;
    }

    @media (max-width: 1200px) {
      width: 180px;
    }
  }

  .main-education-path__step-img-2 {
    display: none;
    position: absolute;
    left: 50%;
    bottom: calc(100% + 24px);
    transform: translateX(-50%);

    height: 150px;
    z-index: 10;

    @media (max-width: 1400px) {
      height: 120px;
    }

    @media (max-width: 1200px) {
      height: 100px;
    }

    svg {
      width: 100%;
      height: 100%;
      object-position: bottom;
      object-fit: contain;
    }
  }

  .main-education-path__bottom {
    padding: 40px 0 40px 0;
    background-color: var(--steps-color);
    transition: background-color 0.25s;
    transform: translateY(-1px);

    .swiper-path .swiper-slide {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 5px;
    }
  }

  .main-education-path__bottom-title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.5em;
    color: #ffffff;
  }

  .main-education-path__bottom-text {
    margin-bottom: 64px;
    font-size: 17px;
    line-height: 1.5em;
    color: #ffffff;
    // text-wrap: balance;
    text-align: left;
    max-width: 60%;
  }

  .main-education-path__bottom-button {
    padding: 25px 30px;
    background-color: #ffffff;
    color: #000;
    border-radius: 24px;
    border: 1px solid #ffffff;
    font-size: 18px;
    font-weight: 600;
    line-height: 1em;
    transition: transform 0.25s;

    &:hover {
      transform: scale(1.05);
    }
  }

  .main-education-path__bottom-head {
    display: none;
  }

  .main-education-path__swiper-navigation {
    opacity: 0;
    pointer-events: none;
  }
}

@media (max-width: 1440px) {
  #educationPath .main-education-path__steps .main-education-path__step:nth-child(3) button img {
    top: calc(100% - 6px);
  }

  #educationPath .main-education-path__steps .main-education-path__step:nth-child(4) button img {
    transform: translateX(-50%) translateY(-50%);
  }
}

@media (max-width: 1440px) {
  #educationPath .main-education-path__steps .main-education-path__step:nth-child(3) button img {
    top: calc(100% - 6px);
  }

  #educationPath .main-education-path__steps .main-education-path__step:nth-child(4) button img {
    transform: translateX(-50%) translateY(-50%);
  }
}

@media (max-width: 1024px) {
  #educationPath .main-education-path__step button {
    padding: 0 2px;
  }
}

@media (max-width: 991px) {
  #educationPath {
    padding-top: 50px;
    // margin-bottom: 72px;

    .main-education-path__top {
      position: relative;
      padding: 100px 0;
    }

    .main-education-title {
      margin-bottom: 40px;
      font-size: 32px;

      &::after {
        display: inline-block;
        position: static;
        width: 58px;
        height: 32px;
        transform: rotate(180deg);
        vertical-align: middle;
      }
    }

    .main-education-description {
      font-size: 14px;

      b {
        margin-top: 24px;
      }
    }

    .main-education-arrow {
      bottom: -28px;
      width: 76px;
      height: 56px;
    }

    .main-education-path__steps {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: flex-end;
      row-gap: 20px;

      .main-education-path__step:nth-child(1) {
        border-top-left-radius: 0;
        height: calc(72px * 1);
      }

      .main-education-path__step:nth-child(2),
      .main-education-path__step:nth-child(3),
      .main-education-path__step:nth-child(4) {
        display: none;
      }

      .main-education-path__step:nth-child(5) {
        height: calc(72px * 2);
      }

      .main-education-path__step:nth-child(6) {
        height: calc(72px * 3);

        .main-education-path__step-img-2 {
          display: inline !important;
        }
      }
    }

    .main-education-path__step {
      &.active {
        .main-education-path__step-img-2 {
          display: none !important;
        }
      }

      svg .step-svg {
        transition: fill 0.25s;
        fill: var(--steps-color);
      }

      button {
        display: none;
      }
    }

    .main-education-path__step-img-1 {
      margin-left: -5px;
      width: 140px;
    }

    .main-education-path__step-img-2 {
      width: 75px;
      height: 75px;
      bottom: calc(100% + 35px);

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .main-education-path__bottom {
      padding: 0 0 40px 0;
    }

    .main-education-path__bottom-head {
      max-width: calc(100% - 60px - 48px * 2);
      margin-bottom: 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 8px;
      font-size: 17px;
      font-weight: 600;
      line-height: 1.5em;
      text-align: center;
      color: #ffffff;

      img {
        width: 60%;
        height: 18px;
        object-fit: contain;
      }
    }

    .main-education-path__bottom-title {
      display: none;
    }

    .main-education-path__bottom-text {
      margin-bottom: 30px;
      font-size: 14px;
      text-align: left;
    }

    .main-education-path__bottom-button {
      color: #000;
      padding: 17px 21px;
      // font-size: 14px;
      font-size: 17px;
      font-weight: 600;
    }

    .main-education-path__swiper-navigation {
      padding: 0 20px;
      position: absolute;
      left: 0;
      top: 1px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 50;
      opacity: 1;
      pointer-events: all;

      button {
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-radius: 50%;
        border: 0;
        outline: none;

        img {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }
      }

      .main-education-path__swiper-navigation-next {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
