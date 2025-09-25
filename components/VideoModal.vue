<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-btn" @click="close">×</button>
      <video :src="videoSrc" controls autoplay style="width: 100%; max-height: 80vh"></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVideoModal } from '@/composables/useVideoModal';

const { isVisible, videoSrc, close } = useVideoModal();
</script>

<style scoped>
.modal-content video {
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: 80vh;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  /* top: -20px; */
  right: 20px;
  font-size: 52px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
