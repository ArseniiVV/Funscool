<template>
  <a href="#" class="bvi-open" @click.prevent="loadBviOnDemand">
    <img class="g-icon" :src="'/img/eye.svg'" alt="ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ" title="ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ">
  </a>

</template>

<script setup lang="ts">
import '~/public/bvi-plugin/bvi.min.css'

const { $bviLoader } = useNuxtApp()

async function loadBviOnDemand() {
  await $bviLoader()  
}


</script>

<style lang="scss" scoped>


.g-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  width: 50px;
  object-fit: fill;
  cursor: pointer;
}
</style>