import { Channel } from "../Channel";
// export const brokerQueue: BehaviorSubject<any> = new BehaviorSubject({
//   firstMesseage: 'hey',
// });
//export const brokerQueue: Subject<any> = new ReplaySubject(20);
export function notify(target, key, value, oldValue) {
    // brokerQueue.next({ target, key, value, oldValue });
    // Channel.innerUse('devtool', { inner: true }).publish({
    //   target,
    //   key,
    //   value,
    //   oldValue,
    // });
    Channel.innerUse("devtool").publish(value);
}
//# sourceMappingURL=notify.js.map