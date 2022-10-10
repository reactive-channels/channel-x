<template>
  <div v-for="(item, key, index) in refContent" :key="key">
    {{ item.componentName }}
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, watch } from "vue";
let components: any = ref({});
const props = defineProps({
  content: {
    type: Object as PropType<any>,
    required: true,
  },
});
const refContent = ref(props.content);
watch(
  refContent,
  (content, newVal) => {
    console.log("content", content, newVal);
    components.value = { ...components.value, ...content };
  },
  { immediate: true }
);
// const componentsList = computed(async () => {
//   components.value = { ...components.value, ...props.content };
//   console.log("components", components.value);
//   return components;
// });
const tabs = [
  { type: "PUBLISHERS", content: { name: "1" } },
  { type: "CONSUMERS", content: { name: "2" } },
];
</script>
