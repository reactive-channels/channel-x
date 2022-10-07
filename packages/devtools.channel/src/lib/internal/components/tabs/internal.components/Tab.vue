<template>
  <div class="tabs__content">
    <component :is="scope"> </component>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import scopes from "../../scopes";
const currentScope: any = scopes;
const scope = computed(() => currentScope[props.type]);
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.tabs__content {
  flex: 1;
}
</style>
