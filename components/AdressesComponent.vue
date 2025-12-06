<template>
  <section id="addresses">
    <div class="title">
      <div style="display: flex; align-items: center">
        <img class="title-img" :src="'/img/ui-elements/arm.svg'" alt="Иконка руки" loading="lazy" />
        Адреса в
        <span class="age-span" style="margin-left: 10px">
          Уфе
          <img
            class="title-icon"
            :src="'/img/ui-elements/age-span.svg'"
            alt="Украшение"
            loading="lazy"
          />
        </span>
      </div>
    </div>

    <Swiper
      :a11y="false"
      :space-between="24"
      :center-insufficient-slides="true"
      :breakpoints="{
        0: { slidesPerView: 1.25, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
        600: { slidesPerView: 2.25, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
        960: { slidesPerView: 3.25, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
        1480: { slidesPerView: 3.25 },
      }"
      class="swiper-gardens"
    >
      <SwiperSlide v-for="br in $constants.branches" :key="br.id">
        <BranchCard :branch="br" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
const { $constants } = useNuxtApp();
</script>

<style lang="scss">
#addresses {
  margin-bottom: 50px;
  padding: 50px 0px 50px 0px;
  background-color: var(--theme-middle);

  .title {
    margin-bottom: 80px;
  }

  .swiper-gardens {
    width: 100%;
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
