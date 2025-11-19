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
        <p>Каждый ребенок – как неповторимая звездочка . В Фанскул мы помогаем каждой звездочке светить ярко!</p>
        <p>Для каждой звездочки у нас есть свой особенный маршрут к успеху. Этот маршрут помогает ребятам не только узнавать новое, но и становиться добрыми, умными и веселыми! Мы развиваем не только знания, но и умение думать, дружить и понимать свои чувства!</p>
        <b>Этот маршрут к успеху состоит из четырех важных частей:</b>
      </div>
      <img :src="'/img/ui-elements/education-arrow-green.svg'" alt="" loading="lazy" />
      <EducationPath />
      <img class="star-sun" :src="'/img/ui-elements/star-sun.svg'" alt="" loading="lazy" />
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
