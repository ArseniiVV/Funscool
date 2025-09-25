<template>
  <div style="display: flex; justify-content: center">
    <div class="branch-card" @click="useSendMetrika(branch.yaMetrikGoal)">
      <Swiper :modules="[Autoplay]" :loop="true"
        :autoplay="{ delay: 1500 + branch.id * 300, disableOnInteraction: true }" :speed="1000"
        class="branch-card__swiper">
        <SwiperSlide v-for="(i, index) in branch.photos" :key="index">
          <img
            :src="`/img/branches/${i}`"
            class="branch-card__image"
            alt="Branch photo"
           
           
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>

      <div class="branch-card__content">
        <div class="branch-card__title">{{ branch.title }}</div>

        <div class="branch-card__info">
          <div v-if="branch.metro && branch.metro.length > 0" class="branch-card__metro-group">
            <div v-for="m in branch.metro" :key="m" class="branch-card__metro">
              <img :src="'/img/ui-elements/metro-white.svg'" alt="Metro" />
              <span>{{ m }}</span>
            </div>
          </div>

          <div class="branch-card__address">
            <img :src="'/img/ui-elements/Mark.svg'" alt="Address" />
            <span v-html="branch.address" />
          </div>
          <a 
            v-if="branch.phone" 
            :href="'tel:' + branch.phone" 
            style="margin: 10px auto; color: white;"
            @click="useSendMetrika('phoneCall')"
          >
            <span class="ph-btn">{{branch.phone }}</span>
          </a>
        </div>

        <div class="branch-card__action">
          <button class="the-button" @click.stop="useVideoModal().open('/video/branch-viewing/' + branch.video)">
            Видеоэкскурсия
          </button>
        </div>

        <div v-if="branch.yaMark" class="ya-mark">
          <iframe :src="'https://yandex.ru/sprav/widget/rating-badge/'+branch.yaMark+'?type=rating'" width="150" height="50" frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import { useVideoModal } from '@/composables/useVideoModal';
import type { branchData } from '~/types';

defineProps<{
  branch: branchData;
}>();
</script>

<style scoped lang="scss">
.ph-btn {
  padding: 10px 20px 10px 20px;
  background-color: var(--green);
  border-radius: 10px;
}

.branch-card {
  max-width: 400px;
  background: var(--theme-light);
  border-radius: 16px;
  overflow: hidden;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }

  &__swiper {
    width: 100%;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__title {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__metro-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    height: 50px;
  }

  &__metro,
  &__address {
    display: flex;
    align-items: center;
    height: 60px;
    font-size: 18px;
    line-height: 1.4em;
    gap: 10px;


    span {
      display: inline-block;
    }
  }

  &__action {
    // margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  &__button {
    padding: 12px 20px;
    border: none;
    background: #000;
    color: #5d3b9c;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition:
      background 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background: #eee;
      transform: scale(1.05);
    }
  }
}
</style>
