<template></template>
<script lang="ts">
import { createMachine } from 'xstate';

// This machine is completely decoupled from Vue

export const toggleMachine = createMachine({
  id: 'Devtool',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        toggle: {
          target: 'active',
        },
      },
    },
    active: {
      initial: 'channelsTab',
      states: {
        channelsTab: {
          initial: 'loading',
          states: {
            loading: {},
          },
          on: {
            componentsTabClicked: {
              target: 'componentsTab',
            },
            messagesBrokerTabClicked: {
              target: 'messagesBrokerTab',
            },
          },
        },
        componentsTab: {
          initial: 'loading',
          states: {
            loading: {},
          },
          on: {
            ChannelsTabClicked: {
              target: 'channelsTab',
            },
          },
        },
        messagesBrokerTab: {
          initial: 'loading',
          states: {
            loading: {},
          },
          on: {
            channelsTabClicked: {
              target: 'channelsTab',
            },
            componentsTabClicked: {
              target: 'componentsTab',
            },
          },
        },
      },
      on: {
        toogle: {
          target: 'inactive',
        },
      },
    },
  },
});
</script>
