<template>
  <section id="addresses">
    <div class="title">
      <div style="display: flex; align-items: center">
        <img class="title-img" :src="'/img/ui-elements/arm.svg'" alt="Иконка руки" loading="lazy" />
        Адреса в
        <span class="age-span" style="margin-left: 10px">
          Казани
          <img class="title-icon" :src="'/img/ui-elements/age-span.svg'" alt="Украшение" loading="lazy" />
        </span>
      </div>
    </div>

    <Swiper
      :a11y="false"
      :space-between="24"
      :center-insufficient-slides="shouldCenter"
      :slides-offset-before="shouldCenter ? 0 : 20"
      :slides-offset-after="shouldCenter ? 0 : 20"
      :mousewheel="{ forceToAxis: true }"
      :modules="[Mousewheel]"
      :breakpoints="swiperBreakpoints"
      :watch-overflow="true"
      class="swiper-gardens"
      :class="{ 'should-center': shouldCenter }"
      @swiper="onAddressesSwiper"
      @resize="onAddressesSwiperUpdate"
      @breakpoint="onAddressesSwiperUpdate"
    >
      <SwiperSlide v-for="br in $constants.branches" :key="br.id">
        <BranchCard :branch="br" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper/modules';
const { $constants } = useNuxtApp();
const swiperBreakpoints = {
  0: { slidesPerView: 1.25 },
  600: { slidesPerView: 2.25 },
  960: { slidesPerView: 3.25 },
  1480: { slidesPerView: 3.25 },
};
const addressesSwiper = ref<SwiperType | null>(null);
const isAddressesSwiperLocked = ref(false);
const shouldCenter = computed(() => isAddressesSwiperLocked.value);

const updateAddressesSwiperLock = (swiper?: SwiperType) => {
  const activeSwiper = swiper ?? addressesSwiper.value;
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
  isAddressesSwiperLocked.value = Boolean(
    activeSwiper.isLocked || isLockedByEdges || isLockedByGrid || isLockedBySize || isLockedByState,
  );
};

const onAddressesSwiper = (swiper: SwiperType) => {
  addressesSwiper.value = swiper;
  updateAddressesSwiperLock(swiper);
  requestAnimationFrame(() => updateAddressesSwiperLock(swiper));
};

const onAddressesSwiperUpdate = (swiper: SwiperType) => {
  updateAddressesSwiperLock(swiper);
};
</script>

<style lang="scss">
#addresses {
  margin-bottom: 50px;
  padding: 50px 0px 50px 0px;
  background-color: var(--theme-strong);
  text-align: center;


  .title {
    margin-bottom: 80px;
  }

  .swiper-gardens {
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1280px;
    width: 100%;
  }

  .swiper-gardens .swiper-wrapper {
    justify-content: flex-start;
  }

  .swiper-gardens.should-center .swiper-wrapper {
    justify-content: center;
  }

  @media (min-width: 1480px) {
    .swiper-gardens {
      width: 100%;
      margin: 0 auto;
    }
  }

  @media (max-width: 748px) {
    padding: 50px 00px 50px 0px;

    .swiper-gardens {
      padding-right: 20px;
    }
  }
}
</style>
