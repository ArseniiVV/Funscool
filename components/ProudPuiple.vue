<template>
  <section id="Puple">
    <div class="title-proud__wrap">
      <div class="title-proud">
        <img :src="'/img/ui-elements/path.svg'" alt="" class="title-img" loading="lazy" />
        Наша
        <span class="age-span">
          <img :src="'/img/ui-elements/circle-age.svg'" alt="" loading="lazy" />
          гордость
        </span>
      </div>
    </div>

    <Swiper
      :modules="[Autoplay, Navigation, Mousewheel]"
      :navigation="{ nextEl: '.swiper-proud-next', prevEl: '.swiper-proud-prev' }"
      :mousewheel="{ forceToAxis: true }"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: true }"
      :speed="700"
      class="swiper-container swiper-puple-1"
      :breakpoints="{
        320: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4.2, spaceBetween: 40 },
      }"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="slide Puple-card" :class="`Puple-card-${(index % 5) + 1}`">
          <div class="Puple-card__img">
            <img :src="slide.img" :alt="slide.alt" loading="lazy" />
          </div>
          <div class="Puple-card__title">{{ slide.title }}</div>
          <div class="Puple-card__class">{{ slide.class }}</div>
          <div class="Puple-card__goals">{{ formatGoals(slide.goals) }}</div>
        </div>
      </SwiperSlide>
    </Swiper>
    <button class="swiper-proud-prev" aria-label="Назад">
      <img :src="'/img/ui-elements/arrow-swiper.svg'" alt="" loading="lazy" />
    </button>
    <button class="swiper-proud-next" aria-label="Вперёд">
      <img :src="'/img/ui-elements/arrow-swiper.svg'" alt="" loading="lazy" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Mousewheel, Navigation } from 'swiper/modules';

const medalIcons = ['🏅', '🏆', '🎖️', '⭐'] as const;

const formatGoals = (s: string): string => {
  if (!s) return '';
  return s
    .split(/,\s*/)
    .map((t, i) => `${medalIcons[i % medalIcons.length]} ${t.trim()}`)
    .join('\n');
};

