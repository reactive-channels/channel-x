<template>
  <div></div>
  <div>
    <div class="right">{{ msg }}</div>
    <div>{{ queueName }}</div>
    <div class="c2"></div>
    <Inner />
  </div>
</template>

<script lang="ts" setup>
import { Channel } from '@channelx/vue-channel';
import { ref } from 'vue';

const queueName = 'data';
const msg = ref('msg');
const d = ref('ddd');
const right = true;
Channel.use('data').consume((data) => {
  msg.value = data;
});

Channel.use('newChannel').publish('sup');
// const emitter: any = Channel.emitter;
</script>

<style>
.right {
  border: 1px solid black;
  width: 50px;
  height: 50px;
  background: forestgreen;
  margin-top: 10px;
}
</style>
