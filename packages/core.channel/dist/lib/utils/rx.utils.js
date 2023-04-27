import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
export function subjectFactory(subject, options) {
    if (!subject)
        return new BehaviorSubject(options.INIT_VALUE);
    switch (subject.constructor) {
        case BehaviorSubject:
            return new BehaviorSubject(options.INIT_VALUE);
        case ReplaySubject:
            return new ReplaySubject(options.BUFFER_SIZE, options.WINDOW_TIME);
        default:
            return new Subject();
    }
}
//# sourceMappingURL=rx.utils.js.map