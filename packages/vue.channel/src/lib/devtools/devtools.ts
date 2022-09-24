import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { Channel } from '../Channel';

const stateType = 'Channels';
function getQueueName(payload: any) {
  //console.log('payload.componentInstance.proxy', payload?.componentInstance?.proxy);
  return payload?.componentInstance?.proxy?.queueName;
}

async function publishMessage(
  queue: string,
  message: any,
  api: any,
  payload: any
) {
  const bounds = await api.getComponentBounds(payload.componentInstance);
  Channel.use(queue).publish(message);
  api.on.getInspectorState((p: any) => {
    if (p.inspectorId === 'test-inspector') {
      // Your logic here
    }
    // console.log('p', p);
    const app = document.getElementById('app');
    const iDiv = document.createElement('div');
    iDiv.id = 'newDivId';
    iDiv.className = 'newDivClass';
    iDiv.style.background = 'red';
    iDiv.style.width = '2000px';
    iDiv.style.height = '2000px';
    if (app) {
      app.appendChild(iDiv);
    }
  });
}
export function setupDevtools(app: any) {
  setupDevtoolsPlugin(
    {
      app,
      id: 'org.channel.x',
      label: 'Channel X',
      settings: {
        test1: {
          label: 'I like vue devtools',
          type: 'boolean',
          defaultValue: true,
        },
        test2: {
          label: 'Quick choice',
          type: 'choice',
          defaultValue: 'a',
          options: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
            { value: 'c', label: 'C' },
          ],
          component: 'button-group',
        },
        test3: {
          label: 'Long choice',
          type: 'choice',
          defaultValue: 'a',
          options: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
            { value: 'c', label: 'C' },
            { value: 'd', label: 'D' },
            { value: 'e', label: 'E' },
          ],
        },
        test4: {
          label: 'What is your name?',
          type: 'text',
          defaultValue: '',
        },
      },
      packageName: 'channel-x-devtool',
      homepage: 'https://router.vuejs.org/',
      logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
      componentStateTypes: [stateType],
    },
    (api) => {
      api.on.visitComponentTree((payload) => {
        const node = payload.treeNode;
        // console.log('componentInstance', payload.componentInstance.proxy);
        if (node.name === 'App') {
          node.tags.push({
            label: 'root',
            textColor: 0x000000,
            backgroundColor: 0xff984f,
          });
        } else {
          node.tags.push({
            label: 'test',
            textColor: 0xffaaaa,
            backgroundColor: 0xffeeee,
            tooltip: "It's a test!",
          });
        }
      });

      const queueState = {
        type: 'queue',
      };
      api.on.inspectComponent(async (payload) => {
        if (payload.instanceData) {
          payload.instanceData.state.push({
            type: 'queue',
            key: getQueueName(payload),
            editable: true,
            value: '',
          });
          payload.instanceData.state.push({
            type: 'queue subscriptions',
            key: '',
            editable: true,
            value: '', // Channel.getQueues(),
          });
          payload.instanceData.state.push({
            type: stateType,
            key: 'PUBLISH 🕊️',
            editable: true,
            value: {
              _custom: {
                type: null,
                readOnly: false,
                display: '',
                tooltip: 'Elapsed time',
                value: 'ChannelX vale',
                actions: [
                  {
                    icon: 'queue_play_next',
                    tooltip: 'Publish',
                    action: () => publishMessage('data', 'msg', api, payload),
                  },
                ],
              },
            },
          });
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type === 'queue') {
          // payload.set()
        }
      });
    }
  );
}
