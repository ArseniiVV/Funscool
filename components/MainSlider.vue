<template>
  <section id="MainSlider-nuxt">
    <swiper-container v-show="slides.length > 1" class="swiper swiper-main" init="false" ref="swiperEl">
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="swiper-slide" style="margin: auto;">
        <div class="slider-container">
          <div class="slider-row">
            <div class="slider-column slider-column--left">
              <div class="swiper-main__title" v-html="slide.title" />
              <div class="swiper-main__text" :class="{ 'is-long': isLongText(slide.text) }" v-html="slide.text" />
              <div>
                <button type="button" class="the-button swiper-main__btn" style="opacity: 0" @click="
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
                <img :src="slide.image" :alt="slide.alt" fetchpriority="high" />
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
            <div class="swiper-main__title" style="opacity: 1" v-html="slides[0].title" v-if="slides[0]" />
            <div class="swiper-main__text" style="opacity: 1"
              :class="{ 'is-long': slides[0] && isLongText(slides[0].text) }" v-html="slides[0].text"
              v-if="slides[0]" />
            <div>
              <button v-if="slides[0]" type="button" class="the-button swiper-main__btn" style="opacity: 0" @click="
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
              <img v-if="slides[0]" :src="slides[0].image" :alt="slides[0].alt" fetchpriority="high" />
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="swiper-buttons" v-show="slides.length > 1 && isInitialized">
      <button type="button" class="swiper-button-prev swiper-button-prev-main" aria-label="Назад"
        style="transform: rotate(180deg);"></button>
      <div class="swiper-pagination swiper-pagination-main" />
      <button type="button" class="swiper-button-next swiper-button-next-main" aria-label="Вперёд"></button>
    </div>

    <div class="remark" v-html="remark"></div>
    <div class="ya-mark">
      <iframe v-if="src" :src="src" width="170" height="70" loading="lazy" frameborder="0"
        title="Рейтинг Яндекс Справочника" />
      <div v-else class="ya-placeholder" aria-hidden="true"></div>
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
const isClient = typeof window !== 'undefined';
const isLongText = (text?: string) => (text?.length ?? 0) > 300;

const setDesktopCentering = () => {
  if (!isClient) return;
  const wrapper = document.querySelector<HTMLElement>('#MainSlider-nuxt .swiper-main');
  const container =
    document.querySelector<HTMLElement>('#MainSlider-nuxt .swiper-slide-active .slider-container') ??
    document.querySelector<HTMLElement>('#MainSlider-nuxt .slider-container');
  if (!wrapper || !container) return;

  const availableHeight = wrapper.clientHeight;
  wrapper.style.height = `${availableHeight}px`;
  container.style.position = `absolute`;
  container.style.top = `50%`;
  container.style.transform = `translateY(-50%)`;

  if (window.innerWidth > 768) {
    container.style.left = `50%`;
    container.style.transform += ` translateX(-50%)`;
    return;
  }
};

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
  autoplay: {
    disableOnInteraction: true,
    delay: 5000,
  },
  mousewheel: {
    forceToAxis: true,
  },
  speed: 2500,
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
  nextTick(setDesktopCentering);
  if ('requestIdleCallback' in window) {
    ; (window as any).requestIdleCallback(start)        // когда поток «свободен»
  } else {
    setTimeout(start, 0)                               // фолбэк
  }
  window.addEventListener('resize', setDesktopCentering);
});

const remark = ref('');

const src = ref<string>('')

function start() { src.value = 'https://yandex.ru/sprav/widget/rating-badge/' + $constants.ya_mark + '?type=rating' }

