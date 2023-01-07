<template>
  <!-- <span v-for="(item, key, index) in channelsOptions" :key="key">
    <span @click="showItem(item)" class="scope__boxes">
      <span>{{ key }}</span>
    </span>
  </span> -->
  <Tabs :items="tabs" />
</template>
<script lang="ts" setup>
import { Channel } from "@channel-x/core-channel";
import { PropType, reactive } from "vue";
import { capitalize } from "../../../utils/helpers";
import Tabs from "../../tabs/Tabs.vue";
const props = defineProps({
  content: {
    type: Object as PropType<any>,
    required: true,
  },
});
const tabsObj: any = { consumers: {}, publishers: {} };
const tabs: any = reactive([]);
// watchEffect(() => {
//   const channelList = props.content["channels"];
//   console.log("channelList", channelList);
//   console.log("queues", Channel.getQueues());
//   channels.value = { ...channels.value, ...channelList };
// });

const allQueues = Channel.getQueues();
Object.keys(allQueues).forEach((queue) => {
  const channels = allQueues[queue].devtools.channels;
  Object.keys(channels).forEach((key) => {
    const type: any = key;
    tabsObj[type][queue] = tabsObj[type][queue] || {};
    tabsObj[type][queue] = { queue, content: channels[key] };
  });
});
Object.keys(tabsObj).forEach((tab: any) => {
  tabs.push({ type: capitalize(tab), content: tabsObj[tab] });
});

const showItem = (item: any) => {
  console.log("item", item);
};
</script>
