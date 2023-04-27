import { mergeMap, reduce } from 'rxjs';

export function groupBy(stream: any): any {
  return function group(param: any) {
    return stream.pipe(
      groupBy((p: any) => p[param]),
      mergeMap((group$: any) =>
        group$.pipe(reduce((acc: any, cur) => [...acc, cur], []))
      )
    );
  };
}
