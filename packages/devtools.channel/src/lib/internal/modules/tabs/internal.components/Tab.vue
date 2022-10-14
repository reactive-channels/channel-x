<template>
  <div class="tabs__content">
    <KeepAlive>
      <component :content="content" :is="scope"> </component>
    </KeepAlive>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import scopes from "../../scopes";
const currentScope: any = scopes;
const scope = computed(() => currentScope[props.type]);
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.tabs__content {
  height: 100%;
}
</style>
