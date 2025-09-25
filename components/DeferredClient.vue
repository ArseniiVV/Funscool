<template>
  <div ref="root" :style="placeholderStyle">
    <ClientOnly>
      <component :is="resolved" v-if="resolved" />
      <slot v-else name="placeholder">
        <!-- скелет/заглушка, чтобы не было CLS -->
        <div :style="placeholderStyle" aria-hidden="true"></div>
      </slot>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, shallowRef, ref, computed } from 'vue'

type When = 'immediate' | 'visible' | 'idle'

const props = defineProps<{
  loader: () => Promise<any>
  when?: When
  placeholderHeight?: number | string // например 400 или '40vh'
}>()

const resolved = shallowRef<any>(null)
const root = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null
let canceled = false

const placeholderStyle = computed(() => ({
  minHeight: props.placeholderHeight !== undefined
    ? (typeof props.placeholderHeight === 'number'
      ? `${props.placeholderHeight}px`
      : props.placeholderHeight)
    : '0px',
}))

async function loadNow() {
  if (resolved.value || canceled) return
  const mod = await props.loader()
  resolved.value = mod.default || mod
}

onMounted(() => {
  const when: When = props.when ?? 'immediate'

  if (when === 'immediate') {
    loadNow()
    return
  }

  if (when === 'idle' && 'requestIdleCallback' in window) {
    ; (window as any).requestIdleCallback(() => loadNow())
    return
  }

  // when === 'visible' (или fallback)
  io = new IntersectionObserver((entries) => {
    const e = entries[0]
    if (e?.isIntersecting) {
      io?.disconnect()
      io = null
      loadNow()
    }
  }, { rootMargin: '100px' }) // чуть заранее

  if (root.value) io.observe(root.value)
})

onBeforeUnmount(() => {
  canceled = true
  io?.disconnect()
  io = null
})
</script>
