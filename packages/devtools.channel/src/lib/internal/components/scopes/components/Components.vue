<template>
  <Tabs :items="tabs" />
</template>
<script lang="ts" setup>
import Tabs from "../../tabs/Tabs.vue";
const tabs = [
  { type: "PUBLISHERS", content: { name: "1" } },
  { type: "CONSUMERS", content: { name: "2" } },
];
</script>
