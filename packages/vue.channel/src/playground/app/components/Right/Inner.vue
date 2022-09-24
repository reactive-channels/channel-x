<template>
  <div>
    inner
    <button @click="send()">Emit</button>
  </div>
</template>

<script lang="ts" setup>
import { Channel } from '@channelx/vue-channel';
const data = '1';
const send = () => {
  // emitter.publish('emitted');
  //   Channel.use('emitter').publish('emit');
  Channel.emit('hey');
};
</script>
