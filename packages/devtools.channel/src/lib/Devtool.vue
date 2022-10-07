<template>
  <div class="devtools-container">
    <Tabs :items="tabs" />
  </div>
</template>
<script lang="ts" setup>
import Tabs from "./internal/components/tabs/Tabs.vue";
const tabs = [
  { title: "Channels", content: { name: "1" } },
  { title: "Messages", content: { name: "2" } },
  { title: "Settings", content: { name: "3" } },
];
</script>

<style scoped>
.devtools-container {
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
}
</style>
