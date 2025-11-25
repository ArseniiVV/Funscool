<template>
  <div class="ccard">
    <div class="advantages-card__wrap" @click="toggleFlip">
      <div ref="cardElement" :class="['advantages-card', cardClass]">
        <div ref="frontElement" class="advantages-card__front" style="opacity: 1">
          <div class="advantages-card__img">
            <img
              :src="frontImage"
              style="max-width: 300px"
              :alt="title"
              loading="lazy"
            />
          </div>
          <div class="advantages-card__title" v-html="title" />
        </div>
        <div
          ref="backElement"
          class="advantages-card__back"
          style="opacity: 0; position: absolute; top: 0"
        >
          <div class="advantages-card__back-img">
            <img :src="backImage" alt="" loading="lazy" />
          </div>
          <div class="advantages-card__back-text" v-html="description" />
          <div class="advantages-card__back-btn">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';

// Props
const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  frontImage: { type: String, default: '' },
  backImage: { type: String, default: '' },
  buttonText: { type: String, default: '' },
  cardClass: { type: String, default: '' },
  additional: { type: String, default: '' },
  isRotated: { type: Boolean },
});

// Refs
const cardElement: Ref<null | HTMLElement> = ref(null);
const frontElement: Ref<null | HTMLElement> = ref(null);
const backElement: Ref<null | HTMLElement> = ref(null);

// State
const flipped = ref(false);
const canFlip = ref(true);
let autoFlipped = false; // чтобы не переворачивалась снова при скролле туда-сюда

// Methods
function toggleFlip() {
  if (!canFlip.value) return;
  canFlip.value = false;

  setTimeout(() => {
    canFlip.value = true;
  }, 2000);

  flipped.value = !flipped.value;

  const card = cardElement.value;
  const front = frontElement.value;
  const back = backElement.value;

  setTimeout(() => {
    if (flipped.value) {
      if (card && front && back) {
        gsap.to(card, { duration: 0.6, rotationY: 180, ease: 'power2.inOut' });
        gsap.to(front, { duration: 0.3, opacity: 0 });
        gsap.to(back, { delay: 0.3, duration: 0.3, opacity: 1 });
      }
    } else {
      if (card && front && back) {
        gsap.to(card, { duration: 0.6, rotationY: 0, ease: 'power2.inOut' });
        gsap.to(back, { duration: 0.3, opacity: 0 });
        gsap.to(front, { delay: 0.3, duration: 0.3, opacity: 1 });
      }
    }
  }, 300);
}

// Run auto-flip only after user sees the card
onMounted(() => {
  setTimeout(() => {
      toggleFlip();

      // Далее — бесконечный цикл каждые 7 ± 0–2 сек
      const flipLoop = () => {
        const randomDelay = 7000 + Math.random() * 2000; // 7–9 сек
        setTimeout(() => {
          toggleFlip();
          flipLoop();
        }, randomDelay);
      };

      flipLoop();
    }, 2000);
});
</script>


<style scoped lang="scss">
.ccard {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: 0;
  z-index: 100;
}

.advantages-card {
  position: relative;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  margin-bottom: 0;
  cursor: pointer;
  min-height: 420px;
  padding-bottom: 30px;
  width: 100%;
  height: 100%;
  /* Keep 3D context local to the card to avoid text blur
     from ancestor perspective on some Chrome/Windows GPUs */
  perspective: 1000px;
  transform-style: preserve-3d;

  &__wrap {
    position: relative;
    width: 100%;
  }

  &.purple {
    background-color: var(--purple);
  }

  &.aqua {
    background-color: var(--aqua);
  }

  &.lime {
    background-color: var(--lime);
  }

  &.coralle {
    background-color: var(--yellow);
  }

  &.beige {
    background-color: var(--beige-middle);
  }

  &.yellow-light {
    background-color: var(--yellow-light);
  }

  &__title {
    margin-top: auto;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.2em;
    text-align: center;
    padding: 0 10% 0 10%;
  }

  &__img {
    margin: auto;
    width: 80%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__front {
    /* Prevent the hidden face from bleeding through and
       force the browser to create a crisp layer */
    backface-visibility: hidden;
    transform: translateZ(0);
    padding: 10px;
    flex-grow: 1;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
  }

  &__back {
    /* Rotate the back face and ensure it renders sharply */
    transform: rotateY(-180deg) translateZ(0);
    backface-visibility: hidden;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    padding: 40px 24px;
    width: 100%;
    height: 100%;

    &-img {
      height: 56px;
      margin-bottom: auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-text {
      text-align: center;
      font-size: min(max(14px, 1.2vw), 17px);
      font-weight: 500;
      line-height: 1.8em;
      text-wrap: balance;
    }

    &-btn {
      margin-top: auto;

      .the-button {
        padding: 14px 20px;
        font-weight: 600;
        font-size: 17px;
        background-color: #ffffff;
        color: #000000;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition:
          background 0.3s ease,
          transform 0.3s ease;
        opacity: 1;

        &:hover {
          // background-color: #dddddd;
          transform: scale(1.05);
        }
      }
    }
  }
}
</style>