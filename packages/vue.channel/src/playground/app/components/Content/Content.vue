<template>
  <div>
    <input @input="change" />
    <button @click="save">save</button>
  </div>
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/vue-channel";

let data = "";
const save = () => {
  Channel.use("new").publish(data);
  Channel.use("payment").publish(data);
};
const change = (item: any) => {
  data = item.target.value;
};
</script>
