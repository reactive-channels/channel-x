export function createReactiveQueues(
  target: unknown,
  handler: ProxyHandler<any>
  // isReadonly: boolean,
  // proxyMap: WeakMap<Target, any>
) {
  const proxy = new Proxy(target, handler);
  //  proxyMap.set(target, proxy)
  return proxy;
}
