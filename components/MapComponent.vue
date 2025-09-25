<template>
  <div ref="mapComp" class="main-map">
    <div id="map" class="map-canvas" />
    <div v-if="isLoading && !isReady" class="map-loading">
      <span class="spinner" />
      <span>Загрузка карты…</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $constants, $loadYandexMaps } = useNuxtApp();
const mapComp: Ref<null | HTMLElement> = ref(null);
const isLoading = ref(false);
const isReady = ref(false);

let observer: IntersectionObserver;

const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(async (entry) => {
    if (!entry.isIntersecting) return;
    try {
      isLoading.value = true;
      if ($loadYandexMaps) await $loadYandexMaps();
      await initYandexMap();
      isReady.value = true;
    } catch (e) {
      console.error('[Map] Ошибка инициализации карты:', e);
    } finally {
      isLoading.value = false;
      observer?.unobserve(entry.target);
    }
  });
};

onMounted(() => {
  const options = { threshold: 0.1 } as IntersectionObserverInit;
  observer = new IntersectionObserver(callback, options);

  if (mapComp.value) {
    observer.observe(mapComp.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

async function initYandexMap() {
  await ymaps3.ready;

  function init() {
    const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } = ymaps3;
    const points = $constants.map_points;

    const map = new YMap(document.getElementById('map'), {
      location: {
        center: $constants.map_center,
        zoom: 11,
      },
      camera: {
        tilt: 50 * (Math.PI / 180),
        azimuth: 30 * (Math.PI / 180),
        duration: 200,
        easing: 'ease-in-out',
      },
    });
    map.addChild(new YMapDefaultSchemeLayer());
    const defaultFeaturesLayer = new YMapDefaultFeaturesLayer();
    map.addChild(defaultFeaturesLayer);
    defaultFeaturesLayer.update({ zIndex: 1501 });

    for (const point of points) {
      const markerElement = document.createElement('div');
      markerElement.className = 'marker-class';
      markerElement.style.cssText = `
    width: 48px;
    height: 64px;
    background-image: url('/img/ui-elements/marker.svg');
    background-size: contain;
    background-repeat: repeat;
    position: relative;
    top: -64px;
    right: 24px;
  `;
      markerElement.innerHTML = '&nbsp;';

      const marker = new YMapMarker({ coordinates: point }, markerElement);
      map.addChild(marker);
    }
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    const handler = () => {
      if (document.readyState === 'complete') {
        document.removeEventListener('readystatechange', handler);
        init();
      }
    };
    document.addEventListener('readystatechange', handler);
  }
}
</script>

<style scoped lang="scss">
.main-map {
  position: relative;
  height: 400px;
  background-color: var(--ol);
}

.map-canvas {
  width: 100%;
  height: 100%;
}

.map-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6));
  color: #444;
  font-weight: 600;
  z-index: 2;
}

.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid #bbb;
  border-top-color: var(--theme);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

