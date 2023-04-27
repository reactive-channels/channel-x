<template>
  <div class="tabs">
    <TabsHeader
      :items="items.map((i) => i.type)"
      :active-tab="activeTab"
      @set-active-tab="setActiveTab"
    />
    <Tab :content="activeItem.content" :type="activeItem.type"></Tab>
  </div>
</template>
<script lang="ts" setup>
import { PropType, computed, ref } from "vue";
import { Tab, TabsHeader } from "./internal.components";
const activeTab = ref(0);
const setActiveTab = (index: number) => {
  activeTab.value = index;
};
const activeItem = computed(
  () => props.items?.[activeTab.value] || props.items[0]
);
const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

const componentsFactory = {
  run(type: any) {},
};
</script>
<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
