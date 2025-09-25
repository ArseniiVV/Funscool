<template>
  <noscript>
    <div>
      <img
        :src="`https://mc.yandex.ru/watch/${$YID}`"
        style="position: absolute; left: -9999px"
        alt=""
        loading="lazy"
      />
    </div>
  </noscript>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { $YID } = useNuxtApp();
</script>
