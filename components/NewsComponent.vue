<template>
  <div id="news" class="main-block" style="background-color: var(--theme-strong)">
    <div class="title" style="margin-bottom: 50px">
      <div style="display: flex; align-items: center">Новости</div>
      <span class="age-span">
        школы
        <img
          class="title-vector-2"
          style="width: 120px"
          :src="'/img/ui-elements/Vector2.svg'"
          alt="Украшение"
        />
      </span>
    </div>

    <Swiper
      :a11y="false"
      :space-between="24"
      :slides-offset-before="24"
      :slides-offset-after="24"
      :breakpoints="{
        0: { slidesPerView: 1.2 },
        600: { slidesPerView: 'auto' },
        1200: { slidesPerView: 'auto', centerInsufficientSlides: true }
      }"
      class="swiper-gardens"
      :class="{ 'should-center': $constants.news.length < 6 }"
    >
      <SwiperSlide
        v-for="newsItem in $constants.news"
        :key="newsItem.id"
        class="swiper-gardens__card"
      >
        <NewsCard :news="newsItem" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
const { $constants } = useNuxtApp();
</script>

<style lang="scss" scoped>
.swiper-gardens .swiper-gardens__card {
  width: auto;
}
</style>
