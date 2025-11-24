<template>
  <section id="ageGroupSection">
    <div>
      <div class="title">
        <div style="display: flex; align-items: center">
          <img
            class="title-img"
            :src="'/img/ui-elements/arm.svg'"
            alt="Иконка руки"
            loading="lazy"
          />
          Возрастные
        </div>
        <span class="age-span">
          группы
          <img
            class="title-vector-2"
            :src="'/img/ui-elements/Vector-aqua.svg'"
            alt="Украшение"
            loading="lazy"
          />
        </span>
      </div>

      <Swiper
        :a11y="false"
        :space-between="24"
        :slides-offset-before="24"
        :slides-offset-after="24"
        :breakpoints="{
          0: { slidesPerView: 1.2, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
          576: { slidesPerView: 2.2, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
          960: { slidesPerView: 3.2, slidesOffsetBefore: 24, slidesOffsetAfter: 24 },
          1400: { slidesPerView: 4.2, slidesOffsetBefore: 24, slidesOffsetAfter: 24 }
        }"
        class="age-groups__row"
      >
        <SwiperSlide v-for="ag in ageGroups" :key="ag.id">
          <div class="age-groups__row-item">
            <AgeGroupCard :group="ag" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="home-advantages">
        <img
          class="home-advantages__image"
          src="/img/ui-elements/home-advantages-image.webp"
          alt=""
          loading="lazy"
        />
        <img
          class="home-advantages__arrow"
          src="/img/ui-elements/home-advantages-arrow.svg"
          alt=""
          loading="lazy"
        />
    </div>
  </section>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

const { $constants } = useNuxtApp();
const ageGroups = $constants.age_groups;
</script>

<style lang="scss" scoped>
#ageGroupSection {
  padding-top: 45px;
}

.age-groups__row-item {
  /* Slide inner wrapper spacing if needed */
  .AgeGroups-card__btn .the-button {
    padding: 16px 24px;
  }
}

@media (max-width: 748px) {
  .age-groups__row {
    padding-right: 20px;
  }
  .title-img {
    position: absolute;
    width: 55px;
    left: 5%;
  }
  .title-vector-2{
    left: -50%;
  }
}

.home-advantages {
  position: relative;
  height: 400px;
    @media (max-width: 768px) {
    height: 50vw;
  }
}

.home-advantages__image {
  position: absolute;
  right: 50%;
  bottom: 0%;
  transform: translateX(100%);
  width: auto;
  max-width: 400px;
  z-index: 10;

  @media (max-width: 768px) {
    max-width: 50%;
  }
}

.home-advantages__arrow {
  position: absolute;
  right: 50%;
  transform: translateY(50%) translateX(50%);
  width: 100px;
  z-index: 2;

  @media (max-width: 768px) {
    width: 12vw;
  }
}
</style>
