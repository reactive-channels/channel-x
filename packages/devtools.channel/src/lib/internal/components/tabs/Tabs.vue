<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        v-for="(tab, index) in items"
        :key="index"
        class="tabs__header__tab"
        :class="{ 'tabs__header__tab--active': index === activeTab }"
        @click="activeTab = index"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="tabs__content">
      {{ items[activeTab].content }}
    </div>
  </div>
</template>
<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tabs__header {
  display: flex;
  flex-direction: row;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}
.tabs__header__tab {
  padding: 10px;
  cursor: pointer;
}
.tabs__header__tab--active {
  background-color: #ccc;
}
.tabs__content {
  flex: 1;
  padding: 10px;
}
</style>
<script lang="ts" setup>
import { PropType, ref } from "vue";
const activeTab = ref(0);
const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
</script>
