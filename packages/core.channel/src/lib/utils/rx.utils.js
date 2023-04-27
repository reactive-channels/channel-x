"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectFactory = void 0;
const rxjs_1 = require("rxjs");
function subjectFactory(subject, options) {
    if (!subject)
        return new rxjs_1.BehaviorSubject(options.INIT_VALUE);
    switch (subject.constructor) {
        case rxjs_1.BehaviorSubject:
            return new rxjs_1.BehaviorSubject(options.INIT_VALUE);
        case rxjs_1.ReplaySubject:
            return new rxjs_1.ReplaySubject(options.BUFFER_SIZE, options.WINDOW_TIME);
        default:
            return new rxjs_1.Subject();
    }
}
exports.subjectFactory = subjectFactory;
//# sourceMappingURL=rx.utils.js.map