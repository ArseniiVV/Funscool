<template>
  <div data-main>
    <HeaderComponent />
    <MainSlider />
    <DeferredClient :loader="() => import('~/components/AdvantagesComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/PhotoFilm.vue')" />
    <DeferredClient :loader="() => import('~/components/AgeGroups.vue')" />
    <DeferredClient :loader="() => import('~/components/NumbersComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/VideoPuiple.vue')" />
    <DeferredClient :loader="() => import('~/components/AdressesComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/TeamComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/FactsSection.vue')" />
    <DeferredClient :loader="() => import('~/components/MainReviews.vue')" />
    <DeferredClient :loader="() => import('~/components/IndividualPath.vue')" />
    <DeferredClient :loader="() => import('~/components/ProudPuiple.vue')" />
    <DeferredClient :loader="() => import('~/components/PhotoFilm.vue')" />
    <DeferredClient :loader="() => import('~/components/FutureComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/NewsComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/ContactsComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/MapComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/PotentialComponent.vue')" />
    <DeferredClient :loader="() => import('~/components/FooterComponent.vue')" />
  </div>
</template>

<style lang="scss">
.main-block {
  // margin: 50px auto 50px auto;
  padding: 50px 0 100px 0;
  text-align: center;
}

.ed-path-description {
  position: relative;
  width: 60%;
  margin: 0 auto 50px auto;
  text-align: left;
  z-index: 2;

  &__title {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.25em;
  }

  .ed-path {
    position: absolute;
    top: 0px;
    left: -50px;
    transform: translateX(-50%);
    width: 80px;
  }
}

.team-title {
  margin-bottom: 48px;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.25em;
}

.dt {
  display: block;
}

.mb {
  display: none;
}

.swiper-gardens {
  @media (min-width: 1600px) {
    &.should-center {
      .swiper-wrapper {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
      }
    }
  }
}

#educationPathWrap {
  padding-top: 80px;
  position: relative;

  .star-sun {
    position: absolute;
    top: 20px;
    right: 15%;
    width: 128px;
    height: 128px;
    z-index: 1;
  }

  .main-block {
    padding: 0;
  }

  @media (max-width: 768px) {
    padding-top: 40px;
  }
}

.swiper-gardens__card {
  width: 280px;
  flex-shrink: 0;
}

.title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2em;
  color: #000;
  margin: 0px auto 100px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; // ✅ allow wrap on small screens
  text-align: center;
  // padding: 0 16px; // ✅ prevent edge overflow

  .title-img {
    margin-right: 10px;
    width: 50px;
    height: auto;
  }

  .age-span {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 10px;

    .title-icon {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: auto;
    }

    .title-circle {
      position: absolute;
      top: -50px;
      left: 53%;
      transform: translateX(-50%);
      width: 260px;
    }

    .title-vector-2 {
      position: absolute;
      top: 100%;
      width: 220px;
    }

    .contact-vector {
      position: absolute;
      top: -20px;
      left: -5%;

      @media (max-width: 768px) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
      }
    }
  }
}

@media (max-width: 768px) {
  #educationPathWrap {
    .star-sun {
      top: 10px;
      right: 24px;
      width: 64px;
      height: 64px;
    }
  }

  .ed-path-description {
    width: 80%;

    &__title {
      font-size: 32px;
      font-weight: 700;
      line-height: 1.25em;
      margin-bottom: 24px;
    }
  }

  .team-title {
    margin-bottom: 24px;
    font-size: 32px;
  }

  .dt {
    display: none;
  }

  .mb {
    display: block;
    position: absolute;
    left: -30px;
    top: -40px;
  }

  .ed-path-description {
    &__title {
      span {
        display: inline-block;

        .ed-path {
          height: 1em;
          position: static;
          display: inline;
          transform: rotate(180deg);
        }
      }
    }

    .star-sun {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
    flex-direction: column;
    gap: 10px;

    .age-span {
      margin-left: 0;
    }

    .title-icon {
      top: 1.5em;
    }

    .title-circle {
      display: none;
    }
  }
}

////////////////
///
.schedule-wrapper {
  position: relative;
  //   background: #d3a9f9;
  overflow: hidden;
}

.schedule-decor {
  position: relative;
  height: 220px;

  .schedule-arrow {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    z-index: 2;
  }

  .schedule-image {
    position: absolute;
    bottom: 0px;
    left: 30%;
    // transform: translateX(50%);
    max-height: 100%;
    max-width: 260px;
    z-index: 1;

    @media (max-width: 768px) {
      left: 0%;
      // transform: translateX(10%);
      right: auto;
      max-width: 180px;
    }
  }

  @media (max-width: 768px) {
    height: 220px;
  }
}

.schedule-pattern {
  position: absolute;
  top: -55px;
  left: 0px;
  width: 100%;
  height: 60px;
  background-image: url('/img/ui-elements/pattern-ppl-strng.svg'); //-ppl-strng
  background-repeat: repeat-x;
  //   transform: translateY(100%);
  z-index: 300;
}

.schedule-pattern-dwn {
  position: absolute;
  bottom: -55px;
  left: 0px;
  width: 100%;
  height: 60px;
  background-image: url('/img/ui-elements/pattern-ppl-dwn.svg');
  background-repeat: repeat-x;
  //   transform: translateY(100%);
  z-index: 300;
}

.schedule {
  background-color: var(--theme-middle);
  margin-bottom: 60px;
  padding: 80px 20px 60px;
  position: relative;
  z-index: 4;
  text-align: center;

  .title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 32px;
    color: white;

    @media (max-width: 768px) {
      font-size: 24px;
      margin-bottom: 24px;
    }
  }

  &__item {
    max-width: 580px;
    margin: 0 auto;
    color: white;
    font-size: 24px;
    line-height: 1.6;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 6px;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 0 16px;
    }

    p {
      margin: 0;
    }
  }
}
</style>
