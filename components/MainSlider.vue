<template>
  <section id="MainSlider-nuxt">
    <swiper-container v-show="slides.length > 1" class="swiper swiper-main" init="false" ref="swiperEl">
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="swiper-slide" style="margin: auto;">
        <div class="slider-container">
          <div class="slider-row">
            <div class="slider-column slider-column--left">
              <div class="swiper-main__title" v-html="slide.title" />
              <div class="swiper-main__text" v-html="slide.text" />
              <div>
                <button type="button" class="the-button swiper-main__btn" style="opacity: 1" @click="
                  useModalStore().openLidModal({
                    title: 'Заявка на обратный звонок',
                    text: 'Оставьте заявку и мы свяжемся с вами в ближайшее время',
                    buttonText: 'Отправить заявку',
                    group: '',
                    community: '',
                    motive: slide.title && 'Мотив: ' + slide.title,
                  })
                  ">
                  {{ slide.buttonText }}
                </button>
              </div>

            </div>
              <div class="slider-column slider-column--right">
                <div class="swiper-main__img">
                  <img :src="slide.image" :alt="slide.alt" loading="lazy" />
                </div>
              </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>

    <!-- Static fallback for one slide -->
    <div v-if="(slides[0] && slides.length === 1) || !isInitialized" class="swiper-slide" style="margin: auto;">
      <div class="slider-container">
        <div class="slider-row">
          <div class="slider-column slider-column--left">
            <div class="swiper-main__title" style="opacity: 1" v-html="slides[0].title" />
            <div class="swiper-main__text" style="opacity: 1" v-html="slides[0].text" />
            <div>
              <button type="button" class="the-button swiper-main__btn" style="opacity: 1" @click="
                useModalStore().openLidModal({
                  title: 'Заявка на обратный звонок',
                  text: 'Оставьте заявку и мы свяжемся с вами в ближайшее время',
                  buttonText: 'Отправить заявку',
                  group: '',
                  community: '',
                  motive: slides[0].title && 'Мотив:' + slides[0].title,
                })
                ">
                {{ slides[0].buttonText }}
              </button>
            </div>
          </div>
          <div class="slider-column slider-column--right">
            <div class="swiper-main__img">
              <img :src="slides[0].image" :alt="slides[0].alt" loading="eager" fetchpriority="high" />
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="swiper-buttons" v-show="slides.length > 1 && isInitialized">
      <div class="swiper-button-prev swiper-button-prev-main" />
      <div class="swiper-pagination swiper-pagination-main" />
      <div class="swiper-button-next swiper-button-next-main" />
    </div>

    <div class="remark" v-html="remark"></div>
    <div class="ya-mark">
          <iframe src="https://yandex.ru/sprav/widget/rating-badge/148976675462?type=rating" width="150" height="50" frameborder="0"></iframe>
    </div>

  </section>
</template>

<script setup lang="ts">
import type Swiper from 'swiper';
import type { SwiperContainer } from 'swiper/element/bundle';
import type { SwiperOptions } from 'swiper/types';
const { $constants } = useNuxtApp();

const slides = $constants.main_sliders;
const swiperEl: Ref<null | SwiperContainer> = ref(null);
const isInitialized = ref(false);

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next-main',
    prevEl: '.swiper-button-prev-main',
  },
  pagination: {
    el: '.swiper-pagination-main',
    clickable: true,
  },
  // autoplay: {
  //   disableOnInteraction: true,
  //   delay: 5000,
  // },
  speed: 2500,
  breakpoints: {
    0: { autoHeight: true },
    768: { autoHeight: false },
  },
  on: {
    slideChange(swiper: Swiper) {
      onSlideChange(swiper);
    },
  },
};

const initializeSwiper = () => {
  if (swiperEl.value && !isInitialized.value) {
    Object.assign(swiperEl.value, swiperParams);
    swiperEl.value.initialize();
    isInitialized.value = true;
  }
};

let gsapRef: any;

