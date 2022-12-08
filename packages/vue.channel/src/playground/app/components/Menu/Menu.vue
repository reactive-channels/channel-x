<template>
  <div>Menu Page</div>
  {{ msg }}
  <button @click="saveData">save</button>
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/vue-channel";
const data = "new data";
//const msg: any = ref("");
const { msg } = Channel.use("new").consumer;
// Channel.use("new").consume((x) => {
//   msg.value = x;
//   x.onSuccess(x);
// });
const { msg: msg2 } = Channel.use("new2").consumer;
Channel.use("new3").publish("new3");
Channel.use("new4").publish("new4");

const saveData = () => {
  console.log("msg", msg);
  msg.value.onSuccess(msg.value.msg);
};
</script>
