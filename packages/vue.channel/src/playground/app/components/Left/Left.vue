<template>
  <div class="left">{{ msg }}</div>
</template>
<script lang="ts" setup>
import { Channel } from '@channelx/vue-channel';
const props = defineProps({
  qData1: Object,
});
const { msg } = Channel.use('data').consumer;
</script>

<!--<style>
.left {
  border: 1px solid black;
  width: 50px;
  height: 50px;
}
</style>-->
