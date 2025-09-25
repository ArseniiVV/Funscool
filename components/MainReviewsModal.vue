<template>
  <div v-show="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="review-modal__body" role="dialog" aria-modal="true">
      <button class="modal__close" type="button" @click="closeModal" />
      <div class="review-modal__head">
        <div class="review-modal__head-img">
          <img :src="modalData?.logo" alt="Лого" loading="lazy" />
        </div>
        <div class="review-modal__head-title">
          {{ modalData?.title }}
        </div>
      </div>

      <div class="review-modal__text">
        <div class="review-modal__text-desc">
          {{ modalData?.text }}
        </div>

        <div class="review-modal__img">
          <img :src="modalData?.img" alt="Изображение отзыва" loading="lazy" />
        </div>
      </div>

      <button
        class="review-modal__cta the-button"
        type="button"
        @click="
          useModalStore().openLidModal({
            title: 'Заявка на обратный звонок',
            text: 'Оставьте заявку и мы свяжемся с вами в ближайшее время',
            buttonText: 'Отправить заявку',
            group: '',
            community: '',
            motive: modalData?.title && 'Отзыв: ' + modalData.title,
          })
        "
      >
        Оставить заявку
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const modalStore = useModalStore();
const isVisible = computed(() => modalStore.isReviewModalVisible);
const modalData = computed(() => modalStore.reviewModalData);
const closeModal = () => (modalStore.isReviewModalVisible = false);
</script>

<style scoped lang="scss">
/* Тело модалки без внутреннего скролла */
.review-modal__body {
  position: relative;
  padding: 50px 49px 40px 40px;
  margin: 0 16px;
  width: min(800px, 100%);
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden; /* скролл убран */
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 576px) {
    padding: 24px 20px;
    gap: 16px;
  }
}

/* Шапка */
.review-modal__head {
  display: flex;
  gap: 20px;
  align-items: center;
}

.review-modal__head-img {
  width: 70px;
  height: 70px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
}

.review-modal__head-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: 18px;
  }
}

/* Текст + картинка */
.review-modal__text {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 18px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
}

/* Картинка адаптивно вписывается в модалку:
   - по ширине 100%
   - по высоте не больше 60vh (минус отступы), чтобы модалка не вылезала
*/
.review-modal__img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    width: 100%;
    height: auto;
    max-height: min(60vh, 520px);
    object-fit: contain;
    border-radius: 12px;
  }
}

/* Кнопка CTA */
.review-modal__cta {
  align-self: center;
  margin-top: 8px;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 16px;
  color: white;
  border-radius: 12px;
  background-color: var(--yellow);
}

/* Кнопка закрытия (оставил как у тебя, только тип) */
.modal__close {
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
</style>
