<template>
  <section id="Advantages" class="main-section">
    <div class="row">
      <AdvantageCard v-for="(item, index) in advantages" :key="index" :title="item.title" :additional="item.additional"
        :description="item.description" :front-image="item.frontImage" :back-image="item.backImage"
        :button-text="item.buttonText" :card-class="item.cardClass" style="min-width: 350px;"/>
    </div>

    <div style="text-align: center;">
      <button type="button" class="the-button swiper-main__btn" style="opacity: 1; " @click="
        useModalStore().openLidModal({
          title: 'Записаться на экскурсию',
          text: 'Оставьте свои контакты, и мы подберём удобное время экскурсии по саду, познакомим вас с пространством и ответим на все вопросы.',
          buttonText: 'Записаться на экскурсию',
          group: '',
          community: '',
          motive: 'Лид: Записаться на экскурсию',
        })
        ">
        Записаться на экскурсию
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
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-items: center;
    justify-content: center;
    /* A 3D context here causes text rasterization on some GPUs
       and makes cards look blurry. Keep the 3D context only on
       the card itself. */
    perspective: none;
    transform-style: flat;
    margin: auto;
  }
}
</style>
