<template>
  <section id="facts">
    <div class="main-facts-top">
      <div class="facts-wrapper">
        <div class="main-facts-title">Интересные факты о сообществе</div>
        <div class="main-facts-text">
          Каждый год вместе с вами мы становимся больше и сильнее. К нам присоединяются новые
          филиалы, талантливые дети и счастливые семьи. Наши выпускники достигают успехов в разных
          сферах, а команда профессионалов расширяется. Вместе с партнёрами мы строим лучшее будущее
          для наших детей
        </div>
      </div>
    </div>

    <div class="main-facts-bottom">
      <div class="facts-wrapper">
        <div class="main-facts-bottom-items">
          <div class="main-facts-bottom-item" v-for="item in facts" :key="item.id">
            <div class="main-facts-bottom-item-number">
              {{ item.number }}
            </div>
            <div class="main-facts-bottom-item-text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const facts = [
  { id: 1, number: '3', text: 'региона: Москва и МО, Башкортостан, Татарстан' },
  { id: 2, number: '20', text: 'филиалов в РФ' },
  { id: 3, number: '1000+', text: 'благодарных семей' },
  { id: 4, number: '15+', text: 'лет в образовании и заботе о детях' },
];
</script>

<style scoped lang="scss">
#facts {
  .facts-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-facts-top {
    padding: 112px 0;
    background-color: rgba(255, 178, 128, 1);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      width: 80px;
      height: 40px;
      background-image: url('/img/ui-elements/section-after.svg');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .main-facts-title {
    margin-bottom: 64px;
    font-size: 48px;
    font-weight: 600;
    line-height: 1.2;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: calc(100% + 5px);
      width: 300px;
      height: 15px;
      background-image: url('/img/ui-elements/facts-underline.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: right;
    }
  }

  .main-facts-text {
    max-width: 90%;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
    text-wrap: balance;
  }

  .main-facts-bottom {
    padding: 96px 0;
  }

  .main-facts-bottom-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 100%;
  }

  .main-facts-bottom-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 26px;
    text-align: center;
  }

  .main-facts-bottom-item-number {
    font-size: 64px;
    font-weight: 600;
    color: var(--yellow);
  }

  .main-facts-bottom-item-text {
    font-size: 17px;
    font-weight: 500;
    line-height: 1.2;
    text-wrap: balance;
  }
}

/* Responsive Styles */
@media (max-width: 991px) {
  #facts {
    .main-facts-top {
      padding: 80px 0 40px;

      &::after {
        width: 64px;
        height: 32px;
      }
    }

    .main-facts-title {
      margin-bottom: 40px;
      font-size: 32px;

      &::after {
        width: 200px;
        height: 10px;
      }
    }

    .main-facts-text {
      font-size: 16px;
      max-width: 100%;
    }

    .main-facts-bottom {
      padding: 56px 0 20px;
    }

    .main-facts-bottom-items {
      grid-template-columns: repeat(2, 1fr);
      gap: 40px 16px;
    }

    .main-facts-bottom-item {
      gap: 16px;
    }

    .main-facts-bottom-item-number {
      font-size: 36px;
    }

    .main-facts-bottom-item-text {
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  #facts {
    .main-facts-title::after {
      left: 50%;
      transform: translateX(-50%);
    }

    .main-facts-bottom-items {
      grid-template-columns: 1fr;
    }
  }
}
</style>
