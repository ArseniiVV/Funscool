<template>
  <div id="news" class="main-block" style="background-color: var(--theme-strong)">
    <div class="title" style="margin-bottom: 50px">
      <div style="display: flex; align-items: center">Новости</div>
      <span class="age-span">
        школы
        <img class="title-vector-2" style="width: 120px" :src="'/img/ui-elements/Vector2.svg'" alt="Украшение"
          loading="lazy" />
      </span>
    </div>

    <Swiper :a11y="false" :space-between="24" :slides-offset-before="shouldCenter ? 0 : 24"
      :slides-offset-after="shouldCenter ? 0 : 24" :breakpoints="{
        0: { slidesPerView: 1.2 },
        600: { slidesPerView: 'auto' },
        1200: { slidesPerView: 'auto', centerInsufficientSlides: true },
      }" class="swiper-gardens" :class="{ 'should-center': shouldCenter }"
      :navigation="{ nextEl: '.swiper-news-next', prevEl: '.swiper-news-prev' }" :modules="[Navigation]"
      :watch-overflow="true" @swiper="onNewsSwiper" @resize="onNewsSwiperUpdate" @breakpoint="onNewsSwiperUpdate">
      <SwiperSlide v-for="newsItem in $constants.news" :key="newsItem.id" class="swiper-gardens__card">
        <NewsCard :news="newsItem" />
      </SwiperSlide>
    </Swiper>
    <div class="news-buttons" :class="{ 'is-locked': isNewsSwiperLocked }">
      <button class="swiper-news-prev" type="button" aria-label="Предыдущая новость">
        <img :src="'/img/ui-elements/swipe-l.png'" alt="" loading="lazy" />
      </button>
      <button class="swiper-news-next" type="button" aria-label="Следующая новость">
        <img :src="'/img/ui-elements/swipe-r.png'" alt="" loading="lazy" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
const { $constants } = useNuxtApp();
const newsSwiper = ref<SwiperType | null>(null);
const isNewsSwiperLocked = ref(false);
const shouldCenter = computed(() => isNewsSwiperLocked.value);

const updateNewsSwiperLock = (swiper?: SwiperType) => {
  const activeSwiper = swiper ?? newsSwiper.value;
  if (!activeSwiper) {
    return;
  }

  const isLockedByEdges = activeSwiper.isBeginning && activeSwiper.isEnd;
  const isLockedByGrid = activeSwiper.snapGrid.length <= 1;
  const spaceBetween = typeof activeSwiper.params.spaceBetween === 'number' ? activeSwiper.params.spaceBetween : 0;
  const offsetBefore = typeof activeSwiper.params.slidesOffsetBefore === 'number'
    ? activeSwiper.params.slidesOffsetBefore
    : 0;
  const offsetAfter = typeof activeSwiper.params.slidesOffsetAfter === 'number'
    ? activeSwiper.params.slidesOffsetAfter
    : 0;
  const totalSlidesWidth = Array.from(activeSwiper.slides).reduce((total, slide) => {
    return total + (slide as HTMLElement).offsetWidth;
  }, 0);
  const totalSpace = spaceBetween * Math.max(0, activeSwiper.slides.length - 1);
  const containerWidth = activeSwiper.el ? activeSwiper.el.clientWidth : 0;
  const isLockedBySize = totalSlidesWidth + totalSpace + offsetBefore + offsetAfter <= containerWidth + 1;
  const isLockedByState = !activeSwiper.allowSlideNext && !activeSwiper.allowSlidePrev;
  isNewsSwiperLocked.value = Boolean(
    activeSwiper.isLocked || isLockedByEdges || isLockedByGrid || isLockedBySize || isLockedByState,
  );
};

const onNewsSwiper = (swiper: SwiperType) => {
  newsSwiper.value = swiper;
  updateNewsSwiperLock(swiper);
  requestAnimationFrame(() => updateNewsSwiperLock(swiper));
};

const onNewsSwiperUpdate = (swiper: SwiperType) => {
  updateNewsSwiperLock(swiper);
};
</script>

<style lang="scss" scoped>
.swiper-gardens .swiper-gardens__card {
  width: auto;
}

.news-buttons {
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: max(24px, 50px);

  .swiper-news-next,
  .swiper-news-prev {
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background-color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    &::after {
      display: none;
    }
  }

  &.is-locked {
    display: none;
  }
}
</style>
