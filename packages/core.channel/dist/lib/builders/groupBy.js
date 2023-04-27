import { mergeMap, reduce } from 'rxjs';
export function groupBy(stream) {
    return function group(param) {
        return stream.pipe(groupBy((p) => p[param]), mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], []))));
    };
}
//# sourceMappingURL=groupBy.js.map