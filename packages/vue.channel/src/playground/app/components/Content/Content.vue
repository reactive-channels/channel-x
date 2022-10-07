<template>
  <div>
    <input @input="change" />
    <button @click="save">save</button>
  </div>
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/core-channel";

let data = "";
const save = () => {
  Channel.use("new").publish(data);
};
const change = (item: any) => {
  data = item.target.value;
};
</script>
