<template>
  <section id="future" ref="future">
    <div class="container">
      <div class="main-future-title">
        <span>
          Создаем будущее
          <br />
          вместе
        </span>
        <img
          class="main-future-gear been-lazyload"
          :src="'/img/ui-elements/future-gear.svg'"
          aria-hidden="true"
        />
        <img
          class="main-future-curve been-lazyload"
          :src="'/img/ui-elements/future-curve.svg'"
          aria-hidden="true"
        />
      </div>

      <div class="main-future-img">
        <img :src="'/img/persons/1.png'" alt="Person 1" class="person-img im1" />
        <img :src="'/img/persons/2.png'" alt="Person 2" class="person-img im2" />
        <img :src="'/img/persons/3.png'" alt="Person 3" class="person-img im3" />
        <img :src="'/img/persons/4.png'" alt="Person 4" class="person-img im4" />
        <img :src="'/img/persons/5.png'" alt="Person 5" class="person-img im5" />
        <img :src="'/img/persons/6.png'" alt="Person 6" class="person-img im6" />
        <img :src="'/img/persons/7.png'" alt="Person 7" class="person-img im7" />
        <img :src="'/img/persons/8.png'" alt="Person 8" class="person-img im8" />
      </div>
      <!-- <div style="display: flex; justify-content: center">
        <button
          class="the-button"
          @click="
            useModalStore().openLidModal({
              title: 'Нужен пробный день',
              text: 'Оставьте заявку и мы свяжемся с вами в ближайшее время',
              buttonText: 'Отправить заявку',
              group: '',
              community: true,
              additional: '',
              motive: 'Записаться на пробный день',
            })
          "
        >
          Записаться на пробный день
        </button>
      </div> -->
      <img
        class="main-future-star been-lazyload"
        :src="'/img/ui-elements/future-star.svg'"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
const future = ref(null);

defineEmits(['showLidModal']);

let observer: IntersectionObserver;

const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const personImgs = document.querySelectorAll('.person-img');

      if (personImgs.length > 0) {
        personImgs.forEach((img, i) => {
          gsap.fromTo(
            img,
            { opacity: 0, x: i % 2 === 0 ? 50 * (1 + i) : -100 * (1 + i), y: 0 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1.8,
              ease: 'power2.out',
              delay: i * 0.85,
            }
          );
        });
      } else {
        console.warn("GSAP: No elements found with selector '.person-img' for animation.");
      }
      gsap
        .timeline()
        .fromTo(
          '.main-future-gear',
          {
            scale: 0,
            immediateRender: false,
          },
          {
            scale: 1.5,
            duration: 3,
          }
        )
        .to(
          '.main-future-gear',
          {
            rotation: 180,
            duration: 3,
            ease: 'none',
          },
          0
        );
      // Отключаем наблюдение после срабатывания
      observer?.unobserve(entry.target);
    }
  });
};

onMounted(() => {
  const options = { threshold: 0.5 };
  observer = new IntersectionObserver(callback, options);

  if (future.value) {
    observer.observe(future.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped lang="scss">
#future {
  padding: 100px 0 65px 0;
  background-color: var(--ol);
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;

  .main-future-img {
    margin: 50px auto;
    width: 100%;
    max-width: 700px;
    height: 500px; // фиксированная высота блока (при необходимости скорректируйте)
    position: relative;
    text-align: center;
  }

  .main-future-img img {
    position: absolute;
    bottom: 0;
    opacity: 0;
  }

  .im1 {
    left: 0;
    z-index: 50;
  }

  .im2 {
    left: 14%;
    z-index: 10;
  }

  .im3 {
    left: 28%;
    z-index: 10;
  }

  .im4 {
    left: 42%;
    z-index: 50;
  }

  .im5 {
    left: 56%;
    z-index: 50;
  }

  .im6 {
    left: 70%;
    z-index: 30;
  }

  .im7 {
    left: 70%;
    z-index: 10;
  }

  .im8 {
    left: 98%;
    z-index: 40;
  }

  .person-img {
    // width: clamp(50px, 10vw, 110px);
    height: auto;
    opacity: 0;
    transform: translateY(40px);
    will-change: transform, opacity;
    object-fit: contain;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
  }

  .main-future-title {
    position: relative;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    margin-top: 60px;

    span {
      position: relative;
      font-size: 96px;
      font-weight: 700;
      line-height: 1em;
      z-index: 10;
    }
  }

  .main-future-gear {
    position: absolute;
    right: calc(50% - 120px);
    top: calc(50% - 120px);
    z-index: 5;
    width: 240px;
    aspect-ratio: 1/1;
    object-fit: contain;
    transform: scale(0);
  }

  .main-future-curve {
    position: absolute;
    left: calc(50% - 150px);
    bottom: -40px;
    width: 300px;
    height: 40px;
    object-fit: contain;
    z-index: 5;
  }

  .main-future-star {
    top: 24px;
    right: 15%;
    position: absolute;
    width: 128px;
    height: 128px;
    object-fit: contain;
    z-index: 5;
  }

  .main-future-button {
    margin: 100px auto 30px auto;
    display: block;
    padding: 23px 29px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1em;
    border-radius: 24px;
    border-width: 1px;
    border-color: var(--o);
    color: white;
    border-style: solid;
    background-color: var(--o);
    transition:
      transform 0.25s,
      background-color 0.25s;

    &:hover {
      transform: scale(1.05);
      background-color: var(--ol);
      border-color: var(--ol);
    }
  }
}

@media (max-width: 991px) {
  #future {
    padding: 40px 0 60px 0;

    .main-future-title {
      span {
        font-size: 52px;
        text-wrap: balance;
      }
    }

    .main-future-star {
      width: 90px;
      height: 90px;
    }

    .main-future-gear {
      width: 225px;
      right: calc(50% - 112.5px);
      top: calc(50% - 72.5px);
    }

    .main-future-img {
      margin: 40px auto;
      position: relative;
      z-index: 20;
      width: 100%;
      // height: auto;
    }

    .main-future-button {
      padding: 17px 14px;
    }
  }
}

@media (max-width: 768px) {
  #future {
    padding: 80px 0 40px 0;

    .main-future-title {
      span {
        font-size: 32px;
      }

      img {
        width: 140px;
        left: calc(50% - 70px);
      }
    }

    .main-future-star {
      top: 20px;
      right: 30px;
      width: 58px;
      height: 58px;
    }

    .main-future-img {
      margin: 140px auto 0 auto;
      position: relative;
      width: 100%;
      height: 250px; // фиксированная высота блока (при необходимости скорректируйте)

      img {
        transform: scale(0.5);
        position: absolute;
        bottom: 0;
      }

      .im5 {
        left: 32%;
        bottom: 0;
        z-index: 50;
      }

      .im6 {
        left: 60%;
        z-index: 30;
      }

      .im7 {
        left: 32%;
        z-index: 10;
      }

      .im8 {
        left: 70%;
        z-index: 40;
      }
    }

    .main-future-button {
      margin-top: 30px;
      padding: 17px 14px;
    }
  }
}
</style>