onMounted(async () => {
  const [{ register }, gsapMod] = await Promise.all([
    import('swiper/element/bundle'),
    import('gsap'),
  ]);
  register();
  gsapRef = (gsapMod as any).gsap || gsapMod;
  initializeSwiper();
});

const remark = ref('');

const onSlideChange = (swiper: Swiper) => {
  // Получаем индекс активного слайда
  // и все слайды

  const activeIndex = swiper.activeIndex;
  remark.value = $constants.main_sliders[activeIndex].remark ?? '';

  const slides = swiper.slides;
  // Сброс вращения для всех изображений перед началом новой анимации
  slides.forEach((slide) => {
    const image = slide.querySelector('.swiper-main__img img'); // Подтвердите корректность селектора
    if (gsapRef) gsapRef.set(image, { rotate: 0 });
  });

  // Добавляем анимацию затухания для текста всех неактивных слайдов
  slides.forEach((slide, index) => {
    const caption = slide.querySelector<HTMLElement>('.swiper-main__text');
    const title = slide.querySelector<HTMLElement>('.swiper-main__title');
    const btn = slide.querySelector<HTMLElement>('.swiper-main__btn');
    const image = slide.querySelector<HTMLElement>('.swiper-main__img img');

    if (index === activeIndex) {
      if (gsapRef) gsapRef.to(image, { duration: 2.5, rotate: -720 });
      setTimeout(() => {
        if (gsapRef) {
          gsapRef.to(caption, { duration: 2, opacity: 1 });
          gsapRef.to(title, { duration: 3, opacity: 1 });
          gsapRef.to(btn, { duration: 4, opacity: 1 });
          if (window.innerWidth < 768) gsapRef.to(image, { duration: 2, opacity: 0 });
        }
      }, 1700)

    } else {
      setTimeout(() => {
        if (caption) caption.style.opacity = '0';
        if (title) title.style.opacity = '0';
        if (btn) btn.style.opacity = '0';
        if (image) image.style.opacity = '1';
      }, 1700)
    }
    // Анимация вращения для всех изображений при смене слайдов
    // gsap.to(image, { duration: 2.5, rotate: -720 });
    // gsap.to(image, { duration: 5, opacity: 0.3 });
  });
};

</script>

