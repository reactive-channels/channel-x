<template>
  <div class="tabs__content">
    <KeepAlive>
      <component
        @component-info="onComponentInfo"
        :content="content"
        :is="scope"
      >
      </component>
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

const onComponentInfo = (info) => {
  const devtools = props.content;
  const component = devtools.components[info.uid];
  console.log("component", info);
};
</script>
<style scoped>
.tabs__content {
  height: 100%;
  overflow: scroll;
}
</style>
