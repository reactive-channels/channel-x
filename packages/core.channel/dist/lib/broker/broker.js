import { coreHandler } from './coreHandler';
export const channelx = Symbol('channelx');
export function createBroker(context) {
    return setup(context);
}
function setup(context) {
    context[channelx] = {
        queues: createReactiveQueues({}, coreHandler),
        emitters: createReactiveQueues({}, coreHandler),
        innerQueues: {},
        exchanges: [],
    };
    return context[channelx];
}
function createReactiveQueues(target, handler
// isReadonly: boolean,
// proxyMap: WeakMap<Target, any>
) {
    const proxy = new Proxy(target, handler);
    //  proxyMap.set(target, proxy)
    return proxy;
}
//# sourceMappingURL=broker.js.map