<template>
  <div v-for="item in content">
    <div @click="showItem(item)" class="scope__boxes">
      {{ item?.queue || item }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: Array<any>,
    required: true,
  },
});
const showItem = (item: any) => {
  console.log("item", item);
};
</script>

<style scoped>
@import url("../scopes.css");
</style>
