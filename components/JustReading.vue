<template>
  <section id="just-reading">
    <div class="container">
      <div class="just-reading">
        <div class="just-reading__images">
          <img
            ref="leftImage"
            class="jr-image image-left"
            :src="leftSrc"
            alt="Mary opens door"
            loading="lazy"
          />
          <img
            ref="rightImage"
            class="jr-image image-right"
            :src="rightSrc"
            alt="Child opens door"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
  
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  leftSrc?: string
  rightSrc?: string
}>()

const leftImage: Ref<HTMLImageElement | null> = ref(null)
const rightImage: Ref<HTMLImageElement | null> = ref(null)

const leftSrc = computed(() => props.leftSrc ?? '/img/persons/Mary_openDoor.webp')
const rightSrc = computed(() => props.rightSrc ?? '/img/persons/Child_openDoor.webp')

onMounted(() => {
  gsap.to([leftImage.value, rightImage.value], {
    scrollTrigger: {
      trigger: '#just-reading',
      start: 'top 80%',
      once: true,
    } as any,
    delay: 0.5,
    duration: 1.1,
    x: 0,
    ease: 'power3.out',
    stagger: 0,
  })
})
</script>

<style lang="scss" scoped>
#just-reading {
  position: relative;
  overflow: hidden;
  padding: 40px 0;

  .container {
    padding: 0 20px;

    @media (min-width: 1480px) {
      max-width: 1440px;
      padding: 0;
      margin: 0 auto;
    }
  }
}

.just-reading {
  &__images {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 20vw 1fr; /* center gap = 20% viewport */
    align-items: flex-end;
    column-gap: 0;
    min-height: 200px;
    pointer-events: none;

    .jr-image {
      display: block;
      height: auto;
      max-width: 100%;
      object-fit: contain;
      will-change: transform;
      transform: translateX(0);

      &.image-left {
        grid-column: 1;
        justify-self: end;
        transform: translateX(-200%);
      }

      &.image-right {
        grid-column: 3;
        justify-self: start;
        transform: translateX(200%);
      }
    }

    .image-left {
      width: clamp(80px, 18vw, 220px);
    }

    .image-right {
      width: clamp(80px, 18vw, 220px);
    }
  }
}

@media (max-width: 768px) {
  #just-reading {
    padding: 24px 0;
  }

  .just-reading__images {
    min-height: 100px;
    gap: 12px;

    .image-left {
      width: clamp(60px, 50vw, 320px);
    }

    .image-right {
      width: clamp(60px, 50vw, 320px);
    }
  }
}
</style>
