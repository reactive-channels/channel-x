<template>
  <div class="home">
    <Left></Left>
    <Right />
  </div>

  <!-- <div class="home-wrap">
    <div class="home-title">
      {{ $t('title') }}
    </div>
    <div class="home-name">
      {{ $t('name') }}
    </div>
    <AppLogo />
    <div v-html="$t('generated')" />
    <transition name="hide">
      <Cookies v-if="!cookiesAccepted" />
    </transition>
  </div> -->
</template>

<script lang="ts" setup>
import { Channel } from "@channel-x/vue-channel";
import Left from "../components/Left/Left.vue";
import Right from "../components/Right/Right.vue";
import { useStore } from "../store";
const { cookiesAccepted } = useStore();
Channel.use("data").publish("hello");
Channel.use("items").publish("item1");
</script>

<style>
.home {
  display: flex;
  justify-content: space-between;
}
.item {
  border: 1px solid black;
  width: 200px;
  padding: 20px;
}
</style>
