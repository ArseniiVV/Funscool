<template>
  <!-- Телепортируем в body, чтобы inert на фоне не отключал модалку -->
  <Teleport to="body">
    <!-- Контейнер модалки -->
    <div
      id="groupModal"
      :aria-hidden="!isVisible"
      class="lid-modal__backdrop"
      v-show="isVisible"
      @keydown.esc.prevent="closeModal"
    >
      <!-- Оверлей: кликом по фону закрываем -->
      <div class="modal-overlay" @click.self="closeModal">
        <!-- Диалог -->
        <form
          class="lid-modal__dialog"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          aria-labelledby="lid-modal-title"
          aria-describedby="lid-modal-text"
          @submit.prevent="sendRequest"
          @click.stop
          ref="dialogRef"
        >
          <button class="lid-modal__close" type="button" @click="closeModal" />

          <h2 id="lid-modal-title" class="lid-modal__title">{{ modalData.title }}</h2>
          <p id="lid-modal-text" class="lid-modal__text">{{ modalData.text }}</p>

          <div class="lid-modal__controls">
            <div class="modal-control__wrap">
              <input
                id="lid-name"
                class="modal-input"
                v-model="requestName"
                type="text"
                autocomplete="name"
                name="name"
                placeholder=" "
              />
              <label for="lid-name">ФИО</label>
            </div>

            <div class="modal-control__wrap">
              <input
                id="lid-phone"
                class="modal-input"
                v-model="requestPhone"
                v-mask-phone="true"
                type="tel"
                inputmode="tel"
                name="phone"
                :required="isVisible"
                placeholder=" "
              />
              <label for="lid-phone">
                Телефон <span>*</span>
              </label>
            </div>

            <div class="modal-control__wrap">
              <input
                id="lid-email"
                class="modal-input"
                v-model="requestEmail"
                type="email"
                name="email"
                autocomplete="email"
                placeholder=" "
              />
              <label for="lid-email">Email</label>
            </div>

            <div v-if="modalData.group" id="groupSelect" class="modal-control__wrap">
              <select v-model="selectedGroup" aria-label="Выбрать группу">
                <option value="" disabled hidden>Выбрать группу</option>
                <option v-for="g in $constants.groups" :key="g" :value="g">{{ g }}</option>
              </select>
            </div>

            <div v-if="modalData.community" id="communitySelect" class="modal-control__wrap">
              <select v-model="selectedCommunity" aria-label="Ваша роль в сообществе">
                <option value="" disabled hidden>Ваша роль в сообществе?</option>
                <option value="Сотрудник">Сотрудник</option>
                <option value="Партнер">Партнер</option>
                <option value="Инвестор">Инвестор</option>
                <option value="Родитель">Родитель</option>
              </select>
            </div>
          </div>

          <p class="lid-modal__status" v-html="lidStatus" />

          <button
            v-if="!lidInProcess"
            class="lid-modal__btn"
            type="submit"
            :disabled="requestPhone?.length < 18"
          >
            Получить консультацию
          </button>

          <div class="lid-modal__link">
            Нажимая на кнопку «Отправить заявку», Вы даете
            <a :href="$constants.agreement">согласие</a> на обработку персональных данных согласно
            <a :href="$constants.policy">политике</a>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { $constants } = useNuxtApp();

const dialogRef = ref<HTMLElement | null>(null);
const requestName = ref('');
const requestPhone = ref('');
const requestEmail = ref('');
const lidStatus = ref('');
let lidInProcess = false;

const selectedGroup = ref('');
const selectedCommunity = ref('');

const lidModal = useModalStore();
const isVisible = computed(() => lidModal.isLidModalVisible);
const modalData = computed(() => lidModal.lidModalData);
const closeModal = lidModal.closeLidModal;

// приводим значения к одному регистру и убираем лишние пробелы
const normalize = (s?: string | null) => (typeof s === 'string' ? s.trim() : '')

const syncGroup = () => {
  const g = normalize(modalData.value?.group)
  if (!g) {
    selectedGroup.value = ''
    return
  }
  // ищем точное совпадение в справочнике (регистронезависимо)
  const found = $constants.groups.find(
    (x: string) => x.trim().toLowerCase() === g.toLowerCase()
  )
  selectedGroup.value = found || g // если в справочнике нет — подставим как пришло
}

// 1) сразу при монтировании
onMounted(syncGroup)
// 2) при каждом открытии/изменении данных модалки
watch(() => modalData.value?.group, syncGroup, { immediate: true })
// 3) при закрытии формы сбрасываем, чтобы не «залипало»
watch(isVisible, (v) => { if (!v) selectedGroup.value = '' })

