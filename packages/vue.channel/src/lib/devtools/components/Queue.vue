<template>
  <div>
    <div
      class="consumer-item"
      @mouseleave="mouseleaveComponent(content?.component)"
      @mouseover="showComponent(content?.component)"
      @click="showInfo(content?.component)"
    >
      {{ content?.component.componentName }}
      <!-- [{{ content?.queueName }}] -->
      <!-- <div v-for="(item, key) in content?.instance.setupState" :key="key">
      <div v-if="item.__hmrId">{{ key }} Component</div>
    </div> -->
    </div>
    <!-- {{ content?.component.instance?.subTree.type }} -->
    <div>
      <!-- <span v-for="(item, index) in content?.channels" :key="index">
        <span @click="showChannel(item)" class="channel-name">{{ item }}</span>
      </span> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/vue-channel";
const props = defineProps({
  content: { type: Object, require: true },
});
const showComponent = (item: any) => {
  //const CSSStyleDeclaration = item.el.style;
  // item.oldStyle = CSSStyleDeclaration;
  //item.el.style.setProperty('background-color', 'red', 'important');
  //item.el.style.setProperty('background-color', 'red', 'important');
  // const org_html = item.el.innerHTML;
  // const new_html = "<div class='overlay'>" + org_html + '</div>';
  // item.el.innerHTML = new_html;
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
// const showChannel = (channel) => {
//   Channel.innerUse('devtool.channels').publish({
//     channelName: channel,
//   });
// };

const showInfo = (info) => {
  Channel.innerUse("devtool.info").publish(info.instance);
  //console.log('info', info.instance.setupState);
};
</script>

<style>
.overlay {
  background: #8a2be22e !important;
}

.overlay::before {
  content: attr(data-component-info);
  position: absolute;
  background: white;
  display: flex;
  color: blueviolet;
  padding: 5px;
  box-shadow: 1px 2px 1px grey;
  text-align: left;
  width: 100%;
  top: 0;
  left: 0;
  border: 1px solid blueviolet;
}
</style>
<style scoped>
.consumer-item {
  cursor: pointer;
  background: blueviolet;
  color: whitesmoke;
  box-shadow: 2px 1px 1px rgb(113, 108, 108);
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}

.channel-name {
  cursor: pointer;
  color: white;
  text-decoration: underline;
  margin-left: 4px;
  padding-left: 1px;
}
</style>
