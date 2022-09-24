import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export interface SubjectOptions {
  INIT_VALUE?: any;
  BUFFER_SIZE?: number;
  WINDOW_TIME?: number;
}

export function subjectFactory<T>(
  subject: Subject<T> | undefined,
  options: SubjectOptions
) {
  if (!subject) return new BehaviorSubject<T>(options.INIT_VALUE);
  switch (subject.constructor) {
    case BehaviorSubject:
      return new BehaviorSubject<T>(options.INIT_VALUE);
    case ReplaySubject:
      return new ReplaySubject<T>(options.BUFFER_SIZE, options.WINDOW_TIME);
    default:
      return new Subject<T>();
  }
}