watch(isVisible, async (v) => {
  if (import.meta.client) {
    const main = document.querySelector('[data-main]') || document.getElementById('__nuxt');
    if (v) {
      // блокируем фон и переводим фокус в диалог
      main?.setAttribute('inert', '');
      await nextTick();
      const dialog = dialogRef.value;
      const firstFocusable =
        dialog?.querySelector<HTMLElement>(
          '[autofocus], input, button, textarea, select, [tabindex]:not([tabindex="-1"])'
        ) || dialog;
      firstFocusable?.focus();
      document.documentElement.classList.add('modal-open');
    } else {
      // снимаем блокировку фона
      main?.removeAttribute('inert');
      document.documentElement.classList.remove('modal-open');
    }
  }
});

async function sendRequest() {
  if (lidInProcess) return;

  if (!requestPhone.value && !requestEmail.value) {
    lidStatus.value = 'Укажите, пожалуйста, как с вами связаться';
    setTimeout(() => (lidInProcess = false), 2500);
    return;
  }

  lidInProcess = true;
  lidStatus.value = 'Отправляем ваш запрос...';

  // UTM
  const urlParams = new URLSearchParams(window.location.search);
  const url = window.location.origin + window.location.pathname;
  const utm = {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_term: urlParams.get('utm_term') || '',
    utm_content: urlParams.get('utm_content') || '',
  };

  const lid = {
    landing: $constants.landing_name,
    phone: requestPhone.value.trim(),
    ...(requestName.value?.trim() && { name: requestName.value.trim() }),
    ...(requestEmail.value?.trim() && { email: requestEmail.value.trim() }),
    ...(selectedGroup.value && { group: selectedGroup.value }),
    ...(selectedCommunity.value && { communityRole: selectedCommunity.value }),
    ...(modalData.value.motive && { motive: modalData.value.motive }),
    ...(modalData.value.additional && { additional: modalData.value.additional }),
    ...(utm ? utm : {}),
    url,
  };

  try {
    const response = await fetch('https://et-web.ru/mailing/funscool-lid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lid),
    });

    if (response?.status === 200) {
      // цель успешной отправки
      if (import.meta.client) {
        const { $yaMetrika } = useNuxtApp() as any;
        if (typeof $yaMetrika === 'function') $yaMetrika('formSent');
        else $yaMetrika?.send?.('formSent', { title: modalData.value.title });
      }

      lidStatus.value = 'Заявка отправлена! Мы свяжемся с вами в ближайшее время!';
      setTimeout(() => {
        lidInProcess = false;
        closeModal();
      }, 3000);
    } else {
      lidStatus.value =
        'По техническим причинам не можем принять вашу заявку. Пожалуйста, свяжитесь с нами по телефону.';
      lidInProcess = false;
    }
  } catch (error) {
    console.debug('Failed fetch', error);
    lidStatus.value = 'Произошла ошибка. Пожалуйста, свяжитесь с нами по телефону.';
    lidInProcess = false;
  }
}
</script>

<style scoped lang="scss">
.lid-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: block;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lid-modal__dialog {
  width: 600px;
  max-width: 90%;
  background-color: #fff;
  padding: 50px;
  border-radius: 12px;
  position: relative;
  animation: modalShow 0.3s ease;
  transform: translateZ(0);
  -webkit-text-size-adjust: 100%;
}

@keyframes modalShow {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}

.lid-modal__close {
  position: absolute;
  top: 16px;
  right: 24px;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background-image: url('/img/close.svg');
  background-size: contain;
}

.lid-modal__title { margin-bottom: 12px; text-align: center; font-size: 26px; }
.lid-modal__text  { font-size: 17px; text-align: center; text-wrap: balance; font-weight: 500; margin-bottom: 40px; }

.lid-modal__controls {
  display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;
  input, select {
    padding: 14px 16px 14px 0;
    font-size: 16px;
    border: 0;
    border-bottom: 2px solid #000;
    border-radius: 0 !important;
    width: 100%;
    color: #333;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
}

.lid-modal__status { text-align: center; margin-bottom: 16px; }

.lid-modal__btn {
  display: block;
  margin: 40px auto 0;
  padding: 13px;
  border: 1px solid var(--theme-dark);
  background-color: var(--theme-dark);
  color: #ffffff;
  outline: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  -webkit-tap-highlight-color: transparent;
  &:hover:not(:disabled) { transform: scale(1.05); }
  &:disabled { opacity: 0.5; }
}

.modal-control__wrap {
  position: relative;
  label {
    font-size: 16px; font-weight: 500; line-height: 1em;
    position: absolute; top: 50%; transform: translateY(-50%);
    transition: 0.25s; color: rgba(14, 18, 20, 1); pointer-events: none;
    span { color: #d63384; }
  }
  .modal-input {
    display: block; width: 100%;
    &:focus + label, &:not(:placeholder-shown) + label { font-size: 13px; top: 0; }
  }
}

.lid-modal__link { margin-top: 32px; font-size: 14px; text-align: center; }

@media (max-width: 768px) {
  .lid-modal__dialog { padding: 24px; width: 100%; max-width: 100%; }
  .lid-modal__title { font-size: 20px; }
  .lid-modal__text  { font-size: 16px; }
  .lid-modal__btn   { font-size: 16px; padding: 12px; }
}
</style>
