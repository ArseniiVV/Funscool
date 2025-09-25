<template>
  <section id="Advantages" class="main-section">
    <div ref="advantagesRow" class="row">
      <AdvantageCard v-for="(item, index) in advantages" :key="index" :title="item.title" :additional="item.additional"
        :description="item.description" :front-image="item.frontImage" :back-image="item.backImage"
        :button-text="item.buttonText" :card-class="item.cardClass" :is-rotated="isRotated" />
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

const advantagesRow = ref<HTMLElement | null>(null);
const isRotated = ref<boolean>(false);
let observer: IntersectionObserver;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isRotated.value = true;
        observer.disconnect();
      }
    },
    { threshold: 1 }
  );
  if (advantagesRow.value) observer.observe(advantagesRow.value);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style lang="scss" scoped>
#Advantages {
  position: relative;

  .row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    perspective: 1200;
    transform-style: preserve-3d;
    margin: auto;

    .ccard {
      width: 100%;
      max-width: 100%;
      margin: 0;

      .advantages-card__wrap {
        padding: 0;
        max-width: 100%;
      }
    }
  }

  @media (max-width: 1400px) {
    .row {
      grid-template-columns: repeat(2, 1fr);

      .ccard {
        max-width: 400px;

        &:nth-child(even) {
          margin-right: auto;
        }

        &:nth-child(odd) {
          margin-left: auto;
        }
      }
    }

    .advantages-card {
      &__img {
        height: 200px;
      }

      &__front {
        padding: 40px 20px;
      }

      &__back {
        padding: 40px 20px;

        &-text {
          font-size: 14px;
        }

        &-btn {
          a {
            padding: 12px 20px;
          }
        }
      }
    }
  }

  @media (max-width: 960px) {
    padding-top: 0;
  }

  @media (max-width: 768px) {
    padding: 40px 20px 80px 20px;

    .row {
      gap: 24px;
    }

    .advantages-card {
      margin: 0;
      margin: 0;
      min-height: 271px;
      height: 100%;

      &__wrap {
        .hover {
          display: none;
        }
      }

      &__front {
        padding: 35px 20px;

        .advantages-card__title {
          margin-top: 20px;
        }
      }

      &__back {
        padding: 19px;

        .advantages-card__back-btn a {
          padding: 12px 14px;
          font-size: 14px;
        }

        .advantages-card__back-img {
          height: 40px;
        }
      }
    }
  }

  @media (max-width: 600px) {
    .row {
      gap: 24px;
      grid-template-columns: 1fr;

      .ccard {
        max-width: 100%;
      }
    }

    margin-bottom: 0;
  }
}
</style>
