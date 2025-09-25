<template>
  <section id="potential" ref="potentialSection">
    <div id="potentialAnchor" />
    <div class="row position-relative">
      <div class="col-md-10 col-12 col-center mx-auto d-flex flex-column justify-content-center">
        <img :src="'/img/ui-elements/potential-orange.svg'" class="potential-orange" alt="" />
        <div class="potential-title">
          <span>
            Раскрываем потенциал каждого
            <span>
              ребёнка
              <img class="the-circle-8" :src="'/img/ui-elements/circle-8.svg'" alt="" />
            </span>
          </span>
          <img class="the-el" :src="'/img/ui-elements/potential-green.png'" alt="" />
        </div>
        <div class="position-relative d-flex align-items-center">
          <img :src="'/img/ui-elements/Moonsday&Feechka.webp'" class="potential-img" alt="" />
          <img :src="'/img/ui-elements/potential-school.svg'" class="potential-purple" alt="" />
        </div>
      </div>
    </div>
    <img class="potential-el" :src="'/img/ui-elements/path.svg'" alt="Иконка сердца" />
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';

const potentialSection = ref(null);
let observer: IntersectionObserver;

const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.to('.the-el', {
        rotation: -180,
        scale: 1,
        duration: 3,
        ease: 'none',
      });
      // Отключаем наблюдение после срабатывания
      observer?.unobserve(entry.target);
    }
  });
};

onMounted(() => {
  const options = { threshold: 0.5 };
  observer = new IntersectionObserver(callback, options);

  if (potentialSection.value) {
    observer.observe(potentialSection.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped lang="scss">
#potential {
  position: relative;
  padding: 300px 100px 0 100px;
  margin-top: 100px;
  margin-bottom: 100px;

  .potential-title {
    position: relative;
    font-size: 96px;
    font-weight: 600;
    text-align: center;
    line-height: 1.1em;
    text-wrap: balance;
    z-index: 10;

    span {
      position: relative;
      z-index: 10;
      display: inline;
      justify-content: center;
      text-wrap: balance;
    }

    img {
      position: absolute;
      left: calc(50% - 260px);
      top: calc(50% - 260px);
      z-index: 5;
      width: 520px;
      height: 520px;
      object-fit: contain;
    }

    .the-circle-8 {
      position: absolute;
      z-index: 20;
      width: 8ch;
      height: 200px;
      right: 50%;
      bottom: -70px;
      top: unset;
      left: unset;
      transform: translateX(50%);
    }
  }

  .potential-el {
    position: absolute;
    top: 10px;
    left: 15%;
    width: 80px;
    height: 80px;
  }

  .potential-img {
    margin-top: 15px;
    position: relative;
    height: 400px;
    width: 100%;
    object-fit: contain;
    z-index: 15;
  }

  .potential-orange {
    position: absolute;
    bottom: 100%;
    right: 20%;
    width: 88px;
    height: 88px;
    object-fit: contain;
    z-index: 5;
  }

  .potential-purple {
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 120px;
    height: 120px;
    object-fit: contain;
    z-index: 5;
  }
}

@media (max-width: 1600px) {
  #potential {
    .potential-title {
      font-size: 76px;
    }
  }
}

@media (max-width: 1365px) {
  #potential {
    padding: 250px 80px 0px 80px;

    .potential-title {
      font-size: 56px;
      line-height: 60px;
    }
  }
}

@media (max-width: 996px) {
  #potential {
    padding: 210px 50px 0px 50px;

    .potential-title {
      font-size: 45px;
      line-height: 60px;
    }
  }
}

@media (max-width: 768px) {
  #potential {
    padding: 100px 24px 0px 24px;

    .potential-el {
      top: 20px;
      left: 25px;
      width: 46px;
      height: 46px;
    }

    .potential-title {
      margin-bottom: 26px;
      font-size: 32px;

      span {
        span {
          position: relative;

          .the-circle-8 {
            width: 180px;
            height: 80px;
            bottom: -30px;
          }
        }
      }

      img {
        left: calc(50% - 112.5px);
        top: calc(50% - 112.5px);
        width: 225px;
        height: 255px;
      }
    }

    .potential-img {
      height: 262px;
    }

    .potential-orange {
      display: none;
    }

    .potential-purple {
      position: absolute;
      bottom: 90px;
      left: 62px;
      width: 56px;
      height: 56px;
    }
  }
}
</style>
