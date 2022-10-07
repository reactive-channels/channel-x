<template>
  <div class="devtools-container">
    <Tabs />
  </div>
</template>
<script lang="ts" setup>
import Tabs from "./internal/components/tabs/Tabs.vue";
</script>

<style scoped>
.devtools-container {
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
}
</style>