<style scoped lang="scss">
#MainSlider-nuxt {
  padding-top: 10rem;
  background-color: var(--theme-dark);
  width: 100%;
  position: relative;
  padding-bottom: 60px;

  .ya-mark{
    width: 100%;
    text-align: center;
  }
  .remark {
    max-width: 1240px;
    margin: 20px auto;
    font-size: 10px;
    color: #ffffff;
    padding-left: 10px;
    min-height: 80px;
  }

  .swiper-main {
    padding: 68px 0;
  }



  @media (max-width: 768px) {
    padding: 32px 20px;

    .swiper-main {
      padding: 0;
    }
  }

  // Container & Layout
  .slider-container {
    max-width: 1240px;
    margin: 0 auto;
  }

  .slider-row {
    margin: 0 -12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 24px;
  }

  .slider-column {
    width: 50%;
    padding: 0 12px;

    @media (max-width: 767px) {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &--left,
    &--right {
      flex: 1 0 auto;
    }

    &--left {
      order: 2;

      @media (min-width: 768px) {
        order: 1;
      }
    }

    &--right {
      order: 1;

      @media (min-width: 768px) {
        order: 2;
      }
    }
  }

  // Slide Title
  .swiper-main__title {
    font-weight: 600;
    font-size: 32px;
    line-height: 1.2em;
    color: #fff;
    margin-bottom: 56px;
    padding-left: 10px;
    opacity: 0;
  }

  .swiper-main__text {
    color: #fff;
    font-weight: 500;
    font-size: 17px;
    line-height: 1.8em;
    padding-left: 10px;
    opacity: 0;

    :deep(ul) {
      // list-style: none !important;
      padding: 0 0 0 19px !important;
      // margin: 0 !important;

      li {
        margin-bottom: 0.5em;
      }
    }
  }

  // Slide Image
  .swiper-main__img {
    height: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    img {
      width: 100%;
      max-width: 540px;
      aspect-ratio: 1/1;
      object-fit: contain;
      will-change: transform;
    }
  }

  /* ↓ добавлено: на десктопе убираем absolute у картинки, чтобы флекс-центровка работала идеально */
  @media (min-width: 768px) {
    .swiper-main__img {
      position: relative;
      top: auto;
      transform: none;
    }

      /* ↓ добавлено: выравнивание wrapper и слайда по вертикали */
    :deep(.swiper-main .swiper-wrapper) {
      align-items: center; /* wrapper у Swiper — flex, этого достаточно */
    }

    :deep(.swiper-main .swiper-slide) {
      height: 100%;
      display: flex;
      align-items: center; /* вертикальный центр содержимого слайда */
      /* при нужде можно раскомментировать: */
      /* justify-content: center; */
    }
  }

  // Swiper Controls
  .swiper-buttons {
    position: relative;
    z-index: 10;
    width: 250px;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }

  .swiper-button-next-main,
  .swiper-button-prev-main {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    color: #fff;
    cursor: pointer;

    &::after {
      font-size: 22px;
      font-weight: bold;
    }
  }

  .swiper-pagination-main {
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin-top: 12px;

    :deep(.swiper-pagination-bullet) {
      width: 8px;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.6);
      opacity: 1;
      margin: 0 15px;
      border-radius: 50%;
      transition:
        background-color 0.3s ease,
        transform 0.3s ease;
      cursor: pointer;
    }

    :deep(.swiper-pagination-bullet-active) {
      background-color: #ffffff;
      transform: scale(1.3);
    }
  }

  // Media Queries
  @media (max-width: 1400px) {
    .swiper-main__title {
      font-size: 30px;
      margin-bottom: 40px;
    }

    .swiper-main__text {
      font-size: 17px;
    }

    .swiper-main__btn {
      margin: 50px 0 0 50px;
    }

    .swiper-main__img img {
      max-height: 450px;
    }
  }

  @media (max-width: 996px) {
    padding-top: 8rem;

    .swiper-main__title {
      font-size: 24px;
      margin-bottom: 30px;
    }

    .swiper-main__text {
      font-size: 14px;

      ul {
        gap: 10px;
      }
    }

    .swiper-main__btn {
      margin-top: 35px;
      padding: 18px 20px;
    }

    .swiper-main__img img {
      max-height: 350px;
    }

    .swiper-buttons {
      width: 90%;
      max-width: 250px;
    }
  }

  @media (max-width: 767px) {
    padding-top: 4rem;

    .swiper-main .swiper-slide {
      margin-block: unset !important;
      height: 600px;
      position: relative;

      .swiper-main__img {
        max-height: 310px;
        margin-bottom: 105px;
        position: absolute;
      }

      .swiper-main__title {
        font-size: 22px;
        margin-bottom: 20px;
        height: 80px;
      }

      .swiper-main__text {
        font-size: clamp(14px, 2.5vw, 18px);
        // width: 80%;

        li {
          font-size: 16px;
        }
      }

      .swiper-main__btn {
        padding: 17px 26px;
        margin-top: 30px;
        margin-bottom: 10px;
        margin-left: 0;
        margin-right: 0;
        // position: absolute;
        bottom: 10px;
      }
    }

    //.swiper-buttons {
    // position: absolute;
    // bottom: 10px;
    // left: 40%;
    // transform: translateX(-50%);
    // max-width: fit-content;
    // width: auto;
    //}
  }
}

#MainSlider-nuxt::after {
  content: '';
  position: absolute;
  top: 99.9%; // начинается сразу под блоком
  left: 0;
  width: 100%;
  height: 600px;
  background: var(--theme-dark);
  clip-path: circle(100% at 50% -54.25vw);
  z-index: -1;
}
</style>
