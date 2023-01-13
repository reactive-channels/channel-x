<template>http</template>

<script lang="ts" setup>
import { defineProps, onMounted } from "vue";
const props = defineProps({
  content: {
    type: Array<any>,
    required: true,
  },
});

onMounted(() => {
  console.log("props", props);
});
</script>
