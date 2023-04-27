<template>
  <div class="item">
    <!-- <input type="text" placeholder="send message" v-channel:data.stash /> -->
    <!-- <button @click="q.flushAndPublish()">Send</button> -->
    <!-- <button @click="send()">Send Object</button> -->
    <!-- <div>message:{{ q.consumer.msg }}</div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
  qData1: Object,
});
// let text = ref('');
// const { get } = builders;
let getData = ref('hey');
//let data = '';
// const { msg } = Channel.use('data').consumer;
// const send = () => {
//   dataChannel.publish({ name: 'd', obj: { name: 'dddd' } });
// };
//const dataChannel = Channel.use('data');
// dataChannel.transform(get, 'obj.name').consume((x) => {
//   console.log('get data1', x);
//   //getData.value = x;
//   data = x;
// });
// const model = (e: any) => {
//   text.value = e.target.value;
// };
// const send = () => {
//   q.flushAndPublish('data');
// };
// const { msg } = q.consumer;
</script>
