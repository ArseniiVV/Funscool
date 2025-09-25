<template>
  <div class="news__item" :class="news.color" @click="useInfoModal().open(news)">
    <div class="news__item-img">
      <img :src="news.img" :alt="news.title" loading="lazy" />
    </div>
    <div class="news__body">
      <div class="news__body-date">
        {{ news.city }}
        <br />
        {{ news.date }}
      </div>
      <div class="news__body-title">
        {{ news.title }}
      </div>
    </div>
    <div class="news__body-img">
      <img :src="'/img/ui-elements/arrow-yellow.svg'" alt="" loading="lazy" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { infoModalData } from '~/types';

defineProps<{ news: infoModalData }>();
</script>

<style scoped lang="scss">
.news__item {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 380px;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  color: #000;
  background-color: var(--theme-light);
  transition: 0.3s;
  cursor: pointer;

  @media (min-width: 600px) {
    max-width: 300px;
  }

  &:hover {
    text-decoration: none;
    background-color: #fff;

    img {
      transform: scale(1.1);
    }

    .news__body-img {
      opacity: 1;

      img {
        transform: translateX(0px) translateY(-24px);
      }
    }
  }

  a {
    color: inherit;
  }

  &-img {
    overflow: hidden;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: 1.5/1;
      transition: transform 0.25s ease;
    }
  }

  .news__body {
    padding: 18px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: flex-start;

    &-date {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2em;
      text-align: left;
      margin-bottom: 24px;
    }

    &-title {
      font-size: 17px;
      font-weight: 600;
      line-height: 1.2em;
      text-align: left;
      overflow: hidden;
    }

    &-img {
      opacity: 0;
      display: flex;
      justify-content: center;
      margin-top: auto;
      transition: opacity 0.25s ease;

      img {
        width: 20px;
        height: 20px;
        transition: transform 0.25s ease;
      }
    }
  }
}

@media (max-width: 1160px) {
  #news {
    .news__item {
      width: 250px !important;
    }
  }
}

@media (max-width: 800px) {
  #news {
    .news__item {
      width: 245px !important;
    }
  }
}

@media (max-width: 768px) {
  #news {
    padding: 40px 0 80px 0;

    .news__item {
      width: 100% !important;
    }

    .title {
      position: relative;
      text-wrap: balance;

      span {
        position: static;

        img {
          width: 50%;
          max-width: 150px;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    .swiper.swiper-news {
      .swiper-wrapper {
        margin-top: 40px;
      }

      .swiper-news-next,
      .swiper-news-prev {
        display: none;
      }
    }

    .swiper.swiper-news .swiper-slide {
      width: unset;

      .news__item {
        width: 100%;
      }
    }
  }
}
</style>
