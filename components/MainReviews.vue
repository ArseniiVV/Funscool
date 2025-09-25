<template>
  <section id="reviews">
    <div class="container">
      <div class="title">Нам доверяют</div>
      <Swiper
        :navigation="{ nextEl: '.swiper-review-next', prevEl: '.swiper-review-prev' }"
        :breakpoints="{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }"
        class="swiper swiper-review"
        :modules="[Navigation]"
        :center-insufficient-slides="true"
        :space-between="24"
      >
        <SwiperSlide v-for="item in $constants.reviews" :key="item.title">
          <div class="reviews-card" :class="item.color">
            <div class="reviews-card__head">
              <div class="reviews-card__head-avatar">
                <img :src="item.logo" alt="" loading="lazy" />
              </div>
              <div class="reviews-card__head-title">
                {{ item.title }}
              </div>
            </div>
            <div class="reviews-card__body">
              <div class="reviews-card__body-text">
                {{ item.text }}
              </div>
              <button class="the-button reviews-card__body-btn" @click="openReviewModal(item)">
                Читать полностью
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="row d-flex justify-content-center">
        <div class="reviews-buttons">
          <button class="swiper-button-prev swiper-review-prev" aria-label="Назад">
            <img :src="'/img/ui-elements/arrow-swiper.svg'" alt="" loading="lazy" />
          </button>
          <button class="swiper-button-next swiper-review-next" aria-label="Вперёд">
            <img :src="'/img/ui-elements/arrow-swiper.svg'" alt="" loading="lazy" />
          </button>
        </div>
      </div>
    </div>
  </section>
  <Teleport to="body">
    <MainReviewsModal />
  </Teleport>
</template>

<script setup lang="ts">
import type { reviewModalData } from '~/types';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

const { $constants } = useNuxtApp();
const modalStore = useModalStore();

const openReviewModal = (item: reviewModalData) => {
  modalStore.reviewModalData = item;
  modalStore.isReviewModalVisible = true;
};
</script>

<style lang="scss" scoped>
#reviews {
  padding: 100px 0;

  .container {
    position: relative;
    margin: 0 auto;
    max-width: 1440px;

    &::before {
      content: '';
      background: url('/img/ui-elements/diamond.svg');
      background-size: contain;
      position: absolute;
      background-repeat: no-repeat;
      background-position: left;
      top: 0;
      left: 0;
      transform: translateY(-60%);
      width: 100%;
      height: 68px;
    }

    &::after {
      content: '';
      background: url('/img/ui-elements/paper.svg');
      background-size: contain;
      position: absolute;
      background-repeat: no-repeat;
      background-position: right;
      top: 0;
      right: 0;
      transform: translateY(-10%);
      width: 100%;
      height: 69px;
    }

    @media (max-width: 1440px) {
      padding: 0 20px;
    }

    @media (max-width: 768px) {
      &::after {
        display: none;
      }

      &::before {
        display: none;
      }
    }
  }

  .title {
    margin-bottom: 100px;
    position: relative;

    &::after {
      content: '';
      background: url('/img/ui-elements/Vector3.svg');
      background-size: contain;
      position: absolute;
      background-repeat: no-repeat;
      background-position: center;
      bottom: 0;
      right: 0;
      transform: translateY(30%);
      width: 100%;
      height: 160px;

      @media (max-width: 768px) {
        height: 150px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 100px 0 50px 0;
  }
}

.reviews-card {
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  border-radius: 20px;
  min-height: 453px;
  height: 100%;

  &.coral {
    background-color: var(--yellow);
  }

  &.purple {
    background-color: var(--purple);
  }

  &.aqua {
    background-color: var(--aqua);
  }

  &.green {
    background-color: var(--green);
  }

  &__head {
    display: flex;
    align-items: flex-start;
    gap: 20px;

    &-avatar {
      width: 70px;
      height: 70px;
      flex-shrink: 0;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }

    &-title {
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
    }
  }

  &__body {
    margin-top: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;

    &-text {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      text-wrap: balance;
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &-btn {
      margin-top: auto;
      padding: 14px 31px;
      line-height: 1em;
    }
  }
}

.reviews-buttons {
  display: none;
}

@media (max-width: 1200px) {
  .reviews-buttons {
    position: relative;
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: max(24px, 50px);

    .swiper-review-next {
      img {
        transform: rotate(180deg);
      }
    }

    .swiper-button-prev.swiper-button-disabled {
      opacity: 1;
    }

    .swiper-review-next,
    .swiper-review-prev {
      position: static;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background-color: #fff;
      width: 50px;
      height: 50px;
      border-radius: 50%;

      img {
        height: 16px;
        width: 16px;
      }

      &::after {
        display: none;
      }
    }
  }

  .reviews-card {
    &__body {
      flex-grow: 1;
      justify-content: flex-start;
    }
  }
}

@media (max-width: 768px) {
  .reviews-card {
    min-height: 361px;
  }
}

@media (max-width: 576px) {
  .reviews-card {
    min-height: 461px;
  }
}
</style>
