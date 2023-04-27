import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs/internal/types';
export declare function pick(stream: Observable<any>): any;
export declare function pluck<T, R>(...properties: Array<string | number | symbol>): OperatorFunction<T, R>;
