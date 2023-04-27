import { Subject } from 'rxjs';
export interface SubjectOptions {
    INIT_VALUE?: any;
    BUFFER_SIZE?: number;
    WINDOW_TIME?: number;
}
export declare function subjectFactory<T>(subject: Subject<T> | undefined, options: SubjectOptions): Subject<T>;
