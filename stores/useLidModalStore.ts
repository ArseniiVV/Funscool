import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import type { reviewModalData } from '~/types';

type LidModalData = {
  title: string
  text: string
  buttonText: string
  group?: null | string
  community?: null | boolean | string
  additional?: null | string
  motive?: null | string
}

export const useModalStore = defineStore('lidModalStore', () => {
  const isLidModalVisible: Ref<boolean> = ref(false);
  const isReviewModalVisible: Ref<boolean> = ref(false);
  const reviewModalData: Ref<reviewModalData | null> = ref(null);

  const lidModalData: Ref<LidModalData> = ref({
    title: '',
    text: '',
    buttonText: '',
    motive: null,
    group: null,
    community: null,
    additional: null
  })

  // Куда вернуть фокус после закрытия
  let lastFocusedEl: HTMLElement | null = null

  const clearLidModalData = () => {
    lidModalData.value = {
      title: '',
      text: '',
      buttonText: '',
      motive: null,
      group: null,
      community: null,
      additional: null
    }
  }

  const closeLidModal = () => {
    isLidModalVisible.value = false

    if (import.meta.client) {
      const main = document.querySelector('[data-main]') || document.getElementById('__nuxt')
      // снимаем блокировку фона
      main?.removeAttribute('inert')
      // возвращаем фокус
      lastFocusedEl?.focus()
      lastFocusedEl = null
      // разблокируем скролл
      document.documentElement.classList.remove('modal-open')
    }
  }

  const openLidModal = (data: LidModalData) => {
    clearLidModalData()
    Object.assign(lidModalData.value, data)
    isLidModalVisible.value = true

    // Метрика
    if (import.meta.client) {
      try {
        const { $yaMetrika } = useNuxtApp() as any
        if (typeof $yaMetrika === 'function') {
          $yaMetrika('formOpen')
        } else if ($yaMetrika && typeof $yaMetrika.send === 'function') {
          $yaMetrika.send('formOpen', { title: data.title })
        }
      } catch (e) {
        console.warn('[Metrika] send failed', e)
      }
    }

    // Фокус и inert настроим после монтирования модалки
    if (import.meta.client) {
      lastFocusedEl = document.activeElement as HTMLElement
      nextTick(() => {
        const modal = document.getElementById('groupModal')
        const main = document.querySelector('[data-main]') || document.getElementById('__nuxt')

        // фоновый контент делаем инертным
        main?.setAttribute('inert', '')

        // перенос фокуса внутрь модалки
        const focusable =
          modal?.querySelector<HTMLElement>(
            '[autofocus], input, button, textarea, select, [tabindex]:not([tabindex="-1"])'
          ) || modal
        focusable?.focus()

        // запрещаем прокрутку
        document.documentElement.classList.add('modal-open')
      })
    }
  }

  return {
    isLidModalVisible,
    isReviewModalVisible,
    lidModalData,
    reviewModalData,
    clearLidModalData,
    openLidModal,
    closeLidModal
  }
})