import { Subscription } from 'rxjs';
import { App } from 'vue';
import { Channel } from '../Channel';
import { setParentsHierarchy } from '../internal/getComponentInfo';
import { InfoType } from '../types/InfoType';
// import Dashboard from './Dashboard.vue';
import { setupDevtools } from './devtools';
import { getFunctionArguments, removeQuotes } from './utils';

export default {
  install(app: App<Element>, options = {}) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$channelx = Channel;
    // app.component('dashboard', Dashboard);
    let nextSubscription: Subscription | null;
    app.directive('channel', {
      mounted(el: Element, binding: any) {},
      created(el, binding, vnode, prevVnode) {
        el.addEventListener('input', (e: any) => {
          // console.log('binding', binding);
          // console.log('vnode', vnode);
          // console.log('prevVnode', prevVnode);
          if (binding.arg) {
            const mod = binding.modifiers;
            if (mod?.stash) {
              Channel.use(binding.arg).stash(el.value);
            } else if (mod?.publish) Channel.use(binding.arg).publish(el.value);
            else if (mod?.consume) {
              const { msg } = Channel.use(binding.arg).consumer;
              // console.log({ msg });
              // console.log('binding', binding);
              // console.log('vnode', vnode);
              // console.log('prevVnode', prevVnode);
            }
          } else {
            throw new Error('channel directive must have a arg');
          }
        });
      },
    });
    app.mixin({
      created() {
        const setupState = this._.setupState;
        if (setupState) {
          Object.keys(setupState).forEach((key) => {
            if (typeof setupState[key] === 'function') {
              var result = setupState[key].toString();
              result.match(/Channel.emit(.*?)\)/g)?.map((val) => {
                const msg = getFunctionArguments(val);
                // const __hmrId = this._.type.__hmrId;
                const name = setParentsHierarchy(this._)?.join('.');
                Channel.use(name).publish(msg);
                // setupState[key].bind(null);
              });

              result.match(/Channel.use(.*?)\publish/g)?.map(function (val) {
                // return val.replace(/<\/?b>/g,'');
                var use = /.*use\s+(.*)\s+publish.*/;
                let channelNames = val.match(/(?<=\().+?(?=\))/g);
                channelNames.forEach((channelName) => {
                  channelName = removeQuotes(channelName);
                  Channel.use(channelName).assign(InfoType.PUBLISHERS);
                });
              });
            }
          });
        }
      },
      beforeCreate() {
        const consumers = this.$options?.consumers;
        if (consumers) {
          Object.keys(consumers).forEach((key) => {
            const action = consumers[key];
            if (typeof action === 'function') {
              nextSubscription = this.$channelx
                .use(action.name)
                .context(this)
                .consume(action.bind(this));
            }
          });
        }
        // Object.keys(this).forEach((key) => {
        //   const vueComponent:any = this[key];
        //   if (vueComponent?.queueName) { console.log(`vueComponent ${key}`, vueComponent); }
        // });
      },
      onBeforeUnmount() {
        // eslint-disable-next-line no-unused-expressions
        nextSubscription?.unsubscribe();
        nextSubscription = null;
      },
    });

    setupDevtools(app);
  },
};