const slides = ref([
  {
    img: '/img/puple/1111.webp',
    title: 'Быков Родион',
    class: 'Выпускник',
    goals: 'Призёр МЭ ВсОШ по математике и информатике',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/2323.webp',
    title: 'Низаметдинова Алия',
    class: 'Выпускник',
    goals:
      'Призёр МЭ ВсОШ по русскому языку, призёр МЭ олимпиады на кубок им. Ю. Гагарина по русскому языку, победитель Международного конкурса по английскому языку "British Bulldog"',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/18.webp',
    title: 'Малешина Алёна',
    class: '11А класс',
    goals: 'Призер муниципального этапа ВсОШ по литературе и обществознанию',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/9.webp',
    title: 'Муратов Лев',
    class: '11А класс',
    goals: 'Призёр муниципального этапа ВсОШ по истории и обществознанию',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/11.webp',
    title: 'Петров Владислав',
    class: '10А класс',
    goals:
      'Победитель МЭ олимпиады на кубок им. Ю. Гагарина по обществознанию и призёр по математике, английскому языку. Призёр МЭ ВсОШ по английскому, химии, математике',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/677.webp',
    title: 'Сенин Илья',
    class: '10А класс',
    goals: 'Призёр Всероссийской научно-практической конференции школьников в номинации «Биология»',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/10.webp',
    title: 'Островский Марк',
    class: '10А класс',
    goals:
      'Многократный чемпион Башкирии, победитель первенства России (2020), чемпион Европы (2020), бронзовый призер чемпионата мира (2020), бронзовый призер гимназиады (2024) по джиу-джитсу',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/6.webp',
    title: 'Ковалева Виктория',
    class: '9А класс',
    goals:
      'Призёр МЭ олимпиады на кубок им. Ю. Гагарина по русскому языку, победитель МЭ ВСОШ по французскому языку, призер Республиканской олимпиады по астрономии им. В.Я. Струве',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/19.webp',
    title: 'Хадыев Данис',
    class: '9А класс',
    goals:
      'Призёр МЭ ВсОШ по английскому языку и физике, победитель городского этапа ВсОШ по английскому языку. Победитель олимпиады по разговорному английскому "I can speak English"',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/2.webp',
    title: 'Анискова Виктория',
    class: '9А класс',
    goals:
      'Призёр очного отборочного этапа Отраслевой Физико-экономической олимпиады школьников «Росатом».  Победитель МЭ олимпиады на кубок им. Ю. Гагарина по информатике',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/1212.webp',
    title: 'Бикмаев Шамиль',
    class: '7А класс',
    goals: 'Призёр РЭ  олимпиады на кубок им. Ю. Гагарина по математике',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/7.webp',
    title: 'Куликова Лера',
    class: '7Б класс',
    goals:
      'Победитель МЭ олимпиады на кубок им. Ю. Гагарина по физкультуре. Участник шоу «Гонка героев» в Уфе',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/1.webp',
    title: 'Матвеев Демид',
    class: '7Б класс',
    goals:
      'Спортсмен в школе олимпийского резерва по горнолыжному спорту – 3-й юношеский разряд, волонтер Южноуральской тропы. Увлекается digital-скетчингом, 3D-моделированием и вело-даунхиллом',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/5.webp',
    title: 'Зайнуллин Роальд',
    class: '6Б класс',
    goals:
      'Призер районного этапа городской предметной олимпиады «Юные покорители вершин» по английскому языку, призёр МЭ ВсОШ по русскому языку. Подающий надежды футболист',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/12.webp',
    title: 'Питаева Виктория',
    class: '6Б класс',
    goals:
      'Призёр РЭ Олимпиады на Кубок имени Ю.А. Гагарина по математике. Призёр РЭ городской олимпиады по английскому языку «Юные покорители вершин»',
    alt: 'Ученик',
  },
  // {
  //   img: '/img/puple/13.webp',
  //   title: 'Стефания Обидина',
  //   class: '5 класс',
  //   goals:
  //     'Неоднократный победитель соревнований по художественной гимнастике (Чкалов Арена - 1 место, дворец Ирины Винер - 1 место)',
  //   alt: 'Ученик',
  // },
  {
    img: '/img/puple/14.webp',
    title: 'Тарасова Елизавета',
    class: '5Б класс',
    goals:
      'Призёр МЭ по информатике и математике, победитель международной  олимпиады «Лисёнок» по математике и русскому языку',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/111.webp',
    title: 'Лебедев Глеб',
    class: '5А класс',
    goals:
      'Призер РЭ олимпиады кубка им. Ю. А. Гагарина по математике, полиолимпиаде, призер международного конкурса по языкознанию «Русский медвежонок»',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/222.webp',
    title: 'Колесников Максим',
    class: '5Б класс',
    goals:
      'Призёр РЭ олимпиады на Кубок имени Ю.А. Гагарина по физической культуре. Победитель и призер международных и российских хоккейных турниров в составе команды «Салават Юлаев»',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/8.webp',
    title: 'Лея Шайхутдинова',
    class: '4Б класс',
    goals:
      'Призёр РЭ олимпиады на кубок им. Ю. Гагарина по русскому языку, победитель международного конкурса по языкознанию «Русский медвежонок»',
    alt: 'Ученик',
  },
  {
    img: '/img/puple/3.webp',
    title: 'Богатырева Мария',
    class: '4Б класс',
    goals:
      'Призёр районного этапа городской предметной олимпиады «Юные покорители вершин» по английскому языку',
    alt: 'Ученик',
  },
  // {
  //   img: '/img/puple/17.webp',
  //   title: 'Ласточкина Стефания',
  //   class: '3А класс',
  //   goals: 'Призёр РЭ Олимпиады на Кубок имени Ю.А. Гагарина по полиолимпиаде',
  //   alt: 'Ученик',
  // },
  {
    img: '/img/puple/16.webp',
    title: 'Евсюкова Аврора',
    class: '3А класс',
    goals: 'Призёр РЭ Олимпиады на Кубок имени Ю.А. Гагарина по полиолимпиаде',
    alt: 'Ученик',
  },
]);
</script>

