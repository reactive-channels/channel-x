<template>
  <div class="queues">
    <div v-for="(queueItem, key, index) in queues" :key="key">
      <Queue :content="queueItem"></Queue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Queue from './Queue.vue';
const props = defineProps({
  queues: { type: Object, require: true },
  name: { type: String, require: true },
});
</script>

<style scoped>
.queues {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