const onSlideChange = (swiper: Swiper) => {
  // Получаем индекс активного слайда
  // и все слайды

  const activeIndex = swiper.activeIndex;
  remark.value = $constants.main_sliders[activeIndex]?.remark ?? '';

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
        setDesktopCentering();
        if (gsapRef) {
          gsapRef.to(caption, { duration: 2, opacity: 1 });
          gsapRef.to(title, { duration: 3, opacity: 1 });
          gsapRef.to(btn, { duration: 4, opacity: 1 });
          if (isClient && window.innerWidth < 768) gsapRef.to(image, { duration: 2, opacity: 0 });
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

onUnmounted(() => {
  if (!isClient) return;
  window.removeEventListener('resize', setDesktopCentering);
});
</script>

<style scoped lang="scss">
.ya-placeholder {
  width: 150px;
  height: 50px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
}

.ya-mark {
  text-align: center;
}

#MainSlider-nuxt {
  position: relative;
  width: 100%;
  padding-top: 10rem;
  padding-bottom: 60px;
  background-color: var(--theme-dark);

  .ya-mark {
    width: 100%;
    text-align: center;
  }

  .remark {
    max-width: 1240px;
    min-height: 10px;
    margin: 20px auto;
    padding-left: 10px;
    font-size: 10px;
    color: #fff;
  }

  .swiper-main {
    padding: 8px 0;
  }

  // Container & Layout
  .slider-container {
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
  }

  .slider-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 -12px;
    row-gap: 24px;
  }

  .slider-column {
    width: 50%;
    padding: 0 12px;

    &--left,
    &--right {
      flex: 1 0 auto;
    }

    &--left {
      order: 2;
      padding: 0 20px;

      @media (min-width: 768px) {
        order: 1;
        padding: 0 10px;
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
    margin-bottom: 56px;
    padding-left: 10px;
    font-weight: 600;
    font-size: 32px;
    line-height: 1.2em;
    color: #fff;
    opacity: 0;
  }

  // Slide Text
  .swiper-main__text {
    padding-left: 10px;
    font-weight: 500;
    font-size: 17px;
    line-height: 1.8em;
    color: #fff;
    opacity: 0;

    :deep(ul) {
      padding: 0 0 0 19px !important;

      li {
        margin-bottom: 0.5em;
      }
    }
  }

  // Slide Image
  .swiper-main__img {
    position: absolute;
    top: 50%;
    height: auto;
    transform: translateY(-50%);

    img {
      width: 100%;
      max-width: 540px;
      aspect-ratio: 1 / 1;
      object-fit: contain;
      will-change: transform;
    }
  }

  // Swiper Controls
  .swiper-buttons {
    position: relative;
    z-index: 10;
    display: flex;
    width: 250px;
    margin: 20px auto 0;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .swiper-button-next-main,
  .swiper-button-prev-main {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: #fff;
    cursor: pointer;

    &::after {
      font-size: 22px;
      font-weight: bold;
    }

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 4px;
    }
  }

  .swiper-pagination-main {
    position: relative;
    display: flex;
    width: auto;
    margin-top: 12px;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    :deep(.swiper-pagination-bullet) {
      width: 8px;
      height: 8px;
      margin: 0 15px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.6);
      opacity: 1;
      cursor: pointer;
      transition:
        background-color 0.3s ease,
        transform 0.3s ease;
    }

    :deep(.swiper-pagination-bullet-active) {
      background-color: #fff;
      transform: scale(1.3);
    }
  }

  // --- Media Queries ---

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

  @media (max-width: 768px) {
    padding: 32px 0;

    .swiper-main {
      padding: 0;
    }
  }

  @media (min-width: 768px) {

    // на десктопе убираем absolute у картинки, чтобы флекс-центровка работала
    .swiper-main__img {
      position: relative;
      top: auto;
      transform: none;
    }

    :deep(.swiper-main .swiper-wrapper) {
      align-items: center;
    }

    :deep(.swiper-main .swiper-slide) {
      display: flex;
      height: 100%;
      align-items: center;
    }
  }

  @media (max-width: 767px) {
    padding-top: 4rem;

    .slider-column {
      width: 100%;
      padding: 0 20px;
    }

    .swiper-main__text {
      font-size: clamp(14px, 2.5vw, 18px);

      li {
        font-size: 16px;
      }

      &.is-long {
        line-height: 1.2rem;
      }
    }

    .swiper-main .swiper-slide {
      // position: relative;
      // min-height: 600px;
      margin-block: unset !important;

      .swiper-main__img {
        width: 100vw;

        img {
          margin: 0 auto;
        }
      }

      .swiper-main__title {
        height: 80px;
        margin-bottom: 20px;
        font-size: 22px;
      }

      .swiper-main__btn {
        margin-top: 30px;
        margin-bottom: 10px;
        margin-left: 0;
        margin-right: 0;
        padding: 17px 26px;
        bottom: 10px;
      }
    }

    // .swiper-buttons {
    //   position: absolute;
    //   bottom: 10px;
    //   left: 40%;
    //   transform: translateX(-50%);
    //   max-width: fit-content;
    //   width: auto;
    // }
  }
}

#MainSlider-nuxt::after {
  content: '';
  position: absolute;
  top: 99.9%;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 35vw;
  background: var(--theme-dark);
  clip-path: circle(100% at 50% -54.25vw);
}
</style>
