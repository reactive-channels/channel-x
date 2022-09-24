<template>
<div>Dummy</div>
<slot></slot>
</template>

<script lang="ts">

import vue, { defineComponent } from 'vue';

export default defineComponent({
  components: { },
  name: 'Dummy',
  props: {
    msg: String,
  },
  methods: {

  },
  data() {
    return {

    };
  },

});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
