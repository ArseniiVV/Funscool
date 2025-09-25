<template>
  <section class="openday">
    <div class="openday__wrapper">
      <div class="openday__container">
        <div class="openday__main">
          <div class="openday__heading">
            <h1 class="openday__title">День открытых дверей в&nbsp;Фанскул</h1>
            <h2 class="openday__subtitle">Откройте будущее Вашего ребёнка!</h2>
            <div class="openday__text">
              Приглашаем Вас на&nbsp;День открытых дверей в&nbsp;Фанскул, чтобы познакомиться
              с&nbsp;нашей школой и&nbsp;узнать, как мы&nbsp;раскрываем таланты наших учеников!
            </div>
          </div>

          <div class="openday__grid">
            <div class="openday__column openday__left">
              <div class="openday__card">
                <div class="openday__caption">КОГДА И ГДЕ:</div>
                <ul class="openday__list">
                  <li class="openday__item">
                    <strong>• {{ nextThursdayFormatted }}, 17:00 — филиал Идель</strong>
                    <br />
                    (ул. Проспект Октября, д. 107/6)
                  </li>
                  <li class="openday__item">
                    <strong>• {{ nextTuesday }}, 13:00 — филиал Гостиный Двор</strong>
                    <br />
                    (Верхнеторговая площадь, д.4)
                  </li>
                </ul>
                <div class="openday__button">
                  <button
                    type="button"
                    class="button button_bg-accent"
                    data-popup="#registration"
                    @click="
                      useLidModalStore().openLidModal({
                        title: 'Посетить день открытых дверей',
                        text: 'Приглашаем Вас на День открытых дверей в Фанскул, чтобы познакомиться с нашей школой и узнать, как мы раскрываем таланты наших учеников!',
                        buttonText: 'Отправить заявку',
                        group: false,
                        community: false,
                        additional: false,
                        motive: 'День открытых дверей',
                      })
                    "
                  >
                    ЗАПИСАТЬСЯ
                  </button>
                </div>
              </div>
            </div>

            <div class="openday__column openday__right">
              <div class="openday__card">
                <div class="openday__caption">ПРОГРАММА ДНЯ</div>
                <ul class="openday__list">
                  <li class="openday__item">• Экскурсия по&nbsp;школе</li>
                  <li class="openday__item">
                    • Презентация образовательных программ на&nbsp;2025&ndash;2026 учебный год
                  </li>
                  <li class="openday__item">• Встреча с&nbsp;педагогами и&nbsp;нашей командой</li>
                  <li class="openday__item">• Мастер-классы для детей</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

// Next Thursday (Date object)
const nextThursday = computed(() => {
  const now = new Date();
  const day = now.getDay();
  const target = 4; // 4 = Thursday (0 = Sunday)
  const diff = (target + 7 - day) % 7 || 7;
  return new Date(now.getTime() + diff * 24 * 60 * 60 * 1000);
});

// Next Tuesday (formatted string)
const nextTuesday = computed(() => {
  const now = new Date();
  const day = now.getDay();
  const target = 2; // 2 = Tuesday (0 = Sunday)
  const diff = (target + 7 - day) % 7 || 7;
  const formatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' });
  const d = new Date(now.getTime() + diff * 24 * 60 * 60 * 1000);
  return formatter.format(d).toUpperCase();
});

// Next Thursday (formatted string)
const nextThursdayFormatted = computed(() => {
  const formatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' });
  return formatter.format(nextThursday.value).toUpperCase();
});
</script>

<style scoped lang="scss">
@import '~/css/odstyle.css';
</style>
