<template>
  <component :is="tag" ref="rootEl">
    <slot name="placeholder" v-if="!mounted || !isVisible" />
    <ClientOnly>
      <component v-if="AsyncComp" :is="AsyncComp" />
    </ClientOnly>
  </component>
  
</template>

<script setup lang="ts">
type Loader = () => Promise<any>

const props = withDefaults(defineProps<{
  loader: Loader
  tag?: string
  rootMargin?: string
  threshold?: number | number[]
  eager?: boolean
}>(), {
  tag: 'div',
  rootMargin: '200px 0px',
  threshold: 0.1,
  eager: false,
})

const rootEl: Ref<HTMLElement | null> = ref(null)
const isVisible = ref(false)
const mounted = ref(false)
const AsyncComp = shallowRef<any | null>(null)
let io: IntersectionObserver | null = null

const startLoading = () => {
  if (AsyncComp.value) return
  // Create async component on-demand so chunk is fetched only when needed
  AsyncComp.value = defineAsyncComponent({
    loader: props.loader,
    suspensible: false,
    // Optional small delay to yield to main thread
    delay: 0,
    // Retry logic for transient chunk/network issues
    onError(error, retry, fail, attempts) {
      const isChunkError = /Loading chunk|fetch|timeout/i.test(String(error))
      if (isChunkError && attempts <= 3) {
        setTimeout(() => retry(), 500 * attempts)
      } else {
        fail(error)
      }
    },
  })
}

onMounted(() => {
  mounted.value = true
  if (props.eager) {
    isVisible.value = true
    startLoading()
    return
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback if IO unsupported
    isVisible.value = true
    startLoading()
    return
  }

  io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        isVisible.value = true
        startLoading()
        if (rootEl.value) io?.unobserve(rootEl.value)
        io?.disconnect()
        io = null
        break
      }
    }
  }, { rootMargin: props.rootMargin, threshold: props.threshold as any })

  if (rootEl.value) io.observe(rootEl.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})
</script>

<style scoped>
/* No visual styles; acts as behavior wrapper */
</style>
