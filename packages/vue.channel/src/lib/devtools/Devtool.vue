<template>
  <div class="vue-channel-devtool">
    <div>PLEASE DONT USE CHANNELX IN THE MAIN COMPONENT</div>
    <hr />
    <div class="queues-container">
      <!-- <h3>publishers</h3> -->
      <div class="tabs">
        <div>
          <span>Components</span>
          <span> </span>
          <span>Channels</span>
        </div>
        <div>
          <span @click="currentTab = 'publishers'">PUBLISHERS</span>
          <span> | </span>
          <span @click="currentTab = 'consumers'">CONSUMERS</span>
        </div>
        <div class="publishers" v-if="currentTab === 'publishers'">
          <Queues :queues="group.publishers.components" />
        </div>
        <div class="consumers" v-if="currentTab === 'consumers'">
          <Queues :queues="group.consumers.components" />
        </div>
      </div>
      <div class="content">
        <div v-for="(item, index) in queues.state" :key="index">
          <div @click="show(item)" v-if="!item.isComponent">
            <span v-if="item.isRef">
              {{ item.key }} : <input v-model="item.ref[item.key]" /> ( REF )
            </span>
            <span v-else>{{ item.key }} : {{ item.value }}</span>
          </div>
        </div>

        <div class="channel-info">
          <!-- {{ channelInfo }} -->
        </div>
        <!-- <span v-for="(item, index) in content?.channels" :key="index">
          <span  class="channel-name">{{
            item
          }}</span>
        </span> -->
      </div>

      <!-- <h3>consumers</h3> -->
    </div>
  </div>
  <!-- <div>publishers{{ group.publishers }}</div> -->
</template>

<script lang="ts">
import { Channel } from '@channelx/vue-channel';
import { filter, map, tap } from 'rxjs/operators';
import { reactive, ref } from 'vue';
import Queues from './components/Queues.vue';
import { groupByComponentsAndChannels } from './internal';
import { mapMetaData } from './mappers';
</script>

<script lang="ts" setup>
const group = reactive({
  consumers: {
    components: {},
    name: '',
  },
  publishers: {
    components: {},
    name: '',
  },
});

const { msg: queues } = Channel.innerUse('devtool.info').pipe(
  map((x: any) => ({ state: mapMetaData(x.setupState), instance: x })),
  tap((x) => console.log('dataaaa', x))
).consumer;

const channelInfo = reactive({ channel: '' });
Channel.innerUse('devtool.channels').consume((x) => {
  channelInfo.channel = x;
});

const currentTab = ref('publishers');

const show = (item) => {
  console.log('Channel.settings', Channel.settings);
};
Channel.innerUse('devtool')
  .pipe(filter((item: any) => item.info))
  .consume((q) => {
    setTimeout(() => groupByComponentsAndChannels(q.info, group, q.name), 0);
  });
</script>

<style scoped>
.vue-channel-devtool {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 400px;
  overflow-x: scroll;
  background: #121813;
  color: aliceblue;
  box-shadow: -6px -5px 4px 0px grey;
}

.queues-container {
  display: flex;
}

.channel-info {
}
.tabs {
  position: relative;
}
</style>
