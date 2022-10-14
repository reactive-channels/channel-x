<template>
  <div class="components">
    <div class="components__zone">
      <div
        class="components__zone__item"
        v-for="(item, key, index) in components"
        :key="key"
        @click="showInfo(item)"
      >
        <div>
          <!-- <span>&lt</span> -->
          {{ item.info.componentName }}
          <!-- <span>/></span> -->
          <sup class="components__zone__item_sup"> {{ item.uid }}</sup>
        </div>
      </div>
    </div>
    <div class="components__info"></div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, watchEffect } from "vue";
let components: any = ref({});
const props = defineProps({
  content: {
    type: Object as PropType<any>,
    required: true,
  },
});
const emit = defineEmits<{
  (eventName: "component-info", info: any): void;
}>();

watchEffect(() => {
  console.log("props.content", props.content);
  components.value = { ...components.value, ...props.content };
});
const showInfo = (item: any) => {
  emit("component-info", item);
};
const tabs = [
  { type: "PUBLISHERS", content: { name: "1" } },
  { type: "CONSUMERS", content: { name: "2" } },
];
</script>
<style scoped>
.components {
  display: flex;
  /* flex-direction: column;
  height: 100%; */
  /* overflow: auto; */
  /* flex-wrap: wrap; */
  flex: 1;
  height: 100%;
}
.components__info {
  flex: 1;
  background: #8b6a88;
  box-shadow: 0px 0px 1px black;
  z-index: -999999;
}
.components__zone {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  overflow: auto;
  height: 100%;
  place-content: flex-start;
}
.components__zone__item {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px;
  text-transform: uppercase;
  height: fit-content;
  cursor: pointer;
  border: 1px solid #8b6a88;
  color: #8b6a88;
}
.components__zone__item_sup {
  font-size: 10px;
}
</style>
