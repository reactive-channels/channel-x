import { notify } from './notify';

function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: any,
    receiver: object
  ): boolean {
    const oldValue = (target as any)[key];
    if (oldValue !== value) {
      notify(target, key, value, oldValue);
    }
    const result = Reflect.set(target, key, value, receiver);

    return result;
  };
}
export const coreHandler = {
  get: function (target: any, prop: string, receiver: ProxyHandler<any>) {
    // if (prop === 'secret') {
    //   return `${target.secret.substr(0, 4)} ... shhhh!`;
    // }
    return target[prop];
    //return Reflect.get(target, prop, receiver);
  },
  set: createSetter(),
};
