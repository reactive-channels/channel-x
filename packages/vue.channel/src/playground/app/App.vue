<template>
  <div>
    <Devtool />
    <div class="app">
      <router-link :to="'/'">Home</router-link>
      <router-link :to="'/Page'">page</router-link>

      <router-view></router-view>
      <!-- <Home /> -->
      <HelloWorld />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Devtool from '../../lib/devtools/Devtool.vue';
</script>

<style></style>
