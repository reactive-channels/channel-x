<template>
  <!-- <consumer @data="dataHandler" :queue="queueName" #="{ qData }">
    <dummy>
      {{ qData }}
    </dummy>
  </consumer> -->
  <Setup />
  {{ val }}
  <button @click="saveData()">saveData</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Setup from './Setup.vue';
// import { Channel } from '../channelx/Channel';

export default defineComponent({
  components: { Setup },
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    dataHandler(d: any) {
      // console.log('data', d);
      // this.content = d;
    },
    saveData() {
      // dataService.push(this.queueName, 'hello');
      // console.log(Channel.getQueues());
      // Channel.use('data').publish('hello');
    },
  },
  watch: {
    q(newVal: any) {
      // console.log('msg', newVal);
    },
  },
  data() {
    return {
      val: 1,
      queueName: 'data',
      content: '',
      // q: Channel.use('data'),
    };
  },
  consumers: {
    // data(x:any) {
    //   console.log('x', this);
    // },
  },
  created() {
    // this.q
    //   .pipe(
    //     filter((x: any) => x > 2),
    //     tap((x: any) => console.log(x))
    //   )
    //   .consume((x: any) => {
    //     this.val = x;
    //   });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
