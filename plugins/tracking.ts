import { persistTrackingParams } from '~/composables/useTrackingParams';
import type { Router } from 'vue-router';

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return;

  const track = () => {
    try {
      persistTrackingParams(window.location.search);
    } catch (error) {
      console.warn('[tracking] Unable to persist params', error);
    }
  };

  track();

  const router = nuxtApp.$router as Router | undefined;
  router?.afterEach(() => {
    track();
  });
});
