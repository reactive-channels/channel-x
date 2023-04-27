import { EmittersContainer } from '../types/EmittersContainer';
import { QueuesContainer } from '../types/QueuesContainer';
import { coreHandler } from './coreHandler';
export const channelx = Symbol('channelx');

export interface Broker {
  queues: QueuesContainer;
  innerQueues: QueuesContainer;
  exchanges: string[];
  emitters: EmittersContainer;
}

interface Context {
  [channelx]: ChannelX;
}

interface ChannelX {
  queues: QueuesContainer;
  emitters: EmittersContainer;
  innerQueues: QueuesContainer;
  exchanges: string[];
}

export function createBroker(context: Context | any): Broker {
  return setup(context);
}

function setup(context: Context): ChannelX {
  context[channelx] = {
    queues: createReactiveQueues({}, coreHandler),
    emitters: createReactiveQueues({}, coreHandler),
    innerQueues: {},
    exchanges: [],
  };
  return context[channelx];
}

function createReactiveQueues(
  target: any,
  handler: ProxyHandler<any>
  // isReadonly: boolean,
  // proxyMap: WeakMap<Target, any>
): QueuesContainer {
  const proxy = new Proxy(target, handler);
  //  proxyMap.set(target, proxy)
  return proxy;
}
