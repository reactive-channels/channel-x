import { map } from 'rxjs/operators';
export function pick(stream) {
    return function pluckStream(pathParams) {
        const commaSepString = pathParams.split('.');
        return stream.pipe(pluck(...commaSepString));
    };
}
//rxjs v6(pluck)
export function pluck(...properties) {
    const length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map((x) => {
        let currentProp = x;
        for (let i = 0; i < length; i++) {
            const p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    });
}
//# sourceMappingURL=pick.js.map