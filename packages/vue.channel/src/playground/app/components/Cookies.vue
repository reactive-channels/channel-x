<template>
  <div class="cookies" @click="hide">
    {{ $t('cookies') }}
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../store';
const store = useStore();

const hide = () => {
  store.setCookiesAccepted(true);
};
</script>

<style></style>
