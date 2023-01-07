<template>
  <div class="components">
    <div class="components__zone">
      <div
        class="components__zone__item"
        :class="{ 'components__zone__item--active': item === activeItem }"
        v-for="(item, key, index) in components"
        :key="key"
        @click="showInfo(item)"
        @mouseleave="mouseleaveComponent(item.info)"
        @mouseover="showComponent(item.info)"
      >
        <div>
          <!-- <span>&lt</span> -->
          {{ item.info.componentName }}
          <!-- <span>/></span> -->
          <sup class="components__zone__item_sup"> {{ item.uid }}</sup>
        </div>
      </div>
    </div>
    <div class="components__info">
      <Tabs :items="items"> </Tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, watchEffect } from "vue";
import { capitalize } from "../../../utils/helpers";
import Tabs from "../../tabs/Tabs.vue";
const components: any = ref({});
const activeItem: any = ref({});
const items: any = ref([{}]);
const props = defineProps({
  content: {
    type: Object as PropType<any>,
    required: true,
  },
});
const emit = defineEmits<{
  (eventName: "component-info", info: any): void;
}>();

watchEffect(() => {
  const componentsList = props.content["components"];

  components.value = { ...components.value, ...componentsList };
});
const showInfo = (item: any) => {
  const info = item.info.instance.channelx;
  items.value = Object.keys(info).map((key, index) => ({
    type: capitalize(key),
    content: info[key],
  }));
  items.value.push({ type: "Diagrams", content: info });
  activeItem.value = item;
  emit("component-info", item);
};
const showComponent = (item: any) => {
  //const CSSStyleDeclaration = item.el.style;
  // item.oldStyle = CSSStyleDeclaration;
  //item.el.style.setProperty('background-color', 'red', 'important');
  //item.el.style.setProperty('background-color', 'red', 'important');
  // const org_html = item.el.innerHTML;
  // const new_html = "<div class='overlay'>" + org_html + '</div>';
  // item.el.innerHTML = new_html;
  if (!item) return;
  item.el.classList.add("overlay");
  const rect = item.el.getBoundingClientRect();
  item.el.setAttribute(
    "data-component-info",
    item.componentName.toUpperCase() +
      " ( " +
      (rect.width % 1 ? rect.width.toFixed(2) : rect.width) +
      " X " +
      (rect.height % 1 ? rect.height.toFixed(2) : rect.height) +
      " ) "
  );
  // item.el.insertBefore
};
const mouseleaveComponent = (item: any) => {
  //item.el.style = item.oldStyle;
  item.el.classList.remove("overlay");
  item.el.removeAttribute("data-component-info");
};
</script>
<style scoped>
.components {
  display: flex;
  /* flex-direction: column;
  height: 100%; */
  /* overflow: auto; */
  /* flex-wrap: wrap; */
  flex: 1;
  height: 100%;
}
.components__info {
  flex: 2;
  background: #8b6a88;
}
.components__zone {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  overflow: auto;
  height: 100%;
  place-content: flex-start;
}
.components__zone__item {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px;
  text-transform: uppercase;
  height: fit-content;
  cursor: pointer;
  border: 1px solid #8b6a88;
  color: #8b6a88;
}
.components__zone__item_sup {
  font-size: 10px;
}
.components__zone__item--active {
  background: #8b6a88;
  color: white;
}
</style>
