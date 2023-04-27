import { __awaiter } from "tslib";
export function fetchRequest(httpInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(httpInfo.url, httpInfo).then((response) => response.json());
    });
}
//# sourceMappingURL=fetchRequest.js.map