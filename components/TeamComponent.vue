<template>
  <div class="main-block">
    <div class="team-title">Наша команда</div>

    <section id="team">
      <!-- Фулл-блид слайдер (вне ограничения 1400px) -->
      <div class="main-team-swiper">
        <Swiper
          :modules="[Navigation, Autoplay]"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :speed="2500"
          :loop="true"
          class="swiper-team"
          @slideChange="onSlideChange"
        >
          <SwiperSlide
            v-for="member in teamMembers"
            :key="member.id"
            @click="setActive(member)"
          >
            <div class="swiper-team-item">
              <img
                :src="member.img"
                :alt="member.name"
              
              
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="swiper-team-arrow">
          <img :src="'/img/ui-elements/arrow-curl.svg'" alt="" />
        </div>
      </div>

      <!-- Остальной контент — в контейнере 1400px -->
      <div class="container">
        <div class="main-team-swiper-bottom">
          <div class="main-team-info">
            <div class="main-team-info-name" ref="teamName">{{ activeMember.name }}</div>
            <div class="main-team-info-position" ref="teamPosition">
              {{ activeMember.position }}
            </div>
            <div class="main-team-info-description" ref="teamDescription">
              {{ activeMember.description }}
            </div>
            <img
              style="width: 22px; height: 18px; margin: 0 auto"
              :src="'/img/ui-elements/team-precredo-svg.svg'"
              alt=""
            />
            <div class="main-team-info-credo" ref="teamCredo">{{ activeMember.credo }}</div>
          </div>

          <img class="main-team-info-img" :src="'/img/persons/i238.svg'" alt="" loading="lazy" />
        </div>

        <img class="main-team-svg" :src="'/img/ui-elements/team-svg.svg'" alt="" />
        <img class="main-team-svg-2" :src="'/img/ui-elements/team-svg-mobile.svg'" alt="" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { teamMember } from '~/types'

const { $constants } = useNuxtApp()

const teamMembers: teamMember[] = $constants.team_members
const teamName: Ref<null | HTMLElement> = ref(null)
const teamPosition: Ref<null | HTMLElement> = ref(null)
const teamDescription: Ref<null | HTMLElement> = ref(null)
const teamCredo: Ref<null | HTMLElement> = ref(null)
const activeMember = ref(teamMembers[0])
let previousIndex = 0

function setActive(member: teamMember) {
  activeMember.value = member
}

function onSlideChange(swiper: SwiperType) {
  // используем realIndex, чтобы работать с loop-клонами корректно
  const current = swiper.realIndex ?? swiper.activeIndex

  if (teamName.value) teamName.value.style.opacity = '0'
  if (teamPosition.value) teamPosition.value.style.opacity = '0'
  if (teamDescription.value) teamDescription.value.style.opacity = '0'
  if (teamCredo.value) teamCredo.value.style.opacity = '0'

  swiper.slides.forEach((slide: any, index: number) => {
    const image = slide.querySelector('img')
    gsap.set(image, { rotate: 0 })

    if (index === swiper.activeIndex) {
      gsap.to(teamName.value, { duration: 1, opacity: 1 })
      gsap.to(teamPosition.value, { duration: 1.2, opacity: 1 })
      gsap.to(teamDescription.value, { duration: 1.4, opacity: 1 })
      gsap.to(teamCredo.value, { duration: 1.6, opacity: 1 })
    }

    if (previousIndex < current) {
      gsap.to(image, { duration: 2.5, rotate: -720 })
    } else {
      gsap.to(image, { duration: 2.5, rotate: 720 })
    }
  })

  activeMember.value = teamMembers[current] || activeMember.value
  previousIndex = current
}
</script>

<style scoped lang="scss">
/* Ограничение контейнера для всего, кроме слайдера */
#team .container {
  max-width: 1400px;
  margin: 0 auto;
  padding-inline: 20px;
}

