"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = void 0;
const Channel_1 = require("../Channel");
// export const brokerQueue: BehaviorSubject<any> = new BehaviorSubject({
//   firstMesseage: 'hey',
// });
//export const brokerQueue: Subject<any> = new ReplaySubject(20);
function notify(target, key, value, oldValue) {
    // brokerQueue.next({ target, key, value, oldValue });
    // Channel.innerUse('devtool', { inner: true }).publish({
    //   target,
    //   key,
    //   value,
    //   oldValue,
    // });
    Channel_1.Channel.innerUse("devtool").publish(value);
}
exports.notify = notify;
//# sourceMappingURL=notify.js.map