<template>
  <section id="educationPathWrap">
    <div class="main-block">
      <div class="ed-path-description" style="max-width: 1400px; margin: 0 auto">
        <div class="ed-path-description__title">
          Индивидуальный
          <br />
          <span>
            образовательный маршрут
            <img class="ed-path" :src="'/img/ui-elements/ed-path.svg'" alt="" loading="lazy" />
          </span>
        </div>
        <p>
          В школе Фанскул мы верим в уникальность каждого ребенка и обеспечиваем раскрытие его
          потенциала через индивидуальный образовательный маршрут (ИОМ). Основная задача ИОМ
          развивать не только академические знания, но и полезные личные качества, когнитивные и
          коммуникативные навыки и эмоциональный интеллект.
        </p>
        <b>Он состоит из четырёх главных частей:</b>
      </div>
      <img :src="'/img/ui-elements/education-arrow-green.svg'" alt="" loading="lazy" />
      <EducationPath />
      <img class="star-sun" :src="'/img/ui-elements/star-sun.svg'" alt="" loading="lazy" />
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
