<template>
  <div id="groupModal" aria-hidden="true" @click="onOverlayClick" v-if="modalData">
    <div class="modal-group__dialog" role="document">
      <div class="modal-group__wrap container" @click.stop>
        <div class="modal-logo modal-logo--desktop">
          <img :src="'/img/brand-book/Sign.svg'" alt="" loading="lazy" />
        </div>
        <div class="modal-close" aria-label="Закрыть" @click="close" />
        <div class="modal-group__scroller" :class="modalData.color" @click.stop>
          <div class="modal-logo modal-logo--mobile">
            <img :src="'/img/brand-book/Sign.svg'" alt="" loading="lazy" />
          </div>
          <div id="modal-group__wrapper" class="modal-group__wrapper">
            <!-- Main content -->
            <div id="st" ref="contentEl" class="modal-group__content">
              <span class="modal-group__title">{{ modalData.title }}</span>
              <p class="modal-group__description" v-html="modalData.description" />
              <p class="modal-group__compound" v-if="modalData.text">{{ modalData.text }}</p>

              <div v-if="modalData.activities" class="modal-group__activities">
                <div class="modal-group__activities-title">Основные занятия:</div>
                <ul class="modal-group__activities-list">
                  <li v-for="(activity, i) in modalData.activities" :key="i">
                    {{ activity.name }}
                    <span>{{ activity.detail }}</span>
                  </li>
                </ul>

                <div class="modal-group__price" v-html="modalData.price" />
                <div style="text-align: center">
                  <button
                    class="the-button"
                    @click="
                      useModalStore().openLidModal({
                        title: 'Заявка на обратный звонок',
                        text: 'Оставьте заявку и мы свяжемся с вами в ближайшее время',
                        buttonText: 'Отправить заявку',
                        group: modalData.title,
                        community: '',
                        motive: modalData.title && 'Возрастная группа: ' + modalData.title,
                      });
                      close();
                    "
                  >
                    Записаться в группу
                  </button>
                </div>
              </div>
            </div>
            <!-- Swiper -->
            <div class="modal-group__swiper">
              <div ref="swiperContainer" class="swiper swiper-group-modal">
                <div class="swiper-wrapper">
                  <div
                    v-for="(imgUrl, index) in modalData.images"
                    :key="index"
                    class="swiper-slide"
                  >
                    <img :alt="'slide ' + index" class="group-image" :src="imgUrl" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';
import { useInfoModal } from '~/composables/useInfoModal';
const { modalData, close } = useInfoModal();

const swiperInstance: Ref<Swiper | null> = ref(null);
const swiperContainer: Ref<HTMLElement | null> = ref(null);
const contentEl: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  // Инициализируем Swiper
  if (swiperContainer.value) {
    swiperInstance.value = new Swiper(swiperContainer.value, {
      modules: [EffectFade],
      loop: true,
      centeredSlides: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      // при необходимости — навигация, пагинация, автопрокрутка и т.д.
    });

    // Вешаем обработчик на scroll
    if (contentEl.value) {
      contentEl.value.addEventListener('scroll', onContentScroll);

      // Отключаем скроллинг для body
      document.body.style.overflow = 'hidden';
    }
  }
});

onBeforeUnmount(() => {
  // Удаляем обработчик при уничтожении компонента
  if (contentEl.value) {
    contentEl.value.removeEventListener('scroll', onContentScroll);
  }
  document.body.style.overflow = '';
});

function onContentScroll(e: Event) {
  const el = e.target as HTMLElement;
  // Высота полностью прокручиваемой области
  const totalHeight = el.scrollHeight - el.clientHeight;
  // Текущее расстояние прокрутки
  const scrollTop = el.scrollTop;
  // Доля прокрутки (0 — вверху, 1 — внизу)
  const progress = scrollTop / totalHeight;

  // Простейший пример переключения слайдов в зависимости от прогресса прокрутки
  if (swiperInstance.value) {
    if (progress < 0.25) {
      swiperInstance.value.slideToLoop(0); // первый слайд
    } else if (progress < 0.5) {
      swiperInstance.value.slideToLoop(1);
    } else if (progress < 0.75) {
      swiperInstance.value.slideToLoop(2);
    } else {
      swiperInstance.value.slideToLoop(3);
    }
  }
}

// Обработчик клика по оверлею: если клик вне контента, закрываем модалку
function onOverlayClick(e: MouseEvent) {
  // Если клик пришёл непосредственно на оверлей (а не внутри модального окна)
  if ((e.target as HTMLElement).id === 'groupModal') {
    close();
  }
}
</script>

<style lang="scss">
@use 'sass:color';

