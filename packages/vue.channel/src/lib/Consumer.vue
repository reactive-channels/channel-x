<template>
  <slot :qData="val"> </slot>
</template>

<script lang="ts">
import { Channel } from "@channel-x/core-channel";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "ConsumerComponent",
  props: {
    msg: String,
    queue: String,
  },
  setup(props, context) {
    onMounted(() => {
      // console.log('context.slots', context.slots);
    });
  },
  data() {
    return {
      val: "",
      q: Channel.use(this.queue || ""),
    };
  },

  created() {
    this.q.consume((x: any) => {
      this.$emit("data", x);
      this.val = x;
    });
  },
  beforeUnmount() {
    this.q.close();
  },
});
</script>