/* Фулл-блид слайдер: растягиваем на всю ширину вьюпорта */
.main-team-swiper {
  position: relative;
  width: 99vw;
  left: 50%;
  right: 50%;
  margin-left: calc(-50vw + 0px);
  margin-right: calc(-50vw + 0px);
  /* можно добавить сверху/снизу отступы, если нужно отделить от остального контента */
}

#team {
  position: relative;

  .main-team-title {
    position: relative;
    font-size: 48px;
    font-weight: 600;
    line-height: 1em;
    text-align: center;
    z-index: 20;
  }

  .swiper-team {
    position: relative;
    z-index: 10;

    .swiper-team-item {
      display: flex;
      justify-content: center;
      padding: 30px;

      img {
        width: 500px;
        aspect-ratio: 1/1;
      }
    }
  }

  .swiper-team-prev,
  .swiper-team-next {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 50%;
    border: 0;
    outline: none;
    transition: opacity 0.2s;

    img {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    &.swiper-button-disabled {
      opacity: 0.4;
    }
  }

  .swiper-team-prev {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;

    @media (min-width: 991px) {
      left: 40px;
    }
  }

  .swiper-team-next {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
    z-index: 50;

    @media (min-width: 991px) {
      right: 40px;
    }
  }

  .main-team-swiper-bottom {
    position: relative;
    display: flex;
    padding-right: 20%;

    @media (min-width: 1200px) {
      height: 400px;
    }
  }

  .swiper-team-arrow {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%) translateY(105%);
    width: 100px;
    height: 70px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .main-team-info {
    margin-left: auto;
    width: 35%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    row-gap: 30px;
  }

  .main-team-info-name {
    margin-top: 30px;
    font-size: 24px;
    font-weight: 600;
    line-height: 1em;
  }

  .main-team-info-position {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.25em;
  }

  .main-team-info-description {
    font-size: 17px;
    line-height: 1.5em;
    text-wrap: balance;
  }

  .main-team-info-credo {
    height: 12px;
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 500;
    font-size: 17px;
    text-align: center;
  }

  .main-team-info-img {
    position: absolute;
    left: 10%;
    bottom: -60px;
    width: 220px;
    z-index: 5;
  }

  .main-team-svg {
    position: absolute;
    right: 60px;
    top: 60px;
    z-index: 10;
    width: 160px;
    height: 160px;
  }

  .main-team-svg-2 {
    position: absolute;
    left: 80px;
    top: 100px;
    z-index: 10;
    width: 160px;
    height: 160px;
  }
}

@media (max-width: 1200px) {
  #team {
    .main-team-title {
      font-size: 48px;
    }

    .main-team-swiper-bottom {
      padding-right: 0;
    }

    .swiper-team-arrow {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%) translateY(105%);
      width: 100px;
      height: 70px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .main-team-info {
      width: 40%;
    }

    .main-team-info-img {
      width: 165px;
      height: 380px;
    }

    .main-team-svg {
      right: 40px;
      top: 10px;
      width: 100px;
      height: 100px;
    }
  }
}

@media (max-width: 768px) {
  #team {
    .main-team-title {
      margin-bottom: 1em;
      font-size: 32px;
    }

    .swiper-team {
      position: relative;
      z-index: 10;

      .swiper-team-item img {
        width: 300px;
        max-width: 100%;
      }
    }

    .main-team-swiper-bottom {
      padding-right: 0;
    }

    .swiper-team-arrow {
      display: none;
    }

    .main-team-info {
      max-width: 100%;
      width: 100%;
      row-gap: 24px;
      height: 350px;
    }

    .main-team-info-name {
      font-size: 20px;
      text-align: center;
    }

    .main-team-info-position {
      font-size: 14px;
      text-align: center;
    }

    .main-team-info-description {
      font-size: 14px;
      text-align: center;
    }

    .main-team-info-img {
      display: none;
    }

    .main-team-svg {
      display: none;
    }

    .main-team-svg-2 {
      position: absolute;
      display: block;
      left: 20px;
      top: 0;
      width: 64px;
      height: 64px;
    }
  }
}
</style>
