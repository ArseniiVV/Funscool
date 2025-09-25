<template>
  <section id="numbers">
    <div class="numbers-head">
      <div class="title">
        Интересные цифры о сети
        <span class="number-icon">
          школ
          <img :src="'/img/ui-elements/education-path-svg-2.svg'" alt="" />
        </span>
      </div>
      <div class="numbers-head-text">
        Добро пожаловать в Фанскул — место, где учёба превращается в интересное и увлекательное
        путешествие. Малокомплектные классы, индивидуальные программы, кружки и секции помогают
        детям расти и развиваться, чтобы двигаться к успеху
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
  </section>
</template>

<script setup lang="ts">
const { $constants } = useNuxtApp();

const numbersData = $constants.numbers_data;
</script>

<style scoped lang="scss">
#numbers {
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
    padding: 60px 0 78px 0;
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
    color: white;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2em;
    text-align: center;
    text-wrap: balance;
    max-width: 1200px;
  }

  .title {
    font-size: 48px;
    color: white;
    font-weight: 600;

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

    &-number {
      color: rgba(254, 178, 0, 1);
      font-size: 64px;
      font-weight: 600;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    &-text {
      color: #000;
      font-size: 18px;
      font-weight: 500;
      line-height: 24px;
      text-align: center;
    }
  }
}

/* Responsive Grid */
.numbers-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 25%;
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
      margin-bottom: 20px;
      line-height: 17px;
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
  .numbers-grid__item {
    max-width: 45%;
  }

  #numbers .numbers-head {
    padding: 50px 0 48px 0;

    &::after {
      bottom: -116px;
    }
  }

  #numbers .numbers__item {
    max-width: 45%;
    &-number {
      font-size: 32px;

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