<style scoped lang="scss">
#Puple {
  margin-top: 100px;
  margin-bottom: 100px;
  position: relative;

  .swiper-proud-prev,
  .swiper-proud-next {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 50%;
    border: 0;
    outline: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    transition: all 0.5s;
  }

  .swiper-proud-prev {
    left: 40px;
  }

  .swiper-proud-next {
    right: 40px;
    transform: translateY(-50%) rotate(180deg);
  }

  .Puple-card-1 {
    .Puple-card__class {
      color: var(--aqua);
    }

    .Puple-card__img {
      position: relative;

      img {
        clip-path: path(
          'M 97.550781 2.144531 C 102.328125 -0.292969 108.210938 -0.292969 112.988281 2.144531 L 202.28125 47.667969 C 207.058594 50.105469 210 54.605469 210 59.476562 L 210 150.523438 C 210 155.394531 207.058594 159.894531 202.28125 162.332031 L 112.988281 207.855469 C 108.210938 210.292969 102.328125 210.292969 97.550781 207.855469 L 8.257812 162.332031 C 3.480469 159.894531 0.539062 155.394531 0.539062 150.523438 L 0.539062 59.476562 C 0.539062 54.605469 3.480469 50.105469 8.257812 47.667969 Z M 97.550781 2.144531'
        );
      }

      &::after {
        background-image: url('/img/puple/bg/1.svg');
      }
    }
  }

  .Puple-card-2 {
    .Puple-card__class {
      color: var(--yellow);
    }

    .Puple-card__img {
      img {
        clip-path: path(
          'M 88.03125 0.773438 C 80 0.773438 73.488281 7.285156 73.488281 15.316406 L 73.488281 28.925781 L 63.863281 19.300781 C 58.183594 13.621094 48.976562 13.621094 43.296875 19.300781 L 19.300781 43.296875 C 13.621094 48.976562 13.621094 58.183594 19.300781 63.863281 L 28.925781 73.488281 L 15.316406 73.488281 C 7.285156 73.488281 0.773438 80 0.773438 88.03125 L 0.773438 121.96875 C 0.773438 130 7.285156 136.511719 15.316406 136.511719 L 28.925781 136.511719 L 19.300781 146.136719 C 13.621094 151.816406 13.621094 161.023438 19.300781 166.703125 L 43.296875 190.699219 C 48.976562 196.378906 58.183594 196.378906 63.863281 190.699219 L 73.488281 181.074219 L 73.488281 194.683594 C 73.488281 202.71875 80 209.226562 88.03125 209.226562 L 121.964844 209.226562 C 129.996094 209.226562 136.507812 202.71875 136.507812 194.683594 L 136.507812 181.074219 L 146.132812 190.699219 C 151.8125 196.378906 161.019531 196.378906 166.703125 190.699219 L 190.695312 166.703125 C 196.375 161.023438 196.375 151.8125 190.695312 146.136719 L 181.070312 136.511719 L 194.683594 136.511719 C 202.714844 136.511719 209.226562 130 209.226562 121.96875 L 209.226562 88.03125 C 209.226562 80 202.71875 73.488281 194.683594 73.488281 L 181.074219 73.488281 L 190.695312 63.863281 C 196.375 58.183594 196.375 48.976562 190.695312 43.296875 L 166.703125 19.300781 C 161.023438 13.621094 151.8125 13.621094 146.132812 19.300781 L 136.507812 28.925781 L 136.507812 15.316406 C 136.507812 7.285156 129.996094 0.773438 121.964844 0.773438 Z M 88.03125 0.773438'
        );
      }

      &::after {
        background-image: url('/img/puple/bg/2.svg');
      }
    }
  }

  .Puple-card-3 {
    .Puple-card__class {
      color: var(--purple);
    }

    .Puple-card__img {
      img {
        clip-path: path(
          'M 86.335938 8.460938 C 96.773438 -1.933594 113.695312 -1.933594 124.132812 8.460938 L 202.152344 86.175781 C 212.589844 96.570312 212.589844 113.429688 202.152344 123.824219 L 124.132812 201.539062 C 113.695312 211.933594 96.773438 211.933594 86.335938 201.539062 L 8.316406 123.824219 C -2.121094 113.429688 -2.121094 96.570312 8.316406 86.175781 Z M 86.335938 8.460938'
        );
      }

      &::after {
        background-image: url('/img/puple/bg/3.svg');
      }
    }
  }

  .Puple-card-4 {
    .Puple-card__class {
      color: var(--theme-dark);
    }

    .Puple-card__img {
      img {
        clip-path: path(
          'M 105 187.960938 C 94.195312 200.957031 77.90625 209.226562 59.683594 209.226562 C 27.148438 209.226562 0.773438 182.851562 0.773438 150.316406 C 0.773438 132.09375 9.042969 115.804688 22.039062 105 C 9.042969 94.195312 0.773438 77.90625 0.773438 59.683594 C 0.773438 27.148438 27.148438 0.773438 59.683594 0.773438 C 77.90625 0.773438 94.195312 9.042969 105 22.039062 C 115.804688 9.042969 132.09375 0.773438 150.316406 0.773438 C 182.851562 0.773438 209.226562 27.148438 209.226562 59.683594 C 209.226562 77.90625 200.957031 94.195312 187.960938 105 C 200.957031 115.804688 209.226562 132.09375 209.226562 150.316406 C 209.226562 182.851562 182.851562 209.226562 150.316406 209.226562 C 132.09375 209.226562 115.804688 200.957031 105 187.960938 Z M 105 187.960938'
        );
      }

      &::after {
        background-image: url('/img/puple/bg/4.svg');
      }
    }
  }

  .Puple-card-5 {
    .Puple-card__class {
      color: var(--green);
    }

    .Puple-card__img {
      img {
        clip-path: path(
          'M 209.925781 41.371094 C 209.925781 54.1875 195.023438 65.632812 171.652344 73.183594 C 195.023438 80.738281 209.925781 92.183594 209.925781 105 C 209.925781 117.816406 195.023438 129.265625 171.652344 136.816406 C 195.023438 144.367188 209.925781 155.8125 209.925781 168.628906 C 209.925781 191.367188 163.003906 209.800781 105.125 209.800781 C 47.246094 209.800781 0.324219 191.367188 0.324219 168.628906 C 0.324219 155.8125 15.226562 144.367188 38.597656 136.816406 C 15.226562 129.265625 0.324219 117.816406 0.324219 105 C 0.324219 92.183594 15.226562 80.738281 38.597656 73.183594 C 15.226562 65.632812 0.324219 54.1875 0.324219 41.371094 C 0.324219 18.632812 47.246094 0.199219 105.125 0.199219 C 163.003906 0.199219 209.925781 18.632812 209.925781 41.371094 Z M 209.925781 41.371094'
        );
      }

      &::after {
        background-image: url('/img/puple/bg/5.svg');
      }
    }
  }

  .swiper-button-disabled {
    opacity: 0.5;
  }

  .title-proud__wrap {
    display: flex;
    justify-content: center;
  }

  .title-proud {
    position: relative;
    display: inline-block;
    text-align: center;
    font-size: 48px;
    color: #000;
    font-weight: 600;
    margin-top: 50px;
    margin-bottom: 50px;

    .title-img {
      position: absolute;
      left: 100%;
      bottom: 100%;
      transform: translateX(100%);
      width: 62px;
      height: 60px;
    }

    .age-span {
      position: relative;
      display: inline-block;
      margin-left: 10px;

      img {
        margin-right: 0;
        position: absolute;
        bottom: -15px;
        right: -10px;
        width: 250px;
      }
    }

    img {
      width: 80px;
      margin-right: 20px;
    }
  }

  .swiper-container {
    height: 550px;
    padding: 20px;
    text-align: center;
  }

  /* Прижать все слайды к верху области слайдера */
  .swiper-wrapper {
    align-items: flex-start;
  }
  .swiper-slide {
    display: flex;
  }

  .swiper-puple-1 {
    overflow: hidden;
  }

  .slide {
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .Puple-card__img {
      position: relative;
      width: 210px;
      height: 210px;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        z-index: -1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: bottom;
      }
    }

    .Puple-card__title {
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: bold;
      margin-top: 10px;
    }

    .Puple-card__class {
      margin-bottom: 16px;
      font-size: 17px;
      font-weight: 600;
    }

    .Puple-card__goals {
      width: 80%;
      text-align: center;
      font-size: 17px;
      margin: 5px auto 0 auto;
      white-space: pre-line;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 50%;
  }

  .swiper-pagination {
    position: relative;
    margin-top: 20px;
  }
}

@media screen and (max-width: 768px) {
  #Puple {
    margin-bottom: 50px;

    .title-proud {
      font-size: 32px;

      .title-img {
        left: 0;
        transform: translateX(-100%);
        width: 45px;
        height: 45px;
      }

      img {
        width: 50px;
      }

      .age-span {
        img {
          width: 170px;
        }
      }
    }
  }
}
</style>
