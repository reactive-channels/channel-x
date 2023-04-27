<template>
  <div>
    <div class="app">
      <Menu />
      <Content />
      <!-- <Content /> -->
      <Menu />
      <Content />
      <Left />
      <!-- <Content /> -->
    </div>
    <Devtool />
  </div>
</template>

<script lang="ts" setup>
// import Devtool from "../../lib/devtools/Devtool.vue";
import Devtool from "@channel-x/devtools/src/lib/Devtool.vue";
import Content from "./components/Content/Content.vue";
import Left from "./components/Left/Left.vue";
import Menu from "./components/Menu/Menu.vue";
</script>

<style scoped></style>
