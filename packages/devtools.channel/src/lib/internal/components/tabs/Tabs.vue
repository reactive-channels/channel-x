<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tabs__header__tab"
        :class="{ 'tabs__header__tab--active': index === activeTab }"
        @click="activeTab = index"
      >
        {{ tab }}
      </div>
    </div>
    <div class="tabs__content">
      {{ tabs[activeTab] }}
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
import { ref } from "vue";
const tabs = ["Events", "State", "Actions"];
const activeTab = ref(0);
</script>
