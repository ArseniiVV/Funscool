<template>
  <section id="numbers">
    <div class="numbers-pattern"></div>
    <div class="numbers-head">
      <div class="title">
        Интересные цифры о 
        <span class="number-icon">
          Фанскул
          <img :src="'/img/ui-elements/education-path-svg-2.svg'" alt="" loading="lazy" />
        </span>
      </div>
    </div>

    <div class="numbers-grid">
      <div v-for="item in numbersData" :key="item.id" class="numbers-grid__item">
        <div class="numbers__item">
          <div class="numbers__item-number" v-html="item.number" />
          <div class="numbers__item-text" v-html="item.text" />
        </div>
      </div>
    </div>

    <div class="pilot" ref="pilotContainer">
      <img
        src="/img/pilot-gear.svg"
        class="pilot-gear"
        ref="pilotGear"
        alt=""
        loading="lazy"
      />
      <img class="pilot-img" src="/img/pilot.webp" alt="" loading="lazy" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';

const { $constants } = useNuxtApp();

const numbersData = $constants.numbers_data;

const pilotContainer: Ref<HTMLElement | null> = ref(null);
const pilotGear: Ref<HTMLElement | null> = ref(null);

let tl: gsap.core.Timeline | null = null;

function setupPilotAnim() {
  const container = pilotContainer.value;
  const gear = pilotGear.value as HTMLElement | null;
  if (!container || !gear) return;

  if (tl) {
    tl.kill();
    tl = null;
  }

  const gearWidth = gear.clientWidth || 40;
  const dist = container.clientWidth / 2 - gearWidth / 2; // до центра
  const rotation = (dist / (Math.PI * gearWidth)) * 360; // имитация реального кручения

  gsap.set(gear, { x: 0, rotation: 0 });

  tl = gsap
    .timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power1.inOut', duration: 4 } })
    .to(gear, { x: dist, rotation });
}

onMounted(() => {
  setupPilotAnim();
  window.addEventListener('resize', setupPilotAnim);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setupPilotAnim);
  if (tl) tl.kill();
});
</script>

<style scoped lang="scss">
#numbers {
  .pilot {
    position: relative;
    height: 300px;
    @media (max-width: 768px) {
      height: 150px;
    }
    .pilot-gear {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40px;
      z-index: 1;
    }
    .pilot-img {
      position: absolute;
      right: 50%;
      transform: translateX(120%);
      bottom: 0;
      width: 200px;
      z-index: 2;
      @media (max-width: 768px) {
        width: 150px;
        transform: translateX(100%);
      }
    }
  }


  .numbers-pattern {
    position: absolute;
    left: 0;
    width: 100%;
    height: 60px;
    background-image: url('/img/ui-elements/pattern.svg');
    background-repeat: repeat;
    transform: translateY(-100%);
    z-index: 100;
  }

  .numbers-head {
    background-color: var(--theme-dark);
    padding: 60px 0 20px 0;
    position: relative;
    margin-bottom: 62px;
    text-align: center;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: calc(100%);
      transform: translateX(-50%);
      display: block;
      width: 80px;
      height: 40px;
      background-image: url('/img/ui-elements/pattern-two.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: top;
    }
  }

  .numbers-head-text {
    padding: 10px;
    margin: 90px auto 0 auto;
    
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2em;
    text-align: center;
    text-wrap: balance;
    max-width: 1200px;
  }

  .title {
    font-size: 48px;
    font-weight: 500;

    .number-icon {
      position: relative;
      display: inline-block;
      margin-left: 10px;

      img {
        position: absolute;
        bottom: -40px;
        width: 100%;
        left: 0;
      }
    }
  }

  .numbers__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    &-number {
      color: rgba(254, 178, 0, 1);
      font-size: 64px;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 4px;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    &-text {
      color: #000;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.5em;
      text-align: center;
      text-wrap: balance;
      max-width: 220px;
    }
  }
}

/* Responsive Grid */
.numbers-grid {
display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto 100px auto;

  &__item {
    flex: 1 1 200px; /* Flex-grow, flex-shrink, flex-basis */
    display: flex;
    justify-content: center;
  }
}

/* Media Queries */
@media (max-width: 996px) {
  #numbers .numbers__item {
    &-number {
      font-size: 48px;

      img {
        height: 56px;
      }
    }

    &-text {
      font-size: 16px;
      margin-bottom: 16px;
      line-height: 1.35em;
    }
  }
}

@media (max-width: 768px) {
  #numbers {
    margin-bottom: 0;

    .numbers-pattern {
      display: none;
    }

    .numbers-head-text {
      margin-top: 40px;
    }

    .title {
      font-size: 38px;
      padding: 0 10px;

      .number-icon img {
        bottom: -22px;
      }
    }

    .numbers-head::after {
      bottom: -116px;
    }
  }
}

@media (max-width: 568px) {
  #numbers .numbers-head {
    padding: 50px 0 48px 0;

    &::after {
      bottom: -116px;
    }
  }

  #numbers .numbers__item {
    gap: 8px;
    &-number {
      font-size: 36px;
      line-height: 1;

      img {
        height: 26px;
      }
    }

    &-text {
      font-size: 14px;
    }
  }
}
</style>
