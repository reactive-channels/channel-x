export function createReactiveQueues(target, handler
// isReadonly: boolean,
// proxyMap: WeakMap<Target, any>
) {
    const proxy = new Proxy(target, handler);
    //  proxyMap.set(target, proxy)
    return proxy;
}
//# sourceMappingURL=createReactiveQueues.js.map