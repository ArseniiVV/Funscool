<template>
  <section id="contacts" ref="contactsSection">
    <div class="container">
      <div class="title">Наши контакты</div>

      <!-- school address in a column -->
      <div class="contacts-column">
        <!-- <b>Школа без языковых границ</b> -->
        <span v-for="br in $constants.branches" :key="br.id">
          <img :src="'/img/ui-elements/Mark.svg'" style="margin-right: 10px" loading="lazy" />
          <a :href="`tel:${br.phone.replace(/\D/g, '')}`" style="display: inline">
            {{ br.address }}
            <br />
            {{ br.phone }}
            <!-- <a :href="`tel:${br.phone.replace(/\D/g, '')}`">{{ br.phone }}</a> -->
          </a>
        </span>
      </div>

      <!-- Contact links in a row -->
      <div class="contacts-row">
        <a
          target="_blank"
          :href="'tel:' + $constants.phone_number"
          @click="useSendMetrika('phoneCall')"
          class="phone-number"
        >
          <img :src="'/img/contacts/phone.svg'" alt="" loading="lazy" />
          {{ $constants.phone_text }}
        </a>
        <a
          target="_blank"
          :href="'https://wa.me/' + $constants.wa"
          @click="useSendMetrika('WhatsApp')"
        >
          <img :src="'/img/contacts/whatsapp.svg'" alt="" loading="lazy" />
          WhatsApp
        </a>
        <a target="_blank" :href="'https://t.me/' + $constants.tg" @click="useSendMetrika('TG')">
          <img :src="'/img/contacts/telegram-yellow.svg'" alt="" loading="lazy" />
          Telegram
        </a>
        <a target="_blank" :href="'mailto:' + $constants.mail" @click="useSendMetrika('email')">
          <img :src="'/img/contacts/mail.svg'" alt="" loading="lazy" />
          {{ $constants.mail }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const contactsSection: Ref<null | HTMLElement> = ref(null);
let hasSentGoal = false;
const { $constants } = useNuxtApp();

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    // Fallback in case IntersectionObserver is not supported
    useSendMetrika('contacts');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting && !hasSentGoal) {
        useSendMetrika('contacts');
        hasSentGoal = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  if (contactsSection.value) {
    observer.observe(contactsSection.value);
  }
});
</script>

<style scoped lang="scss">
#contacts {
  background-color: var(--theme-middle);
  text-align: center;
  padding: 64px 20px;
  color: #000;

  .title {
    font-size: 40px;
    font-weight: 600;
    color: #000;
    margin-bottom: 40px;

    @media (max-width: 600px) {
      font-size: 26px;
      margin-bottom: 28px;
    }
  }

  .contacts-column {
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: space-around;
    margin: 0 auto 40px auto;
    text-align: left;
    font-size: 16px;
    max-width: 1400px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center; // центрируем всю колонку
      text-align: center; // текст тоже по центру
    }

    span {
      display: flex;
      align-items: center;
      gap: 10px;
      line-height: 1.5em;
      width: 200px;

      @media (max-width: 600px) {
        width: 100%;
        justify-content: center; // центрируем содержимое внутри span
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  .contacts-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .contacts-row a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    text-decoration: none;
    font-weight: 500;
    color: #000;
    font-size: 15px;
    transition:
      background 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 600px) {
    .contacts-row {
      flex-direction: column;
      align-items: center;
    }

    .contacts-row a {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
}
</style>
