<template>
  <div class="AgeGroups-card" :class="group.color">
    <div style="
        margin-bottom: auto;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.2em;
        text-align: center;
        height: 45px;
      ">
      {{ group.title }}
    </div>
    <div class="AgeGroups-card__img">
      <img
        :src="group.image"
        :alt="group.title"
        
        
        loading="lazy"
      />
    </div>
    <div class="AgeGroups-card__btn">
      <button class="the-button" @click="
        useInfoModal().open(group);
      useSendMetrika(group.yaMetrikGoal ?? '');
      ">
        Подробнее
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { infoModalData } from '~/types';

defineProps<{
  group: infoModalData;
}>();
</script>

<style lang="scss">
.AgeGroups-card {
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  padding: 44px;
  min-height: 260px;
  overflow: hidden;

  img {
    transition: transform 0.25s;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &.green {
    background-color: var(--green);
  }

  &.purple {
    background-color: var(--purple);
  }

  &.rose {
    background-color: var(--beige-light);
  }

  &.coralle {
    background-color: var(--beige-middle);
  }

  &.yellow {
    background-color: var(--yellow);
  }

  &.yellow-light {
    background-color: var(--yellow-light);
  }

  &.aqua {
    background-color: var(--aqua);
  }

  &.beige {
    background-color: var(--beige-middle);
  }

  &__img {
    height: 190px;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  &__title {
    margin-bottom: auto;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2em;
    text-align: center;
  }

  &__btn {
    margin-top: auto;

    a {
      padding: 14px 18px;
      line-height: 1em;
    }
  }
}
</style>
