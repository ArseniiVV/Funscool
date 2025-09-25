<template>
  <section id="video-section" class="main-section">
    <img class="title-img" :src="'/img/ui-elements/Vector4.svg'" alt="" />
    <div class="video-heading">
      Наши выпускники 2023-2024 гг. поступили
      <br />
      в ВШЭ, ИТМО, Cesar Ritz Colleges
      <br />
      (Швейцария)
    </div>

    <div class="video-container">
      <div class="video-item" v-for="(video, i) in videos" :key="i">
        <div class="video-wrapper" :class="{ 'is-loaded': loaded[i] }">
          <!-- Скелетон всегда в разметке, но скрывается классом -->
          <div class="video-skeleton"></div>

          <video
            class="video-player"
            controls
            muted
            loop
            playsinline
            preload="auto"
            @loadeddata="markLoaded(i, $event)"
            @canplay="markLoaded(i, $event)"
            @playing="markLoaded(i, $event)"
            @error="markError(i)"
          >
            <source :src="video.src" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>

        <div class="video-caption" v-html="video.caption" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'

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
]

const loaded = ref<boolean[]>(videos.map(() => false))

function markLoaded(i: number, e?: Event) {
  if (loaded.value[i]) return
  const v = (e?.target as HTMLVideoElement) || null
  // считаем загруженным, если readyState >= HAVE_CURRENT_DATA (2)
  if (!v || v.readyState >= 2) {
    loaded.value[i] = true
  }
}

function markError(i: number) {
  // убираем скелетон, чтобы не перекрывал интерфейс; можно ещё показать текст «не удалось загрузить»
  loaded.value[i] = true
}

onMounted(async () => {
  await nextTick()
  // если видео уже в кэше — сразу снимем скелетон
  const nodes = Array.from(
    document.querySelectorAll<HTMLVideoElement>('#video-section .video-player')
  )
  nodes.forEach((v, idx) => {
    if (v.readyState >= 2) loaded.value[idx] = true
  })
})
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
  // animation: shimmer 1.4s ease infinite;
  pointer-events: none;  /* ← не блокирует клики по видео */
  transition: opacity .25s ease, visibility .25s ease;
}

.video-wrapper.is-loaded .video-skeleton {
  opacity: 0;
  visibility: hidden;
}

@keyframes shimmer {
  0% { background-position: -400% 0; }
  100% { background-position: 400% 0; }
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
