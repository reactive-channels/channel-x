<template>
  <div>
    <input @input="change" />
    <button @click="save">save</button>
    <div>success: {{ success }}</div>
  </div>
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/vue-channel";
import { ref } from "vue";

let data = "";
const success = ref("");
const save = () => {
  Channel.use("new").publish({ msg: data, onSuccess: onsuccess });
  Channel.use("payment").publish(data);
};
const onsuccess = (data: any) => {
  console.log("success");
  success.value = data;
};
const change = (item: any) => {
  data = item.target.value;
};
</script>
