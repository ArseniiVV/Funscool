<template>
  <div id="ContactWidget" class="widget" v-if="showOnMobile">
    <div style="margin-bottom: 30px">
      <a :href="'https://wa.me/' + $constants.wa" target="_blank" rel="noopener noreferrer" class="widget-content-item"
        @click="useSendMetrika('WhatsApp')">
        <img :src="'/img/contacts/whatsapp2.svg'" alt="wa" style="width: 60px" loading="lazy" />
      </a>
    </div>
    <div>
      <a target="_blank" :href="'tel:' + $constants.phone_number" class="widget-phone widget-content-item"
        @click="useSendMetrika('phoneCall')">
        <span style="display: none" class="phone-number">{{ $constants.phone_text }}</span>
        <img :src="'/img/contacts/phone2.svg'" alt="" style="width: 60px" loading="lazy" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

// const widgetShow = ref(false);
const showOnMobile = ref(false);
const { $constants } = useNuxtApp();

function checkScrollAndWidth() {
  const isMobile = window.innerWidth <= 600;
  const hasScrolled = window.scrollY > 50;
  showOnMobile.value = isMobile && hasScrolled;
}

onMounted(() => {
  checkScrollAndWidth();
  window.addEventListener('scroll', checkScrollAndWidth);
  window.addEventListener('resize', checkScrollAndWidth);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollAndWidth);
  window.removeEventListener('resize', checkScrollAndWidth);
});
</script>

<style lang="scss" scoped>
#ContactWidget {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
  cursor: pointer;

  .widget-img {
    width: 70px;
    height: 70px;
  }

  .widget-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    right: 24px;
    bottom: 36px;
    opacity: 0;
    transform: translateY(0px);
    transition:
      opacity 0.5s,
      transform 0.5s;

    .widget-content-item {
      margin: 8px 0;
      width: 60px;
      height: 60px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }

  .widget-content.active {
    display: block;
    opacity: 1;
    transform: translateY(-70px);
  }
}

@media (max-width: 600px) {
  #ContactWidget {
    .widget-img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
