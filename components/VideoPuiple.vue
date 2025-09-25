<template>
  <section id="video-section" class="main-section">
    <img class="title-img" :src="'/img/ui-elements/Vector4.svg'" alt="" loading="lazy" />
    <div class="video-heading">
      Наши выпускники 2023-2024 гг. поступили
      <br />
      в ВШЭ, ИТМО, Cesar Ritz Colleges
      <br />
      (Швейцария)
    </div>

    <div class="video-container">
      <div class="video-item" v-for="(video, i) in videos" :key="i">
        <div
          class="video-wrapper"
          :class="{ 'is-loaded': loaded[i], 'is-visible': isVisible[i], 'has-error': errors[i] }"
          :ref="(el) => setWrapperRef(el, i)"
        >
          <div v-if="!loaded[i]" class="video-skeleton" />

          <video
            v-if="isVisible[i] && !errors[i]"
            class="video-player"
            controls
            muted
            loop
            playsinline
            preload="metadata"
            @loadeddata="markLoaded(i, $event)"
            @canplay="markLoaded(i, $event)"
            @playing="markLoaded(i, $event)"
            @error="markError(i)"
          >
            <source :src="video.src" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>

          <div v-else-if="errors[i]" class="video-error">
            Ошибка загрузки видео. Пожалуйста, попробуйте позже.
          </div>
        </div>

        <div class="video-caption" v-html="video.caption" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const videos = [
  {
    src: '/video/1.mp4',
    caption: `Быков Родион, выпуск 2024 г, студент факультета "Информационных систем и технологий"
              Университета ИТМО г. Санкт-Петербург`,
  },
  {
    src: '/video/2.mp4',
    caption: `Будзина Виктория, выпуск 2024 г, студентка Юридического факультета
              <br />НИУ ВШЭ — Санкт-Петербург`,
  },
  {
    src: '/video/3.mp4',
    caption: `Кудояров Маркус, выпуск 2024 г, поступил в César Ritz colleges, Switzerland на
              специальность «International business in Hotel and Tourism management».`,
  },
];

const loaded = ref<boolean[]>(videos.map(() => false));
const isVisible = ref<boolean[]>(videos.map(() => false));
const errors = ref<boolean[]>(videos.map(() => false));
const wrapperRefs = ref<(HTMLElement | null)[]>([]);

let observer: IntersectionObserver | null = null;

const setWrapperRef = (el: Element | null, index: number) => {
  const current = wrapperRefs.value[index];
  if (current && observer) {
    observer.unobserve(current);
  }

  const element = (el as HTMLElement | null) || null;
  wrapperRefs.value[index] = element;

  if (observer && element) {
    observer.observe(element);
  }
};

function markLoaded(i: number, e?: Event) {
  if (loaded.value[i]) return;
  const video = (e?.target as HTMLVideoElement) || null;
  if (!video || typeof HTMLMediaElement === 'undefined') {
    loaded.value[i] = true;
    return;
  }

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    loaded.value[i] = true;
  }
}

function markError(i: number) {
  errors.value[i] = true;
  loaded.value[i] = true;
}

onMounted(() => {
  if (typeof window === 'undefined') {
    isVisible.value = isVisible.value.map(() => true);
    return;
  }

  if (!('IntersectionObserver' in window)) {
    isVisible.value = isVisible.value.map(() => true);
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = wrapperRefs.value.indexOf(entry.target as HTMLElement);
        if (idx === -1) return;
        isVisible.value[idx] = true;
        observer?.unobserve(entry.target as HTMLElement);
      });
    },
    { rootMargin: '200px 0px', threshold: 0.25 }
  );

  wrapperRefs.value.forEach((el) => {
    if (el) observer?.observe(el);
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped lang="scss">
#video-section {
  padding-top: 50px;
  padding-bottom: 100px;
  text-align: center;
}

.title-img {
  max-width: 100%;
  margin-bottom: 70px;
}

.video-heading {
  font-size: 27px;
  font-weight: 600;
  line-height: 1em;
  margin: 30px auto 80px 0;
  text-wrap: balance;

  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 40px;
    font-size: 20px;
  }
}

.video-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-wrapper {
  position: relative;
  min-height: 240px;
}

.video-wrapper.has-error {
  background: rgba(255, 102, 0, 0.1);
  border-radius: 10px;
}

/* сам плеер */
.video-player {
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
  max-width: 450px;
}

/* скелетон */
.video-skeleton {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: var(--theme-middle);
  background-size: 400% 100%;
  pointer-events: none;
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
}

.video-wrapper.is-loaded .video-skeleton {
  opacity: 0;
  visibility: hidden;
}

.video-error {
  padding: 32px 24px;
  border-radius: 10px;
  font-size: 16px;
  color: #444;
  background: #fff;
  max-width: 450px;
}

@keyframes shimmer {
  0% {
    background-position: -400% 0;
  }

  100% {
    background-position: 400% 0;
  }
}

.video-caption {
  margin-top: 10px;
  font-size: 17px;
  color: #444;
  text-align: center;
  max-width: 450px;
}

@media (max-width: 768px) {
  .video-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
