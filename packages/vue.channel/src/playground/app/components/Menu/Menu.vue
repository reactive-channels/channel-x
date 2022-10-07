<template>
  <div>Menu Page</div>
  {{ msg }}
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/vue-channel";
const { msg } = Channel.use("new").consumer;
</script>
