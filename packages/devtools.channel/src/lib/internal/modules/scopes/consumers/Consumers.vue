<template>
  <div v-for="item in content">{{ item }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: Array,
    required: true,
  },
});
</script>
