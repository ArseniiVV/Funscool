<template>
  <section id="Advantages" class="main-section">
    <div class="row">
      <AdvantageCard v-for="(item, index) in advantages" :key="index" :title="item.title" :additional="item.additional"
        :description="item.description" :front-image="item.frontImage" :back-image="item.backImage"
        :button-text="item.buttonText" :card-class="item.cardClass" />
    </div>

    <div style="text-align: center;">
      <button type="button" class="the-button swiper-main__btn" style="opacity: 1; " @click="
        useModalStore().openLidModal({
          title: 'Узнать подробнее',
          text: 'Оставьте заявку и мы свяжемся с вами в ближайшее время',
          buttonText: 'Узнать подробнее',
          group: '',
          community: '',
          motive: 'Мотив: Узнать подробнее',
        })
        ">
        Узнать подробнее
      </button>
    </div>

  </section>
</template>

<script setup lang="ts">
const { $constants } = useNuxtApp();
const advantages = $constants.advantages;
</script>

<style lang="scss" scoped>
#Advantages {
  position: relative;

  .row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
    justify-items: stretch;
    align-items: stretch;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 12px;
    /* A 3D context here causes text rasterization on some GPUs
       and makes cards look blurry. Keep the 3D context only on
       the card itself. */
    perspective: none;
    transform-style: flat;

    @media (max-width: 1100px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
