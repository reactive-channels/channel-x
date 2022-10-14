<template>
  <div>Menu Page</div>
  {{ msg }}
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/vue-channel";
const { msg } = Channel.use("new").consumer;
const d = Channel.use("new2").consumer;
Channel.use("new3").publish("new3");
</script>
