<template>
  <div class="tabs__header">
    <div
      v-for="(tab, index) in items"
      :key="index"
      class="tabs__header__tab"
      :class="{ 'tabs__header__tab--active': index === activeTab }"
      @click="setActiveTab(index)"
    >
      {{ tab.toUpperCase() }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
const emit = defineEmits<{
  (eventName: "set-active-tab", activeTab: number): void;
}>();
const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    required: true,
  },
  activeTab: {
    type: Number as PropType<number>,
    required: true,
  },
});
const setActiveTab = (index: number) => {
  emit("set-active-tab", index);
};
</script>

<style>
.tabs__header {
  display: flex;
  flex-direction: row;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 1px 4px 0px grey;
}
.tabs__header__tab {
  padding: 10px;
  cursor: pointer;
}
.tabs__header__tab--active {
  background-color: #ccc;
}
</style>
