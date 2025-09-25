<template>
  <section id="ageGroupSection">
    <div class="main-section">
      <div class="title">
        <div style="display: flex; align-items: center">
          <img class="title-img" :src="'/img/ui-elements/arm.svg'" alt="Иконка руки" />
          Ступени
        </div>
        <span class="age-span">
          образования
          <img class="title-vector-2" :src="'/img/ui-elements/Vector-aqua.svg'" alt="Украшение" />
        </span>
      </div>

      <div class="age-groups__row">
        <div v-for="ag in ageGroups" :key="ag.id" class="age-groups__row-item">
          <AgeGroupCard :group="ag" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const { $constants } = useNuxtApp();
const ageGroups = $constants.age_groups;
</script>

<style lang="scss" scoped>
#ageGroupSection {
  padding-top: 45px;
  padding-bottom: 95px;
}

.age-groups__row {
  display: flex;
  flex-wrap: wrap;
  row-gap: 24px;
  margin: 0 -12px;

  &-item {
    width: 25%;
    padding: 0 12px;

    .AgeGroups-card__btn .the-button {
      padding: 16px 24px;
    }
  }
}

@media (max-width: 1100px) {
  .age-groups__row-item {
    width: 50%;
  }
}

@media (max-width: 748px) {
  .title-img{
    position: absolute;
    width: auto;
    left: 5%;
  }
}

@media (max-width: 576px) {
  .age-groups__row-item {
    width: 100%;
  }
}
</style>
