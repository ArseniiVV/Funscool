<template>
  <section id="sliderFilm">
    <div class="sliderFilm-vector" />
    <div class="film-marquee" aria-hidden="true">
      <div class="film-track">
        <!-- первый набор кадров -->
        <div
          v-for="(image, i) in filmImages"
          :key="'a-' + i"
          class="film-slide"
        >
          <img :src="image" alt="" loading="lazy" />
        </div>
        <!-- дубликат для бесшовного цикла -->
        <div
          v-for="(image, i) in filmImages"
          :key="'b-' + i"
          class="film-slide"
        >
          <img :src="image" alt="" loading="lazy" />
        </div>
      </div>
    </div>
    <div class="sliderFilm-vector-bottom" />
  </section>
</template>

<script setup lang="ts">
const filmImages = ref([
  '/img/photo-film/film1.webp',
  '/img/photo-film/film2.webp',
  '/img/photo-film/film3.webp',
  '/img/photo-film/film4.webp',
  '/img/photo-film/film5.webp',
  '/img/photo-film/film6.webp',
  '/img/photo-film/film7.webp',
  '/img/photo-film/film8.webp',
  '/img/photo-film/film9.webp',
  '/img/photo-film/film10.webp',
  '/img/photo-film/film11.webp',
  '/img/photo-film/film12.webp',
  '/img/photo-film/film13.webp',
])
</script>

<style scoped lang="scss">
#sliderFilm {
  margin-top: 100px;
  margin-bottom: 76px;
  background-color: var(--theme-dark);
  width: 100%;
  padding: 90px 0;
  position: relative;

  .sliderFilm-vector {
    position: absolute;
    width: 100%;
    height: 56px;
    background-image: url('/img/ui-elements/Rectangle2.svg');
    background-repeat: repeat;
    transform: translateY(-130%);
    z-index: 100;
  }

  .sliderFilm-vector-bottom {
    position: absolute;
    width: 100%;
    height: 56px;
    background-image: url('/img/ui-elements/Rectangle2.svg');
    background-repeat: repeat;
    transform: translateY(30%);
    z-index: 100;
  }
}

/* ====== Бесшовная равномерная лента ====== */
.film-marquee {
  width: 100%;
  overflow: hidden;          /* не видно края дорожки */
  pointer-events: none;      /* полностью игнорируем взаимодействие */
  user-select: none;
}

.film-track {
  display: flex;
  align-items: center;
  gap: 20px;
  /* два набора кадров занимают ~200% ширины.
     Скроллим от 0 до -50%, чтобы второй набор занял место первого — бесшовно. */
  width: max-content;
  will-change: transform;
  animation: film-scroll var(--film-speed, 60s) linear infinite;
}

/* Кадр */
.film-slide {
  width: auto;
  max-width: 600px;
  height: auto;
  border-radius: 16px;
  overflow: hidden;
  flex: 0 0 auto; /* не сжимать/не растягивать */

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 360px;
    object-fit: cover;
    border-radius: 16px;
    -webkit-user-drag: none;
    user-select: none;
    pointer-events: none; /* чтобы касания точно не влияли */
  }
}

/* Равномерное движение */
@keyframes film-scroll {
  0%   { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

/* Мобильные правки */
@media (max-width: 768px) {
  #sliderFilm {
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 60px 0;

    .sliderFilm-vector {
      height: 30px;
      transform: translateY(-150%);
      background-size: contain;
    }

    .sliderFilm-vector-bottom {
      height: 30px;
      transform: translateY(50%);
      background-size: contain;
    }
  }

  .film-slide img {
    max-height: 300px;
  }
}

@media (max-width: 568px) {
  #sliderFilm { padding: 50px 0; }

  .film-slide {
    max-width: 180px;

    img {
      max-height: 196px;
    }
  }

  .sliderFilm-vector,
  .sliderFilm-vector-bottom {
    height: 26px;
  }
}

/* Уважение prefers-reduced-motion: выключаем анимацию */
@media (prefers-reduced-motion: reduce) {
  .film-track { animation: none; }
}
</style>
