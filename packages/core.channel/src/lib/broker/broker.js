"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBroker = exports.channelx = void 0;
const coreHandler_1 = require("./coreHandler");
exports.channelx = Symbol('channelx');
function createBroker(context) {
    return setup(context);
}
exports.createBroker = createBroker;
function setup(context) {
    context[exports.channelx] = {
        queues: createReactiveQueues({}, coreHandler_1.coreHandler),
        emitters: createReactiveQueues({}, coreHandler_1.coreHandler),
        innerQueues: {},
        exchanges: [],
    };
    return context[exports.channelx];
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