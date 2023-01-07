<template>
  <div class="left">{{ msg }}</div>
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/vue-channel";
const props = defineProps({
  qData1: Object,
});
const { msg } = Channel.use("data").consumer;
Channel.use("new3").consume((x) => {
  console.log("new3", x);
});
</script>

<style scoped>
.left {
  border: 1px solid black;
  width: 50px;
  height: 50px;
}
</style>