$theme-dark: #ff6600;
$theme-strong: #ffb380;
$theme-middle: #ffd9bf;
$theme-light: #ffe8d9;
$yellow: #feb200;
$yellow-light: #fed880;
$aqua: #80e5e5;
$green: #33cc66;
$lime: #99e5b3;
$purple: #b280e5;
$beige-middle: #ffb280;
$beige-light: #ffecbf;

#groupModal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100dvh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-group__dialog {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-group__wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff; // fallback, overridden by color classes
  position: relative;
}

.modal-logo {
  position: absolute;
  left: 24px;
  top: 24px;
  width: 37px;
  height: 38px;
  z-index: 20;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  &--desktop {
    display: none;
  }

  &--mobile {
    display: block;
  }
}

.modal-close {
  position: absolute;
  right: 24px;
  top: 24px;
  width: 48px;
  height: 48px;
  z-index: 20;
  cursor: pointer;

  &::after {
    content: '';
    background: url('/img/ui-elements/close.svg');
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
    width: 100%;
    height: 100%;
  }
}

.modal-group__scroller {
  position: relative;
  padding: 40px 24px;
  overflow-y: auto;
  flex-grow: 1;
  color: #fff;

  &.green {
    background-color: color.adjust($green, $lightness: -25%);
  }

  &.purple {
    background-color: color.adjust($purple, $lightness: -25%);
  }

  &.coralle {
    background-color: color.adjust($yellow-light, $lightness: -25%);
  }

  &.yellow-light {
    background-color: color.adjust($yellow-light, $lightness: -25%);
  }

  &.aqua {
    background-color: color.adjust($aqua, $lightness: -25%);
  }

  &.beige {
    background-color: color.adjust($beige-middle, $lightness: -25%);
  }
}

.modal-group__wrapper {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    gap: 24px;
  }
}

.modal-group__swiper {
  align-self: center;
  width: 50%;
  height: auto;
  margin-bottom: 30px;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 600px;
      max-height: 100%;
      object-fit: contain;

      @media (max-width: 1400px) {
        height: 500px;
      }

      @media (max-width: 1200px) {
        height: 400px;
      }

      @media (max-width: 768px) {
        height: 300px;
      }
    }
  }
}

.modal-group__content {
  width: 100%;
  height: 100%;
  padding-right: 5px;
  max-height: calc(100dvh - 200px);
  overflow-y: auto;
  scrollbar-width: none;

  /* Hide default scrollbar for Firefox */
  scrollbar-width: thin;
  scrollbar-color: #ffffff #f2f2f200;
}

/* Chrome, Edge, Safari */
.modal-group__content::-webkit-scrollbar {
  width: 8px;
}

.modal-group__content::-webkit-scrollbar-track {
  background: #f2f2f2;
  border-radius: 4px;
}

.modal-group__content::-webkit-scrollbar-thumb {
  background: #b8b8b8;
  border-radius: 4px;
  transition: background 0.3s;
}

.modal-group__content::-webkit-scrollbar-thumb:hover {
  background: #888888;
}

.modal-group__title {
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 600;
}

.modal-group__description {
  margin-bottom: 24px;
  font-size: 17px;
}

.modal-group__compound {
  margin-bottom: 64px;
  font-size: 14px;
}

.modal-group__activities-title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
}

.modal-group__activities-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    font-size: 20px;
    font-weight: 600;
    border-bottom: 1px solid #fff;
    padding-bottom: 20px;

    span {
      display: block;
      font-size: 14px;
      font-weight: 400;
      margin-top: 8px;
    }
  }
}

.modal-group__price {
  margin: 40px 0;
  font-size: 32px;
  font-weight: 600;

  span {
    font-size: 17px;
  }
}

.modal-group__activities .the-button {
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .modal-logo--desktop {
    display: block;
  }

  .modal-logo--mobile {
    display: none;
  }

  .modal-group__scroller {
    padding: 100px 70px;
  }

  .modal-group__wrapper {
    flex-direction: row;
  }

  .modal-group__content {
    width: 50%;

    .modal-group__title {
      font-size: 36px;
    }

    .modal-group__description {
      font-size: 18px;
    }
  }
}

@media (max-width: 767px) {
  .modal-group__wrap {
    max-height: 100vh;
  }

  .modal-group__scroller {
    padding: 40px 24px;
    max-height: 100%;
    /* Учитываем высоту шапки и подвала */

    .modal-group__content {
      order: 1;
      height: calc(100vh - 420px);
    }

    .modal-group__swiper {
      order: 0;
      width: 100%;
    }
  }
}
</style>
