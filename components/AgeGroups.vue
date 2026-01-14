<template>
  <section id="ageGroupSection">
    <div class="main-section">
      <div class="title">
        <div style="display: flex; align-items: center">
          <img class="title-img" :src="'/img/ui-elements/arm.svg'" alt="Иконка руки" loading="lazy" />
          Ступени
        </div>
        <span class="age-span">
          образования
          <img class="title-vector-2" :src="'/img/ui-elements/Vector-aqua.svg'" alt="Украшение" loading="lazy" />
        </span>
      </div>

      <Swiper :a11y="false" :space-between="24" :slides-offset-before="24" :slides-offset-after="24"
        :mousewheel="{ forceToAxis: true }" :modules="[Mousewheel]" :breakpoints="{
          0: { slidesPerView: 1.2, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
          576: { slidesPerView: 2.2, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
          960: { slidesPerView: 3.2, slidesOffsetBefore: 24, slidesOffsetAfter: 24 },
          1400: { slidesPerView: 4.2, slidesOffsetBefore: 24, slidesOffsetAfter: 24 }
        }" class="age-groups__row">
        <SwiperSlide v-for="ag in ageGroups" :key="ag.id">
          <div class="age-groups__row-item">
            <AgeGroupCard :group="ag" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="home-advantages">
      <img class="home-advantages__image" src="/img/ui-elements/home-advantages-image.webp" alt="" loading="lazy" />
      <img class="home-advantages__arrow" src="/img/ui-elements/home-advantages-arrow.svg" alt="" loading="lazy" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper/modules';

const { $constants } = useNuxtApp();
const ageGroups = $constants.age_groups;
</script>

<style lang="scss" scoped>
#ageGroupSection {
  padding-top: 45px;
  padding-bottom: 95px;
}

.age-groups__row {
  display: flex;
  flex-wrap: wrap;
  row-gap: 24px;
  margin: 0 -12px;

  &-item {
    width: 25%;
    padding: 0 12px;

    .AgeGroups-card__btn .the-button {
      padding: 16px 24px;
    }
  }
}

@media (max-width: 1100px) {
  .age-groups__row-item {
    width: 50%;
  }
}

@media (max-width: 748px) {
  .title-img {
    position: absolute;
    width: 68px;
    left: 5%;
  }
}

@media (max-width: 576px) {
  .age-groups__row-item {
    width: 100%;
  }
}
</style>
