import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs/internal/types';
import { map } from 'rxjs/operators';

export function pick(stream: Observable<any>): any {
  return function pluckStream(pathParams: string) {
    const commaSepString = pathParams.split('.');
    return stream.pipe(pluck(...commaSepString));
  };
}

//rxjs v6(pluck)
export function pluck<T, R>(
  ...properties: Array<string | number | symbol>
): OperatorFunction<T, R> {
  const length = properties.length;
  if (length === 0) {
    throw new Error('list of properties cannot be empty.');
  }
  return map((x) => {
    let currentProp: any = x;
    for (let i = 0; i < length; i++) {
      const p = currentProp?.[properties[i]];
      if (typeof p !== 'undefined') {
        currentProp = p;
      } else {
        return undefined;
      }
    }
    return currentProp;
  });
}
